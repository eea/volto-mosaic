import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Item, Form as UiForm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMosaicSettings } from '../../actions';

class TileMetadataEditor extends Component {
  constructor(props) {
    super(props);

    this.getCard = this.getCard.bind(this);
    this.handleSelectBoxStyle = this.handleSelectBoxStyle.bind(this);

    this.state = {
      settings: props.settings || [],
      selectedBoxStyle: props.tile.mosaicBoxStyle || 'Default',
    };
  }

  handleSelectBoxStyle(name) {
    // TODO: this should be refactored. We should use ids, not titles
    this.setState(
      {
        selectedBoxStyle: name,
      },
      () => {
        this.props.onDataChange({ mosaicBoxStyle: name });
      },
    );
  }

  getCard(style, key) {
    let bits = style.split('|');
    let [title, id] = bits;
    let klass = 'tile-box preview ' + id;
    let itemStyle =
      this.state.selectedBoxStyle === title ? { backgroundColor: 'pink' } : {};

    return (
      <Item
        key={key}
        onClick={() => this.handleSelectBoxStyle(title)}
        style={itemStyle}
      >
        <Item.Image>
          <div className={klass}>{}</div>
        </Item.Image>
        <Item.Header>{id}</Item.Header>
        <Item.Content>A box style</Item.Content>
      </Item>
    );
  }

  componentWillReceiveProps(nextProps) {
    let oldSettings = JSON.stringify(this.props.settings);
    let newSettings = JSON.stringify(nextProps.settings);

    if (oldSettings !== newSettings) {
      this.setState({ settings: nextProps.settings });
    }
  }

  componentDidMount() {
    this.props.getMosaicSettings();
  }

  render() {
    let styles = (this.state.settings && this.state.settings.styles) || [];
    return (
      <UiForm>
        <Item.Group>{styles ? styles.map(this.getCard) : ''}</Item.Group>
      </UiForm>
    );
  }
}

export default connect(
  state => ({
    settings: state.mosaic_settings.items,
  }),
  { getMosaicSettings },
)(TileMetadataEditor);
