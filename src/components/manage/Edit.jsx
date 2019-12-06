// import VoltoEdit from '@plone/volto/components/manage/Edit/Edit';
//
import HTML5Backend from 'react-dnd-html5-backend';
import { Helmet } from '@plone/volto/helpers';
import MosaicForm from './Form';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import clearSVG from '@plone/volto/icons/clear.svg';
import qs from 'query-string';
import saveSVG from '@plone/volto/icons/save.svg';
import { DragDropContext } from 'react-dnd';
import { Form, Icon, Toolbar, Sidebar } from '@plone/volto/components';
import { Portal } from 'react-portal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getBaseUrl, hasBlocksData } from '@plone/volto/helpers';
import { updateContent, getContent, getSchema } from '@plone/volto/actions';

const messages = defineMessages({
  edit: {
    id: 'Edit {title}',
    defaultMessage: 'Edit {title}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

class Edit extends Component {
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    getRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    returnUrl: PropTypes.string,
    content: PropTypes.shape({
      '@type': PropTypes.string,
    }),
    schema: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: {},
    content: null,
    returnUrl: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs EditComponent
   */
  constructor(props) {
    super(props);
    this.state = {
      visual: true,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getContent(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.getRequest.loading && nextProps.getRequest.loaded) {
      this.props.getSchema(nextProps.content['@type']);
    }
    if (this.props.schemaRequest.loading && nextProps.schemaRequest.loaded) {
      if (!hasBlocksData(nextProps.schema.properties)) {
        this.setState({
          visual: false,
        });
      }
    }

    // Hack for make the Plone site editable by Volto Editor without checkings
    if (this.props.content && this.props.content['@type'] === 'Plone Site') {
      this.setState({
        visual: true,
      });
    }

    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      this.props.history.push(
        this.props.returnUrl || getBaseUrl(this.props.pathname),
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.updateContent(getBaseUrl(this.props.pathname), data);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(
      this.props.returnUrl || getBaseUrl(this.props.pathname),
    );
  }

  form = React.createRef();

  render() {
    // This is the only thing different from the original. This version comes
    // from Volto 4.0.0.alpha-9
    let isMosaic = false;
    let content = this.props.content;

    if (content && this.props.content.layout === 'mosaic_tiles_view')
      isMosaic = true;
    if (content && this.props.content['@type'] === 'Plone Site')
      isMosaic = true;
    const FormImpl = isMosaic ? MosaicForm : Form;
    // const FwdFormImpl = React.forwardRef((props, ref) => (
    //   <FormImpl {...props} />
    // ));
    //

    return (
      <div id="page-edit">
        <Helmet
          title={
            this.props?.schema?.title
              ? this.props.intl.formatMessage(messages.edit, {
                  title: this.props.schema.title,
                })
              : null
          }
        />
        <FormImpl
          ref={this.form}
          schema={this.props.schema}
          formData={this.props.content}
          onSubmit={this.onSubmit}
          hideActions
          pathname={this.props.pathname}
          visual={this.state.visual}
          title={
            this.props?.schema?.title
              ? this.props.intl.formatMessage(messages.edit, {
                  title: this.props.schema.title,
                })
              : null
          }
          loading={this.props.updateRequest.loading}
        />
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={
              <>
                <button
                  id="toolbar-save"
                  className="save"
                  aria-label={this.props.intl.formatMessage(messages.save)}
                  onClick={() => this.form.current.onSubmit()}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.save)}
                  />
                </button>
                <button
                  className="cancel"
                  aria-label={this.props.intl.formatMessage(messages.cancel)}
                  onClick={() => this.onCancel()}
                >
                  <Icon
                    name={clearSVG}
                    className="circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.cancel)}
                  />
                </button>
              </>
            }
          />
        </Portal>
        {this.state.visual && (
          <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
            <Sidebar />
          </Portal>
        )}
      </div>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  injectIntl,
  connect(
    (state, props) => ({
      content: state.content.data,
      schema: state.schema.schema,
      getRequest: state.content.get,
      schemaRequest: state.schema,
      updateRequest: state.content.update,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
    }),
    {
      updateContent,
      getContent,
      getSchema,
    },
  ),
)(Edit);
