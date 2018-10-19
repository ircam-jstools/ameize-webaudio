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

var _AudioNode2 = require('./AudioNode');

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

/**
 * cf. https://webaudio.github.io/web-audio-api/#AudioScheduledSourceNode
 */

var AudioScheduledSourceNode = function (_AudioNode) {
  (0, _inherits3.default)(AudioScheduledSourceNode, _AudioNode);

  function AudioScheduledSourceNode(audioContext) {
    (0, _classCallCheck3.default)(this, AudioScheduledSourceNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioScheduledSourceNode.__proto__ || (0, _getPrototypeOf2.default)(AudioScheduledSourceNode)).call(this, audioContext, {
      numberOfInputs: 0
    }));

    _this.onended = noop;
    _this._onended = _this._onended.bind(_this);
    _this._events = [];

    _this._startCalled = false;
    _this._stopCalled = false;
    return _this;
  }

  /**
   * @private
   * scheduled interface
   */


  (0, _createClass3.default)(AudioScheduledSourceNode, [{
    key: 'advanceTime',
    value: function advanceTime(time) {
      var event = this._events.shift();
      var channel = this._patch.$0 + '-' + event.type;

      this._audioContext._pd.send(channel, true, time);

      var nextEvent = this._events[0];

      if (nextEvent) {
        // start event and stop already register
        return nextEvent.time;
      } else {
        // remove from scheduler
        return null;
      }
    }

    /** @private */

  }, {
    key: '_onended',
    value: function _onended() {
      this._audioContext._pd.unsubscribe(this._patch.$0 + '-ended', this._onended);

      this._audioContext._disconnect(this);
      // clear connections
      this._audioContext._clearScheduledSourcePointer(this);

      this.onended();
    }
  }, {
    key: 'start',
    value: function start(time) {
      if (this._startCalled || this._stopCalled) {
        throw InvalidStateError('Cannot call "start" twice on the same AudioScheduledSourceNode');
      }

      this._startCalled = true;

      var event = {
        time: time,
        type: 'start'
      };

      this._events.push(event);

      this._audioContext._addScheduledSourcePointer(this);
      this._audioContext._scheduler.add(this, time);
      this._audioContext._pd.subscribe(this._patch.$0 + '-ended', this._onended);
    }
  }, {
    key: 'stop',
    value: function stop(time) {
      if (!this._startCalled) {
        throw InvalidStateError('Cannot call "stop" before "start"');
      }

      if (this._events[0] && this._events[0].time > time) {
        throw InvalidStateError('Cannot call "stop" before "start"');
      }

      this._stopCalled = true;

      var event = {
        time: time,
        type: 'stop'
      };

      this._events.push(event);

      // start event has already been executed
      if (this._events.length === 0) {
        this._audioContext._scheduler.add(this, time);
      }
    }
  }]);
  return AudioScheduledSourceNode;
}(_AudioNode3.default);

exports.default = AudioScheduledSourceNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvU2NoZWR1bGVkU291cmNlTm9kZS5qcyJdLCJuYW1lcyI6WyJub29wIiwiQXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlIiwiYXVkaW9Db250ZXh0IiwibnVtYmVyT2ZJbnB1dHMiLCJvbmVuZGVkIiwiX29uZW5kZWQiLCJiaW5kIiwiX2V2ZW50cyIsIl9zdGFydENhbGxlZCIsIl9zdG9wQ2FsbGVkIiwidGltZSIsImV2ZW50Iiwic2hpZnQiLCJjaGFubmVsIiwiX3BhdGNoIiwiJDAiLCJ0eXBlIiwiX2F1ZGlvQ29udGV4dCIsIl9wZCIsInNlbmQiLCJuZXh0RXZlbnQiLCJ1bnN1YnNjcmliZSIsIl9kaXNjb25uZWN0IiwiX2NsZWFyU2NoZWR1bGVkU291cmNlUG9pbnRlciIsIkludmFsaWRTdGF0ZUVycm9yIiwicHVzaCIsIl9hZGRTY2hlZHVsZWRTb3VyY2VQb2ludGVyIiwiX3NjaGVkdWxlciIsImFkZCIsInN1YnNjcmliZSIsImxlbmd0aCIsIkF1ZGlvTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLEdBQU0sQ0FBRSxDQUFyQjs7QUFFQTs7OztJQUdNQyx3Qjs7O0FBQ0osb0NBQVlDLFlBQVosRUFBMEI7QUFBQTs7QUFBQSwwS0FDbEJBLFlBRGtCLEVBQ0o7QUFDbEJDLHNCQUFnQjtBQURFLEtBREk7O0FBS3hCLFVBQUtDLE9BQUwsR0FBZUosSUFBZjtBQUNBLFVBQUtLLFFBQUwsR0FBZ0IsTUFBS0EsUUFBTCxDQUFjQyxJQUFkLE9BQWhCO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLEVBQWY7O0FBRUEsVUFBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFWd0I7QUFXekI7O0FBRUQ7Ozs7Ozs7O2dDQUlZQyxJLEVBQU07QUFDaEIsVUFBTUMsUUFBUSxLQUFLSixPQUFMLENBQWFLLEtBQWIsRUFBZDtBQUNBLFVBQU1DLFVBQWEsS0FBS0MsTUFBTCxDQUFZQyxFQUF6QixTQUErQkosTUFBTUssSUFBM0M7O0FBRUEsV0FBS0MsYUFBTCxDQUFtQkMsR0FBbkIsQ0FBdUJDLElBQXZCLENBQTRCTixPQUE1QixFQUFxQyxJQUFyQyxFQUEyQ0gsSUFBM0M7O0FBRUEsVUFBTVUsWUFBWSxLQUFLYixPQUFMLENBQWEsQ0FBYixDQUFsQjs7QUFFQSxVQUFJYSxTQUFKLEVBQWU7QUFBRTtBQUNmLGVBQU9BLFVBQVVWLElBQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQUU7QUFDUCxlQUFPLElBQVA7QUFDRDtBQUNGOztBQUVEOzs7OytCQUNXO0FBQ1QsV0FBS08sYUFBTCxDQUFtQkMsR0FBbkIsQ0FBdUJHLFdBQXZCLENBQXNDLEtBQUtQLE1BQUwsQ0FBWUMsRUFBbEQsYUFBOEQsS0FBS1YsUUFBbkU7O0FBRUEsV0FBS1ksYUFBTCxDQUFtQkssV0FBbkIsQ0FBK0IsSUFBL0I7QUFDQTtBQUNBLFdBQUtMLGFBQUwsQ0FBbUJNLDRCQUFuQixDQUFnRCxJQUFoRDs7QUFFQSxXQUFLbkIsT0FBTDtBQUNEOzs7MEJBRUtNLEksRUFBTTtBQUNWLFVBQUksS0FBS0YsWUFBTCxJQUFxQixLQUFLQyxXQUE5QixFQUEyQztBQUN6QyxjQUFNZSxrQkFBa0IsZ0VBQWxCLENBQU47QUFDRDs7QUFFRCxXQUFLaEIsWUFBTCxHQUFvQixJQUFwQjs7QUFFQSxVQUFNRyxRQUFRO0FBQ1pELGNBQU1BLElBRE07QUFFWk0sY0FBTTtBQUZNLE9BQWQ7O0FBS0EsV0FBS1QsT0FBTCxDQUFha0IsSUFBYixDQUFrQmQsS0FBbEI7O0FBRUEsV0FBS00sYUFBTCxDQUFtQlMsMEJBQW5CLENBQThDLElBQTlDO0FBQ0EsV0FBS1QsYUFBTCxDQUFtQlUsVUFBbkIsQ0FBOEJDLEdBQTlCLENBQWtDLElBQWxDLEVBQXdDbEIsSUFBeEM7QUFDQSxXQUFLTyxhQUFMLENBQW1CQyxHQUFuQixDQUF1QlcsU0FBdkIsQ0FBb0MsS0FBS2YsTUFBTCxDQUFZQyxFQUFoRCxhQUE0RCxLQUFLVixRQUFqRTtBQUNEOzs7eUJBRUlLLEksRUFBTTtBQUNULFVBQUksQ0FBQyxLQUFLRixZQUFWLEVBQXdCO0FBQ3RCLGNBQU1nQixrQkFBa0IsbUNBQWxCLENBQU47QUFDRDs7QUFFRCxVQUFJLEtBQUtqQixPQUFMLENBQWEsQ0FBYixLQUFtQixLQUFLQSxPQUFMLENBQWEsQ0FBYixFQUFnQkcsSUFBaEIsR0FBdUJBLElBQTlDLEVBQW9EO0FBQ2xELGNBQU1jLGtCQUFrQixtQ0FBbEIsQ0FBTjtBQUNEOztBQUVELFdBQUtmLFdBQUwsR0FBbUIsSUFBbkI7O0FBRUEsVUFBTUUsUUFBUTtBQUNaRCxjQUFNQSxJQURNO0FBRVpNLGNBQU07QUFGTSxPQUFkOztBQUtBLFdBQUtULE9BQUwsQ0FBYWtCLElBQWIsQ0FBa0JkLEtBQWxCOztBQUVBO0FBQ0EsVUFBSSxLQUFLSixPQUFMLENBQWF1QixNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQUtiLGFBQUwsQ0FBbUJVLFVBQW5CLENBQThCQyxHQUE5QixDQUFrQyxJQUFsQyxFQUF3Q2xCLElBQXhDO0FBQ0Q7QUFDRjs7O0VBckZvQ3FCLG1COztrQkF3RnhCOUIsd0IiLCJmaWxlIjoiQXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1ZGlvTm9kZSBmcm9tICcuL0F1ZGlvTm9kZSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuLyoqXG4gKiBjZi4gaHR0cHM6Ly93ZWJhdWRpby5naXRodWIuaW8vd2ViLWF1ZGlvLWFwaS8jQXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlXG4gKi9cbmNsYXNzIEF1ZGlvU2NoZWR1bGVkU291cmNlTm9kZSBleHRlbmRzIEF1ZGlvTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGF1ZGlvQ29udGV4dCkge1xuICAgIHN1cGVyKGF1ZGlvQ29udGV4dCwge1xuICAgICAgbnVtYmVyT2ZJbnB1dHM6IDBcbiAgICB9KTtcblxuICAgIHRoaXMub25lbmRlZCA9IG5vb3A7XG4gICAgdGhpcy5fb25lbmRlZCA9IHRoaXMuX29uZW5kZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9ldmVudHMgPSBbXTtcblxuICAgIHRoaXMuX3N0YXJ0Q2FsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3RvcENhbGxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIHNjaGVkdWxlZCBpbnRlcmZhY2VcbiAgICovXG4gIGFkdmFuY2VUaW1lKHRpbWUpwqB7XG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLl9ldmVudHMuc2hpZnQoKTtcbiAgICBjb25zdCBjaGFubmVsID0gYCR7dGhpcy5fcGF0Y2guJDB9LSR7ZXZlbnQudHlwZX1gO1xuXG4gICAgdGhpcy5fYXVkaW9Db250ZXh0Ll9wZC5zZW5kKGNoYW5uZWwsIHRydWUsIHRpbWUpO1xuXG4gICAgY29uc3QgbmV4dEV2ZW50ID0gdGhpcy5fZXZlbnRzWzBdO1xuXG4gICAgaWYgKG5leHRFdmVudCkgeyAvLyBzdGFydCBldmVudCBhbmQgc3RvcCBhbHJlYWR5IHJlZ2lzdGVyXG4gICAgICByZXR1cm4gbmV4dEV2ZW50LnRpbWU7XG4gICAgfSBlbHNlIHsgLy8gcmVtb3ZlIGZyb20gc2NoZWR1bGVyXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX29uZW5kZWQoKSB7XG4gICAgdGhpcy5fYXVkaW9Db250ZXh0Ll9wZC51bnN1YnNjcmliZShgJHt0aGlzLl9wYXRjaC4kMH0tZW5kZWRgLCB0aGlzLl9vbmVuZGVkKTtcblxuICAgIHRoaXMuX2F1ZGlvQ29udGV4dC5fZGlzY29ubmVjdCh0aGlzKTtcbiAgICAvLyBjbGVhciBjb25uZWN0aW9uc1xuICAgIHRoaXMuX2F1ZGlvQ29udGV4dC5fY2xlYXJTY2hlZHVsZWRTb3VyY2VQb2ludGVyKHRoaXMpO1xuXG4gICAgdGhpcy5vbmVuZGVkKCk7XG4gIH1cblxuICBzdGFydCh0aW1lKSB7XG4gICAgaWYgKHRoaXMuX3N0YXJ0Q2FsbGVkIHx8wqB0aGlzLl9zdG9wQ2FsbGVkKSB7XG4gICAgICB0aHJvdyBJbnZhbGlkU3RhdGVFcnJvcignQ2Fubm90IGNhbGwgXCJzdGFydFwiIHR3aWNlIG9uIHRoZSBzYW1lIEF1ZGlvU2NoZWR1bGVkU291cmNlTm9kZScpO1xuICAgIH1cblxuICAgIHRoaXMuX3N0YXJ0Q2FsbGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgdGltZTogdGltZSxcbiAgICAgIHR5cGU6ICdzdGFydCcsXG4gICAgfTtcblxuICAgIHRoaXMuX2V2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgIHRoaXMuX2F1ZGlvQ29udGV4dC5fYWRkU2NoZWR1bGVkU291cmNlUG9pbnRlcih0aGlzKTtcbiAgICB0aGlzLl9hdWRpb0NvbnRleHQuX3NjaGVkdWxlci5hZGQodGhpcywgdGltZSk7XG4gICAgdGhpcy5fYXVkaW9Db250ZXh0Ll9wZC5zdWJzY3JpYmUoYCR7dGhpcy5fcGF0Y2guJDB9LWVuZGVkYCwgdGhpcy5fb25lbmRlZCk7XG4gIH1cblxuICBzdG9wKHRpbWUpIHtcbiAgICBpZiAoIXRoaXMuX3N0YXJ0Q2FsbGVkKSB7XG4gICAgICB0aHJvdyBJbnZhbGlkU3RhdGVFcnJvcignQ2Fubm90IGNhbGwgXCJzdG9wXCIgYmVmb3JlIFwic3RhcnRcIicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHNbMF0gJiYgdGhpcy5fZXZlbnRzWzBdLnRpbWUgPiB0aW1lKSB7XG4gICAgICB0aHJvdyBJbnZhbGlkU3RhdGVFcnJvcignQ2Fubm90IGNhbGwgXCJzdG9wXCIgYmVmb3JlIFwic3RhcnRcIicpO1xuICAgIH1cblxuICAgIHRoaXMuX3N0b3BDYWxsZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICB0aW1lOiB0aW1lLFxuICAgICAgdHlwZTogJ3N0b3AnLFxuICAgIH07XG5cbiAgICB0aGlzLl9ldmVudHMucHVzaChldmVudCk7XG5cbiAgICAvLyBzdGFydCBldmVudCBoYXMgYWxyZWFkeSBiZWVuIGV4ZWN1dGVkXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2F1ZGlvQ29udGV4dC5fc2NoZWR1bGVyLmFkZCh0aGlzLCB0aW1lKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9TY2hlZHVsZWRTb3VyY2VOb2RlO1xuIl19