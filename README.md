# Stick It

Lightweight plugin to stick an element of the DOM.

## Usage

```js
import stickIt from 'stick-it'

const Stky = new stickIt('js-sticky', 'body')
```

## Options

```js
const Stky = new stickIt('js-sticky', 'body', {
    // options, defaults listed
    
    offset: 0,
    // the offset top to stick the element
    
    watchCSS: false
    // watches the content of :after of the element
    // activates if #element:after { content: 'sticky' }
}
```