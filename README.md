[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[npm-version-image]: https://img.shields.io/npm/v/vue-advanced-popover?maxAge=2592000
[npm-url]: https://www.npmjs.com/package/vue-advanced-popover

## vue-advanced-popover
Advanced Vue popover component

[![MIT][mit-image]][mit-url]
[![npm][npm-version-image]][npm-url]

#### Demo
You can check out demo page:
<a href="https://filiprak.github.io/vue-advanced-popover" target="_blank">
    click here
</a>

#### Installation
```bash
npm install vue-advanced-popover
```
or use script directly in the browser: `dist/vue-advanced-popover.min.js`

#### Usage
1. Setup
- npm:
```js
import Vue from 'vue';
import VueAdvancedPopover from 'vue-advanced-popover';

Vue.use(VueAdvancedPopover);
```
- directly in the browser:
```html
<script src="vue-advanced-popover.min.js"></script>
<script>
    Vue.use(VueAdvancedPopover);
</script>
```
Vue plugin `VueAdvancedPopover` exposes global `v-popover` component and `v-popover` directive.

2. Typical use:
```
<button v-popover="'my-popover'">Open popover</button>

<v-popover id="my-popover">
    Popover content
</v-popover>
```

#### Documentation
- <a href="https://filiprak.github.io/vue-advanced-popover/#/docs" target="_blank">
      Documentation Page
  </a>
- <a href="https://filiprak.github.io/vue-advanced-popover/#/playground" target="_blank">
      Playground Page
  </a>