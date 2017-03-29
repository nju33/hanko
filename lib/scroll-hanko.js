import closest from 'closest';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import CustomEvent from 'custom-event';
import autobind from 'autobind-decorator';

class HankoElement {
  constructor(element) {
    this.element = element;
    this.closest = (() => {
      const selector = element.getAttribute('data-hanko-closest');
      if (selector) {
        return closest(this.element, selector);
      }
      return null;
    })();
    if (this.closest !== null) {
      this.element.style.width = this.setWidth();
    }

    this.addClasses('target', 'deactive');
    this.entered = false;

    const detail = {hanko: this};
    this.events = {
      enter: new CustomEvent('hankoenter', {detail}),
      leave: new CustomEvent('hankoleave', {detail}),
      enterend: new CustomEvent('hankoenterend', {detail}),
      leaveend: new CustomEvent('hankoleaveend', {detail})
    };

    this.init();
  }

  init() {
    this.element.addEventListener('transitionend', this.handleTransitionend);
  }

  teardown() {
    this.element.removeEventListener('transitionend', this.handleTransitionend);
  }

  @autobind
  handleTransitionend() {
    this.removeClasses('enter-to', 'leave-to');
    if (this.entered) {
      this.element.dispatchEvent(this.events.enterend);
    } else {
      this.element.dispatchEvent(this.events.leaveend);
    }
  }

  get height() {
    return this.element.clientHeight;
  }

  get halfHeight() {
    return Math.round(this.element.clientHeight / 2);
  }

  get offsets() {
    const attr = (this.element.getAttribute('data-hanko-offset') || null);

    if (attr === null) {
      return 0;
    }

    switch (attr) {
      case 'center': {
        return Math.round(window.innerHeight / 2) - this.halfHeight;
      }
      case 'bottom': {
        return window.innerHeight - this.halfHeight;
      }
      case 'top':
      default: {
        if (/px|r?em|%|vw|vh|vmax|vmin/.test(attr)) {
          return this.calcWidth(attr);
        }
        return 0;
      }
    }
  }

  calcWidth(size) {
    let tmp = document.createElement('div');
    Object.assign(tmp.style, {
      position: 'absolute',
      left: '9999px',
      top: '9999px',
      height: size
    });
    this.element.parentElement.insertBefore(tmp, this.element);
    const num = Number(getComputedStyle(tmp).height.match(/^\d+/)[0]);
    this.element.parentElement.removeChild(tmp);
    tmp = null;
    return num;
  }

  setWidth() {
    const css = window.getComputedStyle(this.closest);
    return `calc(${css.width} - ${css.paddingLeft} - ${css.paddingRight})`;
  }

  hasTransition() {
    const css = getComputedStyle(this.element);
    return css.transitionDuration !== '0s';
  }

  hasPositionFixed() {
    const css = getComputedStyle(this.element);
    return css.position === 'fixed';
  }

  refresh() {
    const {top} = this.element.getBoundingClientRect();
    this.offsetTop = Math.floor(top + window.pageYOffset);

    if (this.entered) {
      if (this.closest !== null) {
        this.element.width = this.setWidth();
      }
    } else {
      this.element.style.width = '';
    }
  }

  addClasses(...classes) {
    classes.forEach(className => {
      this.element.classList.add('hanko-' + className);
    });
  }

  removeClasses(...classes) {
    classes.forEach(className => {
      this.element.classList.remove('hanko-' + className);
    });
  }

  isEnter() {
    const {top} = this.element.getBoundingClientRect();
    const offsetTop = Math.floor(top + window.pageYOffset);

    const scrollTop = document.body.scrollTop;
    if (offsetTop - this.offsets <= scrollTop &&
        offsetTop + this.offsets + this.height > scrollTop) {
      return true;
    }
    return false;
  }

  enter() {
    if (this.entered) {
      return;
    }

    this.entered = true;

    this.removeClasses('deactive', 'leave', 'leave-to');
    this.addClasses('enter');
    this.element.style.transition = 'none';
    setTimeout(() => {
      this.removeClasses('enter');
      this.addClasses('active');
      this.element.style.transition = '';
      if (this.hasTransition()) {
        this.addClasses('enter-to');
      }
    }, 1);

    this.element.dispatchEvent(this.events.enter);
  }

  leave() {
    if (!this.entered) {
      return;
    }

    this.entered = false;
    this.removeClasses('active', 'enter', 'enter-to');
    this.addClasses('leave');
    this.element.style.transition = 'none';
    setTimeout(() => {
      this.removeClasses('leave');
      this.addClasses('deactive');
      this.element.style.transition = '';
      if (this.hasTransition()) {
        this.addClasses('leave-to');
      }
    }, 1);

    this.element.dispatchEvent(this.events.leave);
  }
}

@autobind
export default class Hanko {
  constructor(els, opts = {scrollWait: 20, resizeWait: 50}) {
    if (els instanceof HTMLCollection) {
      els = Array.prototype.slice.call(els);
    }
    this.hankoElements = els.map(el => new HankoElement(el));
    this.opts = opts;

    this.handleThrottleScroll = this.createThrottleScrollHandler();
    this.handleDebounceScroll = this.createDebounceScrollHandler();
    this.handleThrottleResize = this.createThrottleResizeHandler();
    this.handleDebounceResize = this.createDebounceResizeHandler();

    this.active = null;
  }

  get refs() {
    return this.hankoElements.reduce((result, hanko) => {
      const name = hanko.element.getAttribute('data-hanko-ref');
      if (name) {
        result[name] = hanko;
      }
      return result;
    }, {});
  }

  leave(ignores) {
    if (Array.isArray(ignores)) {
      this.hankoElements.forEach(hanko => {
        if (ignores.indexOf(hanko) === -1) {
          hanko.leave();
        }
      });
    } else {
      this.hankos.forEach(hanko => hanko.leave());
    }
  }

  handleScroll() {
    this.hankoElements.forEach((() => {
      return hanko => {
        if (hanko.hasPositionFixed()) {
          return;
        } else if (hanko.isEnter()) {
          hanko.enter();
        } else {
          hanko.leave();
        }
      };
    })());
  }

  createThrottleScrollHandler() {
    return throttle(this.handleScroll, this.opts.scrollWait || 20);
  }

  createDebounceScrollHandler() {
    return debounce(this.handleScroll, this.opts.scrollWait || 20);
  }

  handleResize() {
    this.refresh();
  }

  createThrottleResizeHandler() {
    return throttle(this.handleResize, this.opts.resizeWait || 50);
  }

  createDebounceResizeHandler() {
    return throttle(this.handleResize, this.opts.resizeWait || 50);
  }

  refresh() {
    this.hankoElements.forEach(hanko => {
      hanko.refresh();
    });
  }

  init() {
    window.addEventListener('scroll', this.handleThrottleScroll);
    window.addEventListener('scroll', this.handleDebounceScroll);
    window.addEventListener('resize', this.handleThrottleResize);
    window.addEventListener('resize', this.handleDebounceResize);
    window.addEventListener('touchmove', () => {
      console.log(9);
      this.handleThrottleScroll();
    });
    // window.addEventListener('touchmove', this.handleThrottleScroll);
  }

  teardown() {
    window.removedEventListener('scroll', this.handleThrottleScroll);
    window.removedEventListener('scroll', this.handleDebounceScroll);
    window.removedEventListener('resize', this.handleThrottleResize);
    window.removedEventListener('resize', this.handleDebounceResize);
    this.hankoElements.forEach(hanko => {
      hanko.teardown();
    });
  }
}
