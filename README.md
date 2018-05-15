# Stick It

Lightweight plugin to stick an element of the DOM within a bounding container.
Pure vanilla javascript. No dependencies.

## Installation

``
yarn add stick-it
``

``
npm i stick-it
``

## Usage

```js
import stickIt from 'stick-it'

const Stky = new stickIt('js-sticky')
```

### Recommendation

The sticky element should be in `` position: absolute`` to avoid the content from jumping

## Options

```js
const Stky = new stickIt('js-sticky', {
    // options, defaults listed
    
    bound: 'body',
    // the bounding container
    
    class: false,
    // the class to be added to the element when it is stuck
    
    offset: {
        top: 0,
        bottom: 0
    },
    // The top/bottom offset of the initial position by of number of pixels
    
    watchCSS: false
    // watches the content of :after of the element
    // activates if #element:after { content: 'stick-it' }
}
```