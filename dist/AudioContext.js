'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeLibpd = require('node-libpd');

var _nodeLibpd2 = _interopRequireDefault(_nodeLibpd);

var _wavesMasters = require('waves-masters');

var _AudioDestinationNode = require('./AudioDestinationNode');

var _AudioDestinationNode2 = _interopRequireDefault(_AudioDestinationNode);

var _AudioNode = require('./AudioNode');

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require('./AudioParam');

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _OscillatorNode = require('./OscillatorNode');

var _OscillatorNode2 = _interopRequireDefault(_OscillatorNode);

var _AudioBufferSourceNode = require('./AudioBufferSourceNode');

var _AudioBufferSourceNode2 = _interopRequireDefault(_AudioBufferSourceNode);

var _GainNode = require('./GainNode');

var _GainNode2 = _interopRequireDefault(_GainNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patchesPath = _path2.default.join(__dirname, '..', 'pd');

/** @private */

var Connection = function () {
  function Connection(audioContext, source, destination) {
    (0, _classCallCheck3.default)(this, Connection);

    this.audioContext = audioContext;
    this.source = source;
    this.destination = destination;
    this._patch = this.audioContext._openPatch('ameize-connection.pd');

    var channel = this._patch.$0 + '-connect';
    var args = void 0;

    if (destination instanceof _AudioNode2.default) {
      args = [source._patch.$0 + '-output-0', destination._patch.$0 + '-input-0'];
    } else if (destination instanceof _AudioParam2.default) {
      args = [source._patch.$0 + '-output-0', destination._parent._patch.$0 + '-' + destination._name + '-audio'];
    }

    this.audioContext._pd.send(channel, args);
  }

  (0, _createClass3.default)(Connection, [{
    key: 'delete',
    value: function _delete() {
      // close patch
      this.audioContext._pd.closePatch(this._patch);
      // clean references
      // not really needed as the connection should be unreachable at this point
      this.audioContext = null;
      this.source = null;
      this.destination = null;
    }
  }]);
  return Connection;
}();

/**
 * https://webaudio.github.io/web-audio-api/#AudioContext
 */


var AudioContext = function () {
  function AudioContext() {
    (0, _classCallCheck3.default)(this, AudioContext);

    this._pd = _nodeLibpd2.default;
    // this._connections = [];
    // init pd
    var initialized = this._pd.init({
      // use the same parameters as the audio driver, including the number of channels
      numInputChannels: 0,
      numOutputChannels: 1,
      sampleRate: 44100,
      ticks: 1
    });

    if (!initialized) {
      throw new Error('An error occured while instanciating libpd');
    }

    // instanciate destination
    this.destination = new _AudioDestinationNode2.default(this);
    this._scheduler = new _wavesMasters.Scheduler(function () {
      return _nodeLibpd2.default.currentTime;
    });

    this._activeSources = new _set2.default();
  }

  (0, _createClass3.default)(AudioContext, [{
    key: '_openPatch',


    /** @private */
    value: function _openPatch(patchName) {
      var patch = this._pd.openPatch(patchName, patchesPath);

      if (!patch.isValid) {
        throw new Error('Cannot open invalid patch: ' + patch);
      } else {
        return patch;
      }
    }

    /** @private */

  }, {
    key: '_connect',
    value: function _connect(source, destination) {
      if (destination instanceof _AudioNode2.default || destination instanceof _AudioParam2.default) {
        var index = source._connections.findIndex(function (c) {
          return c.source === source && c.destination === destination;
        });

        if (index === -1) {
          var connection = new Connection(this, source, destination);
          source._connections.push(connection);
        }
      } else {
        throw new TypeError('Failed to execute \'connect\' on \'AudioNode\': No function was found that matched the signature provided.');
      }
    }

    /** @private */

  }, {
    key: '_disconnect',
    value: function _disconnect(source) {
      var destination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (destination instanceof _AudioParam2.default || destination instanceof _AudioNode2.default) {
        // delete related connection
        var index = source._connections.findIndex(function (c) {
          return c.source === source && c.destination === destination;
        });

        if (index !== -1) {
          var connection = source._connections[index];
          connection.delete();
          source._connections.splice(index, 1);
        }
      } else {
        // delete all connections of the source
        source._connections.forEach(function (connection) {
          return connection.delete();
        });
        source._connections.length = 0;
      }
    }

    /**
     * prevent sources from garbage collection and thus the whole chain
     */

  }, {
    key: '_addScheduledSourcePointer',
    value: function _addScheduledSourcePointer(audioScheduledSourceNode) {
      this._activeSources.add(audioScheduledSourceNode);
    }

    /**
     * reallow sources to be garbage collected and thus the whole chain
     */

  }, {
    key: '_clearScheduledSourcePointer',
    value: function _clearScheduledSourcePointer(audioScheduledSourceNode) {
      this._activeSources.delete(audioScheduledSourceNode);
    }

    // @todo

  }, {
    key: 'resume',
    value: function resume() {
      return _promise2.default.resolve();
    }

    // @todo

  }, {
    key: 'supend',
    value: function supend() {
      return _promise2.default.resolve();
    }
  }, {
    key: 'close',
    value: function close() {
      this._pd.clear();
    }
  }, {
    key: 'createOscillator',
    value: function createOscillator() {
      return new _OscillatorNode2.default(this);
    }
  }, {
    key: 'createBufferSource',
    value: function createBufferSource() {
      return new _AudioBufferSourceNode2.default(this);
    }
  }, {
    key: 'createGain',
    value: function createGain() {
      return new _GainNode2.default(this);
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._pd.currentTime;
    }
  }]);
  return AudioContext;
}();

exports.default = AudioContext;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJwYXRjaGVzUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiQ29ubmVjdGlvbiIsImF1ZGlvQ29udGV4dCIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwiX3BhdGNoIiwiX29wZW5QYXRjaCIsImNoYW5uZWwiLCIkMCIsImFyZ3MiLCJBdWRpb05vZGUiLCJBdWRpb1BhcmFtIiwiX3BhcmVudCIsIl9uYW1lIiwiX3BkIiwic2VuZCIsImNsb3NlUGF0Y2giLCJBdWRpb0NvbnRleHQiLCJwZCIsImluaXRpYWxpemVkIiwiaW5pdCIsIm51bUlucHV0Q2hhbm5lbHMiLCJudW1PdXRwdXRDaGFubmVscyIsInNhbXBsZVJhdGUiLCJ0aWNrcyIsIkVycm9yIiwiQXVkaW9EZXN0aW5hdGlvbk5vZGUiLCJfc2NoZWR1bGVyIiwiU2NoZWR1bGVyIiwiY3VycmVudFRpbWUiLCJfYWN0aXZlU291cmNlcyIsInBhdGNoTmFtZSIsInBhdGNoIiwib3BlblBhdGNoIiwiaXNWYWxpZCIsImluZGV4IiwiX2Nvbm5lY3Rpb25zIiwiZmluZEluZGV4IiwiYyIsImNvbm5lY3Rpb24iLCJwdXNoIiwiVHlwZUVycm9yIiwiZGVsZXRlIiwic3BsaWNlIiwiZm9yRWFjaCIsImxlbmd0aCIsImF1ZGlvU2NoZWR1bGVkU291cmNlTm9kZSIsImFkZCIsInJlc29sdmUiLCJjbGVhciIsIk9zY2lsbGF0b3JOb2RlIiwiQXVkaW9CdWZmZXJTb3VyY2VOb2RlIiwiR2Fpbk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjQyxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBcEI7O0FBRUE7O0lBQ01DLFU7QUFDSixzQkFBWUMs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QkFFTztBQUNOLFdBQUtsQyxHQUFMLENBQVNtQyxLQUFUO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsYUFBTyxJQUFJQyx3QkFBSixDQUFtQixJQUFuQixDQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsYUFBTyxJQUFJQywrQkFBSixDQUEwQixJQUExQixDQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLGFBQU8sSUFBSUMsa0JBQUosQ0FBYSxJQUFiLENBQVA7QUFDRDs7O3dCQXpGaUI7QUFDaEIsYUFBTyxLQUFLdEMsR0FBTCxDQUFTZSxXQUFoQjtBQUNEOzs7OztrQkEwRllaLFkiLCJmaWxlIjoiQXVkaW9Db250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGQgZnJvbSAnbm9kZS1saWJwZCc7XG5pbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tICd3YXZlcy1tYXN0ZXJzJztcbmltcG9ydCBBdWRpb0Rlc3RpbmF0aW9uTm9kZSBmcm9tICcuL0F1ZGlvRGVzdGluYXRpb25Ob2RlJztcbmltcG9ydCBBdWRpb05vZGUgZnJvbSAnLi9BdWRpb05vZGUnO1xuaW1wb3J0IEF1ZGlvUGFyYW0gZnJvbSAnLi9BdWRpb1BhcmFtJztcblxuaW1wb3J0IE9zY2lsbGF0b3JOb2RlIGZyb20gJy4vT3NjaWxsYXRvck5vZGUnO1xuaW1wb3J0IEF1ZGlvQnVmZmVyU291cmNlTm9kZSBmcm9tICcuL0F1ZGlvQnVmZmVyU291cmNlTm9kZSc7XG5pbXBvcnQgR2Fpbk5vZGUgZnJvbSAnLi9HYWluTm9kZSc7XG5cbmNvbnN0IHBhdGNoZXNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3BkJyk7XG5cbi8qKiBAcHJpdmF0ZSAqL1xuY2xhc3MgQ29ubmVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGF1ZGlvQ29udGV4dCwgc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB0aGlzLl9wYXRjaCA9IHRoaXMuYXVkaW9Db250ZXh0Ll9vcGVuUGF0Y2goJ2FtZWl6ZS1jb25uZWN0aW9uLnBkJyk7XG5cbiAgICBjb25zdCBjaGFubmVsID0gYCR7dGhpcy5fcGF0Y2guJDB9LWNvbm5lY3RgO1xuICAgIGxldCBhcmdzO1xuXG4gICAgaWYgKGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgQXVkaW9Ob2RlKSB7XG4gICAgICBhcmdzID0gW2Ake3NvdXJjZS5fcGF0Y2guJDB9LW91dHB1dC0wYCAsIGAke2Rlc3RpbmF0aW9uLl9wYXRjaC4kMH0taW5wdXQtMGBdO1xuICAgIH0gZWxzZSBpZiAoZGVzdGluYXRpb24gaW5zdGFuY2VvZiBBdWRpb1BhcmFtKSB7XG4gICAgICBhcmdzID0gW2Ake3NvdXJjZS5fcGF0Y2guJDB9LW91dHB1dC0wYCAsIGAke2Rlc3RpbmF0aW9uLl9wYXJlbnQuX3BhdGNoLiQwfS0ke2Rlc3RpbmF0aW9uLl9uYW1lfS1hdWRpb2BdO1xuICAgIH1cblxuICAgIHRoaXMuYXVkaW9Db250ZXh0Ll9wZC5zZW5kKGNoYW5uZWwsIGFyZ3MpO1xuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIC8vIGNsb3NlIHBhdGNoXG4gICAgdGhpcy5hdWRpb0NvbnRleHQuX3BkLmNsb3NlUGF0Y2godGhpcy5fcGF0Y2gpO1xuICAgIC8vIGNsZWFuIHJlZmVyZW5jZXNcbiAgICAvLyBub3QgcmVhbGx5IG5lZWRlZCBhcyB0aGUgY29ubmVjdGlvbiBzaG91bGQgYmUgdW5yZWFjaGFibGUgYXQgdGhpcyBwb2ludFxuICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5kZXN0aW5hdGlvbiA9IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBodHRwczovL3dlYmF1ZGlvLmdpdGh1Yi5pby93ZWItYXVkaW8tYXBpLyNBdWRpb0NvbnRleHRcbiAqL1xuY2xhc3MgQXVkaW9Db250ZXh0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcGQgPSBwZDtcbiAgICAvLyB0aGlzLl9jb25uZWN0aW9ucyA9IFtdO1xuICAgIC8vIGluaXQgcGRcbiAgICBjb25zdCBpbml0aWFsaXplZCA9IHRoaXMuX3BkLmluaXQoe1xuICAgICAgLy8gdXNlIHRoZSBzYW1lIHBhcmFtZXRlcnMgYXMgdGhlIGF1ZGlvIGRyaXZlciwgaW5jbHVkaW5nIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgIG51bUlucHV0Q2hhbm5lbHM6IDAsXG4gICAgICBudW1PdXRwdXRDaGFubmVsczogMSxcbiAgICAgIHNhbXBsZVJhdGU6IDQ0MTAwLFxuICAgICAgdGlja3M6IDEsXG4gICAgfSk7XG5cbiAgICBpZiAoIWluaXRpYWxpemVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIGVycm9yIG9jY3VyZWQgd2hpbGUgaW5zdGFuY2lhdGluZyBsaWJwZCcpO1xuICAgIH1cblxuICAgIC8vIGluc3RhbmNpYXRlIGRlc3RpbmF0aW9uXG4gICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBBdWRpb0Rlc3RpbmF0aW9uTm9kZSh0aGlzKTtcbiAgICB0aGlzLl9zY2hlZHVsZXIgPSBuZXcgU2NoZWR1bGVyKCgpID0+IHtcbiAgICAgIHJldHVybiBwZC5jdXJyZW50VGltZTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2FjdGl2ZVNvdXJjZXMgPSBuZXcgU2V0KCk7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BkLmN1cnJlbnRUaW1lO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9vcGVuUGF0Y2gocGF0Y2hOYW1lKSB7XG4gICAgY29uc3QgcGF0Y2ggPSB0aGlzLl9wZC5vcGVuUGF0Y2gocGF0Y2hOYW1lLCBwYXRjaGVzUGF0aCk7XG5cbiAgICBpZiAoIXBhdGNoLmlzVmFsaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IG9wZW4gaW52YWxpZCBwYXRjaDogJHtwYXRjaH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhdGNoO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfY29ubmVjdChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgaWYgKGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgQXVkaW9Ob2RlIHx8wqBkZXN0aW5hdGlvbiBpbnN0YW5jZW9mIEF1ZGlvUGFyYW0pIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc291cmNlLl9jb25uZWN0aW9ucy5maW5kSW5kZXgoYyA9PiB7XG4gICAgICAgIHJldHVybiBjLnNvdXJjZSA9PT0gc291cmNlICYmIGMuZGVzdGluYXRpb24gPT09IGRlc3RpbmF0aW9uO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKHRoaXMsIHNvdXJjZSwgZGVzdGluYXRpb24pO1xuICAgICAgICBzb3VyY2UuX2Nvbm5lY3Rpb25zLnB1c2goY29ubmVjdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZhaWxlZCB0byBleGVjdXRlICdjb25uZWN0JyBvbiAnQXVkaW9Ob2RlJzogTm8gZnVuY3Rpb24gd2FzIGZvdW5kIHRoYXQgbWF0Y2hlZCB0aGUgc2lnbmF0dXJlIHByb3ZpZGVkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfZGlzY29ubmVjdChzb3VyY2UsIGRlc3RpbmF0aW9uID0gbnVsbCkge1xuICAgIGlmIChkZXN0aW5hdGlvbiBpbnN0YW5jZW9mIEF1ZGlvUGFyYW0gfHzCoGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgQXVkaW9Ob2RlKSB7XG4gICAgICAvLyBkZWxldGUgcmVsYXRlZCBjb25uZWN0aW9uXG4gICAgICBjb25zdCBpbmRleCA9IHNvdXJjZS5fY29ubmVjdGlvbnMuZmluZEluZGV4KGMgPT4ge1xuICAgICAgICByZXR1cm4gYy5zb3VyY2UgPT09IHNvdXJjZSAmJiBjLmRlc3RpbmF0aW9uID09PSBkZXN0aW5hdGlvbjtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBzb3VyY2UuX2Nvbm5lY3Rpb25zW2luZGV4XTtcbiAgICAgICAgY29ubmVjdGlvbi5kZWxldGUoKTtcbiAgICAgICAgc291cmNlLl9jb25uZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkZWxldGUgYWxsIGNvbm5lY3Rpb25zIG9mIHRoZSBzb3VyY2VcbiAgICAgIHNvdXJjZS5fY29ubmVjdGlvbnMuZm9yRWFjaChjb25uZWN0aW9uID0+IGNvbm5lY3Rpb24uZGVsZXRlKCkpO1xuICAgICAgc291cmNlLl9jb25uZWN0aW9ucy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBwcmV2ZW50IHNvdXJjZXMgZnJvbSBnYXJiYWdlIGNvbGxlY3Rpb24gYW5kIHRodXMgdGhlIHdob2xlIGNoYWluXG4gICAqL1xuICBfYWRkU2NoZWR1bGVkU291cmNlUG9pbnRlcihhdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUpIHtcbiAgICB0aGlzLl9hY3RpdmVTb3VyY2VzLmFkZChhdWRpb1NjaGVkdWxlZFNvdXJjZU5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlYWxsb3cgc291cmNlcyB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZCBhbmQgdGh1cyB0aGUgd2hvbGUgY2hhaW5cbiAgICovXG4gIF9jbGVhclNjaGVkdWxlZFNvdXJjZVBvaW50ZXIoYXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlKSB7XG4gICAgdGhpcy5fYWN0aXZlU291cmNlcy5kZWxldGUoYXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlKTtcbiAgfVxuXG4gIC8vIEB0b2RvXG4gIHJlc3VtZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvLyBAdG9kb1xuICBzdXBlbmQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcGQuY2xlYXIoKTtcbiAgfVxuXG4gIGNyZWF0ZU9zY2lsbGF0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBPc2NpbGxhdG9yTm9kZSh0aGlzKTtcbiAgfVxuXG4gIGNyZWF0ZUJ1ZmZlclNvdXJjZSgpIHtcbiAgICByZXR1cm4gbmV3IEF1ZGlvQnVmZmVyU291cmNlTm9kZSh0aGlzKTtcbiAgfVxuXG4gIGNyZWF0ZUdhaW4oKSB7XG4gICAgcmV0dXJuIG5ldyBHYWluTm9kZSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb0NvbnRleHQ7XG4iXX0=