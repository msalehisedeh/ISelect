(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/icon-select', ['exports', '@angular/core', '@angular/platform-browser', '@angular/common'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['icon-select'] = {}),global.ng.core,global.ng.platformBrowser,global.ng.common));
}(this, (function (exports,core,platformBrowser,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var globalActiveDropdown = [];
    var CSSImagePipe = (function () {
        function CSSImagePipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        /**
         * @param {?} url
         * @param {?=} repeat
         * @return {?}
         */
        CSSImagePipe.prototype.transform = /**
         * @param {?} url
         * @param {?=} repeat
         * @return {?}
         */
            function (url, repeat) {
                return this.sanitizer.bypassSecurityTrustStyle("url('" + url + "') " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent");
            };
        CSSImagePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'CSSImage' },] }
        ];
        /** @nocollapse */
        CSSImagePipe.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return CSSImagePipe;
    }());
    var ISelect = (function () {
        function ISelect(el, renderer) {
            this.renderer = renderer;
            this.selectedIndex = 1;
            this.configID = "";
            this.configName = "";
            // showIconName should be handled by css from user
            // @Input("tile")
            // private configTile:boolean=true;
            this.searchEnabled = false;
            this.size = 3;
            this.multiselect = false;
            // showIconName should be handled by css from user
            this.showIconName = false;
            this.configData = [];
            this.displayItems = [];
            this.onchange = new core.EventEmitter();
            this.highlightIndex = 0;
            this.searchedData = [];
            this.config = {
                totalPage: 1,
                currentPage: 0,
                open: false,
                showFooter: false,
                hasError: false,
                isFocused: false,
                isSearch: false,
                loading: true,
                selectedItem: /** @type {?} */ (null)
            };
            this.el = el.nativeElement;
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.onClick = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                if (this.config.open) {
                    this.toggleIconSelector();
                }
            };
        /**
         * @return {?}
         */
        ISelect.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.displayItems = this.configData;
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.keyboardTracker = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                var _this = this;
                $event.stopPropagation();
                $event.preventDefault();
                /** @type {?} */
                var key = $event.charCode || $event.keyCode || 0;
                console.log(key);
                if (key === 39 || key === 40) {
                    //right or down arrow
                    setTimeout(function () {
                        /** @type {?} */
                        var index = _this.highlightIndex;
                        if (index < _this.displayItems.length - 1) {
                            _this.highlightIcon(index + 1);
                        }
                        else if (_this.config.currentPage < _this.config.totalPage) {
                            _this.next($event);
                        }
                    }, 66);
                }
                else if (key === 37 || key === 38) {
                    //left or up arrow
                    setTimeout(function () {
                        /** @type {?} */
                        var index = _this.highlightIndex;
                        if (index > 0) {
                            _this.highlightIcon(index - 1);
                        }
                        else if (_this.config.currentPage > 1) {
                            _this.prev($event);
                        }
                    }, 66);
                }
                return false;
            };
        /**
         * @param {?} $event
         * @param {?} searchString
         * @return {?}
         */
        ISelect.prototype.performSearch = /**
         * @param {?} $event
         * @param {?} searchString
         * @return {?}
         */
            function ($event, searchString) {
                /** @type {?} */
                var key = $event.charCode || $event.keyCode || 0;
                if (key > 36 && key < 41) {
                    return this.keyboardTracker($event);
                }
                if (searchString === '') {
                    this.resetSearch();
                    return;
                }
                //this.searchIcon.removeClass('picker-icon-search');
                //this.searchIcon.addClass('picker-icon-cancel');
                this.config.isSearch = true;
                this.searchedData = [];
                for (var i = 0; i < this.configData.length; i++) {
                    /** @type {?} */
                    var info = this.configData[i];
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
            };
        /**
         * @return {?}
         */
        ISelect.prototype.resetSearch = /**
         * @return {?}
         */
            function () {
                this.renderer.setElementAttribute(this.searchInput.element.nativeElement, 'value', '');
                //this.searchIcon.removeClass('picker-icon-cancel');
                //this.searchIcon.addClass('picker-icon-search');
                this.config.currentPage = 1;
                this.config.isSearch = false;
                this.highlightIndex = 0;
                this.displayItems = this.configData;
                this.config.selectedItem = this.configData[0];
                this.highlightIcon(this.highlightIndex);
                this.renderIconContainer();
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.next = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                $event.stopPropagation();
                if (this.config.currentPage < this.config.totalPage) {
                    this.config.currentPage++;
                    this.renderIconContainer();
                }
                this.highlightIndex = 0;
                this.highlightIcon(this.highlightIndex);
                return false;
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.prev = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                $event.stopPropagation();
                if (this.config.currentPage > 1) {
                    this.config.currentPage--;
                    this.renderIconContainer();
                }
                this.highlightIndex = this.size - 1;
                this.highlightIcon(this.highlightIndex);
                return false;
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.last = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                $event.stopPropagation();
                if (this.config.currentPage < this.config.totalPage) {
                    this.config.currentPage = this.config.totalPage;
                    this.renderIconContainer();
                }
                this.highlightIndex = 0;
                this.highlightIcon(this.highlightIndex);
                return false;
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.first = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                $event.stopPropagation();
                if (this.config.currentPage > 1) {
                    this.config.currentPage = 1;
                    this.renderIconContainer();
                }
                this.highlightIndex = this.size - 1;
                this.highlightIcon(this.highlightIndex);
                return false;
            };
        /**
         * @return {?}
         */
        ISelect.prototype.renderIconContainer = /**
         * @return {?}
         */
            function () {
                this.displayItems = (this.config.isSearch ? this.searchedData : this.configData);
                this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
                this.config.showFooter = (this.config.totalPage > 1);
                /** @type {?} */
                var offset = (this.config.currentPage - 1) * this.size;
                if (this.displayItems.length < 1) {
                    this.config.hasError = true;
                }
                else {
                    this.config.hasError = false;
                    this.displayItems = this.displayItems.slice(offset, offset + this.size);
                }
            };
        /**
         * @return {?}
         */
        ISelect.prototype.toggleIconSelector = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.config.open = !this.config.open;
                if (this.config.open && this.searchEnabled) {
                    setTimeout(function () {
                        _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'focus', []);
                        _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'select', []);
                    }, 20);
                }
            };
        /**
         * @return {?}
         */
        ISelect.prototype.findSelectedIndex = /**
         * @return {?}
         */
            function () {
                if (this.config.selectedItem) {
                    for (var i = 0; i < this.configData.length; i++) {
                        if (this.configData[i].id == this.config.selectedItem.id) {
                            this.selectedIndex = i;
                        }
                    }
                }
            };
        /**
         * @param {?} index
         * @return {?}
         */
        ISelect.prototype.selectIcon = /**
         * @param {?} index
         * @return {?}
         */
            function (index) {
                if (this.displayItems) {
                    this.config.selectedItem = this.displayItems[index];
                    this.findSelectedIndex();
                    this.onchange.emit(this.config.selectedItem);
                }
            };
        /**
         * @param {?} index
         * @return {?}
         */
        ISelect.prototype.highlightIcon = /**
         * @param {?} index
         * @return {?}
         */
            function (index) {
                this.highlightIndex = index;
                if (this.displayItems) {
                    this.config.selectedItem = this.displayItems[this.highlightIndex];
                    this.findSelectedIndex();
                    this.onchange.emit(this.config.selectedItem);
                }
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ISelect.prototype.popIcons = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                $event.stopPropagation();
                for (var i = 0; i < globalActiveDropdown.length; i++) {
                    if (globalActiveDropdown[i] != this && globalActiveDropdown[i].config.open) {
                        globalActiveDropdown[i].toggleIconSelector();
                    }
                }
                this.toggleIconSelector();
                return false;
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        ISelect.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                var _this = this;
                setTimeout(function () {
                    for (var i = 0; i < _this.configData.length; i++) {
                        _this.configData[i].id = i;
                    }
                    _this.config.currentPage = Math.ceil(_this.selectedIndex / (_this.size - 1));
                    _this.highlightIndex = _this.selectedIndex - ((_this.config.currentPage - 1) * _this.size);
                    _this.renderIconContainer();
                    globalActiveDropdown.push(_this);
                    if (_this.config.totalPage > 1) {
                        _this.config.loading = false;
                    }
                    _this.config.selectedItem = _this.displayItems[_this.highlightIndex];
                    _this.onchange.emit(_this.config.selectedItem);
                }, 10);
            };
        ISelect.decorators = [
            { type: core.Component, args: [{
                        selector: 'i-select',
                        template: "<div class=\"i-select\" [id]=\"configID\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" \n            [style.background]=\"config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''\"></div>\n        <div class=\"fa-li fa fa-spinner fa-spin select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" class=\"i-select-button\" \n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{configID}}name\" [textContent]=\"configName\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{configID}}name\" class=\"select-icons-container\" #iconContainer>\n    <div \n        role=\"listitem\" \n        class=\"select-box\" \n        *ngFor=\"let item of displayItems; let i = index\">\n        <div [class.highlight-icon]=\"highlightIndex==i\"\n            [class.cover]=\"!true\" [title]=\"showIconName ? '':item.name\"\n            [style.background]=\"item.value | CSSImage:true\"\n            (click)=\"selectIcon(i)\"><span class=\"off-screen\" [textContent]=\"item.name\"></span></div>\n    </div>\n    </div>\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\"><div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div></div>\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n    <div class=\"i-select-arrows\">\n        <div class=\"fa fa-angle-left\"\n            (click)=\"prev($event)\"\n            [class.disabled]=\"config.currentPage==1\">\n            <span class=\"prev\" [textContent]=\"'previous'\"></span>\n        </div>\n        <div class=\"fa fa-angle-double-left\"\n                (click)=\"first($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n            <span class=\"first\" [textContent]=\"'first'\"></span>\n        </div>\n        <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n        <div class=\"fa fa-angle-double-right\"\n                (click)=\"last($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"last\" [textContent]=\"'last'\"></span>\n        </div>\n        <div class=\"fa fa-angle-right\"\n                (click)=\"next($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n        </div>\n    </div>\n    </div>\n    <div class=\"name\" *ngIf=\"showIconName\" [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                        providers: [CSSImagePipe],
                        styles: [":host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:block;text-align:left;vertical-align:middle;margin:2px 0}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:60px;height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:60px}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;float:left;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 4px 4px 0}:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{position:absolute;top:0;left:0;width:16px!important;height:16px!important;display:inline-block;margin:0!important;padding:3px!important}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}"]
                    }] }
        ];
        /** @nocollapse */
        ISelect.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer }
            ];
        };
        ISelect.propDecorators = {
            searchIcon: [{ type: core.ViewChild, args: ['searchIcon', { read: core.ViewContainerRef },] }],
            searchInput: [{ type: core.ViewChild, args: ['searchInput', { read: core.ViewContainerRef },] }],
            iconContainer: [{ type: core.ViewChild, args: ['iconContainer', { read: core.ViewContainerRef },] }],
            configID: [{ type: core.Input, args: ["id",] }],
            configName: [{ type: core.Input, args: ["name",] }],
            searchEnabled: [{ type: core.Input, args: ["searchEnabled",] }],
            size: [{ type: core.Input, args: ["size",] }],
            multiselect: [{ type: core.Input, args: ["multiselect",] }],
            showIconName: [{ type: core.Input, args: ["showIconName",] }],
            configData: [{ type: core.Input, args: ["entries",] }],
            onchange: [{ type: core.Output, args: ["onchange",] }],
            onClick: [{ type: core.HostListener, args: ['window:click', ['$event'],] }]
        };
        return ISelect;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ISelectDirective = (function () {
        function ISelectDirective(viewRef, el, componentFactoryResolver) {
            this.viewRef = viewRef;
            this.el = el;
            this.componentFactoryResolver = componentFactoryResolver;
            this.data = [];
            this.searchEnabled = false;
            this.change = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        ISelectDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.el.nativeElement.setAttribute("style", "display:none");
                setTimeout(function () {
                    /** @type {?} */
                    var list = _this.el.nativeElement.children;
                    for (var i = 0; i < list.length; i++) {
                        /** @type {?} */
                        var option = list[i];
                        if (option.nodeType === 1) {
                            _this.data.push({
                                value: option.getAttribute("value"),
                                selected: option.getAttribute("selected"),
                                disabled: option.getAttribute("disabled"),
                                name: option.innerHTML
                            });
                        }
                    }
                    /** @type {?} */
                    var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(ISelect);
                    /** @type {?} */
                    var componentRef = _this.viewRef.createComponent(componentFactory);
                    /** @type {?} */
                    var domElem = (((componentRef.hostView)).rootNodes[0]);
                    _this.el.nativeElement.parentNode.appendChild(domElem);
                    /** @type {?} */
                    var instance = ((componentRef.instance));
                    instance.searchEnabled = _this.searchEnabled;
                    instance.configID = _this.el.nativeElement.id + "-iselect";
                    instance.size = _this.el.nativeElement.size;
                    instance.configName = _this.el.nativeElement.name;
                    instance.onchange.subscribe(_this.change);
                    instance.configData = _this.data;
                    instance.ngOnInit();
                    instance.ngOnChanges(undefined);
                }, 66);
            };
        ISelectDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[i-select]'
                    },] }
        ];
        /** @nocollapse */
        ISelectDirective.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef },
                { type: core.ElementRef },
                { type: core.ComponentFactoryResolver }
            ];
        };
        ISelectDirective.propDecorators = {
            searchEnabled: [{ type: core.Input, args: ["searchEnabled",] }],
            change: [{ type: core.Output, args: ["change",] }]
        };
        return ISelectDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ISelectModule = (function () {
        function ISelectModule() {
        }
        ISelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            ISelect,
                            CSSImagePipe,
                            ISelectDirective
                        ],
                        exports: [
                            ISelect,
                            CSSImagePipe,
                            ISelectDirective
                        ],
                        entryComponents: [
                            ISelect
                        ],
                        providers: [
                            CSSImagePipe,
                            ISelectDirective
                        ],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return ISelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.ISelect = ISelect;
    exports.CSSImagePipe = CSSImagePipe;
    exports.ISelectDirective = ISelectDirective;
    exports.ISelectModule = ISelectModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtaWNvbi1zZWxlY3QudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3Qvc3JjL2FwcC9pc2VsZWN0L2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC9pY29uLXNlbGVjdC9zcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNlZGVoL2ljb24tc2VsZWN0L3NyYy9hcHAvaXNlbGVjdC9pc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRDb21wb25lbnRGYWN0b3J5LCBcblx0UmVmbGVjdGl2ZUluamVjdG9yLFxuXHRWaWV3Q29udGFpbmVyUmVmLFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcixcblx0SG9zdExpc3RlbmVyLFxuXHRFdmVudEVtaXR0ZXIsXG5cdFZpZXdDaGlsZCxcblx0T25Jbml0LFxuXHRFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEljb25JbmZvIHtcblx0aWQ/Om51bWJlcixcblx0bmFtZTpzdHJpbmcsXG5cdHZhbHVlOnN0cmluZyxcblx0bGFiZWw/OnN0cmluZyxcblx0c2VsZWN0ZWQ/OmJvb2xlYW4sXG5cdGRpc2FibGVkPzpib29sZWFuXG59XG5cbnZhciBnbG9iYWxBY3RpdmVEcm9wZG93bjpJU2VsZWN0W10gPSBbXTtcblxuQFBpcGUoe25hbWU6J0NTU0ltYWdlJ30pXG5leHBvcnQgY2xhc3MgQ1NTSW1hZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybXtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjpEb21TYW5pdGl6ZXIpe31cbiAgdHJhbnNmb3JtKHVybDogc3RyaW5nLHJlcGVhdD86Ym9vbGVhbik6IGFueSB7IFxuXHQgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXCJ1cmwoJ1wiK3VybCtcIicpIFwiKyhyZXBlYXQgPyBcInJlcGVhdFwiOlwibm8tcmVwZWF0XCIpK1wiIDAgMCB0cmFuc3BhcmVudFwiKTtcbiAgfVxufVxuXG4vKlxuKiBMaWtlIGEgcmVndWxhciBkcm9wZG93biwgd2Ugd2FudCB0byBzZXQvZ2V0IHNlbGVjdGVkSW5kZXgsIHNlbGVjdCBpdGVtcyBvbiBhcnJvdyB1cC9kb3duLCBhbmQgc2VsZWN0IGl0ZW0gb24gY2xpY2suXG4qL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6J2ktc2VsZWN0Jyxcblx0dGVtcGxhdGVVcmw6ICdpc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2lzZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcblx0cHJvdmlkZXJzOiBbQ1NTSW1hZ2VQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBJU2VsZWN0IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwdWJsaWMgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSAxO1xuXHRcblx0QFZpZXdDaGlsZCgnc2VhcmNoSWNvbicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBzZWFyY2hJY29uOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBzZWFyY2hJbnB1dDogVmlld0NvbnRhaW5lclJlZjtcblx0QFZpZXdDaGlsZCgnaWNvbkNvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBpY29uQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QElucHV0KFwiaWRcIilcblx0cHVibGljIGNvbmZpZ0lEOnN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KFwibmFtZVwiKVxuXHRwdWJsaWMgY29uZmlnTmFtZTpzdHJpbmcgPSBcIlwiO1xuXG5cdC8vIHNob3dJY29uTmFtZSBzaG91bGQgYmUgaGFuZGxlZCBieSBjc3MgZnJvbSB1c2VyXG5cdC8vIEBJbnB1dChcInRpbGVcIilcblx0Ly8gcHJpdmF0ZSBjb25maWdUaWxlOmJvb2xlYW49dHJ1ZTtcblxuXHRASW5wdXQoXCJzZWFyY2hFbmFibGVkXCIpXG5cdHB1YmxpYyBzZWFyY2hFbmFibGVkOmJvb2xlYW49ZmFsc2U7XG5cblx0QElucHV0KFwic2l6ZVwiKVxuXHRwdWJsaWMgc2l6ZTpudW1iZXIgPSAzO1xuXG5cdEBJbnB1dChcIm11bHRpc2VsZWN0XCIpXG5cdHB1YmxpYyBtdWx0aXNlbGVjdCA9IGZhbHNlO1xuXG5cdC8vIHNob3dJY29uTmFtZSBzaG91bGQgYmUgaGFuZGxlZCBieSBjc3MgZnJvbSB1c2VyXG5cdEBJbnB1dChcInNob3dJY29uTmFtZVwiKVxuXHRzaG93SWNvbk5hbWUgPSBmYWxzZTtcblx0XG5cdEBJbnB1dChcImVudHJpZXNcIilcblx0cHVibGljIGNvbmZpZ0RhdGE6SWNvbkluZm9bXSA9IFtdO1xuXHRcblx0ZGlzcGxheUl0ZW1zOkljb25JbmZvW10gPSBbXTtcblx0XG5cdEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxuXHRwdWJsaWMgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0aGlnaGxpZ2h0SW5kZXg9MDtcblx0c2VhcmNoZWREYXRhOkljb25JbmZvW10gPSBbXTtcblxuXG5cdGNvbmZpZyA9e1xuXHRcdHRvdGFsUGFnZToxLFxuXHRcdGN1cnJlbnRQYWdlOjAsXG5cdFx0b3BlbjpmYWxzZSxcblx0XHRzaG93Rm9vdGVyOmZhbHNlLFxuXHRcdGhhc0Vycm9yOmZhbHNlLFxuXHRcdGlzRm9jdXNlZDpmYWxzZSxcblx0XHRpc1NlYXJjaDpmYWxzZSxcblx0XHRsb2FkaW5nOnRydWUsXG5cdFx0c2VsZWN0ZWRJdGVtOjxJY29uSW5mbz5udWxsXG5cdH1cblxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6Y2xpY2snLCBbJyRldmVudCddKVxuXHRvbkNsaWNrKCRldmVudDpLZXlib2FyZEV2ZW50KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLm9wZW4pIHtcblx0XHRcdHRoaXMudG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBlbDpIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZixwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge1xuXHRcdHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmNvbmZpZ0RhdGE7XG5cdH1cblxuXHRrZXlib2FyZFRyYWNrZXIoJGV2ZW50OktleWJvYXJkRXZlbnQpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHQkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQga2V5ID0gJGV2ZW50LmNoYXJDb2RlIHx8ICRldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0Y29uc29sZS5sb2coa2V5KVxuXHRcdGlmKGtleT09PTM5IHx8IGtleT09PTQwKXsvL3JpZ2h0IG9yIGRvd24gYXJyb3dcblx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLmhpZ2hsaWdodEluZGV4O1xuXHRcdFx0aWYoaW5kZXg8dGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoLTEpe1xuXHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXgrMSk7XG5cdFx0XHR9ZWxzZSBpZih0aGlzLmNvbmZpZy5jdXJyZW50UGFnZTx0aGlzLmNvbmZpZy50b3RhbFBhZ2Upe1xuXHRcdFx0XHR0aGlzLm5leHQoJGV2ZW50KTtcblx0XHRcdH1cblx0XHR9LDY2KTtcblx0XHR9ZWxzZSBpZihrZXk9PT0zNyB8fCBrZXk9PT0zOCl7Ly9sZWZ0IG9yIHVwIGFycm93XG5cdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdGlmKGluZGV4PjApe1xuXHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXgtMSk7XG5cdFx0XHR9ZWxzZSBpZih0aGlzLmNvbmZpZy5jdXJyZW50UGFnZT4xKXtcblx0XHRcdFx0dGhpcy5wcmV2KCRldmVudCk7XG5cdFx0XHR9XG5cdFx0fSw2Nik7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwZXJmb3JtU2VhcmNoKCRldmVudDpLZXlib2FyZEV2ZW50LCBzZWFyY2hTdHJpbmc6c3RyaW5nKXtcblx0XHRsZXQga2V5ID0gJGV2ZW50LmNoYXJDb2RlIHx8ICRldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0aWYoa2V5PjM2ICYmIGtleTw0MSl7XG5cdFx0XHRyZXR1cm4gdGhpcy5rZXlib2FyZFRyYWNrZXIoJGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKHNlYXJjaFN0cmluZyA9PT0gJycpIHtcblx0XHRcdHRoaXMucmVzZXRTZWFyY2goKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLXNlYXJjaCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1jYW5jZWwnKTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IHRydWU7XG5cblx0XHR0aGlzLnNlYXJjaGVkRGF0YSA9IFtdO1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPHRoaXMuY29uZmlnRGF0YS5sZW5ndGg7aSsrKXtcblx0XHRcdGxldCBpbmZvID0gdGhpcy5jb25maWdEYXRhW2ldO1xuXHRcdFx0aWYgKGluZm8ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nLnRvTG93ZXJDYXNlKCkpPj0wKSB7XG5cdFx0XHRcdHRoaXMuc2VhcmNoZWREYXRhLnB1c2goaW5mbyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHRoaXMuc2VhcmNoZWREYXRhLmxlbmd0aCl7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gMDtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuc2VhcmNoZWREYXRhWzBdO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLnNlYXJjaGVkRGF0YTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0fVxuXHRyZXNldFNlYXJjaCgpe1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwndmFsdWUnLCcnKTtcblxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1jYW5jZWwnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tc2VhcmNoJyk7XG5cblx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSBmYWxzZTtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gMDtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuY29uZmlnRGF0YTtcblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmNvbmZpZ0RhdGFbMF07XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdH1cblx0bmV4dCgkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPCB0aGlzLmNvbmZpZy50b3RhbFBhZ2UpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlKys7XG4gXHRcdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9MDtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHByZXYoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UtLTtcbiBcdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGFzdCgkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPCB0aGlzLmNvbmZpZy50b3RhbFBhZ2UpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gdGhpcy5jb25maWcudG90YWxQYWdlO1xuXHRcdCAgICB0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD0wO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZpcnN0KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zaXplLTE7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJlbmRlckljb25Db250YWluZXIoKXtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9ICh0aGlzLmNvbmZpZy5pc1NlYXJjaCA/IHRoaXMuc2VhcmNoZWREYXRhIDogdGhpcy5jb25maWdEYXRhKTtcblx0XHR0aGlzLmNvbmZpZy50b3RhbFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIC8gdGhpcy5zaXplKTtcblx0XHRcblx0XHR0aGlzLmNvbmZpZy5zaG93Rm9vdGVyID0gKHRoaXMuY29uZmlnLnRvdGFsUGFnZSA+IDEpO1xuXG5cdFx0bGV0IG9mZnNldCA9ICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5zaXplO1xuXG5cdFx0aWYodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoPDEgKXtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gdHJ1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmRpc3BsYXlJdGVtcy5zbGljZShvZmZzZXQsIG9mZnNldCArIHRoaXMuc2l6ZSk7XG5cdFx0fVxuXHR9XG5cdHRvZ2dsZUljb25TZWxlY3Rvcigpe1xuXHRcdHRoaXMuY29uZmlnLm9wZW4gPSAhdGhpcy5jb25maWcub3BlbjtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5vcGVuICYmIHRoaXMuc2VhcmNoRW5hYmxlZCkge1xuXHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdmb2N1cycsIFtdKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0JywgW10pO1xuXHRcdFx0fSwgMjApO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIGZpbmRTZWxlY3RlZEluZGV4KCl7XG5cdFx0aWYodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKXtcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmNvbmZpZ0RhdGEubGVuZ3RoO2krKyl7XG5cdFx0XHRpZih0aGlzLmNvbmZpZ0RhdGFbaV0uaWQ9PXRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5pZCl7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdH1cblx0fVxuXHRzZWxlY3RJY29uKGluZGV4Om51bWJlcil7XG5cdFx0aWYodGhpcy5kaXNwbGF5SXRlbXMpe1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdO1xuXHRcdFx0dGhpcy5maW5kU2VsZWN0ZWRJbmRleCgpO1xuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSk7XG5cdFx0fVxuXHR9XG5cdGhpZ2hsaWdodEljb24oaW5kZXg6bnVtYmVyKXtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gaW5kZXg7XG5cdFx0aWYodGhpcy5kaXNwbGF5SXRlbXMpe1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0XHR0aGlzLmZpbmRTZWxlY3RlZEluZGV4KCk7XG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHR9XG5cdH1cblx0cG9wSWNvbnMoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPGdsb2JhbEFjdGl2ZURyb3Bkb3duLmxlbmd0aDtpKyspe1xuXHRcdFx0aWYoZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0hPXRoaXMgJiYgZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0uY29uZmlnLm9wZW4pe1xuXHRcdFx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bltpXS50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOmFueSkge1xuXHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmNvbmZpZ0RhdGEubGVuZ3RoO2krKyl7dGhpcy5jb25maWdEYXRhW2ldLmlkPSBpfVxuXHRcblx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IE1hdGguY2VpbCh0aGlzLnNlbGVjdGVkSW5kZXgvKHRoaXMuc2l6ZS0xKSk7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD10aGlzLnNlbGVjdGVkSW5kZXgtKCh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZS0xKSp0aGlzLnNpemUpO1xuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXG5cdFx0Z2xvYmFsQWN0aXZlRHJvcGRvd24ucHVzaCh0aGlzKTtcblx0XHRpZih0aGlzLmNvbmZpZy50b3RhbFBhZ2U+MSl7XG5cdFx0XHR0aGlzLmNvbmZpZy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW3RoaXMuaGlnaGxpZ2h0SW5kZXhdO1xuXHRcdHRoaXMub25jaGFuZ2UuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdH0sMTApO1xuXHR9XG5cbn1cbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEVtYmVkZGVkVmlld1JlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSVNlbGVjdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tpLXNlbGVjdF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJU2VsZWN0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgZGF0YSA9IFtdO1xyXG5cclxuXHRASW5wdXQoXCJzZWFyY2hFbmFibGVkXCIpXHJcblx0cHVibGljIHNlYXJjaEVuYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBAT3V0cHV0KFwiY2hhbmdlXCIpXHJcbiAgICBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHB1YmxpYyBlbDpFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICBcclxuXHRuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImRpc3BsYXk6bm9uZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgY29uc3QgbGlzdDogSFRNTENvbGxlY3Rpb24gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ub2RlVHlwZSA9PT0gMSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwidmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbi5pbm5lckhUTUxcclxuICAgICAgICAgICAgICAgICAgICB9KSAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KElTZWxlY3QpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZiA8IGFueSA+ICkucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2U6SVNlbGVjdCA9ICg8SVNlbGVjdD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zZWFyY2hFbmFibGVkID0gdGhpcy5zZWFyY2hFbmFibGVkO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdJRCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCtcIi1pc2VsZWN0XCI7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNpemUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2l6ZTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnTmFtZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5vbmNoYW5nZS5zdWJzY3JpYmUodGhpcy5jaGFuZ2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdEYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZ09uQ2hhbmdlcyh1bmRlZmluZWQpO1xyXG4gICAgICAgIH0sIDY2KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERhdGVQaXBlLCBDdXJyZW5jeVBpcGUsIERlY2ltYWxQaXBlLCBKc29uUGlwZSwgU2xpY2VQaXBlLCBVcHBlckNhc2VQaXBlLCBMb3dlckNhc2VQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QsIENTU0ltYWdlUGlwZSB9IGZyb20gJy4vY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IElTZWxlY3REaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaXNlbGVjdC5kaXJlY3RpdmUnXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBJU2VsZWN0LFxyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSVNlbGVjdCxcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgSVNlbGVjdFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBJU2VsZWN0TW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJQaXBlIiwiRG9tU2FuaXRpemVyIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyIiwiVmlld0NoaWxkIiwiVmlld0NvbnRhaW5lclJlZiIsIklucHV0IiwiT3V0cHV0IiwiSG9zdExpc3RlbmVyIiwiRGlyZWN0aXZlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiTmdNb2R1bGUiLCJDb21tb25N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