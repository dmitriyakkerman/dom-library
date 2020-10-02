import {windowDomInterface} from "./interfaces/windowDomInterface";
import {DomInterface} from "./interfaces/DomInterface";

declare let window: windowDomInterface;

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.$d = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    class Dom implements DomInterface {
        public selector: any;
        public length: number;
        static cached: any;

        constructor(selector: any) {
            this.selector = this.getSelector(selector);
            this.length = this.selector.length;
        }

        private getSelector(selector:string) :object {
            let that = this;
            let $s;

            if (Dom.cached[selector] === undefined || Object.values(Dom.cached).indexOf(selector) <= 0) {
                $s = Dom.queryOperations(selector);
                Dom.saveToCache(selector)
            }
            else {
                $s = Dom.queryOperations(selector, Dom.cached);
            }

            return $s;
        }

        static queryOperations(selector:string, cacheObject:any = {}) :Element {
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

        static saveToCache(selector:string) :void {
            Dom.cached[selector] = selector;
        }

        static clearCache() :void {
            Dom.cached = {};
        }

        private each(callback:Function) :object {
            this.selector.forEach(function (element:Element) {
                callback(element);
            });

            return this;
        }

        public html(html:string) :object {
            this.each(function (element:Element) {
                element.innerHTML = html;
            });

            return this;
        }

        public text(text:string) :object {
            this.each(function (element:Element) {
                element.textContent = text;
            });

            return this;
        }

        public css(property: string | object, value:string) :object {
            this.each(function(element:HTMLElement) {
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

        public addClass(className:string) :object {
            this.each(function (element:Element) {
                element.classList.add(className);
            });

            return this;
        }

        public removeClass(className:string) :object {
            this.each(function (element:Element) {
                element.classList.remove(className);
            });

            return this;
        }

        public toggleClass(className:string) :object {
            this.each(function (element:Element) {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                }
                else {
                    element.classList.add(className);
                }
            });

            return this;
        }

        public hasClass(className:string) :boolean {
            let result;

            this.each(function (element:Element) {
                if (element.classList.contains(className)) {
                    result = true;
                }
                else {
                    result = false;
                }
            });

            return result;
        }

        public attr(attrName, attrValue) :string | object {
            let result;

            this.each(function (element:Element) {
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

        public prepend(content:string) :object {
            this.each(function (element:Element) {
                element.insertAdjacentHTML("afterBegin", content);
            });

            return this;
        }

        public append(content:string) :object {
            this.each(function (element:Element) {
                element.insertAdjacentHTML("beforeEnd", content);
            });

            return this;
        }

        public remove() :object {
            this.each(function (element:Element) {
                element.remove();
            });

            Dom.clearCache();

            return this;
        }

        public find(selector:string) :object {
            let result;

            this.each(function (element:Element) {
                result = element.querySelector(selector);
            });

            return $d(result)
        }

        public closest(selector:string) :object {
            let closestElement;

            this.each(function (element:Element) {
                closestElement = element.closest(selector)
            });

            return $d(closestElement)
        }

        public prev() :object {
            let previousElement;

            this.each(function (element:Element) {
                previousElement = element.previousElementSibling;
            });

            return $d(previousElement)
        }

        public next() :object {
            let nextElement;

            this.each(function (element:Element) {
                nextElement = element.nextElementSibling;
            });

            return $d(nextElement)
        }

        public parent() :object {
            let parent;

            this.each(function (element:Element) {
                parent = element.parentElement;
            });

            return $d(parent)
        }

        public first() :object {
            let firstChild;

            this.each(function(element:Element) {
                firstChild = element.firstElementChild
            });

            return $d(firstChild)
        }

        public last() :object {
            let lastChild;

            this.each(function(element:Element) {
                lastChild = element.lastElementChild
            });

            return $d(lastChild)
        }

        public on(...params) :object {
            this.each(function (element:Element) {
                if(typeof params[1] === 'function') {
                    element.addEventListener(params[0], params[1]);
                }
                else if(typeof params[1] === 'string') {
                    element.addEventListener(params[0], function(event:Event){
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

    function $d(selector:any) :object {
        return new Dom(selector);
    }

    Dom.cached = {};
    window.$d = $d;

    return $d;
}));