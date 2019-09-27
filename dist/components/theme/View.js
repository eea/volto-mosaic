Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

require('react-mosaic-component/react-mosaic-component.css');

var _reactHelmet = _interopRequireDefault(require('react-helmet'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _semanticUiReact = require('semantic-ui-react');

var _config = require('~/config');

var _reactMosaicComponent2 = require('react-mosaic-component');

var _helpers = require('@plone/volto/helpers');

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  if (obj != null) {
    var hasPropertyDescriptor =
      Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Component to display the document view.
 * @function DocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
var MosaicView =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(MosaicView, _Component);

    function MosaicView(props) {
      var _this;

      _classCallCheck(this, MosaicView);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(MosaicView).call(this, props),
      );

      _defineProperty(_assertThisInitialized(_this), 'createNode', function() {
        // this.onAddTile('text', 0);
        console.log('Called createNode');
      });

      _defineProperty(_assertThisInitialized(_this), 'onChange', function(
        currentNode,
      ) {
        _this.setState({
          currentNode: currentNode,
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'onRelease', function(
        currentNode,
      ) {
        console.log('Mosaic.onRelease():', currentNode);
      });

      var content = props.content;
      console.log('content', content);
      var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(content);
      var layout = content[tilesLayoutFieldname].layout;

      if (!__SERVER__) {
        _this.state = {
          currentNode: layout,
        };
      }

      console.log('This.state in constructor', _this.state, content);
      return _this;
    }

    _createClass(MosaicView, [
      {
        key: 'renderTile',
        value: function renderTile(tileid) {
          var content = this.props.content;
          var tilesFieldname = (0, _helpers.getTilesFieldname)(content);
          var availableTiles = content[tilesFieldname];
          var tiletype = availableTiles[tileid]['@type'];
          console.log(
            'Rendering tile:',
            tileid,
            tiletype,
            tilesFieldname,
            content,
          );
          var Tile = null;
          Tile = _config.tiles.defaultTilesViewMap[tiletype];
          return Tile !== null
            ? _react['default'].createElement(
                'div',
                {
                  class: 'tile-container',
                },
                _react['default'].createElement(Tile, {
                  key: tileid,
                  properties: content,
                  data: availableTiles[tileid],
                }),
              )
            : _react['default'].createElement(
                'div',
                null,
                ' ',
                JSON.stringify(tiletype),
                ' ',
              );
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var content = this.props.content;
          console.log('This.state in render: ', this.state);
          var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
            content,
          );
          var height = content[tilesLayoutFieldname].layout_height || 500;
          return true
            ? _react['default'].createElement(
                'div',
                {
                  id: 'page-document',
                  className: 'ui wrapper',
                  style: {
                    height: height,
                  },
                },
                _react['default'].createElement(_reactMosaicComponent2.Mosaic, {
                  renderTile: function renderTile(tileid, path) {
                    return _react['default'].createElement(
                      _reactMosaicComponent2.MosaicWindow,
                      {
                        title: 'Window '.concat(tileid),
                        createNode: _this2.createNode,
                        path: path,
                      },
                      _this2.renderTile(tileid),
                    );
                  },
                  value: this.state.currentNode,
                  onChange: this.onChange,
                  onRelease: this.onRelease,
                }),
              )
            : _react['default'].createElement(
                _semanticUiReact.Container,
                {
                  id: 'page-document',
                },
                _react['default'].createElement(_reactHelmet['default'], {
                  title: content.title,
                }),
                _react['default'].createElement(
                  'h1',
                  {
                    className: 'documentFirstHeading',
                  },
                  content.title,
                ),
                content.description &&
                  _react['default'].createElement(
                    'p',
                    {
                      className: 'documentDescription',
                    },
                    content.description,
                  ),
                content.image &&
                  _react['default'].createElement(_semanticUiReact.Image, {
                    className: 'document-image',
                    src: content.image.scales.thumb.download,
                    floated: 'right',
                  }),
                content.remoteUrl &&
                  _react['default'].createElement(
                    'span',
                    null,
                    'The link address is:',
                    _react['default'].createElement(
                      'a',
                      {
                        href: content.remoteUrl,
                      },
                      content.remoteUrl,
                    ),
                  ),
                content.text &&
                  _react['default'].createElement('div', {
                    dangerouslySetInnerHTML: {
                      __html: content.text.data.replace(
                        /a href="([^"]*\.[^"]*)"/g,
                        'a href="'.concat(
                          _config.settings.apiPath,
                          '$1/download/file"',
                        ),
                      ),
                    },
                  }),
              );
        },
      },
    ]);

    return MosaicView;
  })(_react.Component);
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

MosaicView.propTypes = {
  /**
   * Content of the object
   */
  content: _propTypes['default'].shape({
    /**
     * Title of the object
     */
    title: _propTypes['default'].string,

    /**
     * Description of the object
     */
    description: _propTypes['default'].string,

    /**
     * Text of the object
     */
    text: _propTypes['default'].shape({
      /**
       * Data of the text of the object
       */
      data: _propTypes['default'].string,
    }),
  }).isRequired,
};
var _default = MosaicView;
exports['default'] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RoZW1lL1ZpZXcuanN4Il0sIm5hbWVzIjpbIk1vc2FpY1ZpZXciLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50Tm9kZSIsInNldFN0YXRlIiwiY29udGVudCIsInRpbGVzTGF5b3V0RmllbGRuYW1lIiwibGF5b3V0IiwiX19TRVJWRVJfXyIsInN0YXRlIiwidGlsZWlkIiwidGlsZXNGaWVsZG5hbWUiLCJhdmFpbGFibGVUaWxlcyIsInRpbGV0eXBlIiwiVGlsZSIsInRpbGVzIiwiZGVmYXVsdFRpbGVzVmlld01hcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWlnaHQiLCJsYXlvdXRfaGVpZ2h0IiwicGF0aCIsImNyZWF0ZU5vZGUiLCJyZW5kZXJUaWxlIiwib25DaGFuZ2UiLCJvblJlbGVhc2UiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiLCJzY2FsZXMiLCJ0aHVtYiIsImRvd25sb2FkIiwicmVtb3RlVXJsIiwidGV4dCIsIl9faHRtbCIsImRhdGEiLCJyZXBsYWNlIiwic2V0dGluZ3MiLCJhcGlQYXRoIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic2hhcGUiLCJzdHJpbmciLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7Ozs7OztJQU9NQSxVOzs7OztBQUNKLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLG9GQUFNQSxLQUFOOztBQURpQixpRUFrQk4sWUFBTTtBQUNqQjtBQUNBQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtBQUNELEtBckJrQjs7QUFBQSwrREF1QlIsVUFBQUMsV0FBVyxFQUFJO0FBQ3hCLFlBQUtDLFFBQUwsQ0FBYztBQUFFRCxRQUFBQSxXQUFXLEVBQVhB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QUFHQVYsSUFBQUEsSUFBSSxFQUFFUSxzQkFBVUMsS0FBVixDQUFnQjtBQUNwQjs7O0FBR0FQLE1BQUFBLElBQUksRUFBRU0sc0JBQVVFO0FBSkksS0FBaEI7QUFaaUIsR0FBaEIsRUFrQk5DO0FBdEJrQixDQUF2QjtlQXlCZTdDLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERvY3VtZW50IHZpZXcgY29tcG9uZW50LlxuICogQG1vZHVsZSBjb21wb25lbnRzL3RoZW1lL1ZpZXcvRG9jdW1lbnRWaWV3XG4gKi9cblxuaW1wb3J0ICdyZWFjdC1tb3NhaWMtY29tcG9uZW50L3JlYWN0LW1vc2FpYy1jb21wb25lbnQuY3NzJztcblxuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENvbnRhaW5lciwgSW1hZ2UgfSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG4vLyBpbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc2V0dGluZ3MsIHRpbGVzIH0gZnJvbSAnfi9jb25maWcnO1xuXG5pbXBvcnQge1xuICBNb3NhaWMsXG4gIE1vc2FpY1dpbmRvdyxcbiAgLy8gQ29ybmVyLFxuICAvLyBjcmVhdGVCYWxhbmNlZFRyZWVGcm9tTGVhdmVzLFxuICAvLyBnZXRMZWF2ZXMsXG4gIC8vIGdldE5vZGVBdFBhdGgsXG4gIC8vIGdldE90aGVyRGlyZWN0aW9uLFxuICAvLyBnZXRQYXRoVG9Db3JuZXIsXG4gIC8vIE1vc2FpY0RpcmVjdGlvbixcbiAgLy8gTW9zYWljTm9kZSxcbiAgLy8gTW9zYWljUGFyZW50LFxuICAvLyBNb3NhaWNaZXJvU3RhdGUsXG4gIC8vIHVwZGF0ZVRyZWUsXG59IGZyb20gJ3JlYWN0LW1vc2FpYy1jb21wb25lbnQnO1xuXG5pbXBvcnQge1xuICBnZXRUaWxlc0ZpZWxkbmFtZSxcbiAgZ2V0VGlsZXNMYXlvdXRGaWVsZG5hbWUsXG4gIC8vIGhhc1RpbGVzRGF0YSxcbn0gZnJvbSAnQHBsb25lL3ZvbHRvL2hlbHBlcnMnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0byBkaXNwbGF5IHRoZSBkb2N1bWVudCB2aWV3LlxuICogQGZ1bmN0aW9uIERvY3VtZW50Vmlld1xuICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgQ29udGVudCBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBNYXJrdXAgb2YgdGhlIGNvbXBvbmVudC5cbiAqL1xuXG5jbGFzcyBNb3NhaWNWaWV3IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgY29udGVudCA9IHByb3BzLmNvbnRlbnQ7XG4gICAgY29uc29sZS5sb2coJ2NvbnRlbnQnLCBjb250ZW50KTtcbiAgICBjb25zdCB0aWxlc0xheW91dEZpZWxkbmFtZSA9IGdldFRpbGVzTGF5b3V0RmllbGRuYW1lKGNvbnRlbnQpO1xuXG4gICAgbGV0IGxheW91dCA9IGNvbnRlbnRbdGlsZXNMYXlvdXRGaWVsZG5hbWVdLmxheW91dDtcblxuICAgIGlmICghX19TRVJWRVJfXykge1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudE5vZGU6IGxheW91dCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ1RoaXMuc3RhdGUgaW4gY29uc3RydWN0b3InLCB0aGlzLnN0YXRlLCBjb250ZW50KTtcbiAgfVxuXG4gIGNyZWF0ZU5vZGUgPSAoKSA9PiB7XG4gICAgLy8gdGhpcy5vbkFkZFRpbGUoJ3RleHQnLCAwKTtcbiAgICBjb25zb2xlLmxvZygnQ2FsbGVkIGNyZWF0ZU5vZGUnKTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IGN1cnJlbnROb2RlID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudE5vZGUgfSk7XG4gIH07XG5cbiAgb25SZWxlYXNlID0gY3VycmVudE5vZGUgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdNb3NhaWMub25SZWxlYXNlKCk6JywgY3VycmVudE5vZGUpO1xuICB9O1xuXG4gIHJlbmRlclRpbGUodGlsZWlkKSB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMucHJvcHMuY29udGVudDtcbiAgICBjb25zdCB0aWxlc0ZpZWxkbmFtZSA9IGdldFRpbGVzRmllbGRuYW1lKGNvbnRlbnQpO1xuICAgIGNvbnN0IGF2YWlsYWJsZVRpbGVzID0gY29udGVudFt0aWxlc0ZpZWxkbmFtZV07XG4gICAgY29uc3QgdGlsZXR5cGUgPSBhdmFpbGFibGVUaWxlc1t0aWxlaWRdWydAdHlwZSddO1xuXG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmluZyB0aWxlOicsIHRpbGVpZCwgdGlsZXR5cGUsIHRpbGVzRmllbGRuYW1lLCBjb250ZW50KTtcblxuICAgIGxldCBUaWxlID0gbnVsbDtcbiAgICBUaWxlID0gdGlsZXMuZGVmYXVsdFRpbGVzVmlld01hcFt0aWxldHlwZV07XG5cbiAgICByZXR1cm4gVGlsZSAhPT0gbnVsbCA/IChcbiAgICAgIDxkaXYgY2xhc3M9XCJ0aWxlLWNvbnRhaW5lclwiPlxuICAgICAgICA8VGlsZSBrZXk9e3RpbGVpZH0gcHJvcGVydGllcz17Y29udGVudH0gZGF0YT17YXZhaWxhYmxlVGlsZXNbdGlsZWlkXX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICkgOiAoXG4gICAgICA8ZGl2PiB7SlNPTi5zdHJpbmdpZnkodGlsZXR5cGUpfSA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnByb3BzLmNvbnRlbnQ7XG4gICAgY29uc29sZS5sb2coJ1RoaXMuc3RhdGUgaW4gcmVuZGVyOiAnLCB0aGlzLnN0YXRlKTtcblxuICAgIGNvbnN0IHRpbGVzTGF5b3V0RmllbGRuYW1lID0gZ2V0VGlsZXNMYXlvdXRGaWVsZG5hbWUoY29udGVudCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gY29udGVudFt0aWxlc0xheW91dEZpZWxkbmFtZV0ubGF5b3V0X2hlaWdodCB8fCA1MDA7XG5cbiAgICByZXR1cm4gdHJ1ZSA/IChcbiAgICAgIDxkaXYgaWQ9XCJwYWdlLWRvY3VtZW50XCIgY2xhc3NOYW1lPVwidWkgd3JhcHBlclwiIHN0eWxlPXt7IGhlaWdodDogaGVpZ2h0IH19PlxuICAgICAgICB7LyogPEhlbG1ldCB0aXRsZT17Y29udGVudC50aXRsZX0gLz4gKi99XG4gICAgICAgIDxNb3NhaWNcbiAgICAgICAgICByZW5kZXJUaWxlPXsodGlsZWlkLCBwYXRoKSA9PiAoXG4gICAgICAgICAgICA8TW9zYWljV2luZG93XG4gICAgICAgICAgICAgIHRpdGxlPXtgV2luZG93ICR7dGlsZWlkfWB9XG4gICAgICAgICAgICAgIGNyZWF0ZU5vZGU9e3RoaXMuY3JlYXRlTm9kZX1cbiAgICAgICAgICAgICAgcGF0aD17cGF0aH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMucmVuZGVyVGlsZSh0aWxlaWQpfVxuICAgICAgICAgICAgPC9Nb3NhaWNXaW5kb3c+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jdXJyZW50Tm9kZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICBvblJlbGVhc2U9e3RoaXMub25SZWxlYXNlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKSA6IChcbiAgICAgIDxDb250YWluZXIgaWQ9XCJwYWdlLWRvY3VtZW50XCI+XG4gICAgICAgIDxIZWxtZXQgdGl0bGU9e2NvbnRlbnQudGl0bGV9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJkb2N1bWVudEZpcnN0SGVhZGluZ1wiPntjb250ZW50LnRpdGxlfTwvaDE+XG4gICAgICAgIHtjb250ZW50LmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkb2N1bWVudERlc2NyaXB0aW9uXCI+e2NvbnRlbnQuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICApfVxuICAgICAgICB7Y29udGVudC5pbWFnZSAmJiAoXG4gICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkb2N1bWVudC1pbWFnZVwiXG4gICAgICAgICAgICBzcmM9e2NvbnRlbnQuaW1hZ2Uuc2NhbGVzLnRodW1iLmRvd25sb2FkfVxuICAgICAgICAgICAgZmxvYXRlZD1cInJpZ2h0XCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7Y29udGVudC5yZW1vdGVVcmwgJiYgKFxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgVGhlIGxpbmsgYWRkcmVzcyBpczpcbiAgICAgICAgICAgIDxhIGhyZWY9e2NvbnRlbnQucmVtb3RlVXJsfT57Y29udGVudC5yZW1vdGVVcmx9PC9hPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKX1cbiAgICAgICAge2NvbnRlbnQudGV4dCAmJiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgX19odG1sOiBjb250ZW50LnRleHQuZGF0YS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC9hIGhyZWY9XCIoW15cIl0qXFwuW15cIl0qKVwiL2csXG4gICAgICAgICAgICAgICAgYGEgaHJlZj1cIiR7c2V0dGluZ3MuYXBpUGF0aH0kMS9kb3dubG9hZC9maWxlXCJgLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIFByb3BlcnR5IHR5cGVzLlxuICogQHByb3BlcnR5IHtPYmplY3R9IHByb3BUeXBlcyBQcm9wZXJ0eSB0eXBlcy5cbiAqIEBzdGF0aWNcbiAqL1xuXG5Nb3NhaWNWaWV3LnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIENvbnRlbnQgb2YgdGhlIG9iamVjdFxuICAgKi9cbiAgY29udGVudDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb24gb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIFRleHQgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIHRleHQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAvKipcbiAgICAgICAqIERhdGEgb2YgdGhlIHRleHQgb2YgdGhlIG9iamVjdFxuICAgICAgICovXG4gICAgICBkYXRhOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9zYWljVmlldztcbiJdfQ==
