(() => {
  const els = document.getElementsByClassName('headline');
  window.addEventListener('DOMContentLoaded', () => {
    (() => {
      const scrollHanko = new ScrollHanko(els);
      scrollHanko.init();

      for (const el of els) {
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
      }
    })();

    (() => {
      const scrollHanko =
        new ScrollHanko(document.getElementsByClassName('ball'));
      scrollHanko.init();
    })();
  });
})();
