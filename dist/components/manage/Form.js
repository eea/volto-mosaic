Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.THEMES = void 0;

require('@blueprintjs/core/lib/css/blueprint.css');

require('@blueprintjs/icons/lib/css/blueprint-icons.css');

var _dropRight = _interopRequireDefault(require('lodash/dropRight'));

var _reactMosaicComponent = require('react-mosaic-component');

var _config = require('~/config');

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _lodash = require('lodash');

var _semanticUiReact = require('semantic-ui-react');

var _reactIntl = require('react-intl');

var _uuid = require('uuid');

var _reactPortal = require('react-portal');

var _components = require('@plone/volto/components');

var _helpers = require('@plone/volto/helpers');

var _camera = _interopRequireDefault(require('@plone/volto/icons/camera.svg'));

var _videocamera = _interopRequireDefault(
  require('@plone/volto/icons/videocamera.svg'),
);

var _text = _interopRequireDefault(require('@plone/volto/icons/text.svg'));

var _reactResizable = require('react-resizable');

require('react-resizable/css/styles.css');

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

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
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

// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';
var THEMES = {
  Blueprint: 'mosaic-blueprint-theme',
};
exports.THEMES = THEMES;
var messages = (0, _reactIntl.defineMessages)({
  addTile: {
    id: 'Add tile...',
    defaultMessage: 'Add tile...',
  },
  required: {
    id: 'Required input is missing.',
    defaultMessage: 'Required input is missing.',
  },
  minLength: {
    id: 'Minimum length is {len}.',
    defaultMessage: 'Minimum length is {len}.',
  },
  uniqueItems: {
    id: 'Items must be unique.',
    defaultMessage: 'Items must be unique.',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors.',
    defaultMessage: 'There were some errors.',
  },
});

var AddNewTile =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(AddNewTile, _Component);

    function AddNewTile(props) {
      var _this;

      _classCallCheck(this, AddNewTile);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(AddNewTile).call(this, props),
      );
      var availableTiles = [
        {
          title: 'text',
          icon: _text['default'],
        },
        {
          title: 'video',
          icon: _videocamera['default'],
        },
        {
          title: 'image',
          icon: _camera['default'],
        },
      ].concat(_toConsumableArray(_config.tiles.customTiles));
      _this.state = {
        availableTiles: availableTiles,
      };
      return _this;
    }

    _createClass(AddNewTile, [
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          return _react['default'].createElement(
            'div',
            {
              className: 'add-tile toolbar',
            },
            _react['default'].createElement(
              _semanticUiReact.Button.Group,
              null,
              this.state.availableTiles.map(function(tile) {
                return _react['default'].createElement(
                  _semanticUiReact.Button,
                  {
                    key: tile.title,
                    icon: true,
                    basic: true,
                    onClick: function onClick() {
                      return _this2.props.onMutateTile(_this2.props.tile, {
                        '@type': tile.title,
                      });
                    },
                  },
                  _react['default'].createElement(_components.Icon, {
                    name: tile.icon,
                    size: '24px',
                  }),
                );
              }),
            ),
          );
        },
      },
    ]);

    return AddNewTile;
  })(_react.Component);
/**
 * Form container class.
 * @class Form
 * @extends Component
 */

_defineProperty(AddNewTile, 'propTypes', {
  onMutateTile: _propTypes['default'].func,
  tile: _propTypes['default'].string,
});

var Form =
  /*#__PURE__*/
  (function(_Component2) {
    _inherits(Form, _Component2);

    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */

    /**
     * Default properties.
     * @property {Object} defaultProps Default properties.
     * @static
     */

    /**
     * Constructor
     * @method constructor
     * @param {Object} props Component properties
     * @constructs Form
     */
    function Form(props) {
      var _this3;

      _classCallCheck(this, Form);

      _this3 = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Form).call(this, props),
      );

      _defineProperty(_assertThisInitialized(_this3), 'createNode', function() {
        var newNode = _this3.onAddTile('text', 0);

        return newNode;
      });

      _defineProperty(_assertThisInitialized(_this3), 'onChange', function(
        currentNode,
      ) {
        // this.setState({  });
        var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
          _this3.state.formData,
        );

        _this3.setState(
          {
            currentNode: currentNode,
            formData: _objectSpread(
              {},
              _this3.state.formData,
              _defineProperty(
                {},
                tilesLayoutFieldname,
                _objectSpread({}, _this3.state.formData[tilesLayoutFieldname], {
                  layout: currentNode,
                  layout_height: _this3.state.height,
                }),
              ),
            ),
          },
          function() {
            return console.log('State after onChange', _this3.state);
          },
        );
      });

      _defineProperty(_assertThisInitialized(_this3), 'onResize', function(
        event,
        _ref,
      ) {
        var element = _ref.element,
          size = _ref.size,
          handle = _ref.handle;
        var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
          _this3.state.formData,
        );

        _this3.setState({
          height: size.height,
          formData: _objectSpread(
            {},
            _this3.state.formData,
            _defineProperty(
              {},
              tilesLayoutFieldname,
              _objectSpread({}, _this3.state.formData[tilesLayoutFieldname], {
                layout_height: _this3.state.height,
              }),
            ),
          ),
        });
      });

      _defineProperty(_assertThisInitialized(_this3), 'getToolbar', function(
        tileid,
        onMutateTile,
      ) {
        var formData = _this3.state.formData;
        var tilesFieldname = (0, _helpers.getTilesFieldname)(formData);
        var tileType = _this3.state.formData[tilesFieldname][tileid]['@type'];

        var titlediv = _react['default'].createElement(
          'div',
          {
            className: 'mosaic-window-title',
          },
          'Tile: ',
          tileType,
        );

        return function(props, draggable) {
          return _react['default'].createElement(
            'div',
            {
              key: tileid,
              className: 'mosaic-window-toolbar',
              style: {
                width: '100%',
              },
            },
            titlediv,
            _react['default'].createElement(
              'div',
              {
                className: 'mosaic-window-controls',
              },
              _react['default'].createElement(
                _reactMosaicComponent.Separator,
                null,
              ),
              _react['default'].createElement(AddNewTile, {
                onMutateTile: onMutateTile,
                tile: tileid,
              }),
              _react['default'].createElement(
                _reactMosaicComponent.Separator,
                null,
              ),
              _react['default'].createElement(
                _reactMosaicComponent.SplitButton,
                null,
              ),
              _react['default'].createElement(
                _reactMosaicComponent.ExpandButton,
                null,
              ),
              _react['default'].createElement(
                _reactMosaicComponent.RemoveButton,
                null,
              ),
            ),
          );
        };
      });

      var ids = {
        title: (0, _uuid.v4)(),
        description: (0, _uuid.v4)(),
        text: (0, _uuid.v4)(),
      };
      var _formData = props.formData;

      var _tilesFieldname = (0, _helpers.getTilesFieldname)(_formData);

      var _tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
        _formData,
      );

      var defaultLayoutHeight =
        _formData[_tilesLayoutFieldname].layout_height || 500;

      if (_formData === null) {
        // get defaults from schema
        _formData = (0, _lodash.mapValues)(props.schema.properties, 'default');
      } // defaults for block editor; should be moved to schema on server side

      if (!_formData[_tilesLayoutFieldname]) {
        _formData[_tilesLayoutFieldname] = {
          items: [ids.title, ids.description, ids.text],
          layout: null,
          layout_height: defaultLayoutHeight,
        };
      }

      if (!_formData[_tilesFieldname]) {
        var _formData$_tilesField;

        _formData[_tilesFieldname] = ((_formData$_tilesField = {}),
        _defineProperty(_formData$_tilesField, ids.title, {
          '@type': 'title',
        }),
        _defineProperty(_formData$_tilesField, ids.description, {
          '@type': 'description',
        }),
        _defineProperty(_formData$_tilesField, ids.text, {
          '@type': 'text',
        }),
        _formData$_tilesField);
      }

      var _currentNode = _formData[_tilesLayoutFieldname].layout;
      _this3.state = {
        formData: _formData,
        errors: {},
        selected:
          _formData[_tilesLayoutFieldname].items.length > 0
            ? _formData[_tilesLayoutFieldname].items[0]
            : null,
        currentNode: _currentNode,
        height: defaultLayoutHeight,
      };
      _this3.onChangeField = _this3.onChangeField.bind(
        _assertThisInitialized(_this3),
      );
      _this3.onChangeTile = _this3.onChangeTile.bind(
        _assertThisInitialized(_this3),
      );
      _this3.onMutateTile = _this3.onMutateTile.bind(
        _assertThisInitialized(_this3),
      );
      _this3.onSelectTile = _this3.onSelectTile.bind(
        _assertThisInitialized(_this3),
      );
      _this3.onDeleteTile = _this3.onDeleteTile.bind(
        _assertThisInitialized(_this3),
      );
      _this3.onAddTile = _this3.onAddTile.bind(_assertThisInitialized(_this3));
      _this3.onSubmit = _this3.onSubmit.bind(_assertThisInitialized(_this3)); // this.onMoveTile = this.onMoveTile.bind(this);
      // this.onFocusPreviousTile = this.onFocusPreviousTile.bind(this);
      // this.onFocusNextTile = this.onFocusNextTile.bind(this);
      // this.handleKeyDown = this.handleKeyDown.bind(this);

      return _this3;
    }
    /**
     * Change field handler
     * @method onChangeField
     * @param {string} id Id of the field
     * @param {*} value Value of the field
     * @returns {undefined}
     */

    _createClass(Form, [
      {
        key: 'onChangeField',
        value: function onChangeField(id, value) {
          this.setState({
            formData: _objectSpread(
              {},
              this.state.formData,
              _defineProperty({}, id, value || null),
            ),
          });
        },
        /**
         * Change tile handler
         * @method onChangeTile
         * @param {string} id Id of the tile
         * @param {*} value Value of the field
         * @returns {undefined}
         */
      },
      {
        key: 'onChangeTile',
        value: function onChangeTile(id, value) {
          var tilesFieldname = (0, _helpers.getTilesFieldname)(
            this.state.formData,
          );
          this.setState({
            formData: _objectSpread(
              {},
              this.state.formData,
              _defineProperty(
                {},
                tilesFieldname,
                _objectSpread(
                  {},
                  this.state.formData[tilesFieldname],
                  _defineProperty({}, id, value || null),
                ),
              ),
            ),
          });
        },
        /**
         * Change tile handler
         * @method onMutateTile
         * @param {string} id Id of the tile
         * @param {*} value Value of the field
         * @returns {undefined}
         */
        // TODO: reimplement this
      },
      {
        key: 'onMutateTile',
        value: function onMutateTile(id, value) {
          var _objectSpread7,
            _objectSpread8,
            _this4 = this;

          var idTrailingTile = (0, _uuid.v4)();
          var tilesFieldname = (0, _helpers.getTilesFieldname)(
            this.state.formData,
          );
          var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
            this.state.formData,
          );
          var index =
            this.state.formData[tilesLayoutFieldname].items.indexOf(id) + 1;
          this.setState(
            {
              formData: _objectSpread(
                {},
                this.state.formData,
                ((_objectSpread8 = {}),
                _defineProperty(
                  _objectSpread8,
                  tilesFieldname,
                  _objectSpread(
                    {},
                    this.state.formData[tilesFieldname],
                    ((_objectSpread7 = {}),
                    _defineProperty(_objectSpread7, id, value || null),
                    _defineProperty(_objectSpread7, idTrailingTile, {
                      '@type': 'text',
                    }),
                    _objectSpread7),
                  ),
                ),
                _defineProperty(_objectSpread8, tilesLayoutFieldname, {
                  items: [].concat(
                    _toConsumableArray(
                      this.state.formData[tilesLayoutFieldname].items.slice(
                        0,
                        index,
                      ),
                    ),
                    [idTrailingTile],
                    _toConsumableArray(
                      this.state.formData[tilesLayoutFieldname].items.slice(
                        index,
                      ),
                    ),
                  ),
                  layout: this.state.currentNode,
                  layout_height: this.state.height,
                }),
                _objectSpread8),
              ),
            },
            function() {
              console.log('mutated state', _this4.state);
            },
          );
        },
        /**
         * Select tile handler
         * @method onSelectTile
         * @param {string} id Id of the field
         * @returns {undefined}
         */
      },
      {
        key: 'onSelectTile',
        value: function onSelectTile(id) {
          this.setState({
            selected: id,
          });
        },
        /**
         * Delete tile handler
         * @method onDeleteTile
         * @param {string} id Id of the field
         * @param {bool} selectPrev True if previous should be selected
         * @returns {undefined}
         */
      },
      {
        key: 'onDeleteTile',
        value: function onDeleteTile(id, selectPrev) {
          var _objectSpread9;

          var tilesFieldname = (0, _helpers.getTilesFieldname)(
            this.state.formData,
          );
          var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
            this.state.formData,
          );
          this.setState({
            formData: _objectSpread(
              {},
              this.state.formData,
              ((_objectSpread9 = {}),
              _defineProperty(_objectSpread9, tilesLayoutFieldname, {
                items: (0, _lodash.without)(
                  this.state.formData[tilesLayoutFieldname].items,
                  id,
                ),
                layout: this.state.currentNode,
                layout_height: this.state.height,
              }),
              _defineProperty(
                _objectSpread9,
                tilesFieldname,
                (0, _lodash.omit)(this.state.formData[tilesFieldname], [id]),
              ),
              _objectSpread9),
            ),
            selected: selectPrev
              ? this.state.formData[tilesLayoutFieldname].items[
                  this.state.formData[tilesLayoutFieldname].items.indexOf(id) -
                    1
                ]
              : null,
          });
        },
        /**
         * Add tile handler
         * @method onAddTile
         * @param {string} type Type of the tile
         * @param {Number} index Index where to add the tile
         * @returns {string} Id of the tile
         */
      },
      {
        key: 'onAddTile',
        value: function onAddTile(type, index) {
          var _objectSpread11;

          console.log('doing on add tile');
          var id = (0, _uuid.v4)();
          var tilesFieldname = (0, _helpers.getTilesFieldname)(
            this.state.formData,
          );
          var tilesLayoutFieldname = (0, _helpers.getTilesLayoutFieldname)(
            this.state.formData,
          );
          var totalItems = this.state.formData[tilesLayoutFieldname].items
            .length;
          var insert = index === -1 ? totalItems : index;
          var currentNode = this.state.currentNode;

          if (currentNode) {
            var path = (0, _reactMosaicComponent.getPathToCorner)(
              currentNode,
              _reactMosaicComponent.Corner.TOP_RIGHT,
            );
            var parent = (0, _reactMosaicComponent.getNodeAtPath)(
              currentNode,
              (0, _dropRight['default'])(path),
            );
            var destination = (0, _reactMosaicComponent.getNodeAtPath)(
              currentNode,
              path,
            );
            var direction = parent
              ? (0, _reactMosaicComponent.getOtherDirection)(parent.direction)
              : 'row';
            var first;
            var second;

            if (direction === 'row') {
              first = destination;
              second = id;
            } else {
              first = id;
              second = destination;
            }

            currentNode = (0, _reactMosaicComponent.updateTree)(currentNode, [
              {
                path: path,
                spec: {
                  $set: {
                    direction: direction,
                    first: first,
                    second: second,
                  },
                },
              },
            ]);
          } else {
            currentNode = id;
          }

          this.setState({
            formData: _objectSpread(
              {},
              this.state.formData,
              ((_objectSpread11 = {}),
              _defineProperty(_objectSpread11, tilesLayoutFieldname, {
                items: [].concat(
                  _toConsumableArray(
                    this.state.formData[tilesLayoutFieldname].items.slice(
                      0,
                      insert,
                    ),
                  ),
                  [id],
                  _toConsumableArray(
                    this.state.formData[tilesLayoutFieldname].items.slice(
                      insert,
                    ),
                  ),
                ),
                layout: currentNode,
                layout_height: this.state.height,
              }),
              _defineProperty(
                _objectSpread11,
                tilesFieldname,
                _objectSpread(
                  {},
                  this.state.formData[tilesFieldname],
                  _defineProperty({}, id, {
                    '@type': type,
                  }),
                ),
              ),
              _objectSpread11),
            ),
            selected: id,
          });
          return id;
        },
        /**
         * Submit handler
         * @method onSubmit
         * @param {Object} event Event object.
         * @returns {undefined}
         */
      },
      {
        key: 'onSubmit',
        value: function onSubmit(event) {
          var _this5 = this;

          if (event) {
            event.preventDefault();
          }

          var errors = {};
          (0, _lodash.map)(this.props.schema.fieldsets, function(fieldset) {
            return (0, _lodash.map)(fieldset.fields, function(fieldId) {
              var field = _this5.props.schema.properties[fieldId];
              var data = _this5.state.formData[fieldId];

              if (_this5.props.schema.required.indexOf(fieldId) !== -1) {
                if (field.type !== 'boolean' && !data) {
                  errors[fieldId] = errors[field] || [];
                  errors[fieldId].push(
                    _this5.props.intl.formatMessage(messages.required),
                  );
                }

                if (field.minLength && data.length < field.minLength) {
                  errors[fieldId] = errors[field] || [];
                  errors[fieldId].push(
                    _this5.props.intl.formatMessage(messages.minLength, {
                      len: field.minLength,
                    }),
                  );
                }
              }

              if (
                field.uniqueItems &&
                data &&
                (0, _lodash.uniq)(data).length !== data.length
              ) {
                errors[fieldId] = errors[field] || [];
                errors[fieldId].push(
                  _this5.props.intl.formatMessage(messages.uniqueItems),
                );
              }
            });
          });

          if ((0, _lodash.keys)(errors).length > 0) {
            this.setState({
              errors: errors,
            });
          } else {
            this.props.onSubmit(this.state.formData);

            if (this.props.resetAfterSubmit) {
              this.setState({
                formData: this.props.formData,
              });
            }
          }
        },
      },
      {
        key: 'renderEditTile',
        value: function renderEditTile(tileid) {
          var formData = this.state.formData; // destructuring

          var tilesFieldname = (0, _helpers.getTilesFieldname)(formData);
          var tilesDict = formData[tilesFieldname];
          var Tile = null;
          var type = tilesDict[tileid]['@type'];
          Tile = _config.tiles.defaultTilesEditMap[type];
          var data = tilesDict[tileid];

          var nop = function nop() {};

          return _react['default'].createElement(Tile, {
            id: tileid,
            tile: tileid,
            data: data,
            properties: formData,
            onAddTile: nop,
            onChangeTile: this.onChangeTile,
            onMutateTile: nop,
            onChangeField: nop,
            onDeleteTile: nop,
            onSelectTile: nop,
            onMoveTile: nop,
            onFocusPreviousTile: nop,
            onFocusNextTile: nop,
            selected: true,
            index: 0,
          });
        },
      },
      {
        key: 'render',

        /**
         * Render method.
         * @method render
         * @returns {string} Markup for the component.
         */
        value: function render() {
          var _this6 = this;

          var schema = this.props.schema; // , onCancel, onSubmit

          return _react['default'].createElement(
            'div',
            {
              className: 'ui wrapper',
            },
            _react['default'].createElement(
              _reactResizable.ResizableBox,
              {
                width: 200,
                height: this.state.height,
                minConstraints: [100, 100],
                onResize: this.onResize,
              },
              _react['default'].createElement(_reactMosaicComponent.Mosaic, {
                renderTile: function renderTile(tileid, path) {
                  return _react['default'].createElement(
                    _reactMosaicComponent.MosaicWindow, // <number>
                    {
                      title: 'Window',
                      createNode: _this6.createNode,
                      path: path,
                      onDragStart: function onDragStart() {
                        return console.log('MosaicWindow.onDragStart');
                      },
                      onDragEnd: function onDragEnd(type) {
                        return console.log('MosaicWindow.onDragEnd', type);
                      },
                      renderToolbar: _this6.getToolbar(
                        tileid,
                        _this6.onMutateTile,
                      ),
                      key: tileid,
                    },
                    _this6.renderEditTile(tileid),
                  );
                },
                zeroStateView: _react['default'].createElement(
                  _reactMosaicComponent.MosaicZeroState,
                  {
                    createNode: this.createNode,
                  },
                ),
                value: this.state.currentNode,
                onChange: this.onChange,
                onRelease: this.onRelease,
                className: THEMES[this.state.currentTheme],
              }),
            ),
            _react['default'].createElement(
              _reactPortal.Portal,
              {
                node: __CLIENT__ && document.getElementById('sidebar-metadata'),
              },
              _react['default'].createElement(
                _semanticUiReact.Form,
                {
                  method: 'post',
                  onSubmit: this.onSubmit,
                  error: (0, _lodash.keys)(this.state.errors).length > 0,
                },
                (0, _lodash.map)(schema.fieldsets, function(item) {
                  return [
                    _react['default'].createElement(
                      _react['default'].Fragment,
                      {
                        key: item,
                      },
                      _react['default'].createElement(
                        _semanticUiReact.Segment,
                        {
                          secondary: true,
                          attached: true,
                        },
                        item.title,
                      ),
                      ',',
                      _react['default'].createElement(
                        _semanticUiReact.Segment,
                        {
                          attached: true,
                        },
                        (0, _lodash.map)(item.fields, function(field, index) {
                          return _react['default'].createElement(
                            _components.Field,
                            _extends({}, schema.properties[field], {
                              id: field,
                              focus: index === 0,
                              value: _this6.state.formData[field],
                              required: schema.required.indexOf(field) !== -1,
                              onChange: _this6.onChangeField,
                              key: field,
                              error: _this6.state.errors[field],
                            }),
                          );
                        }),
                      ),
                      ',',
                    ),
                  ];
                }),
              ),
            ),
          );
        },
      },
    ]);

    return Form;
  })(_react.Component);

_defineProperty(Form, 'propTypes', {
  schema: _propTypes['default'].shape({
    fieldsets: _propTypes['default'].arrayOf(
      _propTypes['default'].shape({
        fields: _propTypes['default'].arrayOf(_propTypes['default'].string),
        id: _propTypes['default'].string,
        title: _propTypes['default'].string,
      }),
    ),
    properties: _propTypes['default'].objectOf(_propTypes['default'].any),
    definitions: _propTypes['default'].objectOf(_propTypes['default'].any),
    required: _propTypes['default'].arrayOf(_propTypes['default'].string),
  }).isRequired,
  formData: _propTypes['default'].objectOf(_propTypes['default'].any),
  pathname: _propTypes['default'].string,
  onSubmit: _propTypes['default'].func,
  onCancel: _propTypes['default'].func,
  submitLabel: _propTypes['default'].string,
  resetAfterSubmit: _propTypes['default'].bool,
  intl: _reactIntl.intlShape.isRequired,
  title: _propTypes['default'].string,
  error: _propTypes['default'].shape({
    message: _propTypes['default'].string,
  }),
  loading: _propTypes['default'].bool,
  hideActions: _propTypes['default'].bool,
  description: _propTypes['default'].string,
  visual: _propTypes['default'].bool,
  tiles: _propTypes['default'].arrayOf(_propTypes['default'].object),
});

_defineProperty(Form, 'defaultProps', {
  formData: null,
  onSubmit: null,
  onCancel: null,
  submitLabel: null,
  resetAfterSubmit: false,
  title: null,
  description: null,
  error: null,
  loading: null,
  hideActions: false,
  visual: false,
  tiles: [],
  pathname: '',
});

var _default = (0, _reactIntl.injectIntl)(Form, {
  withRef: true,
});

exports['default'] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hbmFnZS9Gb3JtLmpzeCJdLCJuYW1lcyI6WyJUSEVNRVMiLCJCbHVlcHJpbnQiLCJtZXNzYWdlcyIsImFkZFRpbGUiLCJpZCIsImRlZmF1bHRNZXNzYWdlIiwicmVxdWlyZWQiLCJtaW5MZW5ndGgiLCJ1bmlxdWVJdGVtcyIsInNhdmUiLCJjYW5jZWwiLCJlcnJvciIsInRoZXJlV2VyZVNvbWVFcnJvcnMiLCJBZGROZXdUaWxlIiwicHJvcHMiLCJhdmFpbGFibGVUaWxlcyIsInRpdGxlIiwiaWNvbiIsInRleHRTVkciLCJ2aWRlb1NWRyIsImNhbWVyYVNWRyIsInRpbGVzIiwiY3VzdG9tVGlsZXMiLCJzdGF0ZSIsIm1hcCIsInRpbGUiLCJvbk11dGF0ZVRpbGUiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwic3RyaW5nIiwiRm9ybSIsIm5ld05vZGUiLCJvbkFkZFRpbGUiLCJjdXJyZW50Tm9kZSIsInRpbGVzTGF5b3V0RmllbGRuYW1lIiwiZm9ybURhdGEiLCJzZXRTdGF0ZSIsImxheW91dCIsImxheW91dF9oZWlnaHQiLCJoZWlnaHQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnQiLCJlbGVtZW50Iiwic2l6ZSIsImhhbmRsZSIsInRpbGVpZCIsInRpbGVzRmllbGRuYW1lIiwidGlsZVR5cGUiLCJ0aXRsZWRpdiIsImRyYWdnYWJsZSIsIndpZHRoIiwiaWRzIiwiZGVzY3JpcHRpb24iLCJ0ZXh0IiwiZGVmYXVsdExheW91dEhlaWdodCIsInNjaGVtYSIsInByb3BlcnRpZXMiLCJpdGVtcyIsImVycm9ycyIsInNlbGVjdGVkIiwibGVuZ3RoIiwib25DaGFuZ2VGaWVsZCIsImJpbmQiLCJvbkNoYW5nZVRpbGUiLCJvblNlbGVjdFRpbGUiLCJvbkRlbGV0ZVRpbGUiLCJvblN1Ym1pdCIsInZhbHVlIiwiaWRUcmFpbGluZ1RpbGUiLCJpbmRleCIsImluZGV4T2YiLCJzbGljZSIsInNlbGVjdFByZXYiLCJ0eXBlIiwidG90YWxJdGVtcyIsImluc2VydCIsInBhdGgiLCJDb3JuZXIiLCJUT1BfUklHSFQiLCJwYXJlbnQiLCJkZXN0aW5hdGlvbiIsImRpcmVjdGlvbiIsImZpcnN0Iiwic2Vjb25kIiwic3BlYyIsIiRzZXQiLCJwcmV2ZW50RGVmYXVsdCIsImZpZWxkc2V0cyIsImZpZWxkc2V0IiwiZmllbGRzIiwiZmllbGRJZCIsImZpZWxkIiwiZGF0YSIsInB1c2giLCJpbnRsIiwiZm9ybWF0TWVzc2FnZSIsImxlbiIsInJlc2V0QWZ0ZXJTdWJtaXQiLCJ0aWxlc0RpY3QiLCJUaWxlIiwiZGVmYXVsdFRpbGVzRWRpdE1hcCIsIm5vcCIsIm9uUmVzaXplIiwiY3JlYXRlTm9kZSIsImdldFRvb2xiYXIiLCJyZW5kZXJFZGl0VGlsZSIsIm9uQ2hhbmdlIiwib25SZWxlYXNlIiwiY3VycmVudFRoZW1lIiwiX19DTElFTlRfXyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpdGVtIiwic2hhcGUiLCJhcnJheU9mIiwib2JqZWN0T2YiLCJhbnkiLCJkZWZpbml0aW9ucyIsImlzUmVxdWlyZWQiLCJwYXRobmFtZSIsIm9uQ2FuY2VsIiwic3VibWl0TGFiZWwiLCJib29sIiwiaW50bFNoYXBlIiwibWVzc2FnZSIsImxvYWRpbmciLCJoaWRlQWN0aW9ucyIsInZpc3VhbCIsIm9iamVjdCIsIndpdGhSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFFTyxJQUFNQSxNQUFNLEdBQUc7QUFDcEJDLEVBQUFBLFNBQVMsRUFBRTtBQURTLENBQWY7O0FBSVAsSUFBTUMsUUFBUSxHQUFHLCtCQUFlO0FBQzlCQyxFQUFBQSxPQUFP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QyxFQUFBQSxXQUFXLEVBQUUsS0FWTztBQVdwQkMsRUFBQUEsTUFBTSxFQUFFLEtBWFk7QUFZcEI1RyxFQUFBQSxLQUFLLEVBQUUsRUFaYTtBQWFwQm9HLEVBQUFBLFFBQVEsRUFBRTtBQWJVLEM7O2VBMmdCVCwyQkFBVzFGLElBQVgsRUFBaUI7QUFBRW9HLEVBQUFBLE9BQU8sRUFBRTtBQUFYLENBQWpCLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZvcm0gY29tcG9uZW50LlxuICogQG1vZHVsZSBjb21wb25lbnRzL21hbmFnZS9Gb3JtL0Zvcm1cbiAqL1xuXG4vLyBpbXBvcnQgeyBJY29uTmFtZXMgfSBmcm9tICdAYmx1ZXByaW50anMvaWNvbnMnO1xuLy8gaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG4vLyBpbXBvcnQgeyBDbGFzc2VzLCBIVE1MU2VsZWN0IH0gZnJvbSAnQGJsdWVwcmludGpzL2NvcmUnO1xuXG5pbXBvcnQgJ0BibHVlcHJpbnRqcy9jb3JlL2xpYi9jc3MvYmx1ZXByaW50LmNzcyc7XG5pbXBvcnQgJ0BibHVlcHJpbnRqcy9pY29ucy9saWIvY3NzL2JsdWVwcmludC1pY29ucy5jc3MnO1xuaW1wb3J0IGRyb3BSaWdodCBmcm9tICdsb2Rhc2gvZHJvcFJpZ2h0Jztcbi8vIGltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQge1xuICBDb3JuZXIsXG4gIC8vIGNyZWF0ZUJhbGFuY2VkVHJlZUZyb21MZWF2ZXMsXG4gIC8vIGdldExlYXZlcyxcbiAgZ2V0Tm9kZUF0UGF0aCxcbiAgZ2V0T3RoZXJEaXJlY3Rpb24sXG4gIGdldFBhdGhUb0Nvcm5lcixcbiAgTW9zYWljLFxuICAvLyBNb3NhaWNEaXJlY3Rpb24sXG4gIC8vIE1vc2FpY05vZGUsXG4gIC8vIE1vc2FpY1BhcmVudCxcbiAgTW9zYWljV2luZG93LFxuICBNb3NhaWNaZXJvU3RhdGUsXG4gIHVwZGF0ZVRyZWUsXG4gIFNwbGl0QnV0dG9uLFxuICBFeHBhbmRCdXR0b24sXG4gIFJlbW92ZUJ1dHRvbixcbiAgU2VwYXJhdG9yLFxufSBmcm9tICdyZWFjdC1tb3NhaWMtY29tcG9uZW50JztcblxuaW1wb3J0IHsgdGlsZXMgfSBmcm9tICd+L2NvbmZpZyc7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGtleXMsIG1hcCwgbWFwVmFsdWVzLCBvbWl0LCB1bmlxLCB3aXRob3V0IH0gZnJvbSAnbG9kYXNoJztcbi8vIGltcG9ydCBtb3ZlIGZyb20gJ2xvZGFzaC1tb3ZlJztcbmltcG9ydCB7XG4gIEJ1dHRvbixcbiAgRm9ybSBhcyBVaUZvcm0sXG4gIFNlZ21lbnQsXG4gIC8vIFRhYixcbiAgLy8gTWVzc2FnZSxcbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lTWVzc2FnZXMsIGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSAncmVhY3QtcG9ydGFsJztcblxuaW1wb3J0IHsgRmllbGQsIEljb24gfSBmcm9tICdAcGxvbmUvdm9sdG8vY29tcG9uZW50cyc7IC8vIEVkaXRUaWxlLFxuaW1wb3J0IHtcbiAgZ2V0VGlsZXNGaWVsZG5hbWUsXG4gIGdldFRpbGVzTGF5b3V0RmllbGRuYW1lLFxufSBmcm9tICdAcGxvbmUvdm9sdG8vaGVscGVycyc7XG5cbi8vIGltcG9ydCBhZGRTVkcgZnJvbSAnQHBsb25lL3ZvbHRvL2ljb25zL2NpcmNsZS1wbHVzLnN2Zyc7XG5pbXBvcnQgY2FtZXJhU1ZHIGZyb20gJ0BwbG9uZS92b2x0by9pY29ucy9jYW1lcmEuc3ZnJztcbmltcG9ydCB2aWRlb1NWRyBmcm9tICdAcGxvbmUvdm9sdG8vaWNvbnMvdmlkZW9jYW1lcmEuc3ZnJztcbmltcG9ydCB0ZXh0U1ZHIGZyb20gJ0BwbG9uZS92b2x0by9pY29ucy90ZXh0LnN2Zyc7XG5pbXBvcnQgeyBSZXNpemFibGUsIFJlc2l6YWJsZUJveCB9IGZyb20gJ3JlYWN0LXJlc2l6YWJsZSc7XG5pbXBvcnQgJ3JlYWN0LXJlc2l6YWJsZS9jc3Mvc3R5bGVzLmNzcyc7XG5cbi8vIGltcG9ydCBhaGVhZFNWRyBmcm9tICdAcGxvbmUvdm9sdG8vaWNvbnMvYWhlYWQuc3ZnJztcbi8vIGltcG9ydCBjbGVhclNWRyBmcm9tICdAcGxvbmUvdm9sdG8vaWNvbnMvY2xlYXIuc3ZnJztcblxuZXhwb3J0IGNvbnN0IFRIRU1FUyA9IHtcbiAgQmx1ZXByaW50OiAnbW9zYWljLWJsdWVwcmludC10aGVtZScsXG59O1xuXG5jb25zdCBtZXNzYWdlcyA9IGRlZmluZU1lc3NhZ2VzKHtcbiAgYWRkVGlsZToge1xuICAgIGlkOiAnQWRkIHRpbGUuLi4nLFxuICAgIGRlZmF1bHRNZXNzYWdlOiAnQWRkIHRpbGUuLi4nLFxuICB9LFxuICByZXF1aXJlZDoge1xuICAgIGlkOiAnUmVxdWlyZWQgaW5wdXQgaXMgbWlzc2luZy4nLFxuICAgIGRlZmF1bHRNZXNzYWdlOiAnUmVxdWlyZWQgaW5wdXQgaXMgbWlzc2luZy4nLFxuICB9LFxuICBtaW5MZW5ndGg6IHtcbiAgICBpZDogJ01pbmltdW0gbGVuZ3RoIGlzIHtsZW59LicsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdNaW5pbXVtIGxlbmd0aCBpcyB7bGVufS4nLFxuICB9LFxuICB1bmlxdWVJdGVtczoge1xuICAgIGlkOiAnSXRlbXMgbXVzdCBiZSB1bmlxdWUuJyxcbiAgICBkZWZhdWx0TWVzc2FnZTogJ0l0ZW1zIG11c3QgYmUgdW5pcXVlLicsXG4gIH0sXG4gIHNhdmU6IHtcbiAgICBpZDogJ1NhdmUnLFxuICAgIGRlZmF1bHRNZXNzYWdlOiAnU2F2ZScsXG4gIH0sXG4gIGNhbmNlbDoge1xuICAgIGlkOiAnQ2FuY2VsJyxcbiAgICBkZWZhdWx0TWVzc2FnZTogJ0NhbmNlbCcsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgaWQ6ICdFcnJvcicsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdFcnJvcicsXG4gIH0sXG4gIHRoZXJlV2VyZVNvbWVFcnJvcnM6IHtcbiAgICBpZDogJ1RoZXJlIHdlcmUgc29tZSBlcnJvcnMuJyxcbiAgICBkZWZhdWx0TWVzc2FnZTogJ1RoZXJlIHdlcmUgc29tZSBlcnJvcnMuJyxcbiAgfSxcbn0pO1xuXG5jbGFzcyBBZGROZXdUaWxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbk11dGF0ZVRpbGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgbGV0IGF2YWlsYWJsZVRpbGVzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ3RleHQnLFxuICAgICAgICBpY29uOiB0ZXh0U1ZHLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICd2aWRlbycsXG4gICAgICAgIGljb246IHZpZGVvU1ZHLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdpbWFnZScsXG4gICAgICAgIGljb246IGNhbWVyYVNWRyxcbiAgICAgIH0sXG4gICAgICAuLi50aWxlcy5jdXN0b21UaWxlcyxcbiAgICBdO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhdmFpbGFibGVUaWxlcyxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZC10aWxlIHRvb2xiYXJcIj5cbiAgICAgICAgPEJ1dHRvbi5Hcm91cD5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5hdmFpbGFibGVUaWxlcy5tYXAodGlsZSA9PiAoXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGtleT17dGlsZS50aXRsZX1cbiAgICAgICAgICAgICAgaWNvblxuICAgICAgICAgICAgICBiYXNpY1xuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25NdXRhdGVUaWxlKHRoaXMucHJvcHMudGlsZSwge1xuICAgICAgICAgICAgICAgICAgJ0B0eXBlJzogdGlsZS50aXRsZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJY29uIG5hbWU9e3RpbGUuaWNvbn0gc2l6ZT1cIjI0cHhcIiAvPlxuICAgICAgICAgICAgICB7LyogPHNwYW4+e3RpbGUudGl0bGV9PC9zcGFuPiAqL31cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0J1dHRvbi5Hcm91cD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBGb3JtIGNvbnRhaW5lciBjbGFzcy5cbiAqIEBjbGFzcyBGb3JtXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0eXBlcy5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IHByb3BUeXBlcyBQcm9wZXJ0eSB0eXBlcy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBmaWVsZHNldHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHByb3BlcnRpZXM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KSxcbiAgICAgIGRlZmluaXRpb25zOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSksXG4gICAgICByZXF1aXJlZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLFxuICAgIHBhdGhuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU3VibWl0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3VibWl0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVzZXRBZnRlclN1Ym1pdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW50bDogaW50bFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pLFxuICAgIGxvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGhpZGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2aXN1YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgfTtcblxuICAvKipcbiAgICogRGVmYXVsdCBwcm9wZXJ0aWVzLlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gZGVmYXVsdFByb3BzIERlZmF1bHQgcHJvcGVydGllcy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBmb3JtRGF0YTogbnVsbCxcbiAgICBvblN1Ym1pdDogbnVsbCxcbiAgICBvbkNhbmNlbDogbnVsbCxcbiAgICBzdWJtaXRMYWJlbDogbnVsbCxcbiAgICByZXNldEFmdGVyU3VibWl0OiBmYWxzZSxcbiAgICB0aXRsZTogbnVsbCxcbiAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBsb2FkaW5nOiBudWxsLFxuICAgIGhpZGVBY3Rpb25zOiBmYWxzZSxcbiAgICB2aXN1YWw6IGZhbHNlLFxuICAgIHRpbGVzOiBbXSxcbiAgICBwYXRobmFtZTogJycsXG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIENvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBjb25zdHJ1Y3RzIEZvcm1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IGlkcyA9IHtcbiAgICAgIHRpdGxlOiB1dWlkKCksXG4gICAgICBkZXNjcmlwdGlvbjogdXVpZCgpLFxuICAgICAgdGV4dDogdXVpZCgpLFxuICAgIH07XG4gICAgbGV0IHsgZm9ybURhdGEgfSA9IHByb3BzO1xuICAgIGNvbnN0IHRpbGVzRmllbGRuYW1lID0gZ2V0VGlsZXNGaWVsZG5hbWUoZm9ybURhdGEpO1xuICAgIGNvbnN0IHRpbGVzTGF5b3V0RmllbGRuYW1lID0gZ2V0VGlsZXNMYXlvdXRGaWVsZG5hbWUoZm9ybURhdGEpO1xuXG4gICAgbGV0IGRlZmF1bHRMYXlvdXRIZWlnaHQgPVxuICAgICAgZm9ybURhdGFbdGlsZXNMYXlvdXRGaWVsZG5hbWVdLmxheW91dF9oZWlnaHQgfHwgNTAwO1xuXG4gICAgaWYgKGZvcm1EYXRhID09PSBudWxsKSB7XG4gICAgICAvLyBnZXQgZGVmYXVsdHMgZnJvbSBzY2hlbWFcbiAgICAgIGZvcm1EYXRhID0gbWFwVmFsdWVzKHByb3BzLnNjaGVtYS5wcm9wZXJ0aWVzLCAnZGVmYXVsdCcpO1xuICAgIH1cbiAgICAvLyBkZWZhdWx0cyBmb3IgYmxvY2sgZWRpdG9yOyBzaG91bGQgYmUgbW92ZWQgdG8gc2NoZW1hIG9uIHNlcnZlciBzaWRlXG4gICAgaWYgKCFmb3JtRGF0YVt0aWxlc0xheW91dEZpZWxkbmFtZV0pIHtcbiAgICAgIGZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXSA9IHtcbiAgICAgICAgaXRlbXM6IFtpZHMudGl0bGUsIGlkcy5kZXNjcmlwdGlvbiwgaWRzLnRleHRdLFxuICAgICAgICBsYXlvdXQ6IG51bGwsXG4gICAgICAgIGxheW91dF9oZWlnaHQ6IGRlZmF1bHRMYXlvdXRIZWlnaHQsXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIWZvcm1EYXRhW3RpbGVzRmllbGRuYW1lXSkge1xuICAgICAgZm9ybURhdGFbdGlsZXNGaWVsZG5hbWVdID0ge1xuICAgICAgICBbaWRzLnRpdGxlXToge1xuICAgICAgICAgICdAdHlwZSc6ICd0aXRsZScsXG4gICAgICAgIH0sXG4gICAgICAgIFtpZHMuZGVzY3JpcHRpb25dOiB7XG4gICAgICAgICAgJ0B0eXBlJzogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgfSxcbiAgICAgICAgW2lkcy50ZXh0XToge1xuICAgICAgICAgICdAdHlwZSc6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnROb2RlID0gZm9ybURhdGFbdGlsZXNMYXlvdXRGaWVsZG5hbWVdLmxheW91dDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGVycm9yczoge30sXG4gICAgICBzZWxlY3RlZDpcbiAgICAgICAgZm9ybURhdGFbdGlsZXNMYXlvdXRGaWVsZG5hbWVdLml0ZW1zLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IGZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXS5pdGVtc1swXVxuICAgICAgICAgIDogbnVsbCxcbiAgICAgIGN1cnJlbnROb2RlLFxuICAgICAgaGVpZ2h0OiBkZWZhdWx0TGF5b3V0SGVpZ2h0LFxuICAgIH07XG4gICAgdGhpcy5vbkNoYW5nZUZpZWxkID0gdGhpcy5vbkNoYW5nZUZpZWxkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNoYW5nZVRpbGUgPSB0aGlzLm9uQ2hhbmdlVGlsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25NdXRhdGVUaWxlID0gdGhpcy5vbk11dGF0ZVRpbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU2VsZWN0VGlsZSA9IHRoaXMub25TZWxlY3RUaWxlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkRlbGV0ZVRpbGUgPSB0aGlzLm9uRGVsZXRlVGlsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25BZGRUaWxlID0gdGhpcy5vbkFkZFRpbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpO1xuXG4gICAgLy8gdGhpcy5vbk1vdmVUaWxlID0gdGhpcy5vbk1vdmVUaWxlLmJpbmQodGhpcyk7XG4gICAgLy8gdGhpcy5vbkZvY3VzUHJldmlvdXNUaWxlID0gdGhpcy5vbkZvY3VzUHJldmlvdXNUaWxlLmJpbmQodGhpcyk7XG4gICAgLy8gdGhpcy5vbkZvY3VzTmV4dFRpbGUgPSB0aGlzLm9uRm9jdXNOZXh0VGlsZS5iaW5kKHRoaXMpO1xuICAgIC8vIHRoaXMuaGFuZGxlS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBmaWVsZCBoYW5kbGVyXG4gICAqIEBtZXRob2Qgb25DaGFuZ2VGaWVsZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSWQgb2YgdGhlIGZpZWxkXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgb2YgdGhlIGZpZWxkXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBvbkNoYW5nZUZpZWxkKGlkLCB2YWx1ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5mb3JtRGF0YSxcbiAgICAgICAgW2lkXTogdmFsdWUgfHwgbnVsbCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRpbGUgaGFuZGxlclxuICAgKiBAbWV0aG9kIG9uQ2hhbmdlVGlsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSWQgb2YgdGhlIHRpbGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSBvZiB0aGUgZmllbGRcbiAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICovXG4gIG9uQ2hhbmdlVGlsZShpZCwgdmFsdWUpIHtcbiAgICBjb25zdCB0aWxlc0ZpZWxkbmFtZSA9IGdldFRpbGVzRmllbGRuYW1lKHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5mb3JtRGF0YSxcbiAgICAgICAgW3RpbGVzRmllbGRuYW1lXToge1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUuZm9ybURhdGFbdGlsZXNGaWVsZG5hbWVdLFxuICAgICAgICAgIFtpZF06IHZhbHVlIHx8IG51bGwsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aWxlIGhhbmRsZXJcbiAgICogQG1ldGhvZCBvbk11dGF0ZVRpbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElkIG9mIHRoZSB0aWxlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgb2YgdGhlIGZpZWxkXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICAvLyBUT0RPOiByZWltcGxlbWVudCB0aGlzXG4gIG9uTXV0YXRlVGlsZShpZCwgdmFsdWUpIHtcbiAgICBjb25zdCBpZFRyYWlsaW5nVGlsZSA9IHV1aWQoKTtcbiAgICBjb25zdCB0aWxlc0ZpZWxkbmFtZSA9IGdldFRpbGVzRmllbGRuYW1lKHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuICAgIGNvbnN0IHRpbGVzTGF5b3V0RmllbGRuYW1lID0gZ2V0VGlsZXNMYXlvdXRGaWVsZG5hbWUodGhpcy5zdGF0ZS5mb3JtRGF0YSk7XG4gICAgY29uc3QgaW5kZXggPVxuICAgICAgdGhpcy5zdGF0ZS5mb3JtRGF0YVt0aWxlc0xheW91dEZpZWxkbmFtZV0uaXRlbXMuaW5kZXhPZihpZCkgKyAxO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLmZvcm1EYXRhLFxuICAgICAgICAgIFt0aWxlc0ZpZWxkbmFtZV06IHtcbiAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUuZm9ybURhdGFbdGlsZXNGaWVsZG5hbWVdLFxuICAgICAgICAgICAgW2lkXTogdmFsdWUgfHwgbnVsbCxcbiAgICAgICAgICAgIFtpZFRyYWlsaW5nVGlsZV06IHtcbiAgICAgICAgICAgICAgJ0B0eXBlJzogJ3RleHQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt0aWxlc0xheW91dEZpZWxkbmFtZV06IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUuZm9ybURhdGFbdGlsZXNMYXlvdXRGaWVsZG5hbWVdLml0ZW1zLnNsaWNlKFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGlkVHJhaWxpbmdUaWxlLFxuICAgICAgICAgICAgICAuLi50aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXS5pdGVtcy5zbGljZShpbmRleCksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnN0YXRlLmN1cnJlbnROb2RlLFxuICAgICAgICAgICAgbGF5b3V0X2hlaWdodDogdGhpcy5zdGF0ZS5oZWlnaHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtdXRhdGVkIHN0YXRlJywgdGhpcy5zdGF0ZSk7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRpbGUgaGFuZGxlclxuICAgKiBAbWV0aG9kIG9uU2VsZWN0VGlsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSWQgb2YgdGhlIGZpZWxkXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBvblNlbGVjdFRpbGUoaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkOiBpZCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdGlsZSBoYW5kbGVyXG4gICAqIEBtZXRob2Qgb25EZWxldGVUaWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJZCBvZiB0aGUgZmllbGRcbiAgICogQHBhcmFtIHtib29sfSBzZWxlY3RQcmV2IFRydWUgaWYgcHJldmlvdXMgc2hvdWxkIGJlIHNlbGVjdGVkXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBvbkRlbGV0ZVRpbGUoaWQsIHNlbGVjdFByZXYpIHtcbiAgICBjb25zdCB0aWxlc0ZpZWxkbmFtZSA9IGdldFRpbGVzRmllbGRuYW1lKHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuICAgIGNvbnN0IHRpbGVzTGF5b3V0RmllbGRuYW1lID0gZ2V0VGlsZXNMYXlvdXRGaWVsZG5hbWUodGhpcy5zdGF0ZS5mb3JtRGF0YSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUuZm9ybURhdGEsXG4gICAgICAgIFt0aWxlc0xheW91dEZpZWxkbmFtZV06IHtcbiAgICAgICAgICBpdGVtczogd2l0aG91dCh0aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXS5pdGVtcywgaWQpLFxuICAgICAgICAgIGxheW91dDogdGhpcy5zdGF0ZS5jdXJyZW50Tm9kZSxcbiAgICAgICAgICBsYXlvdXRfaGVpZ2h0OiB0aGlzLnN0YXRlLmhlaWdodCxcbiAgICAgICAgfSxcbiAgICAgICAgW3RpbGVzRmllbGRuYW1lXTogb21pdCh0aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzRmllbGRuYW1lXSwgW2lkXSksXG4gICAgICB9LFxuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdFByZXZcbiAgICAgICAgPyB0aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXS5pdGVtc1tcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZm9ybURhdGFbdGlsZXNMYXlvdXRGaWVsZG5hbWVdLml0ZW1zLmluZGV4T2YoaWQpIC0gMVxuICAgICAgICAgIF1cbiAgICAgICAgOiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aWxlIGhhbmRsZXJcbiAgICogQG1ldGhvZCBvbkFkZFRpbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgdGlsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggSW5kZXggd2hlcmUgdG8gYWRkIHRoZSB0aWxlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IElkIG9mIHRoZSB0aWxlXG4gICAqL1xuICBvbkFkZFRpbGUodHlwZSwgaW5kZXgpIHtcbiAgICBjb25zb2xlLmxvZygnZG9pbmcgb24gYWRkIHRpbGUnKTtcblxuICAgIGNvbnN0IGlkID0gdXVpZCgpO1xuICAgIGNvbnN0IHRpbGVzRmllbGRuYW1lID0gZ2V0VGlsZXNGaWVsZG5hbWUodGhpcy5zdGF0ZS5mb3JtRGF0YSk7XG4gICAgY29uc3QgdGlsZXNMYXlvdXRGaWVsZG5hbWUgPSBnZXRUaWxlc0xheW91dEZpZWxkbmFtZSh0aGlzLnN0YXRlLmZvcm1EYXRhKTtcbiAgICBjb25zdCB0b3RhbEl0ZW1zID0gdGhpcy5zdGF0ZS5mb3JtRGF0YVt0aWxlc0xheW91dEZpZWxkbmFtZV0uaXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IGluc2VydCA9IGluZGV4ID09PSAtMSA/IHRvdGFsSXRlbXMgOiBpbmRleDtcblxuICAgIGxldCB7IGN1cnJlbnROb2RlIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKGN1cnJlbnROb2RlKSB7XG4gICAgICBjb25zdCBwYXRoID0gZ2V0UGF0aFRvQ29ybmVyKGN1cnJlbnROb2RlLCBDb3JuZXIuVE9QX1JJR0hUKTtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldE5vZGVBdFBhdGgoY3VycmVudE5vZGUsIGRyb3BSaWdodChwYXRoKSk7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGdldE5vZGVBdFBhdGgoY3VycmVudE5vZGUsIHBhdGgpO1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gcGFyZW50ID8gZ2V0T3RoZXJEaXJlY3Rpb24ocGFyZW50LmRpcmVjdGlvbikgOiAncm93JztcblxuICAgICAgbGV0IGZpcnN0O1xuICAgICAgbGV0IHNlY29uZDtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdyb3cnKSB7XG4gICAgICAgIGZpcnN0ID0gZGVzdGluYXRpb247XG4gICAgICAgIHNlY29uZCA9IGlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlyc3QgPSBpZDtcbiAgICAgICAgc2Vjb25kID0gZGVzdGluYXRpb247XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnROb2RlID0gdXBkYXRlVHJlZShjdXJyZW50Tm9kZSwgW1xuICAgICAgICB7XG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBzcGVjOiB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICAgICAgZmlyc3QsXG4gICAgICAgICAgICAgIHNlY29uZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50Tm9kZSA9IGlkO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5mb3JtRGF0YSxcbiAgICAgICAgW3RpbGVzTGF5b3V0RmllbGRuYW1lXToge1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAuLi50aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXS5pdGVtcy5zbGljZSgwLCBpbnNlcnQpLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAuLi50aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXS5pdGVtcy5zbGljZShpbnNlcnQpLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgbGF5b3V0OiBjdXJyZW50Tm9kZSxcbiAgICAgICAgICBsYXlvdXRfaGVpZ2h0OiB0aGlzLnN0YXRlLmhlaWdodCxcbiAgICAgICAgfSxcbiAgICAgICAgW3RpbGVzRmllbGRuYW1lXToge1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUuZm9ybURhdGFbdGlsZXNGaWVsZG5hbWVdLFxuICAgICAgICAgIFtpZF06IHtcbiAgICAgICAgICAgICdAdHlwZSc6IHR5cGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBzZWxlY3RlZDogaWQsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogU3VibWl0IGhhbmRsZXJcbiAgICogQG1ldGhvZCBvblN1Ym1pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgRXZlbnQgb2JqZWN0LlxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgb25TdWJtaXQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgZXJyb3JzID0ge307XG4gICAgbWFwKHRoaXMucHJvcHMuc2NoZW1hLmZpZWxkc2V0cywgZmllbGRzZXQgPT5cbiAgICAgIG1hcChmaWVsZHNldC5maWVsZHMsIGZpZWxkSWQgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucHJvcHMuc2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF07XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0YXRlLmZvcm1EYXRhW2ZpZWxkSWRdO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zY2hlbWEucmVxdWlyZWQuaW5kZXhPZihmaWVsZElkKSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoZmllbGQudHlwZSAhPT0gJ2Jvb2xlYW4nICYmICFkYXRhKSB7XG4gICAgICAgICAgICBlcnJvcnNbZmllbGRJZF0gPSBlcnJvcnNbZmllbGRdIHx8IFtdO1xuICAgICAgICAgICAgZXJyb3JzW2ZpZWxkSWRdLnB1c2goXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKG1lc3NhZ2VzLnJlcXVpcmVkKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaWVsZC5taW5MZW5ndGggJiYgZGF0YS5sZW5ndGggPCBmaWVsZC5taW5MZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9yc1tmaWVsZElkXSA9IGVycm9yc1tmaWVsZF0gfHwgW107XG4gICAgICAgICAgICBlcnJvcnNbZmllbGRJZF0ucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UobWVzc2FnZXMubWluTGVuZ3RoLCB7XG4gICAgICAgICAgICAgICAgbGVuOiBmaWVsZC5taW5MZW5ndGgsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLnVuaXF1ZUl0ZW1zICYmIGRhdGEgJiYgdW5pcShkYXRhKS5sZW5ndGggIT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgZXJyb3JzW2ZpZWxkSWRdID0gZXJyb3JzW2ZpZWxkXSB8fCBbXTtcbiAgICAgICAgICBlcnJvcnNbZmllbGRJZF0ucHVzaChcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKG1lc3NhZ2VzLnVuaXF1ZUl0ZW1zKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICAgIGlmIChrZXlzKGVycm9ycykubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGVycm9ycyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uU3VibWl0KHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuICAgICAgaWYgKHRoaXMucHJvcHMucmVzZXRBZnRlclN1Ym1pdCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBmb3JtRGF0YTogdGhpcy5wcm9wcy5mb3JtRGF0YSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyRWRpdFRpbGUodGlsZWlkKSB7XG4gICAgY29uc3QgeyBmb3JtRGF0YSB9ID0gdGhpcy5zdGF0ZTsgLy8gZGVzdHJ1Y3R1cmluZ1xuICAgIGNvbnN0IHRpbGVzRmllbGRuYW1lID0gZ2V0VGlsZXNGaWVsZG5hbWUoZm9ybURhdGEpO1xuICAgIGNvbnN0IHRpbGVzRGljdCA9IGZvcm1EYXRhW3RpbGVzRmllbGRuYW1lXTtcblxuICAgIGxldCBUaWxlID0gbnVsbDtcbiAgICBsZXQgdHlwZSA9IHRpbGVzRGljdFt0aWxlaWRdWydAdHlwZSddO1xuICAgIFRpbGUgPSB0aWxlcy5kZWZhdWx0VGlsZXNFZGl0TWFwW3R5cGVdO1xuXG4gICAgbGV0IGRhdGEgPSB0aWxlc0RpY3RbdGlsZWlkXTtcblxuICAgIGxldCBub3AgPSAoKSA9PiB7fTtcblxuICAgIHJldHVybiAoXG4gICAgICA8VGlsZVxuICAgICAgICBpZD17dGlsZWlkfVxuICAgICAgICB0aWxlPXt0aWxlaWR9XG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIHByb3BlcnRpZXM9e2Zvcm1EYXRhfVxuICAgICAgICBvbkFkZFRpbGU9e25vcH1cbiAgICAgICAgb25DaGFuZ2VUaWxlPXt0aGlzLm9uQ2hhbmdlVGlsZX1cbiAgICAgICAgb25NdXRhdGVUaWxlPXtub3B9XG4gICAgICAgIG9uQ2hhbmdlRmllbGQ9e25vcH1cbiAgICAgICAgb25EZWxldGVUaWxlPXtub3B9XG4gICAgICAgIG9uU2VsZWN0VGlsZT17bm9wfVxuICAgICAgICBvbk1vdmVUaWxlPXtub3B9XG4gICAgICAgIG9uRm9jdXNQcmV2aW91c1RpbGU9e25vcH1cbiAgICAgICAgb25Gb2N1c05leHRUaWxlPXtub3B9XG4gICAgICAgIHNlbGVjdGVkPXt0cnVlfVxuICAgICAgICBpbmRleD17MH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZU5vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3Tm9kZSA9IHRoaXMub25BZGRUaWxlKCd0ZXh0JywgMCk7XG4gICAgcmV0dXJuIG5ld05vZGU7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSBjdXJyZW50Tm9kZSA9PiB7XG4gICAgLy8gdGhpcy5zZXRTdGF0ZSh7ICB9KTtcbiAgICBjb25zdCB0aWxlc0xheW91dEZpZWxkbmFtZSA9IGdldFRpbGVzTGF5b3V0RmllbGRuYW1lKHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgY3VycmVudE5vZGUsXG4gICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZS5mb3JtRGF0YSxcbiAgICAgICAgICBbdGlsZXNMYXlvdXRGaWVsZG5hbWVdOiB7XG4gICAgICAgICAgICAuLi50aGlzLnN0YXRlLmZvcm1EYXRhW3RpbGVzTGF5b3V0RmllbGRuYW1lXSxcbiAgICAgICAgICAgIGxheW91dDogY3VycmVudE5vZGUsXG4gICAgICAgICAgICBsYXlvdXRfaGVpZ2h0OiB0aGlzLnN0YXRlLmhlaWdodCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgICgpID0+IGNvbnNvbGUubG9nKCdTdGF0ZSBhZnRlciBvbkNoYW5nZScsIHRoaXMuc3RhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgLy8gYWRkaXRpb25hbENvbnRyb2xzID0gKHRpbGUsIG9uTXV0YXRlVGlsZSkgPT4gW1xuICAvLyAgIDxBZGROZXdUaWxlIG9uTXV0YXRlVGlsZT17b25NdXRhdGVUaWxlfSB0aWxlPXt0aWxlfSAvPixcbiAgLy8gXTtcblxuICBvblJlc2l6ZSA9IChldmVudCwgeyBlbGVtZW50LCBzaXplLCBoYW5kbGUgfSkgPT4ge1xuICAgIGNvbnN0IHRpbGVzTGF5b3V0RmllbGRuYW1lID0gZ2V0VGlsZXNMYXlvdXRGaWVsZG5hbWUodGhpcy5zdGF0ZS5mb3JtRGF0YSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHQsXG4gICAgICBmb3JtRGF0YToge1xuICAgICAgICAuLi50aGlzLnN0YXRlLmZvcm1EYXRhLFxuICAgICAgICBbdGlsZXNMYXlvdXRGaWVsZG5hbWVdOiB7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZS5mb3JtRGF0YVt0aWxlc0xheW91dEZpZWxkbmFtZV0sXG4gICAgICAgICAgbGF5b3V0X2hlaWdodDogdGhpcy5zdGF0ZS5oZWlnaHQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIGdldFRvb2xiYXIgPSAodGlsZWlkLCBvbk11dGF0ZVRpbGUpID0+IHtcbiAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHRpbGVzRmllbGRuYW1lID0gZ2V0VGlsZXNGaWVsZG5hbWUoZm9ybURhdGEpO1xuICAgIGNvbnN0IHRpbGVUeXBlID0gdGhpcy5zdGF0ZS5mb3JtRGF0YVt0aWxlc0ZpZWxkbmFtZV1bdGlsZWlkXVsnQHR5cGUnXTtcblxuICAgIGxldCB0aXRsZWRpdiA9IDxkaXYgY2xhc3NOYW1lPVwibW9zYWljLXdpbmRvdy10aXRsZVwiPlRpbGU6IHt0aWxlVHlwZX08L2Rpdj47XG5cbiAgICByZXR1cm4gKHByb3BzLCBkcmFnZ2FibGUpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e3RpbGVpZH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb3NhaWMtd2luZG93LXRvb2xiYXJcIlxuICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aXRsZWRpdn1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vc2FpYy13aW5kb3ctY29udHJvbHNcIj5cbiAgICAgICAgICAgIDxTZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxBZGROZXdUaWxlIG9uTXV0YXRlVGlsZT17b25NdXRhdGVUaWxlfSB0aWxlPXt0aWxlaWR9IC8+XG4gICAgICAgICAgICA8U2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8U3BsaXRCdXR0b24gLz5cbiAgICAgICAgICAgIDxFeHBhbmRCdXR0b24gLz5cbiAgICAgICAgICAgIDxSZW1vdmVCdXR0b24gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlciBtZXRob2QuXG4gICAqIEBtZXRob2QgcmVuZGVyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IE1hcmt1cCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNjaGVtYSB9ID0gdGhpcy5wcm9wczsgLy8gLCBvbkNhbmNlbCwgb25TdWJtaXRcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInVpIHdyYXBwZXJcIj5cbiAgICAgICAgPFJlc2l6YWJsZUJveFxuICAgICAgICAgIHdpZHRoPXsyMDB9XG4gICAgICAgICAgaGVpZ2h0PXt0aGlzLnN0YXRlLmhlaWdodH1cbiAgICAgICAgICBtaW5Db25zdHJhaW50cz17WzEwMCwgMTAwXX1cbiAgICAgICAgICBvblJlc2l6ZT17dGhpcy5vblJlc2l6ZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxNb3NhaWNcbiAgICAgICAgICAgIHJlbmRlclRpbGU9eyh0aWxlaWQsIHBhdGgpID0+IChcbiAgICAgICAgICAgICAgPE1vc2FpY1dpbmRvd1xuICAgICAgICAgICAgICAgIC8vIDxudW1iZXI+XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJXaW5kb3dcIlxuICAgICAgICAgICAgICAgIGNyZWF0ZU5vZGU9e3RoaXMuY3JlYXRlTm9kZX1cbiAgICAgICAgICAgICAgICBwYXRoPXtwYXRofVxuICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoKSA9PiBjb25zb2xlLmxvZygnTW9zYWljV2luZG93Lm9uRHJhZ1N0YXJ0Jyl9XG4gICAgICAgICAgICAgICAgb25EcmFnRW5kPXt0eXBlID0+IGNvbnNvbGUubG9nKCdNb3NhaWNXaW5kb3cub25EcmFnRW5kJywgdHlwZSl9XG4gICAgICAgICAgICAgICAgcmVuZGVyVG9vbGJhcj17dGhpcy5nZXRUb29sYmFyKHRpbGVpZCwgdGhpcy5vbk11dGF0ZVRpbGUpfVxuICAgICAgICAgICAgICAgIGtleT17dGlsZWlkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRWRpdFRpbGUodGlsZWlkKX1cbiAgICAgICAgICAgICAgPC9Nb3NhaWNXaW5kb3c+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgemVyb1N0YXRlVmlldz17PE1vc2FpY1plcm9TdGF0ZSBjcmVhdGVOb2RlPXt0aGlzLmNyZWF0ZU5vZGV9IC8+fVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY3VycmVudE5vZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgIG9uUmVsZWFzZT17dGhpcy5vblJlbGVhc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9e1RIRU1FU1t0aGlzLnN0YXRlLmN1cnJlbnRUaGVtZV19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9SZXNpemFibGVCb3g+XG5cbiAgICAgICAgPFBvcnRhbFxuICAgICAgICAgIG5vZGU9e19fQ0xJRU5UX18gJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXItbWV0YWRhdGEnKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxVaUZvcm1cbiAgICAgICAgICAgIG1ldGhvZD1cInBvc3RcIlxuICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9XG4gICAgICAgICAgICBlcnJvcj17a2V5cyh0aGlzLnN0YXRlLmVycm9ycykubGVuZ3RoID4gMH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bWFwKHNjaGVtYS5maWVsZHNldHMsIGl0ZW0gPT4gW1xuICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpdGVtfT5cbiAgICAgICAgICAgICAgICA8U2VnbWVudCBzZWNvbmRhcnkgYXR0YWNoZWQ+XG4gICAgICAgICAgICAgICAgICB7aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICA8L1NlZ21lbnQ+XG4gICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgIDxTZWdtZW50IGF0dGFjaGVkPlxuICAgICAgICAgICAgICAgICAge21hcChpdGVtLmZpZWxkcywgKGZpZWxkLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8RmllbGRcbiAgICAgICAgICAgICAgICAgICAgICB7Li4uc2NoZW1hLnByb3BlcnRpZXNbZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgIGlkPXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICBmb2N1cz17aW5kZXggPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZm9ybURhdGFbZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkPXtzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihmaWVsZCkgIT09IC0xfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlRmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcj17dGhpcy5zdGF0ZS5lcnJvcnNbZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9TZWdtZW50PlxuICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD4sXG4gICAgICAgICAgICBdKX1cbiAgICAgICAgICA8L1VpRm9ybT5cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluamVjdEludGwoRm9ybSwgeyB3aXRoUmVmOiB0cnVlIH0pO1xuIl19
