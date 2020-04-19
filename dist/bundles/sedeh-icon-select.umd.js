(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/icon-select', ['exports', '@angular/core', '@angular/platform-browser', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['icon-select'] = {}), global.ng.core, global.ng.platformBrowser, global.ng.common));
}(this, (function (exports, core, platformBrowser, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var Preloader = /** @class */ (function () {
        function Preloader() {
            this.images = {};
        }
        Preloader.prototype.preload = function (selectId, list) {
            var _this = this;
            this.images[selectId] = {};
            list.map(function (item) {
                var img = (!item.type || item.type === 'image') ? item.value : item.poster;
                _this.image(selectId, img);
            });
        };
        Preloader.prototype.contains = function (selectId, url) {
            var loader = this.images[selectId];
            var image = loader ? loader[url] : undefined;
            return image !== undefined && image.width;
        };
        Preloader.prototype.image = function (selectId, url) {
            var loader = this.images[selectId];
            if (!loader) {
                loader = {};
                this.images[selectId] = loader;
            }
            var image = loader[url];
            if (!image) {
                image = new Image();
                image.setAttribute('crossOrigin', 'anonymous');
                image.src = url;
                loader[url] = image;
            }
            return image;
        };
        Preloader = __decorate([
            core.Injectable()
        ], Preloader);
        return Preloader;
    }());

    var globalActiveDropdown = [];
    /*
    * Like a regular dropdown, we want to set/get selectedIndex, select items on arrow up/down, and select item on click.
    */
    var ISelect = /** @class */ (function () {
        function ISelect(el, preloader, detector, renderer) {
            this.preloader = preloader;
            this.detector = detector;
            this.renderer = renderer;
            this.selectedIndex = 1;
            this.displayItems = [];
            this.favoriteItems = [];
            this.highlightIndex = 0;
            this.slideShowIndex = 0;
            this.searchedData = [];
            this.initianalized = false;
            this.config = {
                totalPage: 1,
                currentPage: 0,
                open: false,
                showFooter: false,
                hasError: false,
                isFocused: false,
                isSearch: false,
                loading: true,
                selectedItem: null
            };
            this.id = "";
            this.name = "";
            this.controlls = {
                firstPage: '',
                previousPage: '',
                nextPage: '',
                lastPage: ''
            };
            // showIconName should be handled by css from user
            // @Input("tile")
            // private configTile:boolean=true;
            this.searchEnabled = false;
            this.size = 3;
            // showIconName should be handled by css from user
            this.showIconName = false;
            this.slideShowEnabled = false;
            this.applyLayoutType = false;
            this.applyOpacity = false;
            this.applyPattern = false;
            this.applyAnimation = false;
            this.applySlideShow = false;
            this.entries = [];
            this.onchange = new core.EventEmitter();
            this.ontoggle = new core.EventEmitter();
            this.enabledShow = new core.EventEmitter();
            this.host = el.nativeElement;
        }
        ISelect.prototype.onClick = function ($event) {
            var inside = false;
            var node = $event.target;
            while (node.parentNode) {
                if (node === this.host) {
                    inside = true;
                    break;
                }
                node = node.parentNode;
            }
            if (!inside && this.iconBox && $event.target !== this.iconBox.nativeElement && this.config.open) {
                this.toggleIconSelector();
            }
        };
        ISelect.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!this.initianalized) {
                this.initianalized = true;
                this.displayItems = this.entries;
                for (var i = 0; i < this.entries.length; i++) {
                    this.entries[i].id = i;
                    this.entries[i].ownerId = this.id;
                    this.entries[i].repeat = this.entries[i].repeat ? this.entries[i].repeat : false;
                    if (this.entries[i].selected) {
                        this.selectedIndex = i;
                    }
                    if (this.entries[i].favorite) {
                        this.favoriteItems.push(this.entries[i]);
                    }
                }
                this.config.currentPage = Math.ceil(this.selectedIndex / (this.size - 1));
                this.highlightIndex = this.selectedIndex > 0 ?
                    this.selectedIndex - ((this.config.currentPage - 1) * this.size) : 0;
                this.renderIconContainer();
                globalActiveDropdown.push(this);
                if (this.config.totalPage > 1) {
                    this.config.loading = false;
                }
                this.config.selectedItem = this.displayItems[this.highlightIndex];
                if (this.config.selectedItem) {
                    this.preloader.contains(this.id, this.config.selectedItem.value);
                    if (!this.startSlideShow()) {
                        setTimeout(function () {
                            _this.ontoggle.emit(_this.config.selectedItem);
                        }, 66);
                    }
                }
                this.detector.detectChanges();
            }
        };
        ISelect.prototype.repeat = function (event) {
            if (this.config.selectedItem) {
                this.config.selectedItem.repeat = !this.config.selectedItem.repeat;
            }
        };
        ISelect.prototype.stopSlideShow = function () {
            if (this.slideShowInterval) {
                clearInterval(this.slideShowInterval);
                this.slideShowInterval = undefined;
                this.slideShowIndex = 0;
            }
        };
        ISelect.prototype.startSlideShow = function () {
            if (this.slideShowEnabled && this.favoriteItems.length > 1 && !this.slideShowInterval) {
                this.preloader.preload(this.id, this.favoriteItems);
                this.slideShowInterval = setInterval(this.slideShow.bind(this), 20000);
                return true;
            }
            return false;
        };
        ISelect.prototype.enableShow = function (event) {
            this.slideShowEnabled = !this.slideShowEnabled;
            this.enabledShow.emit(this.slideShowEnabled);
            if (this.slideShowEnabled) {
                this.startSlideShow();
            }
            else {
                this.stopSlideShow();
            }
        };
        ISelect.prototype.slideShow = function () {
            if (this.slideShowIndex === this.favoriteItems.length) {
                this.slideShowIndex = 0;
            }
            var item = this.favoriteItems[this.slideShowIndex];
            this.emitToggle(item, undefined);
            this.slideShowIndex++;
        };
        ISelect.prototype.addToFavorite = function (event) {
            if (this.config.selectedItem) {
                this.config.selectedItem.favorite = !this.config.selectedItem.favorite;
                if (this.config.selectedItem.favorite) {
                    this.preloader.image(this.id, this.config.selectedItem.value);
                    this.favoriteItems.push(this.config.selectedItem);
                }
                else {
                    var index = this.favoriteItems.indexOf(this.config.selectedItem);
                    this.favoriteItems.splice(index, 1);
                }
                this.startSlideShow();
            }
        };
        ISelect.prototype.mold = function (event) {
            var _this = this;
            if (this.config.selectedItem) {
                this.config.selectedItem.molded = !this.config.selectedItem.molded;
                this.stopSlideShow();
                this.emitChange(this.config.selectedItem, function () { return _this.startSlideShow(); });
            }
        };
        ISelect.prototype.keyboardTracker = function ($event) {
            var _this = this;
            $event.stopPropagation();
            $event.preventDefault();
            var key = $event.charCode || $event.keyCode || 0;
            if (key === 39 || key === 40) { //right or down arrow
                setTimeout(function () {
                    var index = _this.highlightIndex;
                    if (index < _this.displayItems.length - 1) {
                        _this.highlightIcon(index + 1);
                    }
                    else if (_this.config.currentPage < _this.config.totalPage) {
                        _this.next($event);
                    }
                }, 66);
            }
            else if (key === 37 || key === 38) { //left or up arrow
                setTimeout(function () {
                    var index = _this.highlightIndex;
                    if (index > 0) {
                        _this.highlightIcon(index - 1);
                    }
                    else if (_this.config.currentPage > 1) {
                        _this.prev($event);
                    }
                }, 66);
            }
            if (key === 40) {
                this.config.open = true;
                if (this.searchInput) {
                    setTimeout(function () {
                        if (_this.searchInput) {
                            _this.renderer.invokeElementMethod(_this.searchInput.nativeElement, 'focus', []);
                            _this.renderer.invokeElementMethod(_this.searchInput.nativeElement, 'select', []);
                        }
                    }, 66);
                }
            }
            else if (key === 38 && this.highlightIndex === 0) {
                this.config.open = false;
                if (this.searchButton) {
                    this.renderer.invokeElementMethod(this.searchButton.nativeElement, 'focus', []);
                }
            }
            return false;
        };
        ISelect.prototype.keyup = function (event) {
            var key = event.charCode || event.keyCode || 0;
            if (key === 13) {
                event.target.click();
            }
        };
        ISelect.prototype.performSearch = function ($event, searchString) {
            var key = $event.charCode || $event.keyCode || 0;
            if (key > 36 && key < 41) {
                return this.keyboardTracker($event);
            }
            if (searchString === '') {
                if (key === 13) {
                    this.keyboardTracker($event);
                    this.toggleIconSelector();
                    return;
                }
                this.resetSearch();
                return;
            }
            //this.searchIcon.removeClass('picker-icon-search');
            //this.searchIcon.addClass('picker-icon-cancel');
            this.config.isSearch = true;
            this.searchedData = [];
            for (var i = 0; i < this.entries.length; i++) {
                var info = this.entries[i];
                if (info.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
                    this.searchedData.push(info);
                }
            }
            if (this.searchedData.length) {
                this.config.currentPage = 1;
                this.highlightIndex = 0;
                this.config.selectedItem = this.searchedData[0];
                this.displayItems = this.searchedData;
                this.highlightIcon(this.highlightIndex);
            }
            else {
                this.config.selectedItem = null;
            }
            this.renderIconContainer();
            this.detector.detectChanges();
        };
        ISelect.prototype.resetSearch = function () {
            if (this.searchInput) {
                this.renderer.setElementAttribute(this.searchInput.nativeElement, 'value', '');
            }
            //this.searchIcon.removeClass('picker-icon-cancel');
            //this.searchIcon.addClass('picker-icon-search');
            this.config.currentPage = 1;
            this.config.isSearch = false;
            this.highlightIndex = 0;
            this.displayItems = this.entries;
            this.config.selectedItem = this.entries[0];
            this.highlightIcon(this.highlightIndex);
            this.renderIconContainer();
            this.detector.detectChanges();
        };
        ISelect.prototype.next = function ($event) {
            if (this.config.currentPage < this.config.totalPage) {
                this.config.currentPage++;
                this.renderIconContainer();
            }
            this.highlightIndex = 0;
            this.highlightIcon(this.highlightIndex);
            return false;
        };
        ISelect.prototype.prev = function ($event) {
            if (this.config.currentPage > 1) {
                this.config.currentPage--;
                this.renderIconContainer();
            }
            this.highlightIndex = this.size - 1;
            this.highlightIcon(this.highlightIndex);
            return false;
        };
        ISelect.prototype.last = function ($event) {
            if (this.config.currentPage < this.config.totalPage) {
                this.config.currentPage = this.config.totalPage;
                this.renderIconContainer();
            }
            this.highlightIndex = 0;
            this.highlightIcon(this.highlightIndex);
            return false;
        };
        ISelect.prototype.first = function ($event) {
            if (this.config.currentPage > 1) {
                this.config.currentPage = 1;
                this.renderIconContainer();
            }
            this.highlightIndex = this.size - 1;
            this.highlightIcon(this.highlightIndex);
            return false;
        };
        ISelect.prototype.renderIconContainer = function () {
            this.displayItems = (this.config.isSearch ? this.searchedData : this.entries);
            this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
            this.config.showFooter = (this.config.totalPage > 1);
            var offset = this.config.currentPage ? (this.config.currentPage - 1) * this.size : 0;
            if (this.displayItems.length < 1) {
                this.config.hasError = true;
            }
            else {
                this.config.hasError = false;
                this.displayItems = this.displayItems.slice(offset, offset + this.size);
                this.preloader.preload(this.id, this.displayItems);
            }
        };
        ISelect.prototype.toggleIconSelector = function () {
            var _this = this;
            this.config.open = !this.config.open;
            if (this.config.open && this.searchEnabled) {
                setTimeout(function () {
                    if (_this.searchInput) {
                        _this.renderer.invokeElementMethod(_this.searchInput.nativeElement, 'focus', []);
                        _this.renderer.invokeElementMethod(_this.searchInput.nativeElement, 'select', []);
                    }
                }, 66);
            }
        };
        ISelect.prototype.emitChange = function (item, callback) {
            var _this = this;
            var delayTime = (item.molded && !this.preloader.contains(this.id, item.value)) ? 777 : 66;
            setTimeout(function () {
                _this.onchange.emit(item);
                if (callback) {
                    callback();
                }
            }, delayTime);
        };
        ISelect.prototype.emitToggle = function (item, callback) {
            var _this = this;
            var delayTime = (item.molded && !this.preloader.contains(this.id, item.value)) ? 777 : 66;
            setTimeout(function () {
                _this.ontoggle.emit(item);
                if (callback) {
                    callback();
                }
            }, delayTime);
        };
        ISelect.prototype.deselectAll = function () {
            if (this.displayItems) {
                for (var i = 0; i < this.entries.length; i++) {
                    this.selectedIndex = i;
                }
            }
        };
        ISelect.prototype.selectIcon = function (index) {
            var _this = this;
            this.deselectAll();
            this.highlightIndex = index;
            if (this.displayItems && !this.displayItems[index].disabled) {
                for (var i = 0; i < this.displayItems.length; i++) {
                    this.entries[i].selected = false;
                    if (index === i) {
                        this.selectedIndex = i;
                        this.displayItems[i].selected = true;
                    }
                }
                this.config.selectedItem = this.displayItems[index];
                this.detector.detectChanges();
                if (this.config.selectedItem) {
                    this.stopSlideShow();
                    this.emitChange(this.config.selectedItem, function () { return _this.startSlideShow(); });
                }
            }
        };
        ISelect.prototype.highlightIcon = function (index) {
            var _this = this;
            this.deselectAll();
            this.highlightIndex = index;
            if (this.displayItems && !this.displayItems[index].disabled) {
                this.config.selectedItem = this.displayItems[this.highlightIndex];
                this.detector.detectChanges();
                if (this.config.selectedItem) {
                    this.stopSlideShow();
                    this.emitToggle(this.config.selectedItem, function () { return _this.startSlideShow(); });
                }
            }
        };
        ISelect.prototype.animation = function ($event) {
            if (this.displayItems && this.config.selectedItem) {
                this.config.selectedItem.animation = $event.target.value;
            }
        };
        ISelect.prototype.popIcons = function ($event) {
            for (var i = 0; i < globalActiveDropdown.length; i++) {
                if (globalActiveDropdown[i] != this && globalActiveDropdown[i].config.open) {
                    globalActiveDropdown[i].toggleIconSelector();
                }
            }
            this.toggleIconSelector();
            return false;
        };
        ISelect.prototype.selectedSourceUrl = function () {
            return this.config.selectedItem ?
                ((!this.config.selectedItem.type || this.config.selectedItem.type == 'image') ?
                    this.config.selectedItem.value :
                    this.config.selectedItem.poster) :
                '';
        };
        ISelect.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: Preloader },
            { type: core.ChangeDetectorRef },
            { type: core.Renderer }
        ]; };
        __decorate([
            core.ViewChild('iconBox', { static: false })
        ], ISelect.prototype, "iconBox", void 0);
        __decorate([
            core.ViewChild('searchInput', { static: false })
        ], ISelect.prototype, "searchInput", void 0);
        __decorate([
            core.ViewChild('searchButton', { static: false })
        ], ISelect.prototype, "searchButton", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "id", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "name", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "controlls", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "searchEnabled", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "size", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "showIconName", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "template", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "slideShowEnabled", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "applyLayoutType", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "applyOpacity", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "applyPattern", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "applyAnimation", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "applySlideShow", void 0);
        __decorate([
            core.Input()
        ], ISelect.prototype, "entries", void 0);
        __decorate([
            core.Output()
        ], ISelect.prototype, "onchange", void 0);
        __decorate([
            core.Output()
        ], ISelect.prototype, "ontoggle", void 0);
        __decorate([
            core.Output()
        ], ISelect.prototype, "enabledShow", void 0);
        __decorate([
            core.HostListener('window:click', ['$event'])
        ], ISelect.prototype, "onClick", null);
        ISelect = __decorate([
            core.Component({
                selector: 'i-select',
                template: "<div class=\"i-select\" [id]=\"id\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" (click)=\"toggleIconSelector()\" #iconBox\n            [style.background]=\"config.selectedItem ? (selectedSourceUrl() | CSSImage:id:true:false)  : ''\"></div>\n        <div class=\"select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" #searchButton\n        class=\"i-select-button\" \n        [class.focus]=\"config.open\"\n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{id}}name\" [textContent]=\"name\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div class=\"i-select-search\" *ngIf=\"template\">\n        <ng-container [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{data: false}\">\n        </ng-container>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div *ngIf=\"applySlideShow\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'slideshow'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'slideshow'\"\n                [checked]=\"slideShowEnabled ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"enableShow($event)\" />\n            Enable slideshow\n        </label>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{id}}name\" class=\"select-icons-container\" #iconContainer>\n        <div \n            role=\"listitem\" \n            class=\"select-box\" \n            *ngFor=\"let item of displayItems; let i = index\">\n            <div *ngIf=\"!item.type || item.type === 'image' || item.type === 'stream'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [class.streaming]=\"item.type === 'stream'\"\n                [title]=\"showIconName ? '':item.name\"\n                [style.background]=\"item.value | CSSImage:id:true:false\"\n                (click)=\"selectIcon(i)\">\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n            <div *ngIf=\"item.type === 'video'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [title]=\"showIconName ? '':item.name\"\n                (click)=\"selectIcon(i)\">\n                <video [attr.src]=\"item.value\" [attr.poster]=\"item.poster\" crossorigin disabled></video>\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n            <div *ngIf=\"item.type === 'webGL'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [title]=\"showIconName ? '':item.name\"\n                [style.background]=\"item.poster | CSSImage:id:true:false\"\n                (click)=\"selectIcon(i)\">\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\">\n        <div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div>\n    </div>\n\n    <div class=\"clear-fix\"></div>\n\n    <div *ngIf=\"applyAnimation && config.selectedItem\"\n        class=\"i-select-search layout\">\n        <select \n            tabindex=\"0\" \n            style=\"width: 100%\" \n            [id]=\"id + 'select'\" \n            (keyup)=\"keyup($event)\" \n            (change)=\"animation($event)\">\n            <option value=\"disabled\" [selected]=\"config.selectedItem.animation === 'disabled' ? true : null\">Disabled</option>\n            <option value=\"zoom\" [selected]=\"config.selectedItem.animation === 'zoom' ? true : null\">Zoom</option>\n            <option value=\"fade\" [selected]=\"config.selectedItem.animation === 'fade' ? true : null\">Fade</option>\n            <option value=\"sepia\" [selected]=\"config.selectedItem.animation === 'sepia' ? true : null\">Sepia</option>\n            <option value=\"grayout\" [selected]=\"config.selectedItem.animation === 'grayout' ? true : null\">Grayout</option>\n            <option value=\"shake\" [selected]=\"config.selectedItem.animation === 'shake' ? true : null\">Shake</option>\n        </select>\n    </div>\n    <div *ngIf=\"applySlideShow && config.selectedItem\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'favorite'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'favorite'\"\n                [checked]=\"config.selectedItem.favorite ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"addToFavorite($event)\" />\n            Add to favorite\n        </label>\n    </div>\n    <div *ngIf=\"applyLayoutType && config.selectedItem && (!config.selectedItem.type || config.selectedItem.type === 'image')\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'pattern'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'pattern'\"\n                [checked]=\"config.selectedItem.repeat ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"repeat($event)\" />\n            Display Repeat\n        </label>\n    </div>\n    <div *ngIf=\"applyPattern && config.selectedItem && (!config.selectedItem.type || config.selectedItem.type === 'image')\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'mold'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'mold'\"\n                [checked]=\"config.selectedItem.molded ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"mold($event)\" />\n            Make Pattern\n        </label>\n    </div>\n    <div *ngIf=\"applyOpacity && config.selectedItem\"\n        class=\"i-select-search opacity\" \n        (click)=\"$event.preventDefault();$event.stopPropagation()\">\n        <input class=\"range\" [attr.min]=\"0\" [attr.max]=\"100\"  type=\"range\" \n            [attr.value]=\"config.selectedItem.opacity * 100\" \n            (input)=\"config.selectedItem.opacity = $event.target.value / 100\" \n            (change)=\"config.selectedItem.opacity = $event.target.value / 100\" />\n        <span class=\"slide-counter\" [textContent]=\"config.selectedItem.opacity\"></span>\n    </div>\n\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n        <div class=\"i-select-arrows\">\n            <div class=\"{{controlls.previousPage ? controlls.previousPage : 'angle-left'}}\"\n                (click)=\"prev($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n                <span class=\"prev\" [textContent]=\"'previous'\"></span>\n            </div>\n            <div class=\"{{controlls.firstPage ? controlls.firstPage: 'angle-double-left'}}\"\n                    (click)=\"first($event)\"\n                    [class.disabled]=\"config.currentPage==1\">\n                <span class=\"first\" [textContent]=\"'first'\"></span>\n            </div>\n            <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n            <div class=\"{{controlls.lastPage ? controlls.lastPage : 'angle-double-right'}}\"\n                    (click)=\"last($event)\"\n                    [class.disabled]=\"config.currentPage==config.totalPage\">\n                <span class=\"last\" [textContent]=\"'last'\"></span>\n            </div>\n            <div class=\"{{controlls.nextPage ? controlls.nextPage : 'angle-right'}}\"\n                    (click)=\"next($event)\"\n                    [class.disabled]=\"config.currentPage==config.totalPage\">\n                <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"showIconName\" \n        class=\"name\" \n        [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                styles: ["@charset \"UTF-8\";:host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:table;text-align:left;vertical-align:middle;margin:2px 0;width:150px;position:relative}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box .disabled{opacity:.7}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box div.streaming{background-size:contain!important}:host .select-box div iframe{border:0;width:100%}:host .select-box div video{border:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;background-size:cover!important;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center;margin-top:5px}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div.angle-left:before{content:\"\u2039\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-left:before{content:\"\u00AB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-right:before{content:\"\u00BB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-right:before{content:\"\u203A\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:calc(100% - 20px);height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:100%}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0;position:relative}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 2px 2px 0;position:absolute;right:-1px}:host .i-select-button.focus .select-icon-up-dir,:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button.focus .select-icon-down-dir,:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search.layout{border:1px solid #ddd;padding:2px;margin:2px 0}:host .i-select-search.layout label{color:#000;font-size:.8rem}:host .i-select-search.opacity{border:1px solid #ddd;padding:2px;margin:2px 0}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{border-radius:50%;width:.8em!important;height:.8em!important;-webkit-animation:1.8s ease-in-out -.16s infinite load7;animation:1.8s ease-in-out -.16s infinite load7;color:#fff!important;position:absolute;top:-35px;left:.2rem;transform:translateZ(0)}:host .select-icon-spin3:after,:host .select-icon-spin3:before{color:#fff;border-radius:50%;width:.8em;height:.8em;-webkit-animation:1.8s ease-in-out infinite load7;animation:1.8s ease-in-out infinite load7;content:\"\";position:absolute;top:0}:host .select-icon-spin3:before{left:1.2rem;-webkit-animation-delay:-.32s;animation-delay:-.32s}:host .select-icon-spin3:after{left:2.4em}@-webkit-keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}@keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain;background-position:center center!important}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}:host .slide-counter{color:#000;font-size:.8rem}:host .range{width:80%}:host .range:hover{opacity:1}:host .range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:#444;background-image:linear-gradient(#444,#ddd,#444);cursor:pointer;border-radius:5px;border:2px solid #000;width:22px;height:12px}:host .range::-moz-range-thumb{background:#444;background-image:linear-gradient(#444,#ddd,#444);border-radius:5px;border:2px solid #000;cursor:pointer;width:22px;height:10px}"]
            })
        ], ISelect);
        return ISelect;
    }());

    var CSSImagePipe = /** @class */ (function () {
        function CSSImagePipe(renderer, preloader, sanitizer) {
            this.renderer = renderer;
            this.preloader = preloader;
            this.sanitizer = sanitizer;
        }
        CSSImagePipe.prototype.transform = function (url, id, repeat, molded) {
            var style = '';
            if (molded) {
                var img = this.preloader.image(id, url);
                var canvas = this.renderer.createElement('canvas');
                var ctx = canvas.getContext("2d");
                canvas.width = img.width * 2;
                canvas.height = img.height * 2;
                ctx.drawImage(img, 0, 0);
                ctx.scale(1, -1);
                ctx.translate(0, -img.height);
                ctx.drawImage(img, 0, -img.height, img.width, img.height);
                ctx.scale(-1, 1);
                ctx.translate(-img.width, 0);
                ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
                ctx.scale(1, -1);
                ctx.translate(0, -img.height);
                ctx.drawImage(img, -img.width, 0, img.width, img.height);
                var dataURL = canvas.toDataURL();
                style = "url(" + dataURL + ") " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent";
            }
            else {
                style = "url(" + url + ") " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent";
            }
            return this.sanitizer.bypassSecurityTrustStyle(style);
        };
        CSSImagePipe.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: Preloader },
            { type: platformBrowser.DomSanitizer }
        ]; };
        CSSImagePipe = __decorate([
            core.Pipe({ name: 'CSSImage' })
        ], CSSImagePipe);
        return CSSImagePipe;
    }());

    var IRenderer = /** @class */ (function () {
        function IRenderer(el, renderer) {
            this.renderer = renderer;
            this.refrenceId = '';
            this.molded = false;
            this.repeat = true;
            this.type = 'image';
            this.value = '';
            this.host = el.nativeElement;
            this.onResize(null);
        }
        Object.defineProperty(IRenderer.prototype, "absolute", {
            set: function (flag) {
                this.absoluteState = flag;
                if (flag) {
                    this.renderer.addClass(this.host, 'absolute');
                }
            },
            enumerable: true,
            configurable: true
        });
        IRenderer.prototype.onResize = function ($event) {
            this.renderer.setStyle(this.host, 'width', window.innerWidth + 'px');
            this.renderer.setStyle(this.host, 'height', window.innerHeight + 'px');
        };
        IRenderer.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], IRenderer.prototype, "refrenceId", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "opacity", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "molded", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "repeat", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "type", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "poster", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "animation", void 0);
        __decorate([
            core.Input()
        ], IRenderer.prototype, "absolute", null);
        __decorate([
            core.HostListener('window:resize', ['$event'])
        ], IRenderer.prototype, "onResize", null);
        IRenderer = __decorate([
            core.Component({
                selector: 'i-renderer',
                template: "<div\n  class=\"{{animation}} {{repeat === false ? 'cover' : ''}} {{absoluteState === true ? 'absolute' : ''}}\"\n  [style.opacity]=\"opacity === undefined ? null : opacity\"\n  [style.background]=\"(type === 'video' || type === 'webGL') ? null : value | CSSImage:refrenceId:repeat:molded\" >\n  <video\n    *ngIf=\"type === 'video'\" \n    width=\"100%\" \n    preload=\"true\" \n    autoplay=\"autoplay\" \n    loop=\"loop\"\n    [attr.src]=\"value\" \n    [attr.poster]=\"poster\"></video>\n  <iframe \n    *ngIf=\"type === 'webGL'\" \n    [attr.src]=\"value | safeHTML\"></iframe>\n  <ng-content></ng-content>\n</div>\n\n",
                providers: [CSSImagePipe],
                styles: [":host{box-sizing:border-box;margin:0;padding:0;overflow:hidden}:host.absolute{z-index:-1;position:absolute;top:0;left:0}:host div{box-sizing:border-box;margin:0;padding:0;width:100%;height:100%}:host div.cover{background-size:cover!important}:host div iframe{border:0;width:100%;height:100%;position:absolute}:host div video{border:0;width:100%;height:auto;position:absolute;-o-object-fit:cover;object-fit:cover}:host .fade{-webkit-animation-name:fade;-webkit-animation-duration:5s;animation-name:fade;animation-duration:5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes fade{from{opacity:.4}to{opacity:.8}}@keyframes fade{from{opacity:.4}to{opacity:.8}}:host .grayout{-webkit-animation-name:grayout;-webkit-animation-duration:5s;animation-name:grayout;animation-duration:5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes grayout{from{-webkit-filter:grayscale(.4);filter:grayscale(.4)}to{-webkit-filter:grayscale(1);filter:grayscale(1)}}@keyframes grayout{from{-webkit-filter:grayscale(.4);filter:grayscale(.4)}to{-webkit-filter:grayscale(1);filter:grayscale(1)}}:host .sepia{-webkit-animation-name:sepia;-webkit-animation-duration:5s;animation-name:sepia;animation-duration:5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes sepia{from{-webkit-filter:sepia(.4);filter:sepia(.4)}to{-webkit-filter:sepia(1);filter:sepia(1)}}@keyframes sepia{from{-webkit-filter:sepia(.4);filter:sepia(.4)}to{-webkit-filter:sepia(1);filter:sepia(1)}}:host .zoom{-webkit-animation-name:zoom;-webkit-animation-duration:55s;animation-name:zoom;animation-duration:55s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes zoom{from{transform:scale(1)}to{transform:scale(1.2)}}@keyframes zoom{from{transform:scale(1)}to{transform:scale(1.2)}}:host .shake{-webkit-animation-name:shake;-webkit-animation-duration:15s;animation-name:shake;animation-duration:15s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}"]
            })
        ], IRenderer);
        return IRenderer;
    }());

    var IselectSanitizePipe = /** @class */ (function () {
        function IselectSanitizePipe(_sanitizer) {
            this._sanitizer = _sanitizer;
        }
        IselectSanitizePipe.prototype.transform = function (v) {
            return this._sanitizer.bypassSecurityTrustResourceUrl(v);
        };
        IselectSanitizePipe.ctorParameters = function () { return [
            { type: platformBrowser.DomSanitizer }
        ]; };
        IselectSanitizePipe = __decorate([
            core.Pipe({
                name: 'safeHTML'
            })
        ], IselectSanitizePipe);
        return IselectSanitizePipe;
    }());

    var ISelectDirective = /** @class */ (function () {
        function ISelectDirective(viewRef, el, componentFactoryResolver) {
            this.viewRef = viewRef;
            this.el = el;
            this.componentFactoryResolver = componentFactoryResolver;
            this.data = [];
            this.searchEnabled = false;
            this.applyLayoutType = false;
            this.applyOpacity = false;
            this.applyPattern = false;
            this.applyAnimation = false;
            this.slideShowEnabled = false;
            this.applySlideShow = false;
            this.controlls = {
                firstPage: '',
                previousPage: '',
                nextPage: '',
                lastPage: ''
            };
            this.change = new core.EventEmitter();
            this.ontoggle = new core.EventEmitter();
        }
        ISelectDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.el.nativeElement.setAttribute("style", "display:none");
            setTimeout(function () {
                var list = _this.el.nativeElement.children;
                for (var i = 0; i < list.length; i++) {
                    var option = list[i];
                    if (option.nodeType === 1) {
                        var opacity = option.getAttribute("opacity");
                        var repeatLayout = option.getAttribute("repeat");
                        var patternLayout = option.getAttribute("pattern");
                        var animationType = option.getAttribute("animation");
                        var inFavoriteList = option.getAttribute("favorite");
                        _this.data.push({
                            value: option.getAttribute("value"),
                            selected: option.selected,
                            repeat: repeatLayout,
                            molded: patternLayout,
                            animation: animationType,
                            favorite: inFavoriteList,
                            disabled: option.getAttribute("disabled"),
                            opacity: opacity ? parseFloat(opacity) : 0,
                            name: option.innerHTML
                        });
                    }
                }
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(ISelect);
                var componentRef = _this.viewRef.createComponent(componentFactory);
                var domElem = componentRef.hostView.rootNodes[0];
                _this.el.nativeElement.parentNode.appendChild(domElem);
                var instance = componentRef.instance;
                instance.searchEnabled = _this.searchEnabled;
                instance.id = _this.el.nativeElement.id + "-iselect";
                instance.size = _this.el.nativeElement.size;
                instance.name = _this.el.nativeElement.name;
                instance.onchange = _this.change;
                instance.ontoggle = _this.ontoggle;
                instance.template = _this.template;
                instance.applyOpacity = _this.applyOpacity;
                instance.applyLayoutType = _this.applyLayoutType;
                instance.slideShowEnabled = _this.slideShowEnabled;
                instance.applyPattern = _this.applyPattern;
                instance.controlls = _this.controlls;
                instance.applySlideShow = _this.applySlideShow;
                instance.applyAnimation = _this.applyAnimation;
                instance.entries = _this.data;
                instance.ngAfterViewInit();
            }, 66);
        };
        ISelectDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef },
            { type: core.ElementRef },
            { type: core.ComponentFactoryResolver }
        ]; };
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "searchEnabled", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "template", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "applyLayoutType", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "applyOpacity", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "applyPattern", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "applyAnimation", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "slideShowEnabled", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "applySlideShow", void 0);
        __decorate([
            core.Input()
        ], ISelectDirective.prototype, "controlls", void 0);
        __decorate([
            core.Output()
        ], ISelectDirective.prototype, "change", void 0);
        __decorate([
            core.Output()
        ], ISelectDirective.prototype, "ontoggle", void 0);
        ISelectDirective = __decorate([
            core.Directive({
                selector: '[i-select]'
            })
        ], ISelectDirective);
        return ISelectDirective;
    }());

    var ISelectModule = /** @class */ (function () {
        function ISelectModule() {
        }
        ISelectModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                declarations: [
                    ISelect,
                    IRenderer,
                    CSSImagePipe,
                    IselectSanitizePipe,
                    ISelectDirective
                ],
                exports: [
                    ISelect,
                    IRenderer,
                    CSSImagePipe,
                    IselectSanitizePipe,
                    ISelectDirective
                ],
                entryComponents: [
                    IRenderer,
                    ISelect
                ],
                providers: [
                    CSSImagePipe,
                    IselectSanitizePipe,
                    Preloader,
                    ISelectDirective
                ],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], ISelectModule);
        return ISelectModule;
    }());

    exports.CSSImagePipe = CSSImagePipe;
    exports.IRenderer = IRenderer;
    exports.ISelect = ISelect;
    exports.ISelectDirective = ISelectDirective;
    exports.ISelectModule = ISelectModule;
    exports.IselectSanitizePipe = IselectSanitizePipe;
    exports.Preloader = Preloader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-icon-select.umd.js.map
