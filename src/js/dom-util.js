(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.$d = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class DomElement {
    constructor(selector) {
      this.selector = document.querySelectorAll(selector);
      this.length = this.selector.length;
    }

     html(html) {
       this.selector.innerHTML = html;

       return this;
     }

     clear() {
       this.html('');

       return this;
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

     hasClass(className) {
       if (this.selector.classList.contains(className)) {
         return true;
       }
       else {
         return false;
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

       return this;
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

  class DomMediator {
    constructor(DomElement) {
      this.DomElement = DomElement;
      this.length = this.DomElement.length;
    }

    html(html) {
      this.DomElement.html(html);
    }

    clear() {
      this.DomElement.html('');
    }

    text(text) {
      this.DomElement.text(text);
    }

    addClass(className) {
      this.DomElement.addClass(className);
    }

    removeClass(className) {
      this.DomElement.remove(className);
    }

    toggleClass(className) {
      this.DomElement.toggleClass(className);
    }

    hasClass(className) {
      this.DomElement.hasClass(className)
    }

    attr(attrName, attrValue) {
      this.DomElement.attr(attrName, attrValue);
    };

    remove() {
      this.DomElement.remove();
    }

    prepend(element) {
      this.DomElement.prepend(element);
    }

    append(element) {
      this.DomElement.append(element);
    }

    previous() {
      this.DomElement.previous();
    }

    next() {
      this.DomElement.next();
    }

    parent() {
      this.DomElement.parent();
    }

    firstChild() {
      this.DomElement.firstChild();
    }

    lastChild() {
      this.DomElement.lastChild();
    }

    on(eventType, callback) {
      this.DomElement.on(eventType, callback);
    }
  }

  function $d(selector) {
    return new DomMediator(new DomElement(selector));
  }

  $d.create = function (tagName, className) {
    const element = document.createElement(tagName);

    if (className) {
      element.classList.add(className)
    }

    return element;
  };

  window.$d = $d;

  return $d;
}));