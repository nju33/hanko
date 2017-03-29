# Hanko

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Build Status](https://travis-ci.org/nju33/hanko.svg?branch=master)](https://travis-ci.org/nju33/hanko)

Do various things at the scroll position.

![screenshot](https://github.com/nju33/hanko/raw/master/images/screenshot.gif?raw=true)


## Install or Download

```sh
yarn add hanko
npm i -S hanko
```

Or access to [releases page](https://github.com/nju33/hanko/releases).
Then, download the latest version.

## Usage

```html
<!-- Target the following `.target` -->
<div class="target">...</div>
<div class="target">...</div>

<!-- The element after init () becomes like this -->
<div class="target hanko-target hanko-deactive"></div>

<!-- When entering the territory of elements, it becomes -->
<div class="target hanko-target hanko-active"></div>

<!--
  Just before becoming active,
  a class of `hanko-entry` is attached only for a moment,
  if there is a `transition`, `hanko-entry` is followed by
  a class of `hanko-entry-to` will be attached only during `transition-duration`.
-->
<div class="target hanko-target hanko-entry hanko-entry-to"></div>

<!--
  Just before becoming deactivated,
  classes `hanko-leave` and `hanko-leave-to` are attached.
-->
<div class="target hanko-target hanko-leave hanko-leave-to"></div>

<!--
  You can adjust the position of the entry and have the following.

  - top / When the element is at the top of the screen
  - center / When the element is in the center of the screen
  - bottom / When the element is at the bottom of the screen
  - css-value / 2em,10px,etc / Expand the territory by the value specified above the element
-->
<!-- default:'top' -->
<div data-hanko-offset="center">Heading 2</h2>

<!-- When reading by itself -->
<script src="/path/tp/apoc-sidebar.js"></script>
```

```js
import Hanko from 'hanko';

window.addEventListener('DOMContentLoaded', () => {
  const els = document.getElementsByClassName('target');
  const hanko = new Hanko(els);
  // Initialization
  hanko.init();

  // If you wanna use the following events
  for (const el of els) {
    // When entering the territory
    el.addEventListener('hankoenter', ev => {...});
    // When leaving the territory
    el.addEventListener('hankoleave', ev => {...});
    // When it becomes active
    el.addEventListener('hankoenterend', ev => {...});
    // When it becomes deactive
    el.addEventListener('hankoleaveend', ev => {...});
  }

  setTimeout(() => {
    // Deactivate all elements. (except for the `HTMLElement` element specified in `inoreElements`)
    hanko.leave([ignoreElements]);

    // Reset such as event
    hanko.teardown();
  }, 99999...)
});
```

### Example

- `test/fixtures/`
- `example/webpack/`

## LICENSE

The MIT License (MIT)

Copyright (c) 2017 nju33 <nju33.ki@gmail.com>
