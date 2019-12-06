import React, { Component } from 'react';
import { Grid, Button, Form as UiForm, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMosaicSettings } from '../../actions';
import { Field } from '@plone/volto/components'; // EditBlock
import { Icon as VoltoIcon } from '@plone/volto/components';

import showIcon from '@plone/volto/icons/show.svg';
import hideIcon from '@plone/volto/icons/hide.svg';

import BlockStyleSelectWidget from './BlockStyleSelectWidget';

// import PropTypes from 'prop-types';
export const SIZING_POLICY_CHOICES = [
  ['fit-content', 'Shrink fit to content'],
  ['min-height', 'Minimum block height (specific to each block type)'],
  ['fill-space', 'Fill available space'],
  ['manual', 'Resized manually'],
];

class BlockMetadataEditor extends Component {
  constructor(props) {
    super(props);
    // console.log('props in blockmetadateeditor', props);

    const block = JSON.parse(JSON.stringify(props.blockData));
    let show_block_title = block.show_block_title;

    if (Object.keys(block).indexOf('show_block_title') === -1) {
      show_block_title = true;
    }

    this.state = {
      settings: props.settings,
      selectedBoxStyle: block.mosaic_box_style || 'default-block',

      mosaic_block_title: block.mosaic_block_title,
      mosaic_box_sizing: block.mosaic_box_sizing || 'fit-content',
      block_title: block.block_title,
      show_block_title,
    };

    this.updateData = this.updateData.bind(this);

    // this.getCard = this.getCard.bind(this);
    // this.handleSelectBoxStyle = this.handleSelectBoxStyle.bind(this);
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

  updateData(obj) {
    this.setState(obj, () => {
      this.props.onDataChange(obj);
    });
  }

  render() {
    let styles = (this.state.settings && this.state.settings.styles) || [];
    // console.log('will pass styles', styles);
    return (
      <UiForm>
        <UiForm.Field
          inline
          required={false}
          className="help block-title"
          id="field-block-title"
        >
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="4">
                <label htmlFor="block-title">Title:</label>
              </Grid.Column>
              <Grid.Column width="8">
                <Input
                  id="block-title"
                  type="text"
                  defaultValue={this.state.block_title || ''}
                  onChange={(e, d) => this.updateData({ block_title: d.value })}
                  icon={
                    <Button
                      color={this.state.show_block_title ? 'green' : 'red'}
                      onClick={() =>
                        this.updateData({
                          show_block_title: !this.state.show_block_title,
                        })
                      }
                    >
                      <VoltoIcon
                        size="20"
                        name={this.state.show_block_title ? showIcon : hideIcon}
                      />
                    </Button>
                  }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </UiForm.Field>

        <Field
          id="mosaic-title"
          title="Block name"
          type="text"
          description="Identifier for this block"
          value={this.state.mosaic_block_title}
          required={false}
          onChange={(e, d) => this.updateData({ mosaic_block_title: d })}
        />

        <BlockStyleSelectWidget
          title="Block style"
          description="Select a style to apply to this block"
          value={this.state.selectedBoxStyle}
          options={styles}
          id="block-style-select"
          onChange={(name, selection) =>
            this.updateData({ mosaic_box_style: selection })
          }
        />

        <Field
          id="sizing-policy"
          title="Height sizing policy"
          description="Set the default sizing policy for this block"
          value={this.state.mosaic_box_sizing}
          onChange={(e, d) => {
            this.updateData({ mosaic_box_sizing: d });
          }}
          choices={SIZING_POLICY_CHOICES}
        />
      </UiForm>
    );
  }
}

export default connect(
  state => ({
    settings: state.mosaic_settings && state.mosaic_settings.items,
  }),
  { getMosaicSettings },
)(BlockMetadataEditor);
