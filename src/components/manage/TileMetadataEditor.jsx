import React, { Component } from 'react';
import { Grid, Button, Item, Form as UiForm, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMosaicSettings } from '../../actions';
import { Field } from '@plone/volto/components'; // EditTile
import { Icon as VoltoIcon } from '@plone/volto/components';

import showIcon from '@plone/volto/icons/show.svg';
import hideIcon from '@plone/volto/icons/hide.svg';

import TileStyleSelectWidget from './TileStyleSelectWidget';

// import PropTypes from 'prop-types';

class TileMetadataEditor extends Component {
  constructor(props) {
    super(props);
    console.log('props in tilemetadateeditor', props);

    const tile = JSON.parse(JSON.stringify(props.tileData));
    let show_tile_title = tile.show_tile_title;

    if (Object.keys(tile).indexOf('show_tile_title') === -1) {
      show_tile_title = true;
    }

    this.state = {
      settings: props.settings,
      selectedBoxStyle: tile.mosaicBoxStyle || 'default-tile',

      mosaic_tile_title: tile.mosaic_tile_title,
      tile_title: tile.tile_title,
      show_tile_title,
    };

    this.updateData = this.updateData.bind(this);

    // this.getCard = this.getCard.bind(this);
    // this.handleSelectBoxStyle = this.handleSelectBoxStyle.bind(this);
  }

  // handleSelectBoxStyle(klass) {
  //   // TODO: this should be refactored. We should use ids, not titles
  //   this.setState(
  //     {
  //       selectedBoxStyle: klass,
  //     },
  //     () => {
  //       this.props.onDataChange({ mosaicBoxStyle: klass });
  //     },
  //   );
  // }

  // getCard(style, key) {
  //   let bits = style.split('|');
  //   let [title, id] = bits;
  //   let klass = 'tile-box preview ' + id;
  //   let itemStyle =
  //     this.state.selectedBoxStyle === id ? { backgroundColor: 'pink' } : {};
  //
  //   return (
  //     <Item
  //       key={key}
  //       onClick={() => this.handleSelectBoxStyle(id)}
  //       style={itemStyle}
  //     >
  //       <Item.Image size="tiny">
  //         <div className={klass}>{}</div>
  //       </Item.Image>
  //       <Item.Content verticalAlign="middle">
  //         <Item.Header>{title}</Item.Header>
  //         <Item.Description>
  //           {/* TODO: get descriptions */}
  //           <p>A box style</p>
  //         </Item.Description>
  //       </Item.Content>
  //     </Item>
  //   );
  // }

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
            this.updateData({ mosaicBoxStyle: selection })
          }
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
