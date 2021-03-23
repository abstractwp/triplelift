(function () {

if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

var prototype = Array.prototype,
    push = prototype.push,
    splice = prototype.splice,
    join = prototype.join;

function DOMTokenList(el) {
  this.el = el;
  // The className needs to be trimmed and split on whitespace
  // to retrieve a list of classes.
  var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    push.call(this, classes[i]);
  }
};

DOMTokenList.prototype = {
  add: function(token) {
    if(this.contains(token)) return;
    push.call(this, token);
    this.el.className = this.toString();
  },
  contains: function(token) {
    return this.el.className.indexOf(token) != -1;
  },
  item: function(index) {
    return this[index] || null;
  },
  remove: function(token) {
    if (!this.contains(token)) return;
    for (var i = 0; i < this.length; i++) {
      if (this[i] == token) break;
    }
    splice.call(this, i, 1);
    this.el.className = this.toString();
  },
  toString: function() {
    return join.call(this, ' ');
  },
  toggle: function(token) {
    if (!this.contains(token)) {
      this.add(token);
    } else {
      this.remove(token);
    }

    return this.contains(token);
  }
};

window.DOMTokenList = DOMTokenList;

function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
        Object.defineProperty(obj, prop,{
            get : getter
        });
    } else {
        obj.__defineGetter__(prop, getter);
    }
}

defineElementGetter(Element.prototype, 'classList', function () {
  return new DOMTokenList(this);
});

})();

/**
* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
  /** version */
  var version = '3.7.3';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if(typeof elements != 'string'){
      elements = elements.join(' ');
    }
    if(typeof newElements != 'string'){
      newElements = newElements.join(' ');
    }
    html5.elements = elements +' '+ newElements;
    shivDocument(ownerDocument);
  }

   /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document|DocumentFragment} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,

    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  if(typeof module == 'object' && module.exports){
    module.exports = html5;
  }

}(typeof window !== "undefined" ? window : this, document));

var El = (function() {

  var s = {};
  var o = {
    class: 'generated'
  };

  /* Run through user settings and compare with El settings */
  var override = function(options) {
    s = o;

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        s[key] = options[key];
      }
    }
  };

  /* Create a new element given an object of options */
  var create = function(kind, options) {
    override(options);

    var newEl = document.createElement(kind);

    if (Array.isArray(s.class)) {
      s.class.forEach(function(className) {
        newEl.classList.add(className);
      });
    } else {
      newEl.classList.add(s.class);
    }

    if (s.type) newEl.type = s.type;
    if (s.value) newEl.value = s.value;
    if (s.innerHTML) newEl.innerHTML = s.innerHTML;

    if (s.attributes) {
      for (var attr in s.attributes) {
        if (s.attributes.hasOwnProperty(attr)) {
          newEl.setAttribute(attr.toString(), s.attributes[attr]);
        }
      }
    }

    if (s.on) newEl.addEventListener(s.on[0], s.on[1], false);

    return newEl;
  };

  return {
    create: create
  };

})();

var Lantern = (function() {

  var s = {};
  var o = {
    lantern: '.lantern',
    lanternLights: '.lantern-light',
    lightCollection: [],
    lightIndex: 0,
    previous: '#arrow-back',
    next: '#arrow-forward',
    close: '#close',
    vdom: {},
    activeClass: 'lantern-visible'
  };

  var init = function(options) {
    s = o;

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        s[key] = options[key];
      }
    }

    s.lantern = document.querySelector(s.lantern);
    s.lanternLights = document.querySelectorAll(s.lanternLights);

    if (document.body.contains(s.lantern)) {
      constructLantern();
      bindControls();
      bindLights();
    }
  };

  var constructLantern = function() {

    s.lantern.innerHTML = '<div class="lantern-content">' +
      '<img class="lantern-holder">' +
      '<button class="lantern-control lantern-control-previous"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + s.previous + '"></use></svg></button>' +
      '<button class="lantern-control lantern-control-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + s.next + '"></use></svg></button>' +
      '<button class="lantern-control lantern-control-close"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use></svg></button>' +
    '</div>';

    s.vdom.content = document.querySelector('.lantern-content');
    s.vdom.holder = document.querySelector('.lantern-holder');

    s.vdom.previous = document.querySelector('.lantern-control-previous');
    s.vdom.next = document.querySelector('.lantern-control-next');
    s.vdom.close = document.querySelector('.lantern-control-close');

  };

  var bindControls = function() {

    s.vdom.previous.addEventListener('click', function() {
      previousLight();
    });

    s.vdom.next.addEventListener('click', function() {
      nextLight();
    });

    s.vdom.close.addEventListener('click', function() {
      removeLight();
    });

  };

  var bindLights = function() {

    for (var i = 0; i < s.lanternLights.length; i++) {
      s.lanternLights[i].setAttribute('tabindex', '0');

      s.lanternLights[i].addEventListener('click', function(event) {
        displayLight(event);
      });

      s.lightCollection[i] = [];
      s.lightCollection[i].push(
        s.lanternLights[i].getAttribute('src'),
        s.lanternLights[i].getAttribute('title')
      );
    }

  };

  var removeLight = function() {

    s.lantern.classList.remove(s.activeClass);

  };

  var previousLight = function() {

    if (s.lightIndex === 0) {
      s.lightIndex = s.lightCollection.length - 1;
    } else {
      s.lightIndex--;
    }

    setLight();

  };

  var nextLight = function() {

    if (s.lightIndex == s.lightCollection.length - 1) {
      s.lightIndex = 0;
    } else {
      s.lightIndex++;
    }

    setLight();

  };

  var displayLight = function(light) {

    grabLight(light);
    setLight();

    s.lantern.classList.add(s.activeClass);

  };

  var grabLight = function(light) {

    for (i = 0; i < s.lightCollection.length; i++) {

      if (light.target.getAttribute('src') == s.lightCollection[i][0]) {
        s.lightIndex = i;
      }

    }

  };

  var setLight = function() {

    s.vdom.holder.setAttribute('src', s.lightCollection[s.lightIndex][0]);
    s.vdom.holder.setAttribute('alt', s.lightCollection[s.lightIndex][1]);
    s.vdom.holder.setAttribute('title', s.lightCollection[s.lightIndex][1]);
    s.vdom.content.setAttribute('title', s.lightCollection[s.lightIndex][1]);

  };

  return {
    init: init,
    displayLight: displayLight
  };

})();

$(window).on("load", function(){

  if (document.getElementById("companyPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })

    if (window.innerWidth > 1023 ) {
      const pinTheDonkey = gsap.timeline( {
        scrollTrigger: {
          trigger: ".company-page-section.who-we-are",
          pin: ".sticky-animation-container",
          scrub: true,
          end: "100%",
          toggleActions: "play reverse play reverse",
        }
      });


      const careersSectionParallax = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".careers-section-container",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
    
      careersSectionParallax
      .to(
        '.careers-section-container .image-bg', 
        { 
          backgroundPosition: "center 20%",
          duration: 1 
        },"transition1"
      );
  

    }




    const missionSectionTransition = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".company-page-section.mission",
        scrub: true,
        start: "top center",
        end: "40% center",
        toggleActions: "play reverse play reverse",
      }
    });
  
    missionSectionTransition
    .to(
      '.company-page-sticky-animation.grey-mark', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition1"
    );




  }
});

if (document.getElementById("homepageJSIndicator")) {

gsap.config({nullTargetWarn:false});

document.addEventListener("DOMContentLoaded", function(event) {
  
  window.onload = function() {
    
     // OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
     window.requestAnimationFrame(function() {
    
      var tl = gsap.timeline({repeat: 0});

      tl.from(".homepage", {
        autoAlpha: 0,
      })
      
      tl.from(".homepage .phone-breakout", {
        opacity: 0, 
        y: 20,
        duration: .5,
        },
        "phone-breakout-slide-up"
      )
      
      tl.from(".homepage .phone-breakout img:nth-child(1)", {
        x: -10,  
        duration: .4,
        },
        "phone-breakout"
      )
      
      tl.from(".homepage .phone-breakout img:nth-child(2)", {
        opacity: 0,
        x: -10,  
        duration: .4,
      },
      "phone-breakout"
      )
      
      tl.from(".homepage .phone-breakout img:nth-child(3)", {
        scale: .95,
        x: 15,
        duration: .4,
      },
      "phone-breakout"
      )
      
      tl.from(".homepage .phone-breakout img:nth-child(4)", {
        scale: .9,
        y: 10,
        x: 30,
        duration: .4,
      },
      "phone-breakout"
      )
      
      tl.from(".homepage .phone-breakout img:nth-child(5)", {
        opacity: 0,
        scale: .9,
        y: 10,
        x: 30,
        duration: .4,
      },
      "phone-breakout"
      )
      
      tl.from(".homepage .phone-breakout img:nth-child(6)", {
        opacity: 0,
        scale: .9,
        y: 10,
        x: 30,
        duration: .4,
      },
      "phone-breakout-2"
      )
      
      tl.from(".homepage .phone-breakout .video", {
        opacity: 0,
        scale: .95,
        y: 5,
        x: 5,
        duration: 1
      },
      "phone-breakout-2"
      )
      
      tl.from(".homepage-hero .copy *", {
        opacity: 0,
        y: 10,
        duration: .3,
        stagger: .1
      }, "a")

      tl.from(".homepage-hero .cta", {
        opacity: 0,
        y: -10,
      }, "a")
      
      tl.from(".homepage .slider-arrow.left", {
        opacity: 0,
        scale: 0,
        duration: .3,
        x: 50,
      }, "a")
      
      tl.from(".homepage .slider-arrow.right", {
        opacity: 0,
        scale: 0,
        duration: .3,
        x: -50,
      }, "a")
            
      tl.from(".homepage-hero .swiper-pagination", {
        opacity: 0,
        y: -10,
      }, "a")

      
      
      const parallaxHomePageHero2 = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".homepage-hero",
          start: "top top",
          end: "100% center",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      });
      
      
      ScrollTrigger.matchMedia({
        "all": function() {
          parallaxHomePageHero2
            .to(
              ".homepage-hero .swiper-pagination", 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;
            parallaxHomePageHero2
            .to(
              '.homepage-hero .cta', 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;     
            parallaxHomePageHero2
            .to(
              '.homepage-hero .arrows', 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;
            parallaxHomePageHero2
            .to(
              '.homepage-hero .inner-slide', 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;       
        },
      
        "(min-width: 1024px)": function() {
          const parallaxHomePageHero = gsap.timeline( {    
            scrollTrigger: {
              trigger: ".homepage-hero",
              pin: ".swiper-container",
              start: "top top",
              end: "100% center",
              scrub: true,
            }
          });
      
          const parallaxHomePageHero2Large = gsap.timeline( {    
            scrollTrigger: {
              trigger: ".homepage-hero",
              start: "top top",
              end: "100% center",
              scrub: true,
            }
          });
      
          parallaxHomePageHero2Large
          .to(
            '.homepage-hero .copy > *', 
            { 
              opacity: 0, 
              duration: 1,
              y: -20,
              stagger: .3
            }, "a")
            ;

            const parallaxHomePageHero3Large = gsap.timeline( {    
              scrollTrigger: {
                trigger: ".homepage-hero",
                start: "20% top",
                end: "100% center",
                scrub: true,
              }
            });
        
            parallaxHomePageHero3Large
            .to(
              '.homepage-hero .phone-breakout > *', 
              { 
                y: -100,
                opacity: 0,
                duration: 5,
                stagger: -.5
              }, "b")
            ;      
        }
      })
      
      
      const whyTripleLiftParallax = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".why-triplelift",
          scrub: true,
          start: "-25% center",
          end: "top center",
          toggleActions: "play",
        }
      });
      
      whyTripleLiftParallax
        .from(
          '.why-triplelift h2', 
          { 
            opacity: 0, 
            duration: .5,
            y: 20
          })
        ;
      
      
      whyTripleLiftParallax
        .from(
          '.why-triplelift-section', 
          { 
            opacity: 0, 
            duration: 1,
            x: -10,
            stagger: .5
          });
      
      const exploreGalleryParallax = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".explore-our-gallery-container",
          scrub: true,
          end: "10%",
          toggleActions: "play",
        }
      });
      
      exploreGalleryParallax
        .to(
          '.why-triplelift-section', 
          { 
            duration: 1,
            y: -20,
        }, "exploreGallery");
      
      
      exploreGalleryParallax
        .from(
          '.explore-our-gallery-container > *', 
          { 
            opacity: .5,
            duration: .6,
        }, "exploreGallery");
      
      const weWorkWithParallax = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".we-work-with",
          start: "-15% center",
          end: "40% center",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
      
      weWorkWithParallax.from(".we-work-with h3", {
        opacity: 0,
        y: 40,
        duration: .3,
      }, "weWorkWith")
      
      weWorkWithParallax.to(".explore-our-gallery-container ", {
        y: -100,
        duration: .6,
      }, "weWorkWith")
      
      weWorkWithParallax.from(".we-work-with .logo-grid", {
        opacity: 0,
        y: 20,
        duration: .08,
        stagger: .03
      }, "weWorkWith", "-=1.2")
      
      let headlines = gsap.utils.toArray('.we-work-with h4 .gradient-border');
      
      headlines.forEach(item =>{
        const weWorkWithHeadlineBorder = gsap.timeline( {    
          scrollTrigger: {
            trigger: item,
            scrub: true,
            toggleActions: "play reverse play reverse",
          }
        });
        
        weWorkWithHeadlineBorder.from(item, {
          x: "-100%",
          duration: .2,
        })
      })
      
      // section transitions 
      
      const whyTLGradientTL = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".why-triplelift",
          start: "-25% center",
          end: "200% center",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
      
      whyTLGradientTL
        .to(
          '.homepage-section-transition-container .section-transition.transition2', 
          { 
            opacity: 1, 
            duration: 1
          }, "why-triplelift"
      );
      
      const moveSectionBackground1 = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".why-triplelift",
          start: "top center",
          end: "300% bottom",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
      
      moveSectionBackground1
        .to(
          '.homepage-section-transition-container .section-transition.transition2', 
          { 
            backgroundPosition: "300% 0%",
            }, "explore"
      );

      ScrollTrigger.refresh();

      const moveSectionBackground2 = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".technology-breakouts",
          start: "top bottom",
          end: "500% bottom",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
      
      moveSectionBackground2
        .to(
          '.technology-breakouts .plusses', 
          { 
            y: -300,
          }, "plusses"
        );
       
     });
    
  };

});



}
$(window).on("load", function(){

  if (document.getElementById("ideasPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })

    const spotlessPodcastSeriesSectionTL = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".spotlessPodcastSeriesSectionContainer",
        scrub: true,
        start: "40% bottom",
        end: "80% 95%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    spotlessPodcastSeriesSectionTL
    .to(
      '.ideaspage-section-transition-container .section-transition.white', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition1"
    );

    spotlessPodcastSeriesSectionTL
    .to(
      '.ideaspage-section-transition-container .section-transition.gradientDark1', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );

  }
});

gsap.config({nullTargetWarn:false});

$(window).on("load", function () {

  // set up hamburger stuff

  $(".js-hamburger").click(function() {
    $(this).toggleClass("is-active");
    $(".fries").toggleClass("show");
    $("body").toggleClass("modal-open");
    $("body").toggleClass("menu-open");
  })

  $(".does-not-work").click(function(e) {
    alert("This does not work yet");
  })

  // Instantiate modals

  MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: true, // [9]
  });

  // Instantiate swipers
  const swiper = new Swiper('.swiper-container', {
    speed: 900,
    touchMoveStopPropagation: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.slider-arrow.right',
      prevEl: '.slider-arrow.left',
    },
    autoplay: {
      delay: 9000,
      disableOnInteraction: true
    },
  
  });

  $("body").click(function(){
    swiper.autoplay.stop();
  })

  $(window).scroll(function() {
    swiper.autoplay.stop();
  });

  $('.playVideoOnHover').each(function(){
    var iframe = $('.videoToPlayOnHover')[0];
    var player = new Vimeo.Player(iframe);
    player.pause();

  });

  $( ".playVideoOnHover" ).hover(
    function() {
      var iframe = $(this).find('.videoToPlayOnHover')[0];
      var player = new Vimeo.Player(iframe);
      player.play();
    }, function() {
      var iframe = $(this).find('.videoToPlayOnHover')[0];
      var player = new Vimeo.Player(iframe);
      player.pause();
    }
  );

});


// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {

    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {

      // Call our function and pass any params we received
      fn(...params);
    });

  }
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;    
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), {
  passive: true
});

// Update scroll position for first time
storeScroll();

window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);

var tl = gsap.timeline({repeat: 0});


tl.to(".loading", {
  opacity: 0,
  duration: .5,
})

tl.set(".burger-and-fries-container", {
  opacity: 1
})

tl.from("#navigation .logo-in-navigation", {
  y: -20,
  opacity: 0,
  duration: .2,
  delay: 1.2
})

tl.from("#navigation .burger-and-fries", {
  y: -20,
  opacity: 0,
  duration: .5,
  delay: .5
})

tl.from("#navigation .menu-on-large .main-nav a", {
  x: 50,
  y: -40,
  opacity: 0,
  duration: .2,
  stagger: {
    amount: .5
  },
})

tl.from(".down-arrow", {
  opacity: 0,
  y: -10,
  duration: .5
}
)

const downarrowTL = gsap.timeline( {    
scrollTrigger: {
  trigger: ".down-arrow",
  start: "20px center",
  scrub: true,
  toggleActions: "play reverse play reverse",
}
});

downarrowTL
.to(
  '.down-arrow', 
  { 
    opacity: 0, 
    duration: 2,
    y: 100
  }, 0.5)
;

let videoBordersToAnimate = gsap.utils.toArray('.animate-video-border-outer');

videoBordersToAnimate.forEach(item =>{
  const borderScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      scrub: true,
      start: "20% 80%",
      end: "50% 10%",
      toggleActions: "play reverse play reverse",
    }
  });
  
  borderScrollItem.from(item, {
    x: "-100%",
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 1,
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 0,
    x: "100%",
    duration: .4,
    delay: .5,
  })
  
})

let ctaBordersToAnimate = gsap.utils.toArray('.animate-border-outer');

ctaBordersToAnimate.forEach(item =>{
  const borderScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      start: "10%, 70%",
      end: "90% 10%",
      scrub: true,
      toggleActions: "play pause play pause",
    }
  });
  
  borderScrollItem.from(item, {
    x: "-100%",
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 1,
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 0,
    x: "100%",
    duration: .4,
    delay: .5,
  })
  
})

let texturesToAnimateUp = gsap.utils.toArray('.vertical-texture-animation');

texturesToAnimateUp.forEach(item =>{
  const textureScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      scrub: true,
      end: "100%",
      toggleActions: "play reverse play reverse",
    }
  });
  
  textureScrollItem.from(item, {
    backgroundPosition: "0px 200px",
    duration: 6,
    stagger: 1
  })
  
})
$(window).on("load", function(){

  if (document.getElementById("productPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })
  
    var laptopBreakout = gsap.timeline({repeat: 0, delay: 1});
  
    laptopBreakout.from(".laptop-breakout", {
      y: 20,
      duration: .5,
      },
      "laptop-breakout-slide-up"
    )
  
    laptopBreakout.to(".laptop-breakout", {
      opacity: 1,
      duration: .5,
      },
      "laptop-breakout-slide-up"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(1)", {
      x: -10,  
      duration: .4,
      },
      "laptop-breakout"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(2)", {
      x: -10,  
      duration: .4,
    },
    "laptop-breakout"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(3)", {
      scale: .95,
      x: 15,
      duration: .4,
    },
    "laptop-breakout"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(4)", {
      scale: .9,
      y: 10,
      x: 30,
      duration: .4,
    },
    "laptop-breakout"
    )

    
    
    const creativeGallerySectionTL = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".creative-gallery-section-container",
        scrub: true,
        end: "5%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    creativeGallerySectionTL
    .to(
      '.productpage-section-transition-container .section-transition.section1', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition1"
    );
    
    creativeGallerySectionTL
    .to(
      '.productpage-section-transition-container .section-transition.white', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );
  
    const innovationHeaderSectionTLIntro = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".innovation-header-container",
        scrub: true,
        start: "20px center",
        end: "80px 20%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    innovationHeaderSectionTLIntro
    .to(
      '.productpage-section-transition-container .section-transition.white', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition2"
    );
    
    innovationHeaderSectionTLIntro
    .from(
      '.innovation-header-container .copy', 
      { 
        y: -10,
        duration: .6 
      },"transition2"
    );
  
  
    const fadeInFirstCTA = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".product-page-cta-1",
        start: "-40% center",
        end: "50% center",
        scrub: true,
        toggleActions: "play reverse play reverse",
      }
    });
  
    fadeInFirstCTA
    .from(
      '.product-page-cta-1', 
      { 
        opacity: .8, 
        duration: 1 
      },"transition5"
    );
  }
});

$(window).on("load", function(){

  if (document.getElementById("technologyPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })
  
    var OTTBreakout = gsap.timeline({repeat: 0, delay: 1});
  
    OTTBreakout.from(".OTT-breakout", {
      y: 20,
      duration: .5,
      },
      "OTT-breakout-slide-up"
    )
  
    OTTBreakout.to(".OTT-breakout", {
      opacity: 1,
      duration: .5,
      },
      "OTT-breakout-slide-up"
    )
    
    OTTBreakout.from(".OTT-breakout :nth-child(1)", {
      x: -10,  
      duration: .4,
      },
      "OTT-breakout"
    )
    
    OTTBreakout.from(".OTT-breakout :nth-child(2)", {
      opacity: 0,
      x: 10,  
      duration: .4,
    },
    "OTT-breakout"
    )
    
    OTTBreakout.from(".OTT-breakout :nth-child(3)", {
      opacity: 0,
      scale: .95,
      x: 15,
      duration: .4,
    },
    "OTT-breakout"
    )

    const computerVisionSectionTransition = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".technologySection1",
        scrub: true,
        end: "5%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    computerVisionSectionTransition
    .to(
      '.technologypage-section-transition-container .section-transition.section2', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );
  }
});
