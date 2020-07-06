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
          if (selector === 'window' || selector === 'document' || selector === 'body') {
              this.selector = document.querySelectorAll("body");
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

          this.selector.forEach(function(element) {
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

      attr(attrName, attrValue) {

          let result;

          this.each(function (element) {
              if(!attrValue) {
                  result = element.getAttribute(attrName)
              }
              else {
                  result = element.setAttribute(attrName, attrValue)
              }
          });

          return result;
      }

      remove() {

          this.each(function (element) {
              element.remove();
          });

          return this;
      }

      prepend(content) {

          this.each(function (element) {
              element.insertAdjacentHTML("beforeBegin", content);
          });

          return this;
      }

      append(content) {

          this.each(function (element) {
              element.insertAdjacentHTML("beforeEnd", content);
          });

          return this;
      }

      on(eventType, callback) {

          this.each(function (element) {
              element.addEventListener(eventType, callback);
          });

          return this;
      }
    }

    function $d(selector) {
        return new Dom(selector);
    }

    window.$d = $d;

    return $d;
}));