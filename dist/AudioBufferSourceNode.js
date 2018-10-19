'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AudioScheduledSourceNode = require('./AudioScheduledSourceNode');

var _AudioScheduledSourceNode2 = _interopRequireDefault(_AudioScheduledSourceNode);

var _AudioParam = require('./AudioParam');

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioBufferSourceNode = function (_AudioScheduledSource) {
  (0, _inherits3.default)(AudioBufferSourceNode, _AudioScheduledSource);

  function AudioBufferSourceNode(audioContext) {
    (0, _classCallCheck3.default)(this, AudioBufferSourceNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioBufferSourceNode.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferSourceNode)).call(this, audioContext));

    _this._patch = _this._audioContext._openPatch('ameize-buffer-source.pd');

    _this.playbackRate = new _AudioParam2.default(_this, 'playbackRate');
    _this.detune = new _AudioParam2.default(_this, 'detune');

    _this._buffer = null;
    return _this;
  }

  (0, _createClass3.default)(AudioBufferSourceNode, [{
    key: 'buffer',
    set: function set(buffer) {
      this._buffer = buffer;
      this._audioContext._pd.send(this._patch.$0 + '-buffer', buffer._patch.$0 + '-buffer');
    }
  }]);
  return AudioBufferSourceNode;
}(_AudioScheduledSourceNode2.default);

exports.default = AudioBufferSourceNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvQnVmZmVyU291cmNlTm9kZS5qcyJdLCJuYW1lcyI6WyJBdWRpb0J1ZmZlclNvdXJjZU5vZGUiLCJhdWRpb0NvbnRleHQiLCJfcGF0Y2giLCJfYXVkaW9Db250ZXh0IiwiX29wZW5QYXRjaCIsInBsYXliYWNrUmF0ZSIsIkF1ZGlvUGFyYW0iLCJkZXR1bmUiLCJfYnVmZmVyIiwiYnVmZmVyIiwiX3BkIiwic2VuZCIsIiQwIiwiQXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVNQSxxQjs7O0FBQ0osaUNBQVlDLFlBQVosRUFBMEI7QUFBQTs7QUFBQSxvS0FDbEJBLFlBRGtCOztBQUd4QixVQUFLQyxNQUFMLEdBQWMsTUFBS0MsYUFBTCxDQUFtQkMsVUFBbkIsQ0FBOEIseUJBQTlCLENBQWQ7O0FBRUEsVUFBS0MsWUFBTCxHQUFvQixJQUFJQyxvQkFBSixRQUFxQixjQUFyQixDQUFwQjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxJQUFJRCxvQkFBSixRQUFxQixRQUFyQixDQUFkOztBQUVBLFVBQUtFLE9BQUwsR0FBZSxJQUFmO0FBUndCO0FBU3pCOzs7O3NCQUVVQyxNLEVBQVE7QUFDakIsV0FBS0QsT0FBTCxHQUFlQyxNQUFmO0FBQ0EsV0FBS04sYUFBTCxDQUFtQk8sR0FBbkIsQ0FBdUJDLElBQXZCLENBQStCLEtBQUtULE1BQUwsQ0FBWVUsRUFBM0MsY0FBMkRILE9BQU9QLE1BQVAsQ0FBY1UsRUFBekU7QUFDRDs7O0VBZmlDQyxrQzs7a0JBa0JyQmIscUIiLCJmaWxlIjoiQXVkaW9CdWZmZXJTb3VyY2VOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1ZGlvU2NoZWR1bGVkU291cmNlTm9kZSBmcm9tICcuL0F1ZGlvU2NoZWR1bGVkU291cmNlTm9kZSc7XG5pbXBvcnQgQXVkaW9QYXJhbSBmcm9tICcuL0F1ZGlvUGFyYW0nO1xuXG5jbGFzcyBBdWRpb0J1ZmZlclNvdXJjZU5vZGUgZXh0ZW5kcyBBdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUge1xuICBjb25zdHJ1Y3RvcihhdWRpb0NvbnRleHQpIHtcbiAgICBzdXBlcihhdWRpb0NvbnRleHQpO1xuXG4gICAgdGhpcy5fcGF0Y2ggPSB0aGlzLl9hdWRpb0NvbnRleHQuX29wZW5QYXRjaCgnYW1laXplLWJ1ZmZlci1zb3VyY2UucGQnKTtcblxuICAgIHRoaXMucGxheWJhY2tSYXRlID0gbmV3IEF1ZGlvUGFyYW0odGhpcywgJ3BsYXliYWNrUmF0ZScpO1xuICAgIHRoaXMuZGV0dW5lID0gbmV3IEF1ZGlvUGFyYW0odGhpcywgJ2RldHVuZScpO1xuXG4gICAgdGhpcy5fYnVmZmVyID0gbnVsbDtcbiAgfVxuXG4gIHNldCBidWZmZXIoYnVmZmVyKSB7XG4gICAgdGhpcy5fYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMuX2F1ZGlvQ29udGV4dC5fcGQuc2VuZChgJHt0aGlzLl9wYXRjaC4kMH0tYnVmZmVyYCwgYCR7YnVmZmVyLl9wYXRjaC4kMH0tYnVmZmVyYCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xuIl19