'use strict';

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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeLibpd = require('node-libpd');

var _nodeLibpd2 = _interopRequireDefault(_nodeLibpd);

var _wavesMasters = require('waves-masters');

var masters = _interopRequireWildcard(_wavesMasters);

var _blocked = require('@ircam/blocked');

var _blocked2 = _interopRequireDefault(_blocked);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blocked = new _blocked2.default(function (duration) {
  console.log('+++++++++++ Blocked for ' + duration + ' ms +++++++++++++++');
}, 10);

// debug
var SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler("crash.log");

var patchesPath = _path2.default.join(process.cwd(), 'pd');
console.log(patchesPath);

/**
 * list methods
 */
{
  console.log('************************************************');
  console.log('* API *');
  for (var i in _nodeLibpd2.default) {
    console.log('- ' + i);
  }console.log('************************************************');
}

/**
 * Start worker thread, launch pd and portaudio
 * @todo - fix the race condition between the js and the worker thread
 */
var initialized = _nodeLibpd2.default.init({
  // use the same parameters as the audio driver, including the number of channels
  numInputChannels: 0,
  numOutputChannels: 1,
  sampleRate: 44100,
  ticks: 1
});

console.log('');
console.log('[pd initialized]', initialized);
console.log('');

var scheduler = new masters.Scheduler(function () {
  return _nodeLibpd2.default.currentTime;
});

var PdEngine = function (_masters$TimeEngine) {
  (0, _inherits3.default)(PdEngine, _masters$TimeEngine);

  function PdEngine() {
    (0, _classCallCheck3.default)(this, PdEngine);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PdEngine.__proto__ || (0, _getPrototypeOf2.default)(PdEngine)).call(this));

    var connection = void 0;

    // ////// noise

    // this.noise = pd.openPatch('ameize-noise.pd', patchesPath);

    // this.output = pd.openPatch('ameize-output.pd', patchesPath);

    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.noise.connections = [];
    // this.noise.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.noise.$0 + '-output-0' , this.output.$0 + '-input-0']);

    // ////// noise and gain

    // this.output = pd.openPatch('ameize-output.pd', patchesPath);

    // this.noiseGain = pd.openPatch('ameize-gain.pd', patchesPath);
    // pd.send(this.noiseGain.$0 + '-gain-control', ['setValue', 0.]);
    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.noiseGain.connections = [];
    // this.noiseGain.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.noiseGain.$0 + '-output-0' , this.output.$0 + '-input-0']);

    // this.noise = pd.openPatch('ameize-noise.pd', patchesPath);
    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.noise.connections = [];
    // this.noise.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.noise.$0 + '-output-0' , this.noiseGain.$0 + '-input-0']);

    // ////// oscillator

    // this.carrier = pd.openPatch('ameize-oscillator.pd', patchesPath);
    // pd.send(this.carrier.$0 + '-frequency', 300);

    // this.output = pd.openPatch('ameize-output.pd', patchesPath);

    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.carrier.connections = [];
    // this.carrier.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.carrier.$0 + '-output-0' , this.output.$0 + '-input-0']);


    // gain modulation

    _this.output = _nodeLibpd2.default.openPatch('ameize-output.pd', patchesPath);

    _this.noiseGain = _nodeLibpd2.default.openPatch('ameize-gain.pd', patchesPath);
    connection = _nodeLibpd2.default.openPatch('ameize-connection.pd', patchesPath);
    _this.noiseGain.connections = [];
    _this.noiseGain.connections.push(connection);
    _nodeLibpd2.default.send(connection.$0 + '-connect', [_this.noiseGain.$0 + '-output-0', _this.output.$0 + '-input-0']);

    _this.noiseModulation = _nodeLibpd2.default.openPatch('ameize-oscillator.pd', patchesPath);
    _nodeLibpd2.default.send(_this.noiseModulation.$0 + '-frequency-control', ['setValue', 2]);
    connection = _nodeLibpd2.default.openPatch('ameize-connection.pd', patchesPath);
    _this.noiseModulation.connections = [];
    _this.noiseModulation.connections.push(connection);
    _nodeLibpd2.default.send(connection.$0 + '-connect', [_this.noiseModulation.$0 + '-output-0', _this.noiseGain.$0 + '-gain-audio']);
    _nodeLibpd2.default.send(_this.noiseGain.$0 + '-gain-audio-connected', 1);

    _this.noise = _nodeLibpd2.default.openPatch('ameize-noise.pd', patchesPath);
    connection = _nodeLibpd2.default.openPatch('ameize-connection.pd', patchesPath);
    _this.noise.connections = [];
    _this.noise.connections.push(connection);
    _nodeLibpd2.default.send(connection.$0 + '-connect', [_this.noise.$0 + '-output-0', _this.noiseGain.$0 + '-input-0']);

    _this.period = 1.;
    _this.toggle = 0;
    return _this;
  }

  (0, _createClass3.default)(PdEngine, [{
    key: 'advanceTime',
    value: function advanceTime(time) {
      this.toggle ^= 1;

      // pd.send(this.noiseGain.$0 + '-gain-control', ['linearRampToValue', this.toggle * 0.1, 1000. * this.period / 2.]);

      if (this.toggle) {
        // const frequency = Math.random() * 4;
        // pd.send(this.noiseModulation.$0 + '-frequency-control', ['setValue', frequency]);
      } else {
        var frequency = Math.random() * 10.;
        _nodeLibpd2.default.send(this.noiseModulation.$0 + '-frequency-control', ['setValue', frequency]);

        // @fixme
        // pd.send(this.noiseModulation.$0 + '-frequency-control', ['linearRampTovalue', frequency, 1000. * this.period]);
      }

      return time + this.period;
    }
  }]);
  return PdEngine;
}(masters.TimeEngine);

var pdEngine = new PdEngine();
scheduler.add(pdEngine);

// pd.send(patch.$0 + '-trigger');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1hc3RlcnMiLCJibG9ja2VkIiwiQmxvY2tlZCIsImR1cmF0aW9uIiwiY29uc29sZSIsImxvZyIsIlNlZ2ZhdWx0SGFuZGxlciIsInJlcXVpcmUiLCJyZWdpc3RlckhhbmRsZXIiLCJwYXRjaGVzUGF0aCIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsImkiLCJwZCIsImluaXRpYWxpemVkIiwiaW5pdCIsIm51bUlucHV0Q2hhbm5lbHMiLCJudW1PdXRwdXRDaGFubmVscyIsInNhbXBsZVJhdGUiLCJ0aWNrcyIsInNjaGVkdWxlciIsIlNjaGVkdWxlciIsImN1cnJlbnRUaW1lIiwiUGRFbmdpbmUiLCJjb25uZWN0aW9uIiwib3V0cHV0Iiwib3BlblBhdGNoIiwibm9pc2VHYWluIiwiY29ubmVjdGlvbnMiLCJwdXNoIiwic2VuZCIsIiQwIiwibm9pc2VNb2R1bGF0aW9uIiwibm9pc2UiLCJwZXJpb2QiLCJ0b2dnbGUiLCJ0aW1lIiwiZnJlcXVlbmN5IiwiTWF0aCIsInJhbmRvbSIsIlRpbWVFbmdpbmUiLCJwZEVuZ2luZSIsImFkZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsTzs7QUFDWjs7Ozs7Ozs7QUFFQSxJQUFNQyxVQUFVLElBQUlDLGlCQUFKLENBQWEsVUFBQ0MsUUFBRCxFQUFjO0FBQ3pDQyxVQUFRQyxHQUFSLDhCQUF1Q0YsUUFBdkM7QUFDRCxDQUZlLEVBRWIsRUFGYSxDQUFoQjs7QUFJQTtBQUNBLElBQU1HLGtCQUFrQkMsUUFBUSxrQkFBUixDQUF4QjtBQUNBRCxnQkFBZ0JFLGVBQWhCLENBQWdDLFdBQWhDOztBQUVBLElBQU1DLGNBQWNDLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixFQUFWLEVBQXlCLElBQXpCLENBQXBCO0FBQ0FULFFBQVFDLEdBQVIsQ0FBWUksV0FBWjs7QUFFQTs7O0FBR0E7QUFDRUwsVUFBUUMs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V0wsV0FBWCxDQUF1QkMsSUFBdkIsQ0FBNEJMLFVBQTVCO0FBQ0FYLHdCQUFHaUIsSUFBSCxDQUFRTixXQUFXTyxFQUFYLEdBQWdCLFVBQXhCLEVBQW9DLENBQUMsTUFBS0UsS0FBTCxDQUFXRixFQUFYLEdBQWdCLFdBQWpCLEVBQStCLE1BQUtKLFNBQUwsQ0FBZUksRUFBZixHQUFvQixVQUFuRCxDQUFwQzs7QUFFQSxVQUFLRyxNQUFMLEdBQWMsRUFBZDtBQUNBLFVBQUtDLE1BQUwsR0FBYyxDQUFkO0FBdkVZO0FBd0ViOzs7O2dDQUVXQyxJLEVBQU07QUFDaEIsV0FBS0QsTUFBTCxJQUFlLENBQWY7O0FBRUE7O0FBRUEsVUFBRyxLQUFLQSxNQUFSLEVBQWdCO0FBQ2Q7QUFDQTtBQUNELE9BSEQsTUFHUTtBQUNOLFlBQU1FLFlBQVlDLEtBQUtDLE1BQUwsS0FBZ0IsR0FBbEM7QUFDQTFCLDRCQUFHaUIsSUFBSCxDQUFRLEtBQUtFLGVBQUwsQ0FBcUJELEVBQXJCLEdBQTBCLG9CQUFsQyxFQUF3RCxDQUFDLFVBQUQsRUFBYU0sU0FBYixDQUF4RDs7QUFFQTtBQUNBO0FBQ0Q7O0FBRUQsYUFBT0QsT0FBTyxLQUFLRixNQUFuQjtBQUNEOzs7RUE1Rm9CcEMsUUFBUTBDLFU7O0FBK0YvQixJQUFNQyxXQUFXLElBQUlsQixRQUFKLEVBQWpCO0FBQ0FILFVBQVVzQixHQUFWLENBQWNELFFBQWQ7O0FBRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwZCBmcm9tICdub2RlLWxpYnBkJztcbmltcG9ydCAqIGFzIG1hc3RlcnMgZnJvbSAnd2F2ZXMtbWFzdGVycyc7XG5pbXBvcnQgQmxvY2tlZCBmcm9tICdAaXJjYW0vYmxvY2tlZCc7XG5cbmNvbnN0IGJsb2NrZWQgPSBuZXcgQmxvY2tlZCggKGR1cmF0aW9uKSA9PiB7XG4gIGNvbnNvbGUubG9nKGArKysrKysrKysrKyBCbG9ja2VkIGZvciAke2R1cmF0aW9ufSBtcyArKysrKysrKysrKysrKytgKTtcbn0sIDEwKTtcblxuLy8gZGVidWdcbmNvbnN0IFNlZ2ZhdWx0SGFuZGxlciA9IHJlcXVpcmUoJ3NlZ2ZhdWx0LWhhbmRsZXInKTtcblNlZ2ZhdWx0SGFuZGxlci5yZWdpc3RlckhhbmRsZXIoXCJjcmFzaC5sb2dcIik7XG5cbmNvbnN0IHBhdGNoZXNQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwZCcpO1xuY29uc29sZS5sb2cocGF0Y2hlc1BhdGgpO1xuXG4vKipcbiAqIGxpc3QgbWV0aG9kc1xuICovXG57XG4gIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcbiAgY29uc29sZS5sb2coJyogQVBJIConKTtcbiAgZm9yIChsZXQgaSBpbiBwZClcbiAgICBjb25zb2xlLmxvZyhgLSAke2l9YCk7XG4gIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcbn1cblxuLyoqXG4gKiBTdGFydCB3b3JrZXIgdGhyZWFkLCBsYXVuY2ggcGQgYW5kIHBvcnRhdWRpb1xuICogQHRvZG8gLSBmaXggdGhlIHJhY2UgY29uZGl0aW9uIGJldHdlZW4gdGhlIGpzIGFuZCB0aGUgd29ya2VyIHRocmVhZFxuICovXG5jb25zdCBpbml0aWFsaXplZCA9IHBkLmluaXQoe1xuICAvLyB1c2UgdGhlIHNhbWUgcGFyYW1ldGVycyBhcyB0aGUgYXVkaW8gZHJpdmVyLCBpbmNsdWRpbmcgdGhlIG51bWJlciBvZiBjaGFubmVsc1xuICBudW1JbnB1dENoYW5uZWxzOiAwLFxuICBudW1PdXRwdXRDaGFubmVsczogMSxcbiAgc2FtcGxlUmF0ZTogNDQxMDAsXG4gIHRpY2tzOiAxLFxufSk7XG5cbmNvbnNvbGUubG9nKCcnKTtcbmNvbnNvbGUubG9nKCdbcGQgaW5pdGlhbGl6ZWRdJywgaW5pdGlhbGl6ZWQpO1xuY29uc29sZS5sb2coJycpO1xuXG5jb25zdCBzY2hlZHVsZXIgPSBuZXcgbWFzdGVycy5TY2hlZHVsZXIoKCkgPT4ge1xuICByZXR1cm4gcGQuY3VycmVudFRpbWU7XG59KTtcblxuXG5jbGFzcyBQZEVuZ2luZSBleHRlbmRzIG1hc3RlcnMuVGltZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBsZXQgY29ubmVjdGlvbjtcblxuICAgIC8vIC8vLy8vLyBub2lzZVxuXG4gICAgLy8gdGhpcy5ub2lzZSA9IHBkLm9wZW5QYXRjaCgnYW1laXplLW5vaXNlLnBkJywgcGF0Y2hlc1BhdGgpO1xuXG4gICAgLy8gdGhpcy5vdXRwdXQgPSBwZC5vcGVuUGF0Y2goJ2FtZWl6ZS1vdXRwdXQucGQnLCBwYXRjaGVzUGF0aCk7XG5cbiAgICAvLyBjb25uZWN0aW9uID0gcGQub3BlblBhdGNoKCdhbWVpemUtY29ubmVjdGlvbi5wZCcsIHBhdGNoZXNQYXRoKTtcbiAgICAvLyB0aGlzLm5vaXNlLmNvbm5lY3Rpb25zID0gW107XG4gICAgLy8gdGhpcy5ub2lzZS5jb25uZWN0aW9ucy5wdXNoKGNvbm5lY3Rpb24pO1xuICAgIC8vIHBkLnNlbmQoY29ubmVjdGlvbi4kMCArICctY29ubmVjdCcsIFt0aGlzLm5vaXNlLiQwICsgJy1vdXRwdXQtMCcgLCB0aGlzLm91dHB1dC4kMCArICctaW5wdXQtMCddKTtcblxuICAgIC8vIC8vLy8vLyBub2lzZSBhbmQgZ2FpblxuXG4gICAgLy8gdGhpcy5vdXRwdXQgPSBwZC5vcGVuUGF0Y2goJ2FtZWl6ZS1vdXRwdXQucGQnLCBwYXRjaGVzUGF0aCk7XG5cbiAgICAvLyB0aGlzLm5vaXNlR2FpbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWdhaW4ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgLy8gcGQuc2VuZCh0aGlzLm5vaXNlR2Fpbi4kMCArICctZ2Fpbi1jb250cm9sJywgWydzZXRWYWx1ZScsIDAuXSk7XG4gICAgLy8gY29ubmVjdGlvbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWNvbm5lY3Rpb24ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgLy8gdGhpcy5ub2lzZUdhaW4uY29ubmVjdGlvbnMgPSBbXTtcbiAgICAvLyB0aGlzLm5vaXNlR2Fpbi5jb25uZWN0aW9ucy5wdXNoKGNvbm5lY3Rpb24pO1xuICAgIC8vIHBkLnNlbmQoY29ubmVjdGlvbi4kMCArICctY29ubmVjdCcsIFt0aGlzLm5vaXNlR2Fpbi4kMCArICctb3V0cHV0LTAnICwgdGhpcy5vdXRwdXQuJDAgKyAnLWlucHV0LTAnXSk7XG5cbiAgICAvLyB0aGlzLm5vaXNlID0gcGQub3BlblBhdGNoKCdhbWVpemUtbm9pc2UucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgLy8gY29ubmVjdGlvbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWNvbm5lY3Rpb24ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgLy8gdGhpcy5ub2lzZS5jb25uZWN0aW9ucyA9IFtdO1xuICAgIC8vIHRoaXMubm9pc2UuY29ubmVjdGlvbnMucHVzaChjb25uZWN0aW9uKTtcbiAgICAvLyBwZC5zZW5kKGNvbm5lY3Rpb24uJDAgKyAnLWNvbm5lY3QnLCBbdGhpcy5ub2lzZS4kMCArICctb3V0cHV0LTAnICwgdGhpcy5ub2lzZUdhaW4uJDAgKyAnLWlucHV0LTAnXSk7XG5cbiAgICAvLyAvLy8vLy8gb3NjaWxsYXRvclxuXG4gICAgLy8gdGhpcy5jYXJyaWVyID0gcGQub3BlblBhdGNoKCdhbWVpemUtb3NjaWxsYXRvci5wZCcsIHBhdGNoZXNQYXRoKTtcbiAgICAvLyBwZC5zZW5kKHRoaXMuY2Fycmllci4kMCArICctZnJlcXVlbmN5JywgMzAwKTtcblxuICAgIC8vIHRoaXMub3V0cHV0ID0gcGQub3BlblBhdGNoKCdhbWVpemUtb3V0cHV0LnBkJywgcGF0Y2hlc1BhdGgpO1xuXG4gICAgLy8gY29ubmVjdGlvbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWNvbm5lY3Rpb24ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgLy8gdGhpcy5jYXJyaWVyLmNvbm5lY3Rpb25zID0gW107XG4gICAgLy8gdGhpcy5jYXJyaWVyLmNvbm5lY3Rpb25zLnB1c2goY29ubmVjdGlvbik7XG4gICAgLy8gcGQuc2VuZChjb25uZWN0aW9uLiQwICsgJy1jb25uZWN0JywgW3RoaXMuY2Fycmllci4kMCArICctb3V0cHV0LTAnICwgdGhpcy5vdXRwdXQuJDAgKyAnLWlucHV0LTAnXSk7XG5cblxuICAgIC8vIGdhaW4gbW9kdWxhdGlvblxuXG4gICAgdGhpcy5vdXRwdXQgPSBwZC5vcGVuUGF0Y2goJ2FtZWl6ZS1vdXRwdXQucGQnLCBwYXRjaGVzUGF0aCk7XG5cbiAgICB0aGlzLm5vaXNlR2FpbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWdhaW4ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgY29ubmVjdGlvbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWNvbm5lY3Rpb24ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgdGhpcy5ub2lzZUdhaW4uY29ubmVjdGlvbnMgPSBbXTtcbiAgICB0aGlzLm5vaXNlR2Fpbi5jb25uZWN0aW9ucy5wdXNoKGNvbm5lY3Rpb24pO1xuICAgIHBkLnNlbmQoY29ubmVjdGlvbi4kMCArICctY29ubmVjdCcsIFt0aGlzLm5vaXNlR2Fpbi4kMCArICctb3V0cHV0LTAnICwgdGhpcy5vdXRwdXQuJDAgKyAnLWlucHV0LTAnXSk7XG5cbiAgICB0aGlzLm5vaXNlTW9kdWxhdGlvbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLW9zY2lsbGF0b3IucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgcGQuc2VuZCh0aGlzLm5vaXNlTW9kdWxhdGlvbi4kMCArICctZnJlcXVlbmN5LWNvbnRyb2wnLCBbJ3NldFZhbHVlJywgMl0pO1xuICAgIGNvbm5lY3Rpb24gPSBwZC5vcGVuUGF0Y2goJ2FtZWl6ZS1jb25uZWN0aW9uLnBkJywgcGF0Y2hlc1BhdGgpO1xuICAgIHRoaXMubm9pc2VNb2R1bGF0aW9uLmNvbm5lY3Rpb25zID0gW107XG4gICAgdGhpcy5ub2lzZU1vZHVsYXRpb24uY29ubmVjdGlvbnMucHVzaChjb25uZWN0aW9uKTtcbiAgICBwZC5zZW5kKGNvbm5lY3Rpb24uJDAgKyAnLWNvbm5lY3QnLCBbdGhpcy5ub2lzZU1vZHVsYXRpb24uJDAgKyAnLW91dHB1dC0wJyAsIHRoaXMubm9pc2VHYWluLiQwICsgJy1nYWluLWF1ZGlvJ10pO1xuICAgIHBkLnNlbmQodGhpcy5ub2lzZUdhaW4uJDAgKyAnLWdhaW4tYXVkaW8tY29ubmVjdGVkJywgMSk7XG5cbiAgICB0aGlzLm5vaXNlID0gcGQub3BlblBhdGNoKCdhbWVpemUtbm9pc2UucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgY29ubmVjdGlvbiA9IHBkLm9wZW5QYXRjaCgnYW1laXplLWNvbm5lY3Rpb24ucGQnLCBwYXRjaGVzUGF0aCk7XG4gICAgdGhpcy5ub2lzZS5jb25uZWN0aW9ucyA9IFtdO1xuICAgIHRoaXMubm9pc2UuY29ubmVjdGlvbnMucHVzaChjb25uZWN0aW9uKTtcbiAgICBwZC5zZW5kKGNvbm5lY3Rpb24uJDAgKyAnLWNvbm5lY3QnLCBbdGhpcy5ub2lzZS4kMCArICctb3V0cHV0LTAnICwgdGhpcy5ub2lzZUdhaW4uJDAgKyAnLWlucHV0LTAnXSk7XG5cbiAgICB0aGlzLnBlcmlvZCA9IDEuO1xuICAgIHRoaXMudG9nZ2xlID0gMDtcbiAgfVxuXG4gIGFkdmFuY2VUaW1lKHRpbWUpIHtcbiAgICB0aGlzLnRvZ2dsZSBePSAxO1xuXG4gICAgLy8gcGQuc2VuZCh0aGlzLm5vaXNlR2Fpbi4kMCArICctZ2Fpbi1jb250cm9sJywgWydsaW5lYXJSYW1wVG9WYWx1ZScsIHRoaXMudG9nZ2xlICogMC4xLCAxMDAwLiAqIHRoaXMucGVyaW9kIC8gMi5dKTtcblxuICAgIGlmKHRoaXMudG9nZ2xlKSB7XG4gICAgICAvLyBjb25zdCBmcmVxdWVuY3kgPSBNYXRoLnJhbmRvbSgpICogNDtcbiAgICAgIC8vIHBkLnNlbmQodGhpcy5ub2lzZU1vZHVsYXRpb24uJDAgKyAnLWZyZXF1ZW5jeS1jb250cm9sJywgWydzZXRWYWx1ZScsIGZyZXF1ZW5jeV0pO1xuICAgIH0gZWxzZSAge1xuICAgICAgY29uc3QgZnJlcXVlbmN5ID0gTWF0aC5yYW5kb20oKSAqIDEwLjtcbiAgICAgIHBkLnNlbmQodGhpcy5ub2lzZU1vZHVsYXRpb24uJDAgKyAnLWZyZXF1ZW5jeS1jb250cm9sJywgWydzZXRWYWx1ZScsIGZyZXF1ZW5jeV0pO1xuXG4gICAgICAvLyBAZml4bWVcbiAgICAgIC8vIHBkLnNlbmQodGhpcy5ub2lzZU1vZHVsYXRpb24uJDAgKyAnLWZyZXF1ZW5jeS1jb250cm9sJywgWydsaW5lYXJSYW1wVG92YWx1ZScsIGZyZXF1ZW5jeSwgMTAwMC4gKiB0aGlzLnBlcmlvZF0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aW1lICsgdGhpcy5wZXJpb2Q7XG4gIH1cbn1cblxuY29uc3QgcGRFbmdpbmUgPSBuZXcgUGRFbmdpbmUoKTtcbnNjaGVkdWxlci5hZGQocGRFbmdpbmUpO1xuXG4vLyBwZC5zZW5kKHBhdGNoLiQwICsgJy10cmlnZ2VyJyk7XG4iXX0=