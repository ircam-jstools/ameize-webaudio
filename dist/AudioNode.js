"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * https://dom.spec.whatwg.org/#eventtarget
 */
var EventTarget = function EventTarget() {
  (0, _classCallCheck3.default)(this, EventTarget);
};

//
/**
 * https://webaudio.github.io/web-audio-api/#audionode
 */


var AudioNode = function (_EventTarget) {
  (0, _inherits3.default)(AudioNode, _EventTarget);

  function AudioNode(audioContext) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$numberOfInputs = _ref.numberOfInputs,
        numberOfInputs = _ref$numberOfInputs === undefined ? 1 : _ref$numberOfInputs,
        _ref$numberOfOutputs = _ref.numberOfOutputs,
        numberOfOutputs = _ref$numberOfOutputs === undefined ? 1 : _ref$numberOfOutputs,
        _ref$channelCount = _ref.channelCount,
        channelCount = _ref$channelCount === undefined ? null : _ref$channelCount,
        _ref$channelCountMode = _ref.channelCountMode,
        channelCountMode = _ref$channelCountMode === undefined ? null : _ref$channelCountMode,
        _ref$channelInterpret = _ref.channelInterpretation,
        channelInterpretation = _ref$channelInterpret === undefined ? null : _ref$channelInterpret;

    (0, _classCallCheck3.default)(this, AudioNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioNode.__proto__ || (0, _getPrototypeOf2.default)(AudioNode)).call(this));

    _this.numberOfInputs = numberOfInputs;
    _this.numberOfOutputs = numberOfOutputs;
    _this.channelCount = channelCount;
    _this.channelCountMode = channelCountMode;
    _this.channelInterpretation = channelInterpretation;

    _this._audioContext = audioContext;
    _this._patch = null; // instance of the pd patch

    _this._connections = [];
    return _this;
  }

  /**
   * https://webaudio.github.io/web-audio-api/#dom-audionode-connect
   * @note: we only deal with mono for now so no need for that.
   */


  (0, _createClass3.default)(AudioNode, [{
    key: "connect",
    value: function connect(destination /*, output, input */) {
      this._audioContext._connect(this, destination);
    }

    /**
     * https://webaudio.github.io/web-audio-api/#dom-audionode-disconnect
     * @note: we only deal with mono for now so no need for that.
     */

  }, {
    key: "disconnect",
    value: function disconnect() /*, output */{
      var destination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._audioContext._disconnect(this, destination);
    }
  }]);
  return AudioNode;
}(EventTarget);

exports.default = AudioNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvTm9kZS5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsIkF1ZGlvTm9kZSIsImF1ZGlvQ29udGV4dCIsIm51bWJlck9mSW5wdXRzIiwibnVtYmVyT2ZPdXRwdXRzIiwiY2hhbm5lbENvdW50IiwiY2hhbm5lbENvdW50TW9kZSIsImNoYW5uZWxJbnRlcnByZXRhdGlvbiIsIl9hdWRpb0NvbnRleHQiLCJfcGF0Y2giLCJfY29ubmVjdGlvbnMiLCJkZXN0aW5hdGlvbiIsIl9jb25uZWN0IiwiX2Rpc2Nvbm5lY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7O0lBR01BLFcsR0FDSix1QkFBYztBQUFBO0FBRWIsQzs7QUFHSDtBQUNBOzs7OztJQUdNQyxTOzs7QUFDSixxQkFBWUMsWUFBWixFQU1RO0FBQUEsbUZBQUosRUFBSTtBQUFBLG1DQUxOQyxjQUtNO0FBQUEsUUFMTkEsY0FLTSx1Q0FMVyxDQUtYO0FBQUEsb0NBSk5DLGVBSU07QUFBQSxRQUpOQSxlQUlNLHdDQUpZLENBSVo7QUFBQSxpQ0FITkMsWUFHTTtBQUFBLFFBSE5BLFlBR00scUNBSFMsSUFHVDtBQUFBLHFDQUZOQyxnQkFFTTtBQUFBLFFBRk5BLGdCQUVNLHlDQUZhLElBRWI7QUFBQSxxQ0FETkMscUJBQ007QUFBQSxRQUROQSxxQkFDTSx5Q0FEa0IsSUFDbEI7O0FBQUE7O0FBQUE7O0FBR04sVUFBS0osY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxVQUFLQyxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFVBQUtDLHFCQUFMLEdBQTZCQSxxQkFBN0I7O0FBRUEsVUFBS0MsYUFBTCxHQUFxQk4sWUFBckI7QUFDQSxVQUFLTyxNQUFMLEdBQWMsSUFBZCxDQVZNLENBVWM7O0FBRXBCLFVBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFaTTtBQWFQOztBQUVEOzs7Ozs7Ozs0QkFJUUMsVyxDQUFXLG9CLEVBQXNCO0FBQ3ZDLFdBQUtILGFBQUwsQ0FBbUJJLFFBQW5CLENBQTRCLElBQTVCLEVBQWtDRCxXQUFsQztBQUNEOztBQUVEOzs7Ozs7O2lDQUk4QixhQUFlO0FBQUEsVUFBbENBLFdBQWtDLHVFQUFwQixJQUFvQjs7QUFDM0MsV0FBS0gsYUFBTCxDQUFtQkssV0FBbkIsQ0FBK0IsSUFBL0IsRUFBcUNGLFdBQXJDO0FBQ0Q7OztFQXBDcUJYLFc7O2tCQXVDVEMsUyIsImZpbGUiOiJBdWRpb05vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNldmVudHRhcmdldFxuICovXG5jbGFzcyBFdmVudFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cbn1cblxuLy9cbi8qKlxuICogaHR0cHM6Ly93ZWJhdWRpby5naXRodWIuaW8vd2ViLWF1ZGlvLWFwaS8jYXVkaW9ub2RlXG4gKi9cbmNsYXNzIEF1ZGlvTm9kZSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3IoYXVkaW9Db250ZXh0LCB7XG4gICAgbnVtYmVyT2ZJbnB1dHMgPSAxLFxuICAgIG51bWJlck9mT3V0cHV0cyA9IDEsXG4gICAgY2hhbm5lbENvdW50ID0gbnVsbCxcbiAgICBjaGFubmVsQ291bnRNb2RlID0gbnVsbCxcbiAgICBjaGFubmVsSW50ZXJwcmV0YXRpb24gPSBudWxsLFxuICB9ID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5udW1iZXJPZklucHV0cyA9IG51bWJlck9mSW5wdXRzO1xuICAgIHRoaXMubnVtYmVyT2ZPdXRwdXRzID0gbnVtYmVyT2ZPdXRwdXRzO1xuICAgIHRoaXMuY2hhbm5lbENvdW50ID0gY2hhbm5lbENvdW50O1xuICAgIHRoaXMuY2hhbm5lbENvdW50TW9kZSA9IGNoYW5uZWxDb3VudE1vZGU7XG4gICAgdGhpcy5jaGFubmVsSW50ZXJwcmV0YXRpb24gPSBjaGFubmVsSW50ZXJwcmV0YXRpb247XG5cbiAgICB0aGlzLl9hdWRpb0NvbnRleHQgPSBhdWRpb0NvbnRleHQ7XG4gICAgdGhpcy5fcGF0Y2ggPSBudWxsOyAvLyBpbnN0YW5jZSBvZiB0aGUgcGQgcGF0Y2hcblxuICAgIHRoaXMuX2Nvbm5lY3Rpb25zID0gW107XG4gIH1cblxuICAvKipcbiAgICogaHR0cHM6Ly93ZWJhdWRpby5naXRodWIuaW8vd2ViLWF1ZGlvLWFwaS8jZG9tLWF1ZGlvbm9kZS1jb25uZWN0XG4gICAqIEBub3RlOiB3ZSBvbmx5IGRlYWwgd2l0aCBtb25vIGZvciBub3cgc28gbm8gbmVlZCBmb3IgdGhhdC5cbiAgICovXG4gIGNvbm5lY3QoZGVzdGluYXRpb24vKiwgb3V0cHV0LCBpbnB1dCAqLykge1xuICAgIHRoaXMuX2F1ZGlvQ29udGV4dC5fY29ubmVjdCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogaHR0cHM6Ly93ZWJhdWRpby5naXRodWIuaW8vd2ViLWF1ZGlvLWFwaS8jZG9tLWF1ZGlvbm9kZS1kaXNjb25uZWN0XG4gICAqIEBub3RlOiB3ZSBvbmx5IGRlYWwgd2l0aCBtb25vIGZvciBub3cgc28gbm8gbmVlZCBmb3IgdGhhdC5cbiAgICovXG4gIGRpc2Nvbm5lY3QoZGVzdGluYXRpb24gPSBudWxsIC8qLCBvdXRwdXQgKi8pIHtcbiAgICB0aGlzLl9hdWRpb0NvbnRleHQuX2Rpc2Nvbm5lY3QodGhpcywgZGVzdGluYXRpb24pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvTm9kZTtcbiJdfQ==