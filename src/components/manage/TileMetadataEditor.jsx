import React, { Component } from 'react';
import { Grid, Button, Form as UiForm, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMosaicSettings } from '../../actions';
import { Field } from '@plone/volto/components'; // EditTile
import { Icon as VoltoIcon } from '@plone/volto/components';

import showIcon from '@plone/volto/icons/show.svg';
import hideIcon from '@plone/volto/icons/hide.svg';

import TileStyleSelectWidget from './TileStyleSelectWidget';

// import PropTypes from 'prop-types';
export const SIZING_POLICY_CHOICES = [
  ['fit-content', 'Shrink fit to content'],
  ['min-height', 'Minimum tile height (specific to each tile type)'],
  ['fill-space', 'Fill available space'],
  ['manual', 'Resized manually'],
];

class TileMetadataEditor extends Component {
  constructor(props) {
    super(props);
    console.log('props in tilemetadateeditor', props);

    const tile = JSON.parse(JSON.stringify(props.blockData));
    let show_tile_title = tile.show_tile_title;

    if (Object.keys(tile).indexOf('show_tile_title') === -1) {
      show_tile_title = true;
    }

    this.state = {
      settings: props.settings,
      selectedBoxStyle: tile.mosaic_box_style || 'default-tile',

      mosaic_tile_title: tile.mosaic_tile_title,
      mosaic_box_sizing: tile.mosaic_box_sizing || 'fit-content',
      tile_title: tile.tile_title,
      show_tile_title,
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
    console.log('will pass styles', styles);
    return (
      <UiForm>
        <UiForm.Field
          inline
          required={false}
          className="help tile-title"
          id="field-tile-title"
        >
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="4">
                <label htmlFor="tile-title">Title:</label>
              </Grid.Column>
              <Grid.Column width="8">
                <Input
                  id="tile-title"
                  type="text"
                  defaultValue={this.state.tile_title || ''}
                  onChange={(e, d) => this.updateData({ tile_title: d.value })}
                  icon={
                    <Button
                      color={this.state.show_tile_title ? 'green' : 'red'}
                      onClick={() =>
                        this.updateData({
                          show_tile_title: !this.state.show_tile_title,
                        })
                      }
                    >
                      <VoltoIcon
                        size="20"
                        name={this.state.show_tile_title ? showIcon : hideIcon}
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
          title="Tile name"
          type="text"
          description="Identifier for this tile"
          value={this.state.mosaic_tile_title}
          required={false}
          onChange={(e, d) => this.updateData({ mosaic_tile_title: d })}
        />

        <TileStyleSelectWidget
          title="Tile style"
          description="Select a style to apply to this tile"
          value={this.state.selectedBoxStyle}
          options={styles}
          id="tile-style-select"
          onChange={(name, selection) =>
            this.updateData({ mosaic_box_style: selection })
          }
        />

        <Field
          id="sizing-policy"
          title="Height sizing policy"
          description="Set the default sizing policy for this tile"
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
    settings: state.mosaic_settings.items,
  }),
  { getMosaicSettings },
)(TileMetadataEditor);
