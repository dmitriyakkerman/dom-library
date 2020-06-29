class DomUtil {
    constructor(selector, className) {
        this.selector = document.querySelector(selector);
        this.className = className;
    }

    html(html) {
        this.selector.innerHTML = html;

        return this;
    }

    clear() {
        this.html('')
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
        if(this.selector.classList.contains(className)) {
            this.selector.classList.remove(className)
        }
        else {
            this.selector.classList.add(className)
        }

        return this;
    }

    attr(attrName, attrValue) {
        if(!attrValue) {
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
        return this.selector.previousElementSibling
    }

    next() {
        return this.selector.nextElementSibling
    }

    parent() {
        return this.selector.parentElement
    }

    firstChild() {
        return this.selector.firstElementChild
    }

    lastChild() {
        return this.selector.lastElementChild
    }

    on(eventType, callback) {
        this.selector.addEventListener(eventType, callback)
    }

}

export function Dom(selector, className) {
    return new DomUtil(selector, className)
};

Dom.create = function(tagName, className) {
    let element = document.createElement(tagName);

    if(className) {
        element.classList.add(className)
    }

    return element;
};

Dom.find = function(selector) {
    let element = document.querySelector(selector);

    return element;
};

Dom.findAll = function(selectors) {
    let elements = document.querySelectorAll(selectors);

    return elements;
};