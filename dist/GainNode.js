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

var _AudioParam = require('./AudioParam');

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GainNode = function (_AudioNode) {
  (0, _inherits3.default)(GainNode, _AudioNode);

  function GainNode(audioContext) {
    (0, _classCallCheck3.default)(this, GainNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GainNode.__proto__ || (0, _getPrototypeOf2.default)(GainNode)).call(this, audioContext, {}));

    _this._patch = _this._audioContext._openPatch('ameize-gain.pd');

    _this.gain = new _AudioParam2.default(_this, 'gain');
    return _this;
  }

  return GainNode;
}(_AudioNode3.default);

exports.default = GainNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhaW5Ob2RlLmpzIl0sIm5hbWVzIjpbIkdhaW5Ob2RlIiwiYXVkaW9Db250ZXh0IiwiX3BhdGNoIiwiX2F1ZGlvQ29udGV4dCIsIl9vcGVuUGF0Y2giLCJnYWluIiwiQXVkaW9QYXJhbSIsIkF1ZGlvTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVNQSxROzs7QUFDSixvQkFBWUMsWUFBWixFQUEwQjtBQUFBOztBQUFBLDBJQUNsQkEsWUFEa0IsRUFDSixFQURJOztBQUd4QixVQUFLQyxNQUFMLEdBQWMsTUFBS0MsYUFBTCxDQUFtQkMsVUFBbkIsQ0FBOEIsZ0JBQTlCLENBQWQ7O0FBRUEsVUFBS0MsSUFBTCxHQUFZLElBQUlDLG9CQUFKLFFBQXFCLE1BQXJCLENBQVo7QUFMd0I7QUFNekI7OztFQVBvQkMsbUI7O2tCQVVSUCxRIiwiZmlsZSI6IkdhaW5Ob2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1ZGlvTm9kZSBmcm9tICcuL0F1ZGlvTm9kZSc7XG5pbXBvcnQgQXVkaW9QYXJhbSBmcm9tICcuL0F1ZGlvUGFyYW0nO1xuXG5jbGFzcyBHYWluTm9kZSBleHRlbmRzIEF1ZGlvTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGF1ZGlvQ29udGV4dCkge1xuICAgIHN1cGVyKGF1ZGlvQ29udGV4dCwge30pO1xuXG4gICAgdGhpcy5fcGF0Y2ggPSB0aGlzLl9hdWRpb0NvbnRleHQuX29wZW5QYXRjaCgnYW1laXplLWdhaW4ucGQnKTtcblxuICAgIHRoaXMuZ2FpbiA9IG5ldyBBdWRpb1BhcmFtKHRoaXMsICdnYWluJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2Fpbk5vZGU7XG4iXX0=