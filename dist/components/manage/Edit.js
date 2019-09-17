"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactIntl = require("react-intl");

var _reactPortal = require("react-portal");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _queryString = _interopRequireDefault(require("query-string"));

var _Form = _interopRequireDefault(require("./Form"));

var _components = require("@plone/volto/components");

var _actions = require("@plone/volto/actions");

var _helpers = require("@plone/volto/helpers");

var _save = _interopRequireDefault(require("@plone/volto/icons/save.svg"));

var _clear = _interopRequireDefault(require("@plone/volto/icons/clear.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var messages = (0, _reactIntl.defineMessages)({
  edit: {
    id: 'Edit {title}',
    defaultMessage: 'Edit {title}'
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save'
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel'
  }
});
/**
 * Edit class.
 * @class Edit
 * @extends Component
 */

var Edit =
/*#__PURE__*/
function (_Component) {
  _inherits(Edit, _Component);

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs EditComponent
   */
  function Edit(props) {
    var _this;

    _classCallCheck(this, Edit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Edit).call(this, props));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */


  _createClass(Edit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.getContent((0, _helpers.getBaseUrl)(this.props.pathname));
    }
    /**
     * Component will receive props
     * @method componentWillReceiveProps
     * @param {Object} nextProps Next properties
     * @returns {undefined}
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.getRequest.loading && nextProps.getRequest.loaded) {
        this.props.getSchema(nextProps.content['@type']);
      }

      if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
        this.props.history.push(this.props.returnUrl || (0, _helpers.getBaseUrl)(this.props.pathname));
      }
    }
    /**
     * Submit handler
     * @method onSubmit
     * @param {object} data Form data.
     * @returns {undefined}
     */

  }, {
    key: "onSubmit",
    value: function onSubmit(data) {
      console.log('submit data', data);
      this.props.updateContent((0, _helpers.getBaseUrl)(this.props.pathname), data);
    }
    /**
     * Cancel handler
     * @method onCancel
     * @returns {undefined}
     */

  }, {
    key: "onCancel",
    value: function onCancel() {
      this.props.history.push(this.props.returnUrl || (0, _helpers.getBaseUrl)(this.props.pathname));
    }
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.schemaRequest.loaded && this.props.content) {
        var visual = (0, _helpers.hasTilesData)(this.props.schema.properties) || this.props.content['@type'] === 'Plone Site';
        var FormImpl = this.props.content.layout == 'mosaic_tiles_view' ? _Form["default"] : _components.Form;
        return _react["default"].createElement("div", {
          id: "page-edit"
        }, _react["default"].createElement(_reactHelmet["default"], {
          title: this.props.intl.formatMessage(messages.edit, {
            title: this.props.schema.title
          })
        }), _react["default"].createElement(FormImpl, {
          ref: function ref(instance) {
            if (instance) {
              _this2.form = instance.refs.wrappedInstance;
            }
          },
          schema: this.props.schema,
          formData: this.props.content,
          onSubmit: this.onSubmit,
          hideActions: true,
          pathname: this.props.pathname,
          visual: visual,
          title: this.props.intl.formatMessage(messages.edit, {
            title: this.props.schema.title
          }),
          loading: this.props.updateRequest.loading
        }), _react["default"].createElement(_reactPortal.Portal, {
          node: __CLIENT__ && document.getElementById('toolbar')
        }, _react["default"].createElement(_components.Toolbar, {
          pathname: this.props.pathname,
          hideDefaultViewButtons: true,
          inner: _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("button", {
            id: "toolbar-save",
            className: "save",
            "aria-label": this.props.intl.formatMessage(messages.save),
            onClick: function onClick() {
              return _this2.form.onSubmit();
            }
          }, _react["default"].createElement(_components.Icon, {
            name: _save["default"],
            className: "circled",
            size: "30px",
            title: this.props.intl.formatMessage(messages.save)
          })), _react["default"].createElement("button", {
            className: "cancel",
            "aria-label": this.props.intl.formatMessage(messages.cancel),
            onClick: function onClick() {
              return _this2.onCancel();
            }
          }, _react["default"].createElement(_components.Icon, {
            name: _clear["default"],
            className: "circled",
            size: "30px",
            title: this.props.intl.formatMessage(messages.cancel)
          })))
        })), visual && _react["default"].createElement(_reactPortal.Portal, {
          node: __CLIENT__ && document.getElementById('sidebar')
        }, _react["default"].createElement(_components.Sidebar, null)));
      }

      return _react["default"].createElement("div", null);
    }
  }]);

  return Edit;
}(_react.Component);

_defineProperty(Edit, "propTypes", {
  updateContent: _propTypes["default"].func.isRequired,
  getContent: _propTypes["default"].func.isRequired,
  getSchema: _propTypes["default"].func.isRequired,
  updateRequest: _propTypes["default"].shape({
    loading: _propTypes["default"].bool,
    loaded: _propTypes["default"].bool
  }).isRequired,
  schemaRequest: _propTypes["default"].shape({
    loading: _propTypes["default"].bool,
    loaded: _propTypes["default"].bool
  }).isRequired,
  getRequest: _propTypes["default"].shape({
    loading: _propTypes["default"].bool,
    loaded: _propTypes["default"].bool
  }).isRequired,
  pathname: _propTypes["default"].string.isRequired,
  returnUrl: _propTypes["default"].string,
  content: _propTypes["default"].shape({
    '@type': _propTypes["default"].string
  }),
  schema: _propTypes["default"].objectOf(_propTypes["default"].any),
  intl: _reactIntl.intlShape.isRequired
});

_defineProperty(Edit, "defaultProps", {
  schema: null,
  content: null,
  returnUrl: null
});

var _default = (0, _redux.compose)((0, _reactDnd.DragDropContext)(_reactDndHtml5Backend["default"]), _reactIntl.injectIntl, (0, _reactRedux.connect)(function (state, props) {
  return {
    content: state.content.data,
    schema: state.schema.schema,
    getRequest: state.content.get,
    schemaRequest: state.schema,
    updateRequest: state.content.update,
    pathname: props.location.pathname,
    returnUrl: _queryString["default"].parse(props.location.search).return_url
  };
}, {
  updateContent: _actions.updateContent,
  getContent: _actions.getContent,
  getSchema: _actions.getSchema
}))(Edit);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hbmFnZS9FZGl0LmpzeCJdLCJuYW1lcyI6WyJtZXNzYWdlcyIsImVkaXQiLCJpZCIsImRlZmF1bHRNZXNzYWdlIiwic2F2ZSIsImNhbmNlbCIsIkVkaXQiLCJwcm9wcyIsIm9uQ2FuY2VsIiwiYmluZCIsIm9uU3VibWl0IiwiZ2V0Q29udGVudCIsInBhdGhuYW1lIiwibmV4dFByb3BzIiwiZ2V0UmVxdWVzdCIsImxvYWRpbmciLCJsb2FkZWQiLCJnZXRTY2hlbWEiLCJjb250ZW50IiwidXBkYXRlUmVxdWVzdCIsImhpc3RvcnkiLCJwdXNoIiwicmV0dXJuVXJsIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGVDb250ZW50Iiwic2NoZW1hUmVxdWVzdCIsInZpc3VhbCIsInNjaGVtYSIsInByb3BlcnRpZXMiLCJGb3JtSW1wbCIsImxheW91dCIsIk1vc2FpY0Zvcm0iLCJGb3JtIiwiaW50bCIsImZvcm1hdE1lc3NhZ2UiLCJ0aXRsZSIsImluc3RhbmNlIiwiZm9ybSIsInJlZnMiLCJ3cmFwcGVkSW5zdGFuY2UiLCJfX0NMSUVOVF9fIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNhdmVTVkciLCJjbGVhclNWRyIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwic2hhcGUiLCJib29sIiwic3RyaW5nIiwib2JqZWN0T2YiLCJhbnkiLCJpbnRsU2hhcGUiLCJIVE1MNUJhY2tlbmQiLCJpbmplY3RJbnRsIiwic3RhdGUiLCJnZXQiLCJ1cGRhdGUiLCJsb2NhdGlvbiIsInFzIiwicGFyc2UiLCJzZWFyY2giLCJyZXR1cm5fdXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFBLFNBQVMsRUFBRTtBQUhTLEM7O2VBdUpULG9CQUNiLCtCQUFnQm1DLGdDQUFoQixDQURhLEVBRWJDLHFCQUZhLEVBR2IseUJBQ0UsVUFBQ0MsS0FBRCxFQUFRcEQsS0FBUjtBQUFBLFNBQW1CO0FBQ2pCVyxJQUFBQSxPQUFPLEVBQUV5QyxLQUFLLENBQUN6QyxPQUFOLENBQWNLLElBRE47QUFFakJNLElBQUFBLE1BQU0sRUFBRThCLEtBQUssQ0FBQzlCLE1BQU4sQ0FBYUEsTUFGSjtBQUdqQmYsSUFBQUEsVUFBVSxFQUFFNkMsS0FBSyxDQUFDekMsT0FBTixDQUFjMEMsR0FIVDtBQUlqQmpDLElBQUFBLGFBQWEsRUFBRWdDLEtBQUssQ0FBQzlCLE1BSko7QUFLakJWLElBQUFBLGFBQWEsRUFBRXdDLEtBQUssQ0FBQ3pDLE9BQU4sQ0FBYzJDLE1BTFo7QUFNakJqRCxJQUFBQSxRQUFRLEVBQUVMLEtBQUssQ0FBQ3VELFFBQU4sQ0FBZWxELFFBTlI7QUFPakJVLElBQUFBLFNBQVMsRUFBRXlDLHdCQUFHQyxLQUFILENBQVN6RCxLQUFLLENBQUN1RCxRQUFOLENBQWVHLE1BQXhCLEVBQWdDQztBQVAxQixHQUFuQjtBQUFBLENBREYsRUFVRTtBQUNFeEMsRUFBQUEsYUFBYSxFQUFiQSxzQkFERjtBQUVFZixFQUFBQSxVQUFVLEVBQVZBLG1CQUZGO0FBR0VNLEVBQUFBLFNBQVMsRUFBVEE7QUFIRixDQVZGLENBSGEsRUFtQmJYLElBbkJhLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVkaXQgY29udGFpbmVyLlxuICogQG1vZHVsZSBjb21wb25lbnRzL21hbmFnZS9FZGl0L0VkaXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgZGVmaW5lTWVzc2FnZXMsIGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSAncmVhY3QtcG9ydGFsJztcbmltcG9ydCB7IERyYWdEcm9wQ29udGV4dCB9IGZyb20gJ3JlYWN0LWRuZCc7XG5pbXBvcnQgSFRNTDVCYWNrZW5kIGZyb20gJ3JlYWN0LWRuZC1odG1sNS1iYWNrZW5kJztcbmltcG9ydCBxcyBmcm9tICdxdWVyeS1zdHJpbmcnO1xuXG5pbXBvcnQgTW9zYWljRm9ybSBmcm9tICcuL0Zvcm0nO1xuaW1wb3J0IHsgRm9ybSwgSWNvbiwgVG9vbGJhciwgU2lkZWJhciB9IGZyb20gJ0BwbG9uZS92b2x0by9jb21wb25lbnRzJztcbmltcG9ydCB7IHVwZGF0ZUNvbnRlbnQsIGdldENvbnRlbnQsIGdldFNjaGVtYSB9IGZyb20gJ0BwbG9uZS92b2x0by9hY3Rpb25zJztcbmltcG9ydCB7IGdldEJhc2VVcmwsIGhhc1RpbGVzRGF0YSB9IGZyb20gJ0BwbG9uZS92b2x0by9oZWxwZXJzJztcblxuaW1wb3J0IHNhdmVTVkcgZnJvbSAnQHBsb25lL3ZvbHRvL2ljb25zL3NhdmUuc3ZnJztcbmltcG9ydCBjbGVhclNWRyBmcm9tICdAcGxvbmUvdm9sdG8vaWNvbnMvY2xlYXIuc3ZnJztcblxuY29uc3QgbWVzc2FnZXMgPSBkZWZpbmVNZXNzYWdlcyh7XG4gIGVkaXQ6IHtcbiAgICBpZDogJ0VkaXQge3RpdGxlfScsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdFZGl0IHt0aXRsZX0nLFxuICB9LFxuICBzYXZlOiB7XG4gICAgaWQ6ICdTYXZlJyxcbiAgICBkZWZhdWx0TWVzc2FnZTogJ1NhdmUnLFxuICB9LFxuICBjYW5jZWw6IHtcbiAgICBpZDogJ0NhbmNlbCcsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdDYW5jZWwnLFxuICB9LFxufSk7XG5cbi8qKlxuICogRWRpdCBjbGFzcy5cbiAqIEBjbGFzcyBFZGl0XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xuY2xhc3MgRWRpdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0eXBlcy5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IHByb3BUeXBlcyBQcm9wZXJ0eSB0eXBlcy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB1cGRhdGVDb250ZW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0U2NoZW1hOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVwZGF0ZVJlcXVlc3Q6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIGxvYWRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgICBzY2hlbWFSZXF1ZXN0OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBsb2FkZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgZ2V0UmVxdWVzdDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGxvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgICAgbG9hZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICAgIHBhdGhuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcmV0dXJuVXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRlbnQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAnQHR5cGUnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pLFxuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHByb3BlcnRpZXNcbiAgICogQHByb3BlcnR5IHtPYmplY3R9IGRlZmF1bHRQcm9wcyBEZWZhdWx0IHByb3BlcnRpZXMuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc2NoZW1hOiBudWxsLFxuICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgcmV0dXJuVXJsOiBudWxsLFxuICB9O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBDb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAY29uc3RydWN0cyBFZGl0Q29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm9uQ2FuY2VsID0gdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TdWJtaXQgPSB0aGlzLm9uU3VibWl0LmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9uZW50IGRpZCBtb3VudFxuICAgKiBAbWV0aG9kIGNvbXBvbmVudERpZE1vdW50XG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmdldENvbnRlbnQoZ2V0QmFzZVVybCh0aGlzLnByb3BzLnBhdGhuYW1lKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9uZW50IHdpbGwgcmVjZWl2ZSBwcm9wc1xuICAgKiBAbWV0aG9kIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG5leHRQcm9wcyBOZXh0IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZ2V0UmVxdWVzdC5sb2FkaW5nICYmIG5leHRQcm9wcy5nZXRSZXF1ZXN0LmxvYWRlZCkge1xuICAgICAgdGhpcy5wcm9wcy5nZXRTY2hlbWEobmV4dFByb3BzLmNvbnRlbnRbJ0B0eXBlJ10pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy51cGRhdGVSZXF1ZXN0LmxvYWRpbmcgJiYgbmV4dFByb3BzLnVwZGF0ZVJlcXVlc3QubG9hZGVkKSB7XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChcbiAgICAgICAgdGhpcy5wcm9wcy5yZXR1cm5VcmwgfHwgZ2V0QmFzZVVybCh0aGlzLnByb3BzLnBhdGhuYW1lKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1Ym1pdCBoYW5kbGVyXG4gICAqIEBtZXRob2Qgb25TdWJtaXRcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRm9ybSBkYXRhLlxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgb25TdWJtaXQoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKCdzdWJtaXQgZGF0YScsIGRhdGEpO1xuICAgIHRoaXMucHJvcHMudXBkYXRlQ29udGVudChnZXRCYXNlVXJsKHRoaXMucHJvcHMucGF0aG5hbWUpLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWwgaGFuZGxlclxuICAgKiBAbWV0aG9kIG9uQ2FuY2VsXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBvbkNhbmNlbCgpIHtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChcbiAgICAgIHRoaXMucHJvcHMucmV0dXJuVXJsIHx8IGdldEJhc2VVcmwodGhpcy5wcm9wcy5wYXRobmFtZSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgbWV0aG9kLlxuICAgKiBAbWV0aG9kIHJlbmRlclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBNYXJrdXAgZm9yIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2NoZW1hUmVxdWVzdC5sb2FkZWQgJiYgdGhpcy5wcm9wcy5jb250ZW50KSB7XG4gICAgICBjb25zdCB2aXN1YWwgPVxuICAgICAgICBoYXNUaWxlc0RhdGEodGhpcy5wcm9wcy5zY2hlbWEucHJvcGVydGllcykgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5jb250ZW50WydAdHlwZSddID09PSAnUGxvbmUgU2l0ZSc7XG5cbiAgICAgIGxldCBGb3JtSW1wbCA9XG4gICAgICAgIHRoaXMucHJvcHMuY29udGVudC5sYXlvdXQgPT0gJ21vc2FpY190aWxlc192aWV3JyA/IE1vc2FpY0Zvcm0gOiBGb3JtO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGlkPVwicGFnZS1lZGl0XCI+XG4gICAgICAgICAgPEhlbG1ldFxuICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKG1lc3NhZ2VzLmVkaXQsIHtcbiAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMuc2NoZW1hLnRpdGxlLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Rm9ybUltcGxcbiAgICAgICAgICAgIHJlZj17aW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0gPSBpbnN0YW5jZS5yZWZzLndyYXBwZWRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHNjaGVtYT17dGhpcy5wcm9wcy5zY2hlbWF9XG4gICAgICAgICAgICBmb3JtRGF0YT17dGhpcy5wcm9wcy5jb250ZW50fVxuICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9XG4gICAgICAgICAgICBoaWRlQWN0aW9uc1xuICAgICAgICAgICAgcGF0aG5hbWU9e3RoaXMucHJvcHMucGF0aG5hbWV9XG4gICAgICAgICAgICB2aXN1YWw9e3Zpc3VhbH1cbiAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZShtZXNzYWdlcy5lZGl0LCB7XG4gICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnNjaGVtYS50aXRsZSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgbG9hZGluZz17dGhpcy5wcm9wcy51cGRhdGVSZXF1ZXN0LmxvYWRpbmd9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UG9ydGFsIG5vZGU9e19fQ0xJRU5UX18gJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rvb2xiYXInKX0+XG4gICAgICAgICAgICA8VG9vbGJhclxuICAgICAgICAgICAgICBwYXRobmFtZT17dGhpcy5wcm9wcy5wYXRobmFtZX1cbiAgICAgICAgICAgICAgaGlkZURlZmF1bHRWaWV3QnV0dG9uc1xuICAgICAgICAgICAgICBpbm5lcj17XG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJ0b29sYmFyLXNhdmVcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzYXZlXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UobWVzc2FnZXMuc2F2ZSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuZm9ybS5vblN1Ym1pdCgpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3NhdmVTVkd9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2lyY2xlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIjMwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZShtZXNzYWdlcy5zYXZlKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZShtZXNzYWdlcy5jYW5jZWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2FuY2VsKCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT17Y2xlYXJTVkd9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2lyY2xlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIjMwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZShtZXNzYWdlcy5jYW5jZWwpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Qb3J0YWw+XG4gICAgICAgICAge3Zpc3VhbCAmJiAoXG4gICAgICAgICAgICA8UG9ydGFsIG5vZGU9e19fQ0xJRU5UX18gJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKX0+XG4gICAgICAgICAgICAgIDxTaWRlYmFyIC8+XG4gICAgICAgICAgICA8L1BvcnRhbD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiA8ZGl2IC8+O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2UoXG4gIERyYWdEcm9wQ29udGV4dChIVE1MNUJhY2tlbmQpLFxuICBpbmplY3RJbnRsLFxuICBjb25uZWN0KFxuICAgIChzdGF0ZSwgcHJvcHMpID0+ICh7XG4gICAgICBjb250ZW50OiBzdGF0ZS5jb250ZW50LmRhdGEsXG4gICAgICBzY2hlbWE6IHN0YXRlLnNjaGVtYS5zY2hlbWEsXG4gICAgICBnZXRSZXF1ZXN0OiBzdGF0ZS5jb250ZW50LmdldCxcbiAgICAgIHNjaGVtYVJlcXVlc3Q6IHN0YXRlLnNjaGVtYSxcbiAgICAgIHVwZGF0ZVJlcXVlc3Q6IHN0YXRlLmNvbnRlbnQudXBkYXRlLFxuICAgICAgcGF0aG5hbWU6IHByb3BzLmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgcmV0dXJuVXJsOiBxcy5wYXJzZShwcm9wcy5sb2NhdGlvbi5zZWFyY2gpLnJldHVybl91cmwsXG4gICAgfSksXG4gICAge1xuICAgICAgdXBkYXRlQ29udGVudCxcbiAgICAgIGdldENvbnRlbnQsXG4gICAgICBnZXRTY2hlbWEsXG4gICAgfSxcbiAgKSxcbikoRWRpdCk7XG4iXX0=