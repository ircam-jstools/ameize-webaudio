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

var _AudioScheduledSourceNode = require('./AudioScheduledSourceNode');

var _AudioScheduledSourceNode2 = _interopRequireDefault(_AudioScheduledSourceNode);

var _AudioParam = require('./AudioParam');

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OscillatorNode = function (_AudioScheduledSource) {
  (0, _inherits3.default)(OscillatorNode, _AudioScheduledSource);

  function OscillatorNode(audioContext) {
    (0, _classCallCheck3.default)(this, OscillatorNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OscillatorNode.__proto__ || (0, _getPrototypeOf2.default)(OscillatorNode)).call(this, audioContext, {
      numberOfInputs: 0
    }));

    _this._patch = _this._audioContext._openPatch('ameize-oscillator.pd');

    _this.frequency = new _AudioParam2.default(_this, 'frequency');
    return _this;
  }

  return OscillatorNode;
}(_AudioScheduledSourceNode2.default);

exports.default = OscillatorNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9zY2lsbGF0b3JOb2RlLmpzIl0sIm5hbWVzIjpbIk9zY2lsbGF0b3JOb2RlIiwiYXVkaW9Db250ZXh0IiwibnVtYmVyT2ZJbnB1dHMiLCJfcGF0Y2giLCJfYXVkaW9Db250ZXh0IiwiX29wZW5QYXRjaCIsImZyZXF1ZW5jeSIsIkF1ZGlvUGFyYW0iLCJBdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsYzs7O0FBQ0osMEJBQVlDLFlBQVosRUFBMEI7QUFBQTs7QUFBQSxzSkFDbEJBLFlBRGtCLEVBQ0o7QUFDbEJDLHNCQUFnQjtBQURFLEtBREk7O0FBS3hCLFVBQUtDLE1BQUwsR0FBYyxNQUFLQyxhQUFMLENBQW1CQyxVQUFuQixDQUE4QixzQkFBOUIsQ0FBZDs7QUFFQSxVQUFLQyxTQUFMLEdBQWlCLElBQUlDLG9CQUFKLFFBQXFCLFdBQXJCLENBQWpCO0FBUHdCO0FBUXpCOzs7RUFUMEJDLGtDOztrQkFZZFIsYyIsImZpbGUiOiJPc2NpbGxhdG9yTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUgZnJvbSAnLi9BdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUnO1xuaW1wb3J0IEF1ZGlvUGFyYW0gZnJvbSAnLi9BdWRpb1BhcmFtJztcblxuY2xhc3MgT3NjaWxsYXRvck5vZGUgZXh0ZW5kcyBBdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUge1xuICBjb25zdHJ1Y3RvcihhdWRpb0NvbnRleHQpIHtcbiAgICBzdXBlcihhdWRpb0NvbnRleHQsIHtcbiAgICAgIG51bWJlck9mSW5wdXRzOiAwLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fcGF0Y2ggPSB0aGlzLl9hdWRpb0NvbnRleHQuX29wZW5QYXRjaCgnYW1laXplLW9zY2lsbGF0b3IucGQnKTtcblxuICAgIHRoaXMuZnJlcXVlbmN5ID0gbmV3IEF1ZGlvUGFyYW0odGhpcywgJ2ZyZXF1ZW5jeScpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9zY2lsbGF0b3JOb2RlO1xuIl19