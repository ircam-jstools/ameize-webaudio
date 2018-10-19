'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeLibpd = require('node-libpd');

var _nodeLibpd2 = _interopRequireDefault(_nodeLibpd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// singleton

var patchesPath = _path2.default.join(__dirname, '..', 'pd');

var AudioBuffer = function AudioBuffer(path) {
  (0, _classCallCheck3.default)(this, AudioBuffer);

  this._patch = _nodeLibpd2.default.openPatch('ameize-buffer.pd', patchesPath);
  _nodeLibpd2.default.send(this._patch.$0 + '-read', path);

  this.sampleRate;
  this.duration;
};

exports.default = AudioBuffer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvQnVmZmVyLmpzIl0sIm5hbWVzIjpbInBhdGNoZXNQYXRoIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJBdWRpb0J1ZmZlciIsIl9wYXRjaCIsInBkIiwib3BlblBhdGNoIiwic2VuZCIsIiQwIiwic2FtcGxlUmF0ZSIsImR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBQTZCOztBQUU3QixJQUFNQSxjQUFjQyxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBcEI7O0lBRU1DLFcsR0FDSixxQkFBWUgsSUFBWixFQUFrQjtBQUFBOztBQUNoQixPQUFLSSxNQUFMLEdBQWNDLG9CQUFHQyxTQUFILENBQWEsa0JBQWIsRUFBaUNQLFdBQWpDLENBQWQ7QUFDQU0sc0JBQUdFLElBQUgsQ0FBVyxLQUFLSCxNQUFMLENBQVlJLEVBQXZCLFlBQWtDUixJQUFsQzs7QUFFQSxPQUFLUyxVQUFMO0FBQ0EsT0FBS0MsUUFBTDtBQUVELEM7O2tCQUlZUCxXIiwiZmlsZSI6IkF1ZGlvQnVmZmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGQgZnJvbSAnbm9kZS1saWJwZCc7IC8vIHNpbmdsZXRvblxuXG5jb25zdCBwYXRjaGVzUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdwZCcpO1xuXG5jbGFzcyBBdWRpb0J1ZmZlciB7XG4gIGNvbnN0cnVjdG9yKHBhdGgpIHtcbiAgICB0aGlzLl9wYXRjaCA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWJ1ZmZlci5wZCcsIHBhdGNoZXNQYXRoKTtcbiAgICBwZC5zZW5kKGAke3RoaXMuX3BhdGNoLiQwfS1yZWFkYCwgcGF0aCk7XG5cbiAgICB0aGlzLnNhbXBsZVJhdGU7XG4gICAgdGhpcy5kdXJhdGlvbjtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9CdWZmZXI7XG4iXX0=