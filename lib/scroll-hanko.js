import closest from 'closest';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import CustomEvent from 'custom-event';

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
    this.element.classList.add('hanko-target');
    this.element.classList.add('hanko-deactive');
    this.entered = false;
    const detail = {hanko: this};
    this.events = {
      enter: new CustomEvent('hankoenter', {detail}),
      leave: new CustomEvent('hankoleave', {detail}),
      enterend: new CustomEvent('hankoenterend', {detail}),
      leaveend: new CustomEvent('hankoleaveend', {detail})
    };

    this.handleTransitionend = this.createTransitionendHandler();
    this.element.addEventListener('transitionend', this.handleTransitionend);
  }

  get height() {
    return this.element.clientHeight;
  }

  get halfHeight() {
    return Math.round(this.element.clientHeight / 2);
  }

  get offsets() {
    const _attrs = (this.element.getAttribute('data-hanko-offset') || '')
                   .split(' ');
    if (_attrs.length > 2) {
      console.warn('Specify up to two.', _attrs);
    }
    const attrs = _attrs.slice(0, 2);
    while (attrs.length !== 2) {
      attrs.push(0);
    }

    return attrs.map(attr => {
      switch (attrs) {
        case 'center': {
          return Math.round(window.innerHeight / 2) - this.halfHeight;
        }
        case 'bottom': {
          return Math.round(window.innerHeight / 2) - this.height;
        }
        case 'top':
        default: {
          if (/px|r?em|%|vw|vh|vmax|vmin/.test(attr)) {
            let tmp = document.createElement('div');
            Object.assign(tmp.style, {
              position: 'absolute',
              left: '9999px',
              top: '9999px',
              width: attr
            });
            this.element.parentElement.insertBefore(tmp, this.element);
            const n = Number(getComputedStyle(tmp).width.match(/^\d+/)[0]);
            this.element.parentElement.removeChild(tmp);
            tmp = null;
            return n;
          }
          return 0;
        }
      }
    });
  }

  setWidth() {
    const css = window.getComputedStyle(this.closest);
    return `calc(${css.width} - ${css.paddingLeft} - ${css.paddingRight})`;
  }

  hasTransition() {
    const css = window.getComputedStyle(this.element);
    if (css.transitionDuration !== '0s') {
      return true;
    }
    return false;
  }

  createTransitionendHandler() {
    return () => {
      this.element.classList.remove('hanko-enter-to');
      this.element.classList.remove('hanko-leave-to');
      if (this.entered) {
        this.element.dispatchEvent(this.events.enterend);
      } else {
        this.element.dispatchEvent(this.events.leaveend);
      }
    };
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

  isEnter() {
    const {top} = this.element.getBoundingClientRect();
    const offsetTop = Math.floor(top + window.pageYOffset);

    const scrollTop = document.body.scrollTop;
    if (offsetTop - this.offsets[0] <= scrollTop &&
        offsetTop - this.offsets[1] + this.height > scrollTop) {
      return true;
    }
    return false;
  }

  enter() {
    if (this.entered) {
      return;
    }

    this.entered = true;
    this.element.classList.remove('hanko-deactive');
    this.element.classList.remove('hanko-leave');
    this.element.classList.remove('hanko-leave-to');
    this.element.classList.add('hanko-enter');
    this.element.style.transition = 'none';
    setTimeout(() => {
      this.element.classList.remove('hanko-enter');
      this.element.classList.add('hanko-active');
      this.element.style.transition = '';
      if (this.hasTransition()) {
        this.element.classList.add('hanko-enter-to');
      }
    }, 1);

    this.element.dispatchEvent(this.events.enter);
  }

  leave() {
    if (!this.entered) {
      return;
    }

    this.entered = false;
    this.element.classList.remove('hanko-active');
    this.element.classList.remove('hanko-enter');
    this.element.classList.remove('hanko-enter-to');
    this.element.classList.add('hanko-leave');
    this.element.style.transition = 'none';
    setTimeout(() => {
      this.element.classList.remove('hanko-leave');
      this.element.classList.add('hanko-deactive');
      this.element.style.transition = '';
      if (this.hasTransition()) {
        this.element.classList.add('hanko-leave-to');
      }
    }, 1);

    this.element.dispatchEvent(this.events.leave);
  }
}

export default class ScrollHanko {
  constructor(els, opts = {scrollWait: 20, resizeWait: 50}) {
    if (els instanceof HTMLCollection) {
      els = Array.prototype.slice.call(els);
    }
    this.hankos = els.map(el => new HankoElement(el));
    this.opts = opts;

    this.handleThrottleScroll = this.createThrottleScrollHandler();
    this.handleDebounceScroll = this.createDebounceScrollHandler();
    this.handleThrottleResize = this.createThrottleResizeHandler();
    this.handleDebounceResize = this.createDebounceResizeHandler();

    this.active = null;
  }

  get refs() {
    return this.hankos.reduce((result, hanko) => {
      const name = hanko.element.getAttribute('data-hanko-ref');
      if (name) {
        result[name] = hanko;
      }
      return result;
    }, {});
  }

  leave(ignores) {
    if (Array.isArray(ignores)) {
      this.hankos.forEach(hanko => {
        if (ignores.indexOf(hanko) === -1) {
          hanko.leave();
        }
      });
    } else {
      this.hankos.forEach(hanko => hanko.leave());
    }
  }

  handleScroll() {
    this.hankos.forEach((() => {
      return hanko => {
        const enter = hanko.isEnter();
        if (enter) {
          hanko.enter();
        } else {
          hanko.leave();
        }
      };
    })());
  }

  createThrottleScrollHandler() {
    return throttle(this.handleScroll.bind(this), this.opts.scrollWait || 20);
  }

  createDebounceScrollHandler() {
    return debounce(this.handleScroll.bind(this), this.opts.scrollWait || 20);
  }

  refresh() {
    this.hankos.forEach(hanko => {
      hanko.refresh();
    });
  }

  handleResize() {
    this.refresh();
  }

  createThrottleResizeHandler() {
    return throttle(this.handleResize.bind(this), this.opts.resizeWait || 50);
  }

  createDebounceResizeHandler() {
    return throttle(this.handleResize.bind(this), this.opts.resizeWait || 50);
  }

  init() {
    window.addEventListener('scroll', this.handleThrottleScroll);
    window.addEventListener('scroll', this.handleDebounceScroll);
    window.addEventListener('resize', this.handleThrottleResize);
    window.addEventListener('resize', this.handleDebounceResize);
  }
}
