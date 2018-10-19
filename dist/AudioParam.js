'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _wavesMasters = require('waves-masters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioParam = function () {
  function AudioParam(parent, name) {
    (0, _classCallCheck3.default)(this, AudioParam);

    // super();

    this._parent = parent;
    this._name = name;

    // attribute float value;
    // attribute AutomationRate automationRate;
    // readonly attribute float defaultValue;
    // readonly attribute float minValue;
    // readonly attribute float maxValue;

    this._controlChannel = this._parent._patch.$0 + '-' + this._name + '-control';
    this._eventCounter = 0;
    this._events = [];
  }

  /** @private */


  (0, _createClass3.default)(AudioParam, [{
    key: '_registerEvent',
    value: function _registerEvent(event) {
      event.id = this._eventCounter += 1;

      this._events.push(event);
      this._events.sort(function (a, b) {
        if (a.time < b.time) {
          return -1;
        } else if (a.time > b.time) {
          return 1;
        } else {
          return a.id < b.id ? -1 : 1;
        }
      });

      if (this._events[0] === event) {
        this._parent._audioContext._scheduler.add(this, event.time);
      }
    }

    /**
     * @private
     * waves-masters scheduled interface
     */

  }, {
    key: 'advanceTime',
    value: function advanceTime(time) {
      var event = this._events.shift();

      if (event.type === 'cancel') {
        this._events.length = 0; // clear queue
      }

      this._parent._audioContext._pd.send(this._controlChannel, event.args, time);

      if (this._events.length > 0) {
        return this._events[0].time;
      } else {
        return null; // remove from master
      }
    }
  }, {
    key: 'setValueAtTime',
    value: function setValueAtTime(value, time) {
      var event = {
        time: time,
        args: ['setValue', value]
      };

      this._registerEvent(event);
    }
  }, {
    key: 'cancelAndHoldAtTime',
    value: function cancelAndHoldAtTime(cancelTime) {
      var event = {
        time: cancelTime,
        args: ['cancel']
      };

      this._registerEvent(event);
    }

    // keep

  }, {
    key: 'cancelScheduledValues',
    value: function cancelScheduledValues(cancelTime) {
      var event = {
        time: cancelTime,
        args: ['cancel']
      };

      this._registerEvent(event);
    }
  }, {
    key: 'linearRampToValueAtTime',
    value: function linearRampToValueAtTime(value, endTime) {
      var time = void 0;

      if (this._events.length > 0) {
        var lastEvent = this._events[this._events.length - 1];
        var lastEventType = lastEvent.args[0];

        switch (lastEventType) {
          case 'linearRampToValue':
          case 'exponentialRampToValue':
            time = lastEvent.time + lastEvent.args[2];
            break;
          default:
            time = lastEvent.time;
            break;
        }
      } else {
        time = this._parent._audioContext._pd.currentTime;
      }

      var duration = endTime - time;

      if (duration > 0) {
        var event = {
          time: time,
          args: ['linearRampToValue', value, duration]
        };

        this._registerEvent(event);
      }
    }
  }, {
    key: 'exponentialRampToValueAtTime',
    value: function exponentialRampToValueAtTime(value, endTime) {
      if (value <= 0) {
        throw new Error('Invalid target for exponentialRampToValueAtTime');
      }

      var time = void 0;

      if (this._events.length > 0) {
        var lastEvent = this._events[this._events.length - 1];
        var lastEventType = lastEvent.args[0];

        switch (lastEventType) {
          case 'linearRampToValue':
          case 'exponentialRampToValue':
            time = lastEvent.time + lastEvent.args[2];
            break;
          default:
            time = lastEvent.time;
            break;
        }
      } else {
        time = this._parent._audioContext._pd.currentTime;
      }

      var duration = endTime - time;

      if (duration > 0) {
        var event = {
          time: time,
          args: ['exponentialRampToValue', value, duration]
        };

        this._registerEvent(event);
      }
    }
  }, {
    key: 'setTargetAtTime',
    value: function setTargetAtTime(target, startTime, timeConstant) {
      console.error('to be implemented');
    }
  }, {
    key: 'setValueCurveAtTime',
    value: function setValueCurveAtTime(values, startTime, duration) {
      console.error('to be implemented');
    }
  }, {
    key: 'value',
    get: function get() {
      return null;
    },
    set: function set(value) {
      if (value === null) return;

      var event = {
        time: this._parent._audioContext._pd.currentTime,
        args: ['setValue', value]
      };

      this._registerEvent(event);
    }
  }]);
  return AudioParam;
}();

exports.default = AudioParam;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvUGFyYW0uanMiXSwibmFtZXMiOlsiQXVkaW9QYXJhbSIsInBhcmVudCIsIm5hbWUiLCJfcGFyZW50IiwiX25hbWUiLCJfY29udHJvbENoYW5uZWwiLCJfcGF0Y2giLCIkMCIsIl9ldmVudENvdW50ZXIiLCJfZXZlbnRzIiwiZXZlbnQiLCJpZCIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJ0aW1lIiwiX2F1ZGlvQ29udGV4dCIsIl9zY2hlZHVsZXIiLCJhZGQiLCJzaGlmdCIsInR5cGUiLCJsZW5ndGgiLCJfcGQiLCJzZW5kIiwiYXJncyIsInZhbHVlIiwiX3JlZ2lzdGVyRXZlbnQiLCJjYW5jZWxUaW1lIiwiZW5kVGltZSIsImxhc3RFdmVudCIsImxhc3RFdmVudFR5cGUiLCJjdXJyZW50VGltZSIsImR1cmF0aW9uIiwiRXJyb3IiLCJ0YXJnZXQiLCJzdGFydFRpbWUiLCJ0aW1lQ29uc3RhbnQiLCJjb25zb2xlIiwiZXJyb3IiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFHTUEsVTtBQUNKLHNCQUFZQyxNQUFaLEVBQW9CQyxJQUFwQixFQUEwQjtBQUFBOztBQUN4Qjs7QUFFQSxTQUFLQyxPQUFMLEdBQWVGLE1BQWY7QUFDQSxTQUFLRyxLQUFMLEdBQWFGLElBQWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFLRyxlQUFMLEdBQTBCLEtBQUtGLE9BQUwsQ0FBYUcsTUFBYixDQUFvQkMsRUFBOUMsU0FBb0QsS0FBS0gsS0FBekQ7QUFDQSxTQUFLSSxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDRDs7QUFFRDs7Ozs7bUNBQ2VDLEssRUFBTztBQUNwQkEsWUFBTUMsRUFBTixHQUFXLEtBQUtILGFBQUwsSUFBc0IsQ0FBakM7O0FBRUEsV0FBS0MsT0FBTCxDQUFhRyxJQUFiLENBQWtCRixLQUFsQjtBQUNBLFdBQUtELE9BQUwsQ0FBYUksSUFBYixDQUFrQixV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O3dCQXRIVztBQUNWLGFBQU8sSUFBUDtBQUNELEs7c0JBRVNiLEssRUFBTztBQUNmLFVBQUlBLFVBQVUsSUFBZCxFQUNFOztBQUVGLFVBQU1oQixRQUFRO0FBQ1pNLGNBQU0sS0FBS2IsT0FBTCxDQUFhYyxhQUFiLENBQTJCTSxHQUEzQixDQUErQlMsV0FEekI7QUFFWlAsY0FBTSxDQUFDLFVBQUQsRUFBYUMsS0FBYjtBQUZNLE9BQWQ7O0FBS0EsV0FBS0MsY0FBTCxDQUFvQmpCLEtBQXBCO0FBQ0Q7Ozs7O2tCQTRHWVYsVSIsImZpbGUiOiJBdWRpb1BhcmFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGltZUVuZ2luZSB9IGZyb20gJ3dhdmVzLW1hc3RlcnMnO1xuXG5cbmNsYXNzIEF1ZGlvUGFyYW0ge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQsIG5hbWUpIHtcbiAgICAvLyBzdXBlcigpO1xuXG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuXG4gICAgLy8gYXR0cmlidXRlIGZsb2F0IHZhbHVlO1xuICAgIC8vIGF0dHJpYnV0ZSBBdXRvbWF0aW9uUmF0ZSBhdXRvbWF0aW9uUmF0ZTtcbiAgICAvLyByZWFkb25seSBhdHRyaWJ1dGUgZmxvYXQgZGVmYXVsdFZhbHVlO1xuICAgIC8vIHJlYWRvbmx5IGF0dHJpYnV0ZSBmbG9hdCBtaW5WYWx1ZTtcbiAgICAvLyByZWFkb25seSBhdHRyaWJ1dGUgZmxvYXQgbWF4VmFsdWU7XG5cbiAgICB0aGlzLl9jb250cm9sQ2hhbm5lbCA9IGAke3RoaXMuX3BhcmVudC5fcGF0Y2guJDB9LSR7dGhpcy5fbmFtZX0tY29udHJvbGA7XG4gICAgdGhpcy5fZXZlbnRDb3VudGVyID0gMDtcbiAgICB0aGlzLl9ldmVudHMgPSBbXTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfcmVnaXN0ZXJFdmVudChldmVudCkge1xuICAgIGV2ZW50LmlkID0gdGhpcy5fZXZlbnRDb3VudGVyICs9IDE7XG5cbiAgICB0aGlzLl9ldmVudHMucHVzaChldmVudCk7XG4gICAgdGhpcy5fZXZlbnRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLnRpbWUgPCBiLnRpbWUpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlIGlmIChhLnRpbWUgPiBiLnRpbWUpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5pZCA8IGIuaWQgPyAtMSA6IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzWzBdID09PSBldmVudCkge1xuICAgICAgdGhpcy5fcGFyZW50Ll9hdWRpb0NvbnRleHQuX3NjaGVkdWxlci5hZGQodGhpcywgZXZlbnQudGltZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIHdhdmVzLW1hc3RlcnMgc2NoZWR1bGVkIGludGVyZmFjZVxuICAgKi9cbiAgYWR2YW5jZVRpbWUodGltZSkge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5fZXZlbnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NhbmNlbCcpIHtcbiAgICAgIHRoaXMuX2V2ZW50cy5sZW5ndGggPSAwOyAvLyBjbGVhciBxdWV1ZVxuICAgIH1cblxuICAgIHRoaXMuX3BhcmVudC5fYXVkaW9Db250ZXh0Ll9wZC5zZW5kKHRoaXMuX2NvbnRyb2xDaGFubmVsLCBldmVudC5hcmdzLCB0aW1lKTtcblxuICAgIGlmICh0aGlzLl9ldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1swXS50aW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDsgLy8gcmVtb3ZlIGZyb20gbWFzdGVyXG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICB0aW1lOiB0aGlzLl9wYXJlbnQuX2F1ZGlvQ29udGV4dC5fcGQuY3VycmVudFRpbWUsXG4gICAgICBhcmdzOiBbJ3NldFZhbHVlJywgdmFsdWVdLFxuICAgIH07XG5cbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIHNldFZhbHVlQXRUaW1lKHZhbHVlLCB0aW1lKSB7XG4gICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICB0aW1lOiB0aW1lLFxuICAgICAgYXJnczogWydzZXRWYWx1ZScsIHZhbHVlXSxcbiAgICB9O1xuXG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudChldmVudCk7XG4gIH1cblxuICBjYW5jZWxBbmRIb2xkQXRUaW1lKGNhbmNlbFRpbWUpIHtcbiAgICBjb25zdCBldmVudCA9IHtcbiAgICAgIHRpbWU6IGNhbmNlbFRpbWUsXG4gICAgICBhcmdzOiBbJ2NhbmNlbCddLFxuICAgIH07XG5cbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8vIGtlZXBcbiAgY2FuY2VsU2NoZWR1bGVkVmFsdWVzKGNhbmNlbFRpbWUpIHtcbiAgICBjb25zdCBldmVudCA9IHtcbiAgICAgIHRpbWU6IGNhbmNlbFRpbWUsXG4gICAgICBhcmdzOiBbJ2NhbmNlbCddLFxuICAgIH07XG5cbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHZhbHVlLCBlbmRUaW1lKSB7XG4gICAgbGV0IHRpbWU7XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGxhc3RFdmVudCA9IHRoaXMuX2V2ZW50c1t0aGlzLl9ldmVudHMubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBsYXN0RXZlbnRUeXBlID0gbGFzdEV2ZW50LmFyZ3NbMF07XG5cbiAgICAgIHN3aXRjaCAobGFzdEV2ZW50VHlwZSkge1xuICAgICAgICBjYXNlICdsaW5lYXJSYW1wVG9WYWx1ZSc6XG4gICAgICAgIGNhc2UgJ2V4cG9uZW50aWFsUmFtcFRvVmFsdWUnOlxuICAgICAgICAgIHRpbWUgPSBsYXN0RXZlbnQudGltZSArIGxhc3RFdmVudC5hcmdzWzJdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRpbWUgPSBsYXN0RXZlbnQudGltZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGltZSA9IHRoaXMuX3BhcmVudC5fYXVkaW9Db250ZXh0Ll9wZC5jdXJyZW50VGltZTtcbiAgICB9XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUgLSB0aW1lO1xuXG4gICAgaWYgKGR1cmF0aW9uID4gMCkge1xuICAgICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgIGFyZ3M6IFsnbGluZWFyUmFtcFRvVmFsdWUnLCB2YWx1ZSwgZHVyYXRpb25dLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSh2YWx1ZSwgZW5kVGltZSkge1xuICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFyZ2V0IGZvciBleHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lJylcbiAgICB9XG5cbiAgICBsZXQgdGltZTtcblxuICAgIGlmICh0aGlzLl9ldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbGFzdEV2ZW50ID0gdGhpcy5fZXZlbnRzW3RoaXMuX2V2ZW50cy5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGxhc3RFdmVudFR5cGUgPSBsYXN0RXZlbnQuYXJnc1swXTtcblxuICAgICAgc3dpdGNoIChsYXN0RXZlbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2xpbmVhclJhbXBUb1ZhbHVlJzpcbiAgICAgICAgY2FzZSAnZXhwb25lbnRpYWxSYW1wVG9WYWx1ZSc6XG4gICAgICAgICAgdGltZSA9IGxhc3RFdmVudC50aW1lICsgbGFzdEV2ZW50LmFyZ3NbMl07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGltZSA9IGxhc3RFdmVudC50aW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lID0gdGhpcy5fcGFyZW50Ll9hdWRpb0NvbnRleHQuX3BkLmN1cnJlbnRUaW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHRpbWU7XG5cbiAgICBpZiAoZHVyYXRpb24gPiAwKSB7XG4gICAgICBjb25zdCBldmVudCA9IHtcbiAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgYXJnczogWydleHBvbmVudGlhbFJhbXBUb1ZhbHVlJywgdmFsdWUsIGR1cmF0aW9uXSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRhcmdldEF0VGltZSh0YXJnZXQsIHN0YXJ0VGltZSwgdGltZUNvbnN0YW50KSB7XG4gICAgY29uc29sZS5lcnJvcigndG8gYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHNldFZhbHVlQ3VydmVBdFRpbWUodmFsdWVzLCBzdGFydFRpbWUsIGR1cmF0aW9uKSB7XG4gICAgY29uc29sZS5lcnJvcigndG8gYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvUGFyYW07XG4iXX0=