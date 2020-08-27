(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.$d = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class Dom {

    constructor(selector) {
      this.selector = this.getSelector(selector);
      this.length = this.selector.length;
    }

    getSelector(selector) {

      let that = this;
      let $s;

      if (Dom.cached[selector] === undefined || Object.values(Dom.cached).indexOf(selector) <= 0) {
        $s = that.constructor.queryOperations(selector);
        that.constructor.saveToCache(selector)
      }
      else {
        $s = that.constructor.queryOperations(selector, Dom.cached);
      }

      return $s;
    }

    static queryOperations(selector, cacheObject) {

      let result;

      if(typeof cacheObject === 'undefined') {

        if (selector === 'window' || selector === 'document' || selector === 'body') {
          result = document.querySelectorAll("body");
        }
        else {
          result = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
        }
      }
      else {
        if (selector === 'window' || selector === 'document' || selector === 'body') {
          cacheObject[selector] = document.querySelectorAll("body");
          result = cacheObject[selector];
        }
        else {
          cacheObject[selector] = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
          result = cacheObject[selector];
        }

      }

      return result
    }

    static saveToCache(selector) {
      Dom.cached[selector] = selector;
    }

    static clearCache() {
      Dom.cached = {};
    }

    each(callback) {
      if (!callback || typeof callback !== 'function') {
        return;
      }

      this.selector.forEach(function (element) {
        callback(element);
      });

      return this;
    }

    html(html) {

      this.each(function (element) {
        element.innerHTML = html;
      });

      return this;
    }

    text(text) {

      this.each(function (element) {
        element.textContent = text;
      });

      return this;
    }

    css(property, value) {

      this.each(function(element) {
        if(typeof property === 'string') {
          element.style[property] = value;
        }
        else if(typeof property === 'object') {
          for(let prop in property) {
            if(property.hasOwnProperty(prop)) {
              element.style[prop] = property[prop]
            }
          }
        }
      });

      return this;
    }

    addClass(className) {

      this.each(function (element) {
        element.classList.add(className);
      });

      return this;
    }

    removeClass(className) {

      this.each(function (element) {
        element.classList.remove(className);
      });

      return this;
    }

    toggleClass(className) {

      this.each(function (element) {
        if (element.classList.contains(className)) {
          element.classList.remove(className);
        }
        else {
          element.classList.add(className);
        }
      });

      return this;
    }

    hasClass(className) {

      let result;

      this.each(function (element) {
        if (element.classList.contains(className)) {
          result = true;
        }
        else {
          result = false;
        }
      });

      return result;
    }

    attr(attrName, attrValue) {

      let result;

      this.each(function (element) {
        if (!attrValue) {
          result = element.getAttribute(attrName)
        }
        else {
          result = element.setAttribute(attrName, attrValue);
          result = $d(element)
        }
      });

      return result;
    }

    prepend(content) {

      this.each(function (element) {
        element.insertAdjacentHTML("afterBegin", content);
      });

      return this;
    }

    append(content) {

      this.each(function (element) {
        element.insertAdjacentHTML("beforeEnd", content);
      });

      return this;
    }

    remove() {

      this.each(function (element) {
        element.remove();
      });

      this.constructor.clearCache();

      return this;
    }

    find(selector) {

      let result;

      this.each(function (element) {
        result = element.querySelector(selector);
      });

      return $d(result)
    }

    closest(selector) {

      let closestElement;

      this.each(function (element) {
        closestElement = element.closest(selector)
      })

      return $d(closestElement)
    }

    prev() {

      let previousElement;

      this.each(function (element) {
        previousElement = element.previousElementSibling;
      })

      return $d(previousElement)
    }

    next() {

      let nextElement;

      this.each(function (element) {
        nextElement = element.nextElementSibling;
      })

      return $d(nextElement)
    }

    on(...params) {

      this.each(function (element) {

        if(typeof params[1] === 'function') {
          element.addEventListener(params[0], params[1]);
        }
        else if(typeof params[1] === 'string') {
          element.addEventListener(params[0], function(event){
            let childElements = element.querySelectorAll(params[1]);
            childElements.forEach(function (childElement) {
              if(event.target === childElement){
                params[2].call(childElement, params[0]);
              }
            })
          });
        }

      });

      return this;
    }
  }

  function $d(selector) {
    return new Dom(selector);
  }

  Dom.cached = {};
  window.$d = $d;

  return $d;
}));