"use strict";
exports.__esModule = true;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.$d = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    var Dom = /** @class */ (function () {
        function Dom(selector) {
            this.selector = this.getSelector(selector);
            this.length = this.selector.length;
        }
        Dom.prototype.getSelector = function (selector) {
            var that = this;
            var $s;
            if (Dom.cached[selector] === undefined || Object.values(Dom.cached).indexOf(selector) <= 0) {
                $s = Dom.queryOperations(selector);
                Dom.saveToCache(selector);
            }
            else {
                $s = Dom.queryOperations(selector, Dom.cached);
            }
            return $s;
        };
        Dom.queryOperations = function (selector, cacheObject) {
            if (cacheObject === void 0) { cacheObject = {}; }
            var result;
            if (typeof cacheObject === 'undefined') {
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
            return result;
        };
        Dom.saveToCache = function (selector) {
            Dom.cached[selector] = selector;
        };
        Dom.clearCache = function () {
            Dom.cached = {};
        };
        Dom.prototype.each = function (callback) {
            if (!callback || typeof callback !== 'function') {
                return;
            }
            this.selector.forEach(function (element) {
                callback(element);
            });
            return this;
        };
        Dom.prototype.html = function (html) {
            this.each(function (element) {
                element.innerHTML = html;
            });
            return this;
        };
        Dom.prototype.text = function (text) {
            this.each(function (element) {
                element.textContent = text;
            });
            return this;
        };
        Dom.prototype.css = function (property, value) {
            this.each(function (element) {
                if (typeof property === 'string') {
                    element.style[property] = value;
                }
                else if (typeof property === 'object') {
                    for (var prop in property) {
                        if (property.hasOwnProperty(prop)) {
                            element.style[prop] = property[prop];
                        }
                    }
                }
            });
            return this;
        };
        Dom.prototype.addClass = function (className) {
            this.each(function (element) {
                element.classList.add(className);
            });
            return this;
        };
        Dom.prototype.removeClass = function (className) {
            this.each(function (element) {
                element.classList.remove(className);
            });
            return this;
        };
        Dom.prototype.toggleClass = function (className) {
            this.each(function (element) {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                }
                else {
                    element.classList.add(className);
                }
            });
            return this;
        };
        Dom.prototype.hasClass = function (className) {
            var result;
            this.each(function (element) {
                if (element.classList.contains(className)) {
                    result = true;
                }
                else {
                    result = false;
                }
            });
            return result;
        };
        Dom.prototype.attr = function (attrName, attrValue) {
            var result;
            this.each(function (element) {
                if (!attrValue) {
                    result = element.getAttribute(attrName);
                }
                else {
                    result = element.setAttribute(attrName, attrValue);
                    result = $d(element);
                }
            });
            return result;
        };
        Dom.prototype.prepend = function (content) {
            this.each(function (element) {
                element.insertAdjacentHTML("afterBegin", content);
            });
            return this;
        };
        Dom.prototype.append = function (content) {
            this.each(function (element) {
                element.insertAdjacentHTML("beforeEnd", content);
            });
            return this;
        };
        Dom.prototype.remove = function () {
            this.each(function (element) {
                element.remove();
            });
            Dom.clearCache();
            return this;
        };
        Dom.prototype.find = function (selector) {
            var result;
            this.each(function (element) {
                result = element.querySelector(selector);
            });
            return $d(result);
        };
        Dom.prototype.closest = function (selector) {
            var closestElement;
            this.each(function (element) {
                closestElement = element.closest(selector);
            });
            return $d(closestElement);
        };
        Dom.prototype.prev = function () {
            var previousElement;
            this.each(function (element) {
                previousElement = element.previousElementSibling;
            });
            return $d(previousElement);
        };
        Dom.prototype.next = function () {
            var nextElement;
            this.each(function (element) {
                nextElement = element.nextElementSibling;
            });
            return $d(nextElement);
        };
        Dom.prototype.parent = function () {
            var parent;
            this.each(function (element) {
                parent = element.parentElement;
            });
            return $d(parent);
        };
        Dom.prototype.first = function () {
            var firstChild;
            this.each(function (element) {
                firstChild = element.firstElementChild;
            });
            return $d(firstChild);
        };
        Dom.prototype.last = function () {
            var lastChild;
            this.each(function (element) {
                lastChild = element.lastElementChild;
            });
            return $d(lastChild);
        };
        Dom.prototype.on = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.each(function (element) {
                if (typeof params[1] === 'function') {
                    element.addEventListener(params[0], params[1]);
                }
                else if (typeof params[1] === 'string') {
                    element.addEventListener(params[0], function (event) {
                        var childElements = element.querySelectorAll(params[1]);
                        childElements.forEach(function (childElement) {
                            if (event.target === childElement) {
                                params[2].call(childElement, params[0]);
                            }
                        });
                    });
                }
            });
            return this;
        };
        return Dom;
    }());
    function $d(selector) {
        return new Dom(selector);
    }
    Dom.cached = {};
    window.$d = $d;
    return $d;
}));
