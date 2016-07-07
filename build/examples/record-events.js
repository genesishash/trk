// Generated by IcedCoffeeScript 108.0.9
(function() {
  var Trk, creatives, data, domains, e, event_obj, events, iced, offers, r, random_arr, random_ip, start, trk, x, _, __iced_deferrals, __iced_k, __iced_k_noop, _i,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  _ = require('wegweg')({
    globals: true
  });

  Trk = require('./../module');

  trk = new Trk({
    redis: _.redis(),
    key: 'examples',
    map: {
      bmp: ['ip'],
      add: ['event', 'event~offer', 'event~offer~creative', 'event~offer~channel', 'event~offer~s1', 'event~offer~s2', 'event~offer~s3', 'event~offer~creative~s1', 'event~offer~creative~s2', 'event~offer~creative~s3'],
      top: ['geo', 'offer', 'geo~offer', 'offer~creative', 'offer~host', 'offer~ref']
    }
  });

  random_ip = (function() {
    return [_.rand(1, 128), _.rand(0, 255), _.rand(0, 255), _.rand(0, 255)].join('.');
  });

  random_arr = function(a) {
    return _.first(_.shuffle(a));
  };

  events = ['offer_impression', 'offer_impression', 'offer_impression', 'offer_click', 'offer_conversion'];

  offers = ['526aa9fff3e8b600000000e5', '526aa9fff3e8b60000000002', '526aa9fff3e8b6000000000b', '526aa9fff3e8b6000000000b', '526aa9fff3e8b6000000000b'];

  creatives = ['c_0', 'c_1', 'c_2'];

  domains = ['aol.com', 'google.com', 'gmail.com', 'hotmail.com', 'example.com'];

  data = [];

  for (x = _i = 1; _i <= 25000; x = ++_i) {
    data.push({
      ip: random_ip(),
      event: random_arr(events),
      geo: random_arr(['US', 'US', 'US', 'UK']),
      chan: random_arr(['any', 'text', 'text']),
      offer: random_arr(offers),
      creative: random_arr(creatives),
      ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
      host: random_arr(domains),
      ref_host: random_arr(domains)
    });
  }

  start = new Date;

  (function(_this) {
    return (function(__iced_k) {
      var _j, _len, _ref, _results, _while;
      _ref = data;
      _len = _ref.length;
      _j = 0;
      _while = function(__iced_k) {
        var _break, _continue, _next;
        _break = __iced_k;
        _continue = function() {
          return iced.trampoline(function() {
            ++_j;
            return _while(__iced_k);
          });
        };
        _next = _continue;
        if (!(_j < _len)) {
          return _break();
        } else {
          event_obj = _ref[_j];
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              filename: "/Users/douglaslauer/www/trk/src/examples/record-events.iced"
            });
            trk.record(event_obj, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  e = arguments[0];
                  return r = arguments[1];
                };
              })(),
              lineno: 84
            }));
            __iced_deferrals._fulfill();
          })(function() {
            if (e) {
              throw e;
            }
            return _next();
          });
        }
      };
      _while(__iced_k);
    });
  })(this)((function(_this) {
    return function() {
      log("Finished in " + (new Date - start) + "ms");
      return process.exit(0);
    };
  })(this));

}).call(this);
