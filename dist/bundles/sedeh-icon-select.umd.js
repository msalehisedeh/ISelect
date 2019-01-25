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
                if ($event.target !== this.iconBox.element.nativeElement && this.config.open) {
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
                if (key === 40) {
                    this.config.open = true;
                    if (this.searchInput) {
                        setTimeout(function () {
                            _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'focus', []);
                            _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'select', []);
                        }, 22);
                    }
                }
                else if (key === 38 && this.highlightIndex === 0) {
                    this.config.open = false;
                    this.renderer.invokeElementMethod(this.searchButton.element.nativeElement, 'focus', []);
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
                        template: "<div class=\"i-select\" [id]=\"configID\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" (click)=\"toggleIconSelector()\" #iconBox\n            [style.background]=\"config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''\"></div>\n        <div class=\"fa-li fa fa-spinner fa-spin select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" #searchButton\n        class=\"i-select-button\" \n        [class.focus]=\"config.open\"\n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{configID}}name\" [textContent]=\"configName\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{configID}}name\" class=\"select-icons-container\" #iconContainer>\n    <div \n        role=\"listitem\" \n        class=\"select-box\" \n        *ngFor=\"let item of displayItems; let i = index\">\n        <div [class.highlight-icon]=\"highlightIndex==i\"\n            [class.cover]=\"!true\" [title]=\"showIconName ? '':item.name\"\n            [style.background]=\"item.value | CSSImage:true\"\n            (click)=\"selectIcon(i)\"><span class=\"off-screen\" [textContent]=\"item.name\"></span></div>\n    </div>\n    </div>\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\"><div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div></div>\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n    <div class=\"i-select-arrows\">\n        <div class=\"fa fa-angle-left\"\n            (click)=\"prev($event)\"\n            [class.disabled]=\"config.currentPage==1\">\n            <span class=\"prev\" [textContent]=\"'previous'\"></span>\n        </div>\n        <div class=\"fa fa-angle-double-left\"\n                (click)=\"first($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n            <span class=\"first\" [textContent]=\"'first'\"></span>\n        </div>\n        <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n        <div class=\"fa fa-angle-double-right\"\n                (click)=\"last($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"last\" [textContent]=\"'last'\"></span>\n        </div>\n        <div class=\"fa fa-angle-right\"\n                (click)=\"next($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n        </div>\n    </div>\n    </div>\n    <div class=\"name\" *ngIf=\"showIconName\" [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                        providers: [CSSImagePipe],
                        styles: [":host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:block;text-align:left;vertical-align:middle;margin:2px 0;width:150px}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:calc(100% - 20px);height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:100%}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0;position:relative}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 2px 2px 0;position:absolute;right:-1px}:host .i-select-button.focus .select-icon-up-dir,:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button.focus .select-icon-down-dir,:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{position:absolute;top:0;left:0;width:16px!important;height:16px!important;display:inline-block;margin:0!important;padding:3px!important}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}"]
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
            iconBox: [{ type: core.ViewChild, args: ['iconBox', { read: core.ViewContainerRef },] }],
            iconContainer: [{ type: core.ViewChild, args: ['iconContainer', { read: core.ViewContainerRef },] }],
            searchIcon: [{ type: core.ViewChild, args: ['searchIcon', { read: core.ViewContainerRef },] }],
            searchInput: [{ type: core.ViewChild, args: ['searchInput', { read: core.ViewContainerRef },] }],
            searchButton: [{ type: core.ViewChild, args: ['searchButton', { read: core.ViewContainerRef },] }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtaWNvbi1zZWxlY3QudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3Qvc3JjL2FwcC9pc2VsZWN0L2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC9pY29uLXNlbGVjdC9zcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNlZGVoL2ljb24tc2VsZWN0L3NyYy9hcHAvaXNlbGVjdC9pc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRWaWV3Q29udGFpbmVyUmVmLFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcixcblx0SG9zdExpc3RlbmVyLFxuXHRFdmVudEVtaXR0ZXIsXG5cdFZpZXdDaGlsZCxcblx0T25Jbml0LFxuXHRFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEljb25JbmZvIHtcblx0aWQ/Om51bWJlcixcblx0bmFtZTpzdHJpbmcsXG5cdHZhbHVlOnN0cmluZyxcblx0bGFiZWw/OnN0cmluZyxcblx0c2VsZWN0ZWQ/OmJvb2xlYW4sXG5cdGRpc2FibGVkPzpib29sZWFuXG59XG5cbnZhciBnbG9iYWxBY3RpdmVEcm9wZG93bjpJU2VsZWN0W10gPSBbXTtcblxuQFBpcGUoe25hbWU6J0NTU0ltYWdlJ30pXG5leHBvcnQgY2xhc3MgQ1NTSW1hZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybXtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjpEb21TYW5pdGl6ZXIpe31cbiAgdHJhbnNmb3JtKHVybDogc3RyaW5nLHJlcGVhdD86Ym9vbGVhbik6IGFueSB7IFxuXHQgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXCJ1cmwoJ1wiK3VybCtcIicpIFwiKyhyZXBlYXQgPyBcInJlcGVhdFwiOlwibm8tcmVwZWF0XCIpK1wiIDAgMCB0cmFuc3BhcmVudFwiKTtcbiAgfVxufVxuXG4vKlxuKiBMaWtlIGEgcmVndWxhciBkcm9wZG93biwgd2Ugd2FudCB0byBzZXQvZ2V0IHNlbGVjdGVkSW5kZXgsIHNlbGVjdCBpdGVtcyBvbiBhcnJvdyB1cC9kb3duLCBhbmQgc2VsZWN0IGl0ZW0gb24gY2xpY2suXG4qL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6J2ktc2VsZWN0Jyxcblx0dGVtcGxhdGVVcmw6ICdpc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2lzZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcblx0cHJvdmlkZXJzOiBbQ1NTSW1hZ2VQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBJU2VsZWN0IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwdWJsaWMgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSAxO1xuXHRcblx0QFZpZXdDaGlsZCgnaWNvbkJveCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBpY29uQm94OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdpY29uQ29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIGljb25Db250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaEljb24nLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHByaXZhdGUgc2VhcmNoSWNvbjogVmlld0NvbnRhaW5lclJlZjtcblx0QFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHByaXZhdGUgc2VhcmNoSW5wdXQ6IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaEJ1dHRvbicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBzZWFyY2hCdXR0b246IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRASW5wdXQoXCJpZFwiKVxuXHRwdWJsaWMgY29uZmlnSUQ6c3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoXCJuYW1lXCIpXG5cdHB1YmxpYyBjb25maWdOYW1lOnN0cmluZyA9IFwiXCI7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0Ly8gQElucHV0KFwidGlsZVwiKVxuXHQvLyBwcml2YXRlIGNvbmZpZ1RpbGU6Ym9vbGVhbj10cnVlO1xuXG5cdEBJbnB1dChcInNlYXJjaEVuYWJsZWRcIilcblx0cHVibGljIHNlYXJjaEVuYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcblxuXHRASW5wdXQoXCJzaXplXCIpXG5cdHB1YmxpYyBzaXplOm51bWJlciA9IDM7XG5cblx0QElucHV0KFwibXVsdGlzZWxlY3RcIilcblx0cHVibGljIG11bHRpc2VsZWN0ID0gZmFsc2U7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0QElucHV0KFwic2hvd0ljb25OYW1lXCIpXG5cdHNob3dJY29uTmFtZSA9IGZhbHNlO1xuXHRcblx0QElucHV0KFwiZW50cmllc1wiKVxuXHRwdWJsaWMgY29uZmlnRGF0YTpJY29uSW5mb1tdID0gW107XG5cdFxuXHRkaXNwbGF5SXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRcblx0QE91dHB1dChcIm9uY2hhbmdlXCIpXG5cdHB1YmxpYyBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRoaWdobGlnaHRJbmRleD0wO1xuXHRzZWFyY2hlZERhdGE6SWNvbkluZm9bXSA9IFtdO1xuXG5cblx0Y29uZmlnID17XG5cdFx0dG90YWxQYWdlOjEsXG5cdFx0Y3VycmVudFBhZ2U6MCxcblx0XHRvcGVuOmZhbHNlLFxuXHRcdHNob3dGb290ZXI6ZmFsc2UsXG5cdFx0aGFzRXJyb3I6ZmFsc2UsXG5cdFx0aXNGb2N1c2VkOmZhbHNlLFxuXHRcdGlzU2VhcmNoOmZhbHNlLFxuXHRcdGxvYWRpbmc6dHJ1ZSxcblx0XHRzZWxlY3RlZEl0ZW06PEljb25JbmZvPm51bGxcblx0fVxuXG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpjbGljaycsIFsnJGV2ZW50J10pXG5cdG9uQ2xpY2soJGV2ZW50OktleWJvYXJkRXZlbnQpIHtcblx0XHRpZiAoJGV2ZW50LnRhcmdldCAhPT0gdGhpcy5pY29uQm94LmVsZW1lbnQubmF0aXZlRWxlbWVudCAgJiYgdGhpcy5jb25maWcub3Blbikge1xuXHRcdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGVsOkhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG5cdFx0dGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuY29uZmlnRGF0YTtcblx0fVxuXG5cdGtleWJvYXJkVHJhY2tlcigkZXZlbnQ6S2V5Ym9hcmRFdmVudCl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdCRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBrZXkgPSAkZXZlbnQuY2hhckNvZGUgfHwgJGV2ZW50LmtleUNvZGUgfHwgMDtcblxuXHRcdGlmKGtleT09PTM5IHx8IGtleT09PTQwKXsvL3JpZ2h0IG9yIGRvd24gYXJyb3dcblx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdFx0aWYoaW5kZXg8dGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoLTEpe1xuXHRcdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCsxKTtcblx0XHRcdFx0fWVsc2UgaWYodGhpcy5jb25maWcuY3VycmVudFBhZ2U8dGhpcy5jb25maWcudG90YWxQYWdlKXtcblx0XHRcdFx0XHR0aGlzLm5leHQoJGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSw2Nik7XG5cdFx0fSBlbHNlIGlmKGtleT09PTM3IHx8IGtleT09PTM4KXsvL2xlZnQgb3IgdXAgYXJyb3dcblx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdFx0aWYoaW5kZXg+MCl7XG5cdFx0XHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKGluZGV4LTEpO1xuXHRcdFx0XHR9ZWxzZSBpZih0aGlzLmNvbmZpZy5jdXJyZW50UGFnZT4xKXtcblx0XHRcdFx0XHR0aGlzLnByZXYoJGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSw2Nik7XG5cdFx0fVxuXHRcdGlmIChrZXkgPT09IDQwKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5vcGVuID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSlcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHRcdH0sIDIyKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMzggJiYgdGhpcy5oaWdobGlnaHRJbmRleCA9PT0gMCkge1xuXHRcdFx0dGhpcy5jb25maWcub3BlbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoQnV0dG9uLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cGVyZm9ybVNlYXJjaCgkZXZlbnQ6S2V5Ym9hcmRFdmVudCwgc2VhcmNoU3RyaW5nOnN0cmluZyl7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXHRcdGlmKGtleT4zNiAmJiBrZXk8NDEpe1xuXHRcdFx0cmV0dXJuIHRoaXMua2V5Ym9hcmRUcmFja2VyKCRldmVudCk7XG5cdFx0fVxuXHRcdGlmIChzZWFyY2hTdHJpbmcgPT09ICcnKSB7XG5cdFx0XHR0aGlzLnJlc2V0U2VhcmNoKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSB0cnVlO1xuXG5cdFx0dGhpcy5zZWFyY2hlZERhdGEgPSBbXTtcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmNvbmZpZ0RhdGEubGVuZ3RoO2krKyl7XG5cdFx0XHRsZXQgaW5mbyA9IHRoaXMuY29uZmlnRGF0YVtpXTtcblx0XHRcdGlmIChpbmZvLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZy50b0xvd2VyQ2FzZSgpKT49MCkge1xuXHRcdFx0XHR0aGlzLnNlYXJjaGVkRGF0YS5wdXNoKGluZm8pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLnNlYXJjaGVkRGF0YS5sZW5ndGgpe1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IDA7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnNlYXJjaGVkRGF0YVswXTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5zZWFyY2hlZERhdGE7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gbnVsbDtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdH1cblx0cmVzZXRTZWFyY2goKXtcblx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsJ3ZhbHVlJywnJyk7XG5cblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5yZW1vdmVDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0Ly90aGlzLnNlYXJjaEljb24uYWRkQ2xhc3MoJ3BpY2tlci1pY29uLXNlYXJjaCcpO1xuXG5cdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdHRoaXMuY29uZmlnLmlzU2VhcmNoID0gZmFsc2U7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IDA7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmNvbmZpZ0RhdGE7XG5cdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5jb25maWdEYXRhWzBdO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHR9XG5cdG5leHQoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSsrO1xuIFx0XHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwcmV2KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlLS07XG4gXHRcdCAgICB0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD10aGlzLnNpemUtMTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxhc3QoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IHRoaXMuY29uZmlnLnRvdGFsUGFnZTtcblx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9MDtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmaXJzdCgkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZW5kZXJJY29uQ29udGFpbmVyKCl7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSAodGhpcy5jb25maWcuaXNTZWFyY2ggPyB0aGlzLnNlYXJjaGVkRGF0YSA6IHRoaXMuY29uZmlnRGF0YSk7XG5cdFx0dGhpcy5jb25maWcudG90YWxQYWdlID0gTWF0aC5jZWlsKHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aCAvIHRoaXMuc2l6ZSk7XG5cdFx0XG5cdFx0dGhpcy5jb25maWcuc2hvd0Zvb3RlciA9ICh0aGlzLmNvbmZpZy50b3RhbFBhZ2UgPiAxKTtcblxuXHRcdGxldCBvZmZzZXQgPSAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZTtcblxuXHRcdGlmKHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aDwxICl7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IHRydWU7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5jb25maWcuaGFzRXJyb3IgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5kaXNwbGF5SXRlbXMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0aGlzLnNpemUpO1xuXHRcdH1cblx0fVxuXHR0b2dnbGVJY29uU2VsZWN0b3IoKXtcblx0XHR0aGlzLmNvbmZpZy5vcGVuID0gIXRoaXMuY29uZmlnLm9wZW47XG5cblx0XHRpZiAodGhpcy5jb25maWcub3BlbiAmJiB0aGlzLnNlYXJjaEVuYWJsZWQpIHtcblx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSk7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdCcsIFtdKTtcblx0XHRcdH0sIDIwKTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBmaW5kU2VsZWN0ZWRJbmRleCgpe1xuXHRcdGlmKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSl7XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8dGhpcy5jb25maWdEYXRhLmxlbmd0aDtpKyspe1xuXHRcdFx0aWYodGhpcy5jb25maWdEYXRhW2ldLmlkPT10aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uaWQpe1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR9XG5cdH1cblx0c2VsZWN0SWNvbihpbmRleDpudW1iZXIpe1xuXHRcdGlmKHRoaXMuZGlzcGxheUl0ZW1zKXtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW2luZGV4XTtcblx0XHRcdHRoaXMuZmluZFNlbGVjdGVkSW5kZXgoKTtcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdH1cblx0fVxuXHRoaWdobGlnaHRJY29uKGluZGV4Om51bWJlcil7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IGluZGV4O1xuXHRcdGlmKHRoaXMuZGlzcGxheUl0ZW1zKXtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW3RoaXMuaGlnaGxpZ2h0SW5kZXhdO1xuXHRcdFx0dGhpcy5maW5kU2VsZWN0ZWRJbmRleCgpO1xuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSk7XG5cdFx0fVxuXHR9XG5cdHBvcEljb25zKCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTxnbG9iYWxBY3RpdmVEcm9wZG93bi5sZW5ndGg7aSsrKXtcblx0XHRcdGlmKGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldIT10aGlzICYmIGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldLmNvbmZpZy5vcGVuKXtcblx0XHRcdFx0Z2xvYmFsQWN0aXZlRHJvcGRvd25baV0udG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlczphbnkpIHtcblx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8dGhpcy5jb25maWdEYXRhLmxlbmd0aDtpKyspe3RoaXMuY29uZmlnRGF0YVtpXS5pZD0gaX1cblx0XG5cdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zZWxlY3RlZEluZGV4Lyh0aGlzLnNpemUtMSkpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zZWxlY3RlZEluZGV4LSgodGhpcy5jb25maWcuY3VycmVudFBhZ2UtMSkqdGhpcy5zaXplKTtcblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblxuXHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duLnB1c2godGhpcyk7XG5cdFx0aWYodGhpcy5jb25maWcudG90YWxQYWdlPjEpe1xuXHRcdFx0dGhpcy5jb25maWcubG9hZGluZyA9IGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHR0aGlzLm9uY2hhbmdlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHR9LDEwKTtcblx0fVxuXG59XG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIE9uSW5pdCxcclxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QgfSBmcm9tICcuLi9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaS1zZWxlY3RdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGRhdGEgPSBbXTtcclxuXHJcblx0QElucHV0KFwic2VhcmNoRW5hYmxlZFwiKVxyXG5cdHB1YmxpYyBzZWFyY2hFbmFibGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgQE91dHB1dChcImNoYW5nZVwiKVxyXG4gICAgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5Om5vbmVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3Q6IEhUTUxDb2xsZWN0aW9uID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gbGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ubm9kZVR5cGUgPT09IDEpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogb3B0aW9uLmdldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogb3B0aW9uLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvcHRpb24uaW5uZXJIVE1MXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShJU2VsZWN0KTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLnZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWYgPCBhbnkgPiApLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlOklTZWxlY3QgPSAoPElTZWxlY3Q+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2VhcmNoRW5hYmxlZCA9IHRoaXMuc2VhcmNoRW5hYmxlZDtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnSUQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQrXCItaXNlbGVjdFwiO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zaXplID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNpemU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbmZpZ05hbWUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQubmFtZTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub25jaGFuZ2Uuc3Vic2NyaWJlKHRoaXMuY2hhbmdlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnRGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgaW5zdGFuY2UubmdPbkluaXQoKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UubmdPbkNoYW5nZXModW5kZWZpbmVkKTtcclxuICAgICAgICB9LCA2NilcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSwgQ3VycmVuY3lQaXBlLCBEZWNpbWFsUGlwZSwgSnNvblBpcGUsIFNsaWNlUGlwZSwgVXBwZXJDYXNlUGlwZSwgTG93ZXJDYXNlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJU2VsZWN0LCBDU1NJbWFnZVBpcGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJU2VsZWN0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2lzZWxlY3QuZGlyZWN0aXZlJ1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSVNlbGVjdCxcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElTZWxlY3QsXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIElTZWxlY3RcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdE1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiUGlwZSIsIkRvbVNhbml0aXplciIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlciIsIlZpZXdDaGlsZCIsIlZpZXdDb250YWluZXJSZWYiLCJJbnB1dCIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsIkRpcmVjdGl2ZSIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBO0lBdUJBLElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDOztRQUt0QyxzQkFBb0IsU0FBc0I7WUFBdEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtTQUFHOzs7Ozs7UUFDN0MsZ0NBQVM7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