# Stick It

Lightweight plugin to stick an element of the DOM within a bounding container.

## Installation
```
yarn add stick-it
```

## Usage

```js
import stickIt from 'stick-it'

const Stky = new stickIt('js-sticky')
```

## Options

```js
const Stky = new stickIt('js-sticky', {
    // options, defaults listed
    
    bound: 'body',
    // the bounding container
    
    class: false,
    // the class to be added to the element when it is stuck
    
    offset: 0,
    // top offset of the initial sticking position by of number of pixels
    
    watchCSS: false
    // watches the content of :after of the element
    // activates if #element:after { content: 'stick-it' }
}
```