/**
 * Stick and unstick an element from the DOM
 * @param  {String} element   The element to stick
 * @param  {Object} options   An object containing all the options
*/

class stickIt {

    constructor(element, options){
        const _ = this;
        // console.log('stickIt:constructor', element);

        _.opts = {
            bound: 'body',
            class: false,
            offset: {
                top: 0,
                bottom: 0
            },
            watchCSS: false
        }

        // Expend with default options
        _.opts = Object.assign({}, _.opts, options);

        // Set DOM vars
        _.$el = document.querySelector(element)
        _.$bound = document.querySelector(_.opts.bound)

        // Return if element/bound doesn't exist
        if(_.$el === undefined || _.$bound === undefined) return;

        _.isActive = true;

        _.cloneElement()

        if(_.opts.watchCSS) {
            _.watchCSS()
        }

        _.update()

        // Bind events
        window.addEventListener('scroll', _.updateHandler = _.update.bind(_))
        window.addEventListener('resize', _.resizeHandler = _.resize.bind(_))
    }


    // Clone the element to stick
    cloneElement(){
        const _ = this;
        // console.log('stickIt:cloneElement');

        _.$clone = _.$el.cloneNode(true)
        // _.$el.parentElement.appendChild(_.$clone)
        _.$el.parentNode.insertBefore(_.$clone, _.$el.nextSibling);

        Object.assign(_.$clone.style, {
            zIndex: '-999',
            visibility: 'hidden'
        });

        _.setSizes()
    }

    setSizes(){
        const _ = this;
        // console.log('stickIt:setSizes');
        //
        console.log(this)

        const rect = _.$clone.getBoundingClientRect()
        _.el = {
            height: _.$el.offsetHeight,
            offsetTop: rect.top + window.scrollY,
            offsetLeft: rect.left + window.scrollX
        }
        _.boundHeight = _.$bound.offsetHeight
    }

    update(){
        const _ = this;
        // console.log('stickIt:update');

        if(!_.isActive) return

        if(
            !_.isSticky
            && window.scrollY + _.opts.offset.top >= _.el.offsetTop
            && window.scrollY + _.opts.offset.top <= _.el.offsetTop + _.boundHeight - _.el.height - _.opts.offset.bottom
        ){
            Object.assign(_.$el.style, {
                position: 'fixed',
                top: `${_.opts.offset.top}px`,
                left: `${_.el.offsetLeft}px`
            });

            if(_.opts.class) {
                _.$el.classList.add(_.opts.class)
            }

            _.isSticky = true

        } else if(_.isSticky) {
            if(window.scrollY + _.opts.offset.top < _.el.offsetTop) {
                _.$el.removeAttribute('style')

                if(_.opts.class) {
                    _.$el.classList.remove(_.opts.class)
                }

                _.isSticky = false

            } else if (window.scrollY + _.opts.offset.top > _.el.offsetTop + _.boundHeight - _.el.height - _.opts.offset.bottom) {
                Object.assign(_.$el.style, {
                    position: '',
                    top: `${_.boundHeight - _.el.height - _.opts.offset.bottom}px`,
                    left: ''
                });

                if(_.opts.class) {
                    _.$el.classList.remove(_.opts.class)
                }

                _.isSticky = false
            }
        }
    }

    resize(){
        const _ = this;
        // console.log('stickIt:resize');

        if(_.opts.watchCSS) _.watchCSS()

        if(!_.opts.watchCSS || _.isActive) {
            _.setSizes()
            _.update()
            if(_.isSticky) {
                _.$el.style.left = `${_.el.offsetLeft}px`
            }
        }

    }


    // Watch the :after property to activate/deactivate the sticky behavious
    watchCSS() {
        const _ = this;
        if ( !_.opts.watchCSS ) return;

        const afterContent = getComputedStyle( _.$el, ':after' ).content;

        // activate if :after { content: 'sticky' }
        if ( afterContent.indexOf('sticky') != -1 ) {
            _.isActive = true
        } else {
            _.isActive = false
            _.$el.removeAttribute('style')
        }
    }

    destroy() {
        const _ = this;
        // console.log('stickIt:destroy')

        _.$el.removeAttribute('style')

        if(_.opts.class) {
            _.$el.classList.remove(_.opts.class)
        }

        window.removeEventListener('scroll', _.updateHandler)
        window.removeEventListener('resize', _.resizeHanlder)
    }
}

module.exports = stickIt;
