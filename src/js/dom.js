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
      if (selector === 'document') {
        this.selector = document.body;
      }
      else {
        this.selector = document.querySelectorAll(selector);
      }

      this.length = this.selector.length;
    }

    each(callback) {
      if (!callback || typeof callback !== 'function') {
        return;
      }

      this.selector.forEach(function(element, index) {
        callback(element, index);
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
        if(element.classList.contains(className)) {
          result = true;
        }
        else {
          result = false;
        }
      });

      return result;

    }
  }

  function $d(selector) {
    return new Dom(selector);
  }

  window.$d = $d;

  return $d;
}));