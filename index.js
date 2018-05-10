/**
    * Sticky and unstick an element from the DOM
    * @param  {String} element   The element to stick
    * @param  {String} bound     The bounding element
    * @param  {Object} options   An object containing all the options
    * @return {Void}
*/

export default class Sticky {

    constructor(element, bound, options){
        const _ = this;
        // console.log('Sticky:constructor', element, bound);

        _.opts = {
            offset: 0,
            watchCSS: false
        }
        
        _.setOpts(options);

        // Set DOM vars
        _.$el = document.querySelector(element)
        _.$bound = document.querySelector(bound)

        // Return if element/bound doesn't exist
        if(_.$el === undefined || _.$bound === undefined) return;

        _.isActive = true;

        _.cloneElement()
        if(_.opts.watchCSS) _.watchCSS()

        // Bind events
        window.addEventListener('scroll', _.scroll.bind(_))
        window.addEventListener('resize', _.resize.bind(_))
    }

    setOpts(options) {
        const _ = this;
        // console.log('Sticky:setOpts');
        _.opts = Object.assign({}, _.opts, options);
    }

    // Clone the element to stick
    cloneElement(){
        const _ = this;
        // console.log('Sticky:cloneElement');

        _.$clone = _.$el.cloneNode(true)
        _.$el.parentElement.appendChild(_.$clone)

        Object.assign(_.$clone.style, {
            zIndex: '-999',
            visibility: 'hidden'
        });
        
        _.setSizes()
    }

    setSizes(){
        const _ = this;
        // console.log('Sticky:setSizes');

        const rect = _.$clone.getBoundingClientRect()
        _.el = {
            height: _.$el.offsetHeight,
            offsetTop: rect.top + window.scrollY,
            offsetLeft: rect.left + window.scrollX
        }
        _.boundHeight = _.$bound.offsetHeight
    }

    scroll(){
        const _ = this;
        // console.log('Sticky:scroll');
        
        if(!_.isActive) return

        if(
            !_.isSticky 
            && window.scrollY + _.opts.offset >= _.el.offsetTop
            && window.scrollY + _.opts.offset <= _.el.offsetTop + _.boundHeight - _.el.height
        ){
            Object.assign(_.$el.style, {
                position: 'fixed',
                top: `${_.opts.offset}px`,
                left: `${_.el.offsetLeft}px`
            });
            _.isSticky = true
        } else if(_.isSticky) {
            if(window.scrollY + _.opts.offset < _.el.offsetTop) {
                _.$el.removeAttribute('style')
                _.isSticky = false
            } else if (window.scrollY + _.opts.offset > _.el.offsetTop + _.boundHeight - _.el.height) {
                Object.assign(_.$el.style, {
                    position: '',
                    top: `${_.boundHeight - _.el.height + _.opts.offset}px`,
                    left: ''
                });
                _.isSticky = false
            }
        }
    }

    resize(){
        const _ = this;
        // console.log('Sticky:resize');
        
        if(_.opts.watchCSS) _.watchCSS()

        if(!_.opts.watchCSS || _.isActive) {
            _.setSizes()
            _.scroll()
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
    };
}
