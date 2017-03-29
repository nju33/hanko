import Hanko from '../..';

(() => {
  const els = document.getElementsByClassName('headline');
  window.addEventListener('DOMContentLoaded', () => {
    (() => {
      const scrollHanko = new Hanko(els);
      scrollHanko.init();
      Array.prototype.slice.call(els).forEach(function (el) {
        el.addEventListener('hankoenter', ev => {
          console.log(el.id, ev.type);
          scrollHanko.leave([ev.detail.hanko]);
        });
        el.addEventListener('hankoleave', ev => {
          console.log(el.id, ev.type);
        });
        el.addEventListener('hankoenterend', ev => {
          console.log(el.id, ev.type);
        });
        el.addEventListener('hankoleaveend', ev => {
          console.log(el.id, ev.type);
        });
      });
    })();

    (() => {
      const scrollHanko =
        new Hanko(document.getElementsByClassName('ball'));
      scrollHanko.init();
    })();
  });
})();
