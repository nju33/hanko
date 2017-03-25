/*!
 * Copyright 2017, nju33
 * Released under the MIT License
 * https://github.com/nju33/scroll-hanko
 */
var ScrollHanko = (function () {
'use strict';

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

var index$1 = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

var matches = index$1;

var index = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode;

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode;
  }
};

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal || freeSelf || Function('return this')();

var _root = root$1;

var root = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root.Date.now();
};

var now_1 = now$1;

var root$2 = _root;

/** Built-in value references. */
var Symbol$2 = root$2.Symbol;

var _Symbol = Symbol$2;

var Symbol$3 = _Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol;
var getRawTag = _getRawTag;
var objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag;
var isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var isObject$3 = isObject_1;
var isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$3(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$3(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject$1 = isObject_1;
var now = now_1;
var toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce$1;

var debounce = debounce_1;
var isObject = isObject_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

var NativeCustomEvent = commonjsGlobal.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

var index$3 = useNative() ? NativeCustomEvent :

// IE >= 9
'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var HankoElement = function () {
  function HankoElement(element) {
    var _this = this;

    classCallCheck(this, HankoElement);

    this.element = element;
    this.closest = function () {
      var selector = element.getAttribute('data-hanko-closest');
      if (selector) {
        return index(_this.element, selector);
      }
      return null;
    }();
    if (this.closest !== null) {
      this.element.style.width = this.setWidth();
    }
    this.element.classList.add('hanko-target');
    this.element.classList.add('hanko-deactive');
    this.entered = false;
    var detail = { hanko: this };
    this.events = {
      enter: new index$3('hankoenter', { detail: detail }),
      leave: new index$3('hankoleave', { detail: detail }),
      enterend: new index$3('hankoenterend', { detail: detail }),
      leaveend: new index$3('hankoleaveend', { detail: detail })
    };

    this.handleTransitionend = this.createTransitionendHandler();
    this.element.addEventListener('transitionend', this.handleTransitionend);
  }

  createClass(HankoElement, [{
    key: 'setWidth',
    value: function setWidth() {
      var css = window.getComputedStyle(this.closest);
      return 'calc(' + css.width + ' - ' + css.paddingLeft + ' - ' + css.paddingRight + ')';
    }
  }, {
    key: 'hasTransition',
    value: function hasTransition() {
      var css = window.getComputedStyle(this.element);
      if (css.transitionDuration !== '0s') {
        return true;
      }
      return false;
    }
  }, {
    key: 'createTransitionendHandler',
    value: function createTransitionendHandler() {
      var _this2 = this;

      return function () {
        _this2.element.classList.remove('hanko-enter-to');
        _this2.element.classList.remove('hanko-leave-to');
        if (_this2.entered) {
          _this2.element.dispatchEvent(_this2.events.enterend);
        } else {
          _this2.element.dispatchEvent(_this2.events.leaveend);
        }
      };
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _element$getBoundingC = this.element.getBoundingClientRect(),
          top = _element$getBoundingC.top;

      this.offsetTop = Math.floor(top + window.pageYOffset);

      if (this.entered) {
        if (this.closest !== null) {
          this.element.width = this.setWidth();
        }
      } else {
        this.element.style.width = '';
      }
    }
  }, {
    key: 'isEnter',
    value: function isEnter() {
      var _element$getBoundingC2 = this.element.getBoundingClientRect(),
          top = _element$getBoundingC2.top;

      var offsetTop = Math.floor(top + window.pageYOffset);

      var scrollTop = document.body.scrollTop;
      if (offsetTop - this.offsets[0] <= scrollTop && offsetTop - this.offsets[1] + this.height > scrollTop) {
        return true;
      }
      return false;
    }
  }, {
    key: 'enter',
    value: function enter() {
      var _this3 = this;

      if (this.entered) {
        return;
      }

      this.entered = true;
      this.element.classList.remove('hanko-deactive');
      this.element.classList.remove('hanko-leave');
      this.element.classList.remove('hanko-leave-to');
      this.element.classList.add('hanko-enter');
      this.element.style.transition = 'none';
      setTimeout(function () {
        _this3.element.classList.remove('hanko-enter');
        _this3.element.classList.add('hanko-active');
        _this3.element.style.transition = '';
        if (_this3.hasTransition()) {
          _this3.element.classList.add('hanko-enter-to');
        }
      }, 1);

      this.element.dispatchEvent(this.events.enter);
    }
  }, {
    key: 'leave',
    value: function leave() {
      var _this4 = this;

      if (!this.entered) {
        return;
      }

      this.entered = false;
      this.element.classList.remove('hanko-active');
      this.element.classList.remove('hanko-enter');
      this.element.classList.remove('hanko-enter-to');
      this.element.classList.add('hanko-leave');
      this.element.style.transition = 'none';
      setTimeout(function () {
        _this4.element.classList.remove('hanko-leave');
        _this4.element.classList.add('hanko-deactive');
        _this4.element.style.transition = '';
        if (_this4.hasTransition()) {
          _this4.element.classList.add('hanko-leave-to');
        }
      }, 1);

      this.element.dispatchEvent(this.events.leave);
    }
  }, {
    key: 'height',
    get: function get() {
      return this.element.clientHeight;
    }
  }, {
    key: 'halfHeight',
    get: function get() {
      return Math.round(this.element.clientHeight / 2);
    }
  }, {
    key: 'offsets',
    get: function get() {
      var _this5 = this;

      var _attrs = (this.element.getAttribute('data-hanko-offset') || '').split(' ');
      if (_attrs.length > 2) {
        console.warn('Specify up to two.', _attrs);
      }
      var attrs = _attrs.slice(0, 2);
      while (attrs.length !== 2) {
        attrs.push(0);
      }

      return attrs.map(function (attr) {
        switch (attrs) {
          case 'center':
            {
              return Math.round(window.innerHeight / 2) - _this5.halfHeight;
            }
          case 'bottom':
            {
              return Math.round(window.innerHeight / 2) - _this5.height;
            }
          case 'top':
          default:
            {
              if (/px|r?em|%|vw|vh|vmax|vmin/.test(attr)) {
                var tmp = document.createElement('div');
                Object.assign(tmp.style, {
                  position: 'absolute',
                  left: '9999px',
                  top: '9999px',
                  width: attr
                });
                _this5.element.parentElement.insertBefore(tmp, _this5.element);
                var n = Number(getComputedStyle(tmp).width.match(/^\d+/)[0]);
                _this5.element.parentElement.removeChild(tmp);
                tmp = null;
                return n;
              }
              return 0;
            }
        }
      });
    }
  }]);
  return HankoElement;
}();

var ScrollHanko = function () {
  function ScrollHanko(els) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { scrollWait: 20, resizeWait: 50 };
    classCallCheck(this, ScrollHanko);

    if (els instanceof HTMLCollection) {
      els = Array.prototype.slice.call(els);
    }
    this.hankos = els.map(function (el) {
      return new HankoElement(el);
    });
    this.opts = opts;

    this.handleThrottleScroll = this.createThrottleScrollHandler();
    this.handleDebounceScroll = this.createDebounceScrollHandler();
    this.handleThrottleResize = this.createThrottleResizeHandler();
    this.handleDebounceResize = this.createDebounceResizeHandler();

    this.active = null;
  }

  createClass(ScrollHanko, [{
    key: 'leave',
    value: function leave(ignores) {
      if (Array.isArray(ignores)) {
        this.hankos.forEach(function (hanko) {
          if (ignores.indexOf(hanko) === -1) {
            hanko.leave();
          }
        });
      } else {
        this.hankos.forEach(function (hanko) {
          return hanko.leave();
        });
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      this.hankos.forEach(function () {
        return function (hanko) {
          var enter = hanko.isEnter();
          if (enter) {
            hanko.enter();
          } else {
            hanko.leave();
          }
        };
      }());
    }
  }, {
    key: 'createThrottleScrollHandler',
    value: function createThrottleScrollHandler() {
      return throttle_1(this.handleScroll.bind(this), this.opts.scrollWait || 20);
    }
  }, {
    key: 'createDebounceScrollHandler',
    value: function createDebounceScrollHandler() {
      return debounce_1(this.handleScroll.bind(this), this.opts.scrollWait || 20);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.hankos.forEach(function (hanko) {
        hanko.refresh();
      });
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      this.refresh();
    }
  }, {
    key: 'createThrottleResizeHandler',
    value: function createThrottleResizeHandler() {
      return throttle_1(this.handleResize.bind(this), this.opts.resizeWait || 50);
    }
  }, {
    key: 'createDebounceResizeHandler',
    value: function createDebounceResizeHandler() {
      return throttle_1(this.handleResize.bind(this), this.opts.resizeWait || 50);
    }
  }, {
    key: 'init',
    value: function init() {
      window.addEventListener('scroll', this.handleThrottleScroll);
      window.addEventListener('scroll', this.handleDebounceScroll);
      window.addEventListener('resize', this.handleThrottleResize);
      window.addEventListener('resize', this.handleDebounceResize);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.hankos.reduce(function (result, hanko) {
        var name = hanko.element.getAttribute('data-hanko-ref');
        if (name) {
          result[name] = hanko;
        }
        return result;
      }, {});
    }
  }]);
  return ScrollHanko;
}();

return ScrollHanko;

}());
