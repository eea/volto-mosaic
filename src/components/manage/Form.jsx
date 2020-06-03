// import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues } from 'lodash';
import { Button, Form as UiForm, Grid, List, Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import onAddBlock from './methods/Form/onAddBlock';
import onShowBlock from './methods/Form/onShowBlock';
import onLayoutChange from './methods/Form/onLayoutChange';
import onRemoveItem from './methods/Form/onRemoveItem';
import onLayoutDelete from './methods/Form/onLayoutDelete';
import onLayoutSave from './methods/Form/onLayoutSave';
import handleCloseEditor from './methods/Form/handleCloseEditor';
import renderElement from './methods/Form/renderElement';
import renderEditBlockPlaceholder from './methods/Form/renderEditBlockPlaceholder';
import onSubmitForm from './methods/Form/onSubmit';
import FormManager from './FormManager';

import { Field, SidebarPortal } from '@plone/volto/components'; // EditBlock
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

import { fromEntries } from 'volto-mosaic/helpers';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import '../css/edit.css';
import '../css/view.css';

import {
  rowHeight,
  breakpoints,
  screenSizes,
  zoomClassNames,
  zoomCoeficients,
} from '../../constants';

import BlockEditor from './BlockEditor';
import LayoutToolbar from './LayoutToolbar';

import { changeSidebarState } from 'volto-addons/actions';
import { connect } from 'react-redux';
import { setMosaicWidth } from 'volto-mosaic/actions';

import _ from 'lodash';

import { SizeMe } from 'react-sizeme';

import RGL from 'react-grid-layout';

// import GridLayout from './GridLayout';

// import move from 'lodash-move';
// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';
const ReactGridLayout = RGL;

const availableScreens = Object.keys(screenSizes).map(k => {
  return { key: k, text: screenSizes[k], value: k };
});

export function getBlockById(formData, id) {
  const blocksFieldname = getBlocksFieldname(formData);
  const res = formData[blocksFieldname]?.[id];
  return res;
}

function fallbackLayoutFromData(formData, ids) {
  // create a default layout based on existing blocks

  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  const order = formData[blocksLayoutFieldname].items || [];
  const data = formData[blocksFieldname];

  const fallbackLayout = [
    {
      // provide default block for title
      h: 1,
      i: ids.title,
      w: 12,
      x: 0,
      y: 0,
    },
    {
      // provide default block for text
      h: 3,
      i: ids.text,
      w: 12,
      x: 0,
      y: 1,
    },
  ];

  const validIds = order.filter(i => {
    return Object.keys(data).indexOf(i) > -1;
  });

  const res = validIds.map((el, ix) => {
    return {
      w: 12,
      h: ix === 0 ? 2 : 4,
      x: 0,
      y: ix === 0 ? 0 : 2 + (ix - 1) * 4,
      i: el,
    };
  });

  return res || fallbackLayout;
}

const Form = props => {
  Form.propTypes = {
    schema: PropTypes.shape({
      fieldsets: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.arrayOf(PropTypes.string),
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
      properties: PropTypes.objectOf(PropTypes.any),
      definitions: PropTypes.objectOf(PropTypes.any),
      required: PropTypes.arrayOf(PropTypes.string),
    }),
    formData: PropTypes.objectOf(PropTypes.any),
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    title: PropTypes.string,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
    description: PropTypes.string,
    visual: PropTypes.bool,
    blocks: PropTypes.arrayOf(PropTypes.object),
  };

  Form.defaultProps = {
    description: null,
    error: null,
    formData: null,
    hideActions: false,
    loading: null,
    onCancel: null,
    onSubmit: null,
    pathname: '',
    resetAfterSubmit: false,
    schema: {},
    submitLabel: null,
    blocks: [],
    title: null,
    visual: false,

    preview: false,
    // Grid props
    className: 'mosaic-edit-layout',
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    cols: 12,
    rowHeight: rowHeight,
    margins: 0,
    payload: null, // blockData that will be saved
  };

  if (__SERVER__) {
    return '';
  }

  const ids = {
    title: uuid(),
    text: uuid(),
  };
  const { schema } = props; // , onCancel, onSubmit

  const hasClonedBehaviour = props.hasClonedBehaviour;

  let formData = props.formData;

  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  if (formData === null) {
    // get defaults from schema
    formData = mapValues(schema.properties, 'default');
  }
  // defaults for block editor; should be moved to schema on server side
  if (!formData[blocksLayoutFieldname]) {
    formData[blocksLayoutFieldname] = {
      items: [ids.title, ids.text],
    };
  }
  if (!formData[blocksFieldname]) {
    formData[blocksFieldname] = {
      [ids.title]: {
        '@type': 'title',
        mosaic_block_title: 'title block',
      },
      [ids.text]: {
        '@type': 'text',
        mosaic_block_title: 'text block',
      },
    };
  }

  const activeScreenSize = props.activeScreenSize;

  const activeMosaicLayout =
    formData?.blocks_layout?.mosaic_layout?.[activeScreenSize] ||
    fallbackLayoutFromData(formData, ids);

  if (!formData[blocksLayoutFieldname].mosaic_layout) {
    formData[blocksLayoutFieldname].mosaic_layout = {
      lg: activeMosaicLayout,
    };
  }

  const use_grid_layout = formData[blocksLayoutFieldname].use_grid_layout;
  const overrideLayout = formData[blocksLayoutFieldname].overrideLayout;

  const items = formData[blocksLayoutFieldname].items || [];
  const refs = items.map(id => [id, React.createRef()]);

  // STATE
  const [errors, setErrors] = useState({}),
    [zoom, setZoom] = useState('100%'),
    [showModal, setShowModal] = useState({ modal: false, currentBlock: null }),
    [preview, setPreview] = useState(false);

  let layoutWidth = breakpoints()[props.activeScreenSize];
  if (props.activeScreenSize === 'lg') {
    layoutWidth = null;
  } else if (props.activeScreenSize === 'xxs') {
    layoutWidth = breakpoints()['xs'] - 20;
  }

  // Methods
  const handleOpen = blockid => {
    props.changeSidebarState(true);
    setShowModal({ modal: true, currentBlock: blockid });
  };

  const showUpdate = blockid => {
    const showBlockData = onShowBlock({
      formData,
      activeScreenSize,
      blockid,
      activeMosaicLayout,
    });
    if (showBlockData?.formData) {
      props.setFormData(showBlockData.formData);
    }
  };

  const onOverrideBlock = (data, block, i) => {
    const blocksFieldname = getBlocksFieldname(formData);
    console.log('overriding', data, block, i);
    props.setFormData({
      ...formData,
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        [i]: {
          ...block,
          override: data.checked,
        },
      },
    });
  };

  const removeItem = i => {
    const removeItemData = onRemoveItem({
      id: i.i,
      formData,
      activeMosaicLayout,
    });

    props.setFormData(removeItemData.formData);
  };

  const handleLayoutToolbar = (evType, data) => {
    switch (evType) {
      case 'PREVIEW_TILES':
        setPreview(data);
        break;
      case 'CHANGE_ZOOM':
        setZoom(data);
        break;
      case 'CHANGE_SCREEN_SIZE':
        props.setActiveScreenSize(data);
        break;
      case 'CHANGE_MARGINS':
        props.setFormData({
          ...formData,
          blocks_layout: {
            ...formData.blocks_layout,
            margins: data,
          },
        });
        break;
      case 'CREATE_TILE':
        const addBlockData = onAddBlock({
          type: 'text',
          formData,
          refs,
          activeScreenSize,
          use_grid_layout,
          overrideLayout,
        });
        props.setFormData(addBlockData.formData);
        break;
      case 'CREATE_LAYOUT':
        const onLayoutSaveData = onLayoutSave({
          breakpoint: data,
          formData,
          activeMosaicLayout,
        });
        props.setFormData(onLayoutSaveData.formData);
        break;
      case 'DELETE_LAYOUT':
        const onLayoutDeleteData = onLayoutDelete({
          breakpoint: data,
          formData,
        });
        props.setFormData(onLayoutDeleteData.formData);
        break;
      // case 'CHANGE_DISPLAY_TYPE':
      //   props.setFormData({
      //     ...formData,
      //     [getBlocksLayoutFieldname(formData)]: {
      //       ...formData[getBlocksLayoutFieldname(formData)],
      //       use_grid_layout: data,
      //     },
      //   });
      //   break;
      case 'OVERRIDE_LAYOUT':
        props.setFormData({
          ...formData,
          [blocksLayoutFieldname]: {
            ...formData[blocksLayoutFieldname],
            overrideLayout: data,
          },
        });

        break;
      default:
        break;
    }
  };

  const onSubmit = event => {
    const submitData = onSubmitForm({
      event,
      schema,
      intl: props.intl,
      onSubmitForm: props.onSubmit,
      resetAfterSubmit: props.resetAfterSubmit,
      onUpdateForm: props.onUpdateForm,
      formData,
    });
    console.log('submitData', submitData);
    if (submitData.data.errors) {
      setErrors(submitData.errors);
    }
    if (submitData.data.formData) {
      props.setFormData(submitData.data.formData);
    }
    if (submitData.afterUpdate) {
      () => submitData.afterUpdate;
    }
  };

  // hack
  props.inputRef.current = {
    ...props,
    onSubmit,
  };

  return __CLIENT__ ? (
    <div className="ui wrapper" style={{ overflow: 'auto' }}>
      <div
        className={`ui layout-preview ${zoomClassNames[zoom]}`}
        // id={'layout-preview-' + this.state.activeScreenSize}
      >
        <SizeMe>
          {({ size }) =>
            use_grid_layout ? (
              // <GridLayout formData={formData} />
              ''
            ) : (
              <ReactGridLayout
                onLayoutChange={layout =>
                  props.setFormData(
                    onLayoutChange({
                      newLayout: layout,
                      formData,
                      activeScreenSize,
                    }).formData,
                  )
                }
                onBreakpointChange={() => {}}
                layout={activeMosaicLayout}
                width={(() => {
                  props.setMosaicWidth(
                    __CLIENT__ && document.querySelector('main').offsetWidth,
                  );

                  console.log(
                    'width in form',
                    __CLIENT__ && document.querySelector('main').offsetWidth,
                  );
                  return (
                    layoutWidth ||
                    size.width ||
                    (__CLIENT__ && document.querySelector('main').offsetWidth)
                  );
                })()}
                transformScale={zoomCoeficients[zoom]}
                {...props}
                margin={[0, 0]}
              >
                {_.map(activeMosaicLayout, el =>
                  renderElement({
                    el,
                    showUpdate,
                    preview,
                    formData,
                    ref: refs[el.i],
                    renderEditBlockPlaceholder,
                    removeItem,
                    activeScreenSize,
                    handleOpen,
                    hasClonedBehaviour,
                    onOverrideBlock,
                    overrideLayout,
                  }),
                )}
              </ReactGridLayout>
            )
          }
        </SizeMe>
      </div>

      {/* onChangeBlock={this.onEditBlock} */}
      {showModal.modal ? (
        <BlockEditor
          blockid={showModal.currentBlock}
          formData={formData}
          onClose={blockData => {
            const handleCloseEditorData = handleCloseEditor({
              blockData,
              currentBlock: showModal.currentBlock,
              formData,
              changeSidebarState: props.changeSidebarState,
            });
            props.setFormData(handleCloseEditorData.formData);
            setShowModal({ ...showModal, modal: false });
          }}
        />
      ) : (
        ''
      )}
      <SidebarPortal selected={!showModal.modal}>
        {/* <TemplatingToolbar
          mode={props.mode}
          formData={formData || {}}
          onSave={({ blocks, blocks_layout }) =>
            props.setFormData({ ...formData, blocks, blocks_layout })
          }
        /> */}

        <LayoutToolbar
          availableScreens={availableScreens}
          layouts={
            formData.blocks_layout.mosaic_layout ||
            props.formData.blocks_layout.mosaic_layout
          }
          preview={preview}
          activeMosaicLayout={activeMosaicLayout}
          dispatchToParent={handleLayoutToolbar}
          currentZoom={zoom}
          margins={formData?.blocks_layout.margins}
          overrideLayout={overrideLayout}
          tilesList={_.map(activeMosaicLayout, el => (
            <List.Item key={el.i}>
              <List.Content floated="right">
                <Button size="mini" onClick={() => handleOpen(el.i)}>
                  Edit
                </Button>
              </List.Content>
              <List.Content verticalAlign="middle">
                <Grid stretched>
                  <Grid.Column width="8">
                    {getBlockById(formData, el.i)?.['@type'].replace(
                      /_/gi,
                      ' ',
                    )}
                  </Grid.Column>
                  <Grid.Column width="4">
                    <small>
                      {el.w} x {el.h}
                    </small>
                  </Grid.Column>
                </Grid>
              </List.Content>
            </List.Item>
          ))}
        />
      </SidebarPortal>
      <Portal node={__CLIENT__ && document.getElementById('sidebar-metadata')}>
        <UiForm
          method="post"
          onSubmit={onSubmit}
          error={keys(errors).length > 0}
        >
          {schema &&
            map(schema.fieldsets, item => [
              <Segment secondary attached key={item.title}>
                {item.title}
              </Segment>,
              <Segment attached key={`fieldset-contents-${item.title}`}>
                {map(item.fields, (field, index) => (
                  <Field
                    {...schema.properties[field]}
                    id={field}
                    focus={false}
                    value={formData[field]}
                    required={schema.required.indexOf(field) !== -1}
                    onChange={(id, value) =>
                      props.setFormData({
                        ...formData,
                        [id]: value || null,
                      })
                    }
                    onSave={({ blocks, blocks_layout }) => {
                      let formData = {
                        ...this.state.formData,
                        blocks,
                        blocks_layout,
                      };
                      const ids = {
                        title: uuid(),
                        text: uuid(),
                      };
                      const blocksFieldname = getBlocksFieldname(formData);
                      const blocksLayoutFieldname = getBlocksLayoutFieldname(
                        formData,
                      );
                      if (!formData) {
                        // get defaults from schema
                        formData = mapValues(
                          props.schema.properties,
                          'default',
                        );
                      }
                      // defaults for block editor; should be moved to schema on server side
                      if (!formData[blocksLayoutFieldname]) {
                        formData[blocksLayoutFieldname] = {
                          items: [ids.title, ids.text],
                        };
                      }
                      if (!formData[blocksFieldname]) {
                        formData[blocksFieldname] = {
                          [ids.title]: {
                            '@type': 'title',
                            mosaic_block_title: 'title block',
                          },
                          [ids.text]: {
                            '@type': 'text',
                            mosaic_block_title: 'text block',
                          },
                        };
                      }
                      const activeScreenSize = this.state.activeScreenSize;
                      const activeMosaicLayout = formData?.blocks_layout
                        ?.mosaic_layout
                        ? formData.blocks_layout.mosaic_layout[activeScreenSize]
                        : fallbackLayoutFromData(formData, ids);
                      if (!formData[blocksLayoutFieldname].mosaic_layout) {
                        formData[blocksLayoutFieldname].mosaic_layout = {
                          lg: activeMosaicLayout,
                        };
                      }
                      this.setState({
                        formData,
                        activeMosaicLayout,
                      });
                    }}
                    key={field}
                    error={errors[field]}
                  />
                ))}
              </Segment>,
            ])}
        </UiForm>
      </Portal>
    </div>
  ) : (
    ''
  );
};

export default connect(
  null,
  { changeSidebarState, setMosaicWidth },
)(injectIntl(FormManager(Form), { forwardRef: true }));
