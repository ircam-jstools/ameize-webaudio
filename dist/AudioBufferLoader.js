'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _AudioBuffer = require('./AudioBuffer');

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _nodeLibpd = require('node-libpd');

var _nodeLibpd2 = _interopRequireDefault(_nodeLibpd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// singleton

var AudioBufferLoader = function () {
  function AudioBufferLoader() {
    (0, _classCallCheck3.default)(this, AudioBufferLoader);

    this._loadOne = this._loadOne.bind(this);
  }

  (0, _createClass3.default)(AudioBufferLoader, [{
    key: '_loadOne',
    value: function _loadOne(path) {
      return new _promise2.default(function (resolve, reject) {
        var audioBuffer = new _AudioBuffer2.default(path);

        _nodeLibpd2.default.subscribe(audioBuffer._patch.$0 + '-ready', function () {
          resolve(audioBuffer);
        });
      });
    }
  }, {
    key: 'load',
    value: function load(paths) {
      if (!Array.isArray(paths)) {
        return this._loadOne(paths);
      } else {
        var promises = paths.map(this._loadOne);
        return _promise2.default.all(promises);
      }
    }
  }]);
  return AudioBufferLoader;
}();

exports.default = AudioBufferLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvQnVmZmVyTG9hZGVyLmpzIl0sIm5hbWVzIjpbIkF1ZGlvQnVmZmVyTG9hZGVyIiwiX2xvYWRPbmUiLCJiaW5kIiwicGF0aCIsInJlc29sdmUiLCJyZWplY3QiLCJhdWRpb0J1ZmZlciIsIkF1ZGlvQnVmZmVyIiwicGQiLCJzdWJzY3JpYmUiLCJfcGF0Y2giLCIkMCIsInBhdGhzIiwiQXJyYXkiLCJpc0FycmF5IiwicHJvbWlzZXMiLCJtYXAiLCJhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUE2Qjs7SUFFdkJBLGlCO0FBQ0osK0JBQWM7QUFBQTs7QUFDWixTQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUFoQjtBQUNEOzs7OzZCQUVRQyxJLEVBQU07QUFDYixhQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFNQyxjQUFjLElBQUlDLHFCQUFKLENBQWdCSixJQUFoQixDQUFwQjs7QUFFQUssNEJBQUdDLFNBQUgsQ0FBZ0JILFlBQVlJLE1BQVosQ0FBbUJDLEVBQW5DLGFBQStDLFlBQU07QUFDbkRQLGtCQUFRRSxXQUFSO0FBQ0QsU0FGRDtBQUdELE9BTk0sQ0FBUDtBQU9EOzs7eUJBRUlNLEssRUFBTztBQUNWLFVBQUksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjRixLQUFkLENBQUwsRUFBMkI7QUFDekIsZUFBTyxLQUFLWCxRQUFMLENBQWNXLEtBQWQsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQU1HLFdBQVdILE1BQU1JLEdBQU4sQ0FBVSxLQUFLZixRQUFmLENBQWpCO0FBQ0EsZUFBTyxrQkFBUWdCLEdBQVIsQ0FBWUYsUUFBWixDQUFQO0FBQ0Q7QUFDRjs7Ozs7a0JBR1lmLGlCIiwiZmlsZSI6IkF1ZGlvQnVmZmVyTG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1ZGlvQnVmZmVyIGZyb20gJy4vQXVkaW9CdWZmZXInO1xuaW1wb3J0IHBkIGZyb20gJ25vZGUtbGlicGQnOyAvLyBzaW5nbGV0b25cblxuY2xhc3MgQXVkaW9CdWZmZXJMb2FkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9sb2FkT25lID0gdGhpcy5fbG9hZE9uZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgX2xvYWRPbmUocGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBhdWRpb0J1ZmZlciA9IG5ldyBBdWRpb0J1ZmZlcihwYXRoKTtcblxuICAgICAgcGQuc3Vic2NyaWJlKGAke2F1ZGlvQnVmZmVyLl9wYXRjaC4kMH0tcmVhZHlgLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoYXVkaW9CdWZmZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkKHBhdGhzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGhzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRPbmUocGF0aHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IHBhdGhzLm1hcCh0aGlzLl9sb2FkT25lKTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvQnVmZmVyTG9hZGVyO1xuIl19