"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _classNames = _interopRequireDefault(require("../../utilities/class-names"));

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

var _domElementFocus = _interopRequireDefault(require("../../utilities/dom-element-focus"));

var _docs = _interopRequireDefault(require("./docs.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `closeButton`: This is a visually hidden label for the close button.
   * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    closeButton: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
  }),

  /**
   * CSS classes to be added to tag with `.slds-notify_toast`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   * _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * If duration exists, the Toast will disappear after that amount of time. Time in milliseconds. _Tested with Mocha testing._
   */
  duration: _propTypes.default.number,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `details`: Secondary text below heading
   * * `heading`: text within heading tag
   * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
   *
   * _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    details: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
    heading: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
    headingLink: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
  }),

  /**
   * Triggered by link. _Tested with Mocha testing._
   */
  onClickHeadingLink: _propTypes.default.func,

  /**
   * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
   * * info variant: `utility:info`
   * * error variant: `utility:error`
   * * success variant: `utility:success`
   * * warning variant: `utility:warning`
   *
   * _Tested with snapshot testing._
   */
  icon: _propTypes.default.node,

  /**
   * Triggered by close button. _Tested with Mocha testing._
   */
  onRequestClose: _propTypes.default.func,

  /**
   * Custom styles to be passed to the component. _Tested with Mocha testing._
   */
  style: _propTypes.default.object,

  /**
   * The type of Toast. _Tested with snapshot testing._
   */
  variant: _propTypes.default.oneOf(['error', 'info', 'success', 'warning']).isRequired
};
var defaultProps = {
  assistiveText: {
    closeButton: 'Close'
  },
  variant: 'info'
};
/**
 * Toast serves as a feedback & confirmation mechanism after the user takes an action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
 */

var Toast =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast(props) {
    var _this;

    _classCallCheck(this, Toast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toast).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.clearTimeout();

      if (_this.props.onRequestClose) {
        _this.props.onRequestClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearTimeout", function () {
      if (_this.timeout) {
        clearTimeout(_this.timeout);
        _this.timeout = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveButtonRef", function (component) {
      _this.closeButton = component;

      if (_this.state.isInitialRender) {
        _domElementFocus.default.storeActiveElement();

        if (_this.closeButton) {
          _this.closeButton.focus();
        }

        _this.setState({
          isInitialRender: false
        });
      }
    });

    _this.state = {
      isInitialRender: true
    };
    _this.timeout = null;
    return _this;
  }

  _createClass(Toast, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
      (0, _checkProps.default)(_constants.TOAST, this.props, _docs.default);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.duration) {
        this.timeout = setTimeout(function () {
          _this2.onClose();
        }, this.props.duration);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearTimeout();

      _domElementFocus.default.returnFocusToStoredElement();
    }
  }, {
    key: "render",
    value: function render() {
      // Merge objects of strings with their default object
      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      var heading = labels.heading || this.props.content; // eslint-disable-line react/prop-types

      var assistiveTextVariant = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error'
      };
      var defaultIcons = {
        info: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "info"
        }),
        success: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "success"
        }),
        warning: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "warning"
        }),
        error: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "error"
        })
      };
      var icon = this.props.icon ? this.props.icon : defaultIcons[this.props.variant];

      var clonedIcon = _react.default.cloneElement(icon, {
        containerClassName: 'slds-m-right_small slds-no-flex slds-align-top',
        inverse: true,
        size: 'small'
      });
      /* eslint-disable no-script-url */


      return _react.default.createElement("div", {
        className: (0, _classNames.default)('slds-notify slds-notify_toast', {
          'slds-theme_info': this.props.variant === 'info',
          'slds-theme_success': this.props.variant === 'success',
          'slds-theme_warning': this.props.variant === 'warning',
          'slds-theme_error': this.props.variant === 'error'
        }, this.props.className),
        role: "status",
        style: this.props.style
      }, _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveTextVariant[this.props.variant]), clonedIcon, _react.default.createElement("div", {
        className: "slds-notify__content"
      }, _react.default.createElement("h2", {
        className: "slds-text-heading_small"
      }, heading, ' ', labels.headingLink ? _react.default.createElement("a", {
        onClick: this.props.onClickHeadingLink,
        href: "javascript:void(0);"
      }, labels.headingLink) : null), labels.details ? _react.default.createElement("p", null, labels.details) : null), _react.default.createElement(_button.default, {
        assistiveText: {
          icon: assistiveText.closeButton
        },
        buttonRef: this.saveButtonRef,
        className: "slds-notify__close",
        iconCategory: "utility",
        iconName: "close",
        iconSize: "large",
        inverse: true,
        onClick: this.props.onRequestClose,
        title: assistiveText.closeButton,
        variant: "icon"
      }));
    }
  }]);

  return Toast;
}(_react.default.Component);

Toast.defaultProps = defaultProps;
Toast.displayName = _constants.TOAST;
Toast.propTypes = propTypes;
var _default = Toast;
exports.default = _default;