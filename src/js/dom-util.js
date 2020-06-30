(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Dom = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class DomUtil {
    constructor(selector) {
      this.selector = document.querySelector(selector);
    }

    html(html) {
      this.selector.innerHTML = html;

      return this;
    }

    clear() {
      this.html('');
    }

    text(text) {
      this.selector.textContent = text;

      return this;
    }

    addClass(className) {
      this.selector.classList.add(className);

      return this;
    }

    removeClass(className) {
      this.selector.classList.remove(className);

      return this;
    }

    toggleClass(className) {
      if (this.selector.classList.contains(className)) {
        this.selector.classList.remove(className);
      }
      else {
        this.selector.classList.add(className);
      }

      return this;
    }

    attr(attrName, attrValue) {
      if (!attrValue) {
        return this.selector.getAttribute('data-' + attrName);
      }
      else {
        return this.selector.setAttribute('data-' + attrName, attrValue);
      }
    };

    remove() {
      this.selector.remove();

      return this;
    }

    prepend(element) {
      this.selector.prepend(element);

      return this;
    }

    append(element) {
      this.selector.append(element);

      return this;
    }

    previous() {
      return this.selector.previousElementSibling;
    }

    next() {
      return this.selector.nextElementSibling;
    }

    parent() {
      return this.selector.parentElement;
    }

    firstChild() {
      return this.selector.firstElementChild;
    }

    lastChild() {
      return this.selector.lastElementChild;
    }

    on(eventType, callback) {
      this.selector.addEventListener(eventType, callback);
    }
  }

  function $d(selector) {
    return new DomUtil(selector);
  }

  $d.create = function (tagName, className) {
    const element = document.createElement(tagName);

    if (className) {
      element.classList.add(className)
    }

    return element;
  };

  $d.find = function (selector) {
    const element = document.querySelector(selector);

    return element;
  };

  $d.findAll = function (selectors) {
    const elements = document.querySelectorAll(selectors);

    return elements;
  };

  return $d;
}));
