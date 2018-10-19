'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AudioNode2 = require('./AudioNode');

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioDestinationNode = function (_AudioNode) {
  (0, _inherits3.default)(AudioDestinationNode, _AudioNode);

  function AudioDestinationNode(audioContext, options) {
    (0, _classCallCheck3.default)(this, AudioDestinationNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioDestinationNode.__proto__ || (0, _getPrototypeOf2.default)(AudioDestinationNode)).call(this, audioContext, {
      numberOfInputs: 1,
      numberOfOutputs: 0
    }));

    _this._patch = _this._audioContext._openPatch('ameize-output.pd');
    return _this;
  }

  return AudioDestinationNode;
}(_AudioNode3.default);

exports.default = AudioDestinationNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvRGVzdGluYXRpb25Ob2RlLmpzIl0sIm5hbWVzIjpbIkF1ZGlvRGVzdGluYXRpb25Ob2RlIiwiYXVkaW9Db250ZXh0Iiwib3B0aW9ucyIsIm51bWJlck9mSW5wdXRzIiwibnVtYmVyT2ZPdXRwdXRzIiwiX3BhdGNoIiwiX2F1ZGlvQ29udGV4dCIsIl9vcGVuUGF0Y2giLCJBdWRpb05vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRU1BLG9COzs7QUFDSixnQ0FBWUMsWUFBWixFQUEwQkMsT0FBMUIsRUFBbUM7QUFBQTs7QUFBQSxrS0FDM0JELFlBRDJCLEVBQ2I7QUFDbEJFLHNCQUFnQixDQURFO0FBRWxCQyx1QkFBaUI7QUFGQyxLQURhOztBQU1qQyxVQUFLQyxNQUFMLEdBQWMsTUFBS0MsYUFBTCxDQUFtQkMsVUFBbkIsQ0FBOEIsa0JBQTlCLENBQWQ7QUFOaUM7QUFPbEM7OztFQVJnQ0MsbUI7O2tCQVdwQlIsb0IiLCJmaWxlIjoiQXVkaW9EZXN0aW5hdGlvbk5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXVkaW9Ob2RlIGZyb20gJy4vQXVkaW9Ob2RlJztcblxuY2xhc3MgQXVkaW9EZXN0aW5hdGlvbk5vZGUgZXh0ZW5kcyBBdWRpb05vZGUge1xuICBjb25zdHJ1Y3RvcihhdWRpb0NvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihhdWRpb0NvbnRleHQsIHtcbiAgICAgIG51bWJlck9mSW5wdXRzOiAxLFxuICAgICAgbnVtYmVyT2ZPdXRwdXRzOiAwLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fcGF0Y2ggPSB0aGlzLl9hdWRpb0NvbnRleHQuX29wZW5QYXRjaCgnYW1laXplLW91dHB1dC5wZCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvRGVzdGluYXRpb25Ob2RlO1xuIl19