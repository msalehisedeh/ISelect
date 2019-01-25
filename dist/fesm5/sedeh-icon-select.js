import { Pipe, Component, ViewContainerRef, Input, Output, Renderer, HostListener, EventEmitter, ViewChild, ElementRef, Directive, ComponentFactoryResolver, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var globalActiveDropdown = [];
var CSSImagePipe = /** @class */ (function () {
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
        { type: Pipe, args: [{ name: 'CSSImage' },] }
    ];
    /** @nocollapse */
    CSSImagePipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return CSSImagePipe;
}());
var ISelect = /** @class */ (function () {
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
        this.onchange = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'i-select',
                    template: "<div class=\"i-select\" [id]=\"configID\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" (click)=\"toggleIconSelector()\" #iconBox\n            [style.background]=\"config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''\"></div>\n        <div class=\"fa-li fa fa-spinner fa-spin select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" #searchButton\n        class=\"i-select-button\" \n        [class.focus]=\"config.open\"\n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{configID}}name\" [textContent]=\"configName\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{configID}}name\" class=\"select-icons-container\" #iconContainer>\n    <div \n        role=\"listitem\" \n        class=\"select-box\" \n        *ngFor=\"let item of displayItems; let i = index\">\n        <div [class.highlight-icon]=\"highlightIndex==i\"\n            [class.cover]=\"!true\" [title]=\"showIconName ? '':item.name\"\n            [style.background]=\"item.value | CSSImage:true\"\n            (click)=\"selectIcon(i)\"><span class=\"off-screen\" [textContent]=\"item.name\"></span></div>\n    </div>\n    </div>\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\"><div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div></div>\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n    <div class=\"i-select-arrows\">\n        <div class=\"fa fa-angle-left\"\n            (click)=\"prev($event)\"\n            [class.disabled]=\"config.currentPage==1\">\n            <span class=\"prev\" [textContent]=\"'previous'\"></span>\n        </div>\n        <div class=\"fa fa-angle-double-left\"\n                (click)=\"first($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n            <span class=\"first\" [textContent]=\"'first'\"></span>\n        </div>\n        <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n        <div class=\"fa fa-angle-double-right\"\n                (click)=\"last($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"last\" [textContent]=\"'last'\"></span>\n        </div>\n        <div class=\"fa fa-angle-right\"\n                (click)=\"next($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n        </div>\n    </div>\n    </div>\n    <div class=\"name\" *ngIf=\"showIconName\" [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                    providers: [CSSImagePipe],
                    styles: [":host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:block;text-align:left;vertical-align:middle;margin:2px 0;width:150px}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:calc(100% - 20px);height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:100%}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0;position:relative}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 2px 2px 0;position:absolute;right:-1px}:host .i-select-button.focus .select-icon-up-dir,:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button.focus .select-icon-down-dir,:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{position:absolute;top:0;left:0;width:16px!important;height:16px!important;display:inline-block;margin:0!important;padding:3px!important}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}"]
                }] }
    ];
    /** @nocollapse */
    ISelect.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    ISelect.propDecorators = {
        iconBox: [{ type: ViewChild, args: ['iconBox', { read: ViewContainerRef },] }],
        iconContainer: [{ type: ViewChild, args: ['iconContainer', { read: ViewContainerRef },] }],
        searchIcon: [{ type: ViewChild, args: ['searchIcon', { read: ViewContainerRef },] }],
        searchInput: [{ type: ViewChild, args: ['searchInput', { read: ViewContainerRef },] }],
        searchButton: [{ type: ViewChild, args: ['searchButton', { read: ViewContainerRef },] }],
        configID: [{ type: Input, args: ["id",] }],
        configName: [{ type: Input, args: ["name",] }],
        searchEnabled: [{ type: Input, args: ["searchEnabled",] }],
        size: [{ type: Input, args: ["size",] }],
        multiselect: [{ type: Input, args: ["multiselect",] }],
        showIconName: [{ type: Input, args: ["showIconName",] }],
        configData: [{ type: Input, args: ["entries",] }],
        onchange: [{ type: Output, args: ["onchange",] }],
        onClick: [{ type: HostListener, args: ['window:click', ['$event'],] }]
    };
    return ISelect;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ISelectDirective = /** @class */ (function () {
    function ISelectDirective(viewRef, el, componentFactoryResolver) {
        this.viewRef = viewRef;
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.data = [];
        this.searchEnabled = false;
        this.change = new EventEmitter();
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
            var domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
            _this.el.nativeElement.parentNode.appendChild(domElem);
            /** @type {?} */
            var instance = (/** @type {?} */ (componentRef.instance));
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
        { type: Directive, args: [{
                    selector: '[i-select]'
                },] }
    ];
    /** @nocollapse */
    ISelectDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
    ISelectDirective.propDecorators = {
        searchEnabled: [{ type: Input, args: ["searchEnabled",] }],
        change: [{ type: Output, args: ["change",] }]
    };
    return ISelectDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ISelectModule = /** @class */ (function () {
    function ISelectModule() {
    }
    ISelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

export { ISelect, CSSImagePipe, ISelectDirective, ISelectModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtaWNvbi1zZWxlY3QuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9pY29uLXNlbGVjdC9zcmMvYXBwL2lzZWxlY3QvY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ljb24tc2VsZWN0L3NyYy9hcHAvaXNlbGVjdC9kaXJlY3RpdmVzL2lzZWxlY3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3Qvc3JjL2FwcC9pc2VsZWN0L2lzZWxlY3QubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyLFxuXHRIb3N0TGlzdGVuZXIsXG5cdEV2ZW50RW1pdHRlcixcblx0Vmlld0NoaWxkLFxuXHRPbkluaXQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSWNvbkluZm8ge1xuXHRpZD86bnVtYmVyLFxuXHRuYW1lOnN0cmluZyxcblx0dmFsdWU6c3RyaW5nLFxuXHRsYWJlbD86c3RyaW5nLFxuXHRzZWxlY3RlZD86Ym9vbGVhbixcblx0ZGlzYWJsZWQ/OmJvb2xlYW5cbn1cblxudmFyIGdsb2JhbEFjdGl2ZURyb3Bkb3duOklTZWxlY3RbXSA9IFtdO1xuXG5AUGlwZSh7bmFtZTonQ1NTSW1hZ2UnfSlcbmV4cG9ydCBjbGFzcyBDU1NJbWFnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3Jte1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOkRvbVNhbml0aXplcil7fVxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcscmVwZWF0Pzpib29sZWFuKTogYW55IHsgXG5cdCAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcInVybCgnXCIrdXJsK1wiJykgXCIrKHJlcGVhdCA/IFwicmVwZWF0XCI6XCJuby1yZXBlYXRcIikrXCIgMCAwIHRyYW5zcGFyZW50XCIpO1xuICB9XG59XG5cbi8qXG4qIExpa2UgYSByZWd1bGFyIGRyb3Bkb3duLCB3ZSB3YW50IHRvIHNldC9nZXQgc2VsZWN0ZWRJbmRleCwgc2VsZWN0IGl0ZW1zIG9uIGFycm93IHVwL2Rvd24sIGFuZCBzZWxlY3QgaXRlbSBvbiBjbGljay5cbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjonaS1zZWxlY3QnLFxuXHR0ZW1wbGF0ZVVybDogJ2lzZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnaXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuXHRwcm92aWRlcnM6IFtDU1NJbWFnZVBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIElTZWxlY3QgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHB1YmxpYyBzZWxlY3RlZEluZGV4Om51bWJlciA9IDE7XG5cdFxuXHRAVmlld0NoaWxkKCdpY29uQm94Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIGljb25Cb3g6IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ2ljb25Db250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHByaXZhdGUgaWNvbkNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblx0QFZpZXdDaGlsZCgnc2VhcmNoSWNvbicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBzZWFyY2hJY29uOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcHJpdmF0ZSBzZWFyY2hJbnB1dDogVmlld0NvbnRhaW5lclJlZjtcblx0QFZpZXdDaGlsZCgnc2VhcmNoQnV0dG9uJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIHNlYXJjaEJ1dHRvbjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBJbnB1dChcImlkXCIpXG5cdHB1YmxpYyBjb25maWdJRDpzdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dChcIm5hbWVcIilcblx0cHVibGljIGNvbmZpZ05hbWU6c3RyaW5nID0gXCJcIjtcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHQvLyBASW5wdXQoXCJ0aWxlXCIpXG5cdC8vIHByaXZhdGUgY29uZmlnVGlsZTpib29sZWFuPXRydWU7XG5cblx0QElucHV0KFwic2VhcmNoRW5hYmxlZFwiKVxuXHRwdWJsaWMgc2VhcmNoRW5hYmxlZDpib29sZWFuPWZhbHNlO1xuXG5cdEBJbnB1dChcInNpemVcIilcblx0cHVibGljIHNpemU6bnVtYmVyID0gMztcblxuXHRASW5wdXQoXCJtdWx0aXNlbGVjdFwiKVxuXHRwdWJsaWMgbXVsdGlzZWxlY3QgPSBmYWxzZTtcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHRASW5wdXQoXCJzaG93SWNvbk5hbWVcIilcblx0c2hvd0ljb25OYW1lID0gZmFsc2U7XG5cdFxuXHRASW5wdXQoXCJlbnRyaWVzXCIpXG5cdHB1YmxpYyBjb25maWdEYXRhOkljb25JbmZvW10gPSBbXTtcblx0XG5cdGRpc3BsYXlJdGVtczpJY29uSW5mb1tdID0gW107XG5cdFxuXHRAT3V0cHV0KFwib25jaGFuZ2VcIilcblx0cHVibGljIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdGhpZ2hsaWdodEluZGV4PTA7XG5cdHNlYXJjaGVkRGF0YTpJY29uSW5mb1tdID0gW107XG5cblxuXHRjb25maWcgPXtcblx0XHR0b3RhbFBhZ2U6MSxcblx0XHRjdXJyZW50UGFnZTowLFxuXHRcdG9wZW46ZmFsc2UsXG5cdFx0c2hvd0Zvb3RlcjpmYWxzZSxcblx0XHRoYXNFcnJvcjpmYWxzZSxcblx0XHRpc0ZvY3VzZWQ6ZmFsc2UsXG5cdFx0aXNTZWFyY2g6ZmFsc2UsXG5cdFx0bG9hZGluZzp0cnVlLFxuXHRcdHNlbGVjdGVkSXRlbTo8SWNvbkluZm8+bnVsbFxuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcignd2luZG93OmNsaWNrJywgWyckZXZlbnQnXSlcblx0b25DbGljaygkZXZlbnQ6S2V5Ym9hcmRFdmVudCkge1xuXHRcdGlmICgkZXZlbnQudGFyZ2V0ICE9PSB0aGlzLmljb25Cb3guZWxlbWVudC5uYXRpdmVFbGVtZW50ICAmJiB0aGlzLmNvbmZpZy5vcGVuKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZWw6SFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYscHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcblx0XHR0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5jb25maWdEYXRhO1xuXHR9XG5cblx0a2V5Ym9hcmRUcmFja2VyKCRldmVudDpLZXlib2FyZEV2ZW50KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0JGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXG5cdFx0aWYoa2V5PT09MzkgfHwga2V5PT09NDApey8vcmlnaHQgb3IgZG93biBhcnJvd1xuXHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHRsZXQgaW5kZXggPSB0aGlzLmhpZ2hsaWdodEluZGV4O1xuXHRcdFx0XHRpZihpbmRleDx0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGgtMSl7XG5cdFx0XHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKGluZGV4KzEpO1xuXHRcdFx0XHR9ZWxzZSBpZih0aGlzLmNvbmZpZy5jdXJyZW50UGFnZTx0aGlzLmNvbmZpZy50b3RhbFBhZ2Upe1xuXHRcdFx0XHRcdHRoaXMubmV4dCgkZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LDY2KTtcblx0XHR9IGVsc2UgaWYoa2V5PT09MzcgfHwga2V5PT09Mzgpey8vbGVmdCBvciB1cCBhcnJvd1xuXHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHRsZXQgaW5kZXggPSB0aGlzLmhpZ2hsaWdodEluZGV4O1xuXHRcdFx0XHRpZihpbmRleD4wKXtcblx0XHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXgtMSk7XG5cdFx0XHRcdH1lbHNlIGlmKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlPjEpe1xuXHRcdFx0XHRcdHRoaXMucHJldigkZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LDY2KTtcblx0XHR9XG5cdFx0aWYgKGtleSA9PT0gNDApIHtcblx0XHRcdHRoaXMuY29uZmlnLm9wZW4gPSB0cnVlO1xuXHRcdFx0aWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcblx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHtcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdmb2N1cycsIFtdKVxuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdCcsIFtdKTtcblx0XHRcdFx0fSwgMjIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAzOCAmJiB0aGlzLmhpZ2hsaWdodEluZGV4ID09PSAwKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5vcGVuID0gZmFsc2U7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hCdXR0b24uZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwZXJmb3JtU2VhcmNoKCRldmVudDpLZXlib2FyZEV2ZW50LCBzZWFyY2hTdHJpbmc6c3RyaW5nKXtcblx0XHRsZXQga2V5ID0gJGV2ZW50LmNoYXJDb2RlIHx8ICRldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0aWYoa2V5PjM2ICYmIGtleTw0MSl7XG5cdFx0XHRyZXR1cm4gdGhpcy5rZXlib2FyZFRyYWNrZXIoJGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKHNlYXJjaFN0cmluZyA9PT0gJycpIHtcblx0XHRcdHRoaXMucmVzZXRTZWFyY2goKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLXNlYXJjaCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1jYW5jZWwnKTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IHRydWU7XG5cblx0XHR0aGlzLnNlYXJjaGVkRGF0YSA9IFtdO1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPHRoaXMuY29uZmlnRGF0YS5sZW5ndGg7aSsrKXtcblx0XHRcdGxldCBpbmZvID0gdGhpcy5jb25maWdEYXRhW2ldO1xuXHRcdFx0aWYgKGluZm8ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nLnRvTG93ZXJDYXNlKCkpPj0wKSB7XG5cdFx0XHRcdHRoaXMuc2VhcmNoZWREYXRhLnB1c2goaW5mbyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHRoaXMuc2VhcmNoZWREYXRhLmxlbmd0aCl7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gMDtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuc2VhcmNoZWREYXRhWzBdO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLnNlYXJjaGVkRGF0YTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0fVxuXHRyZXNldFNlYXJjaCgpe1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwndmFsdWUnLCcnKTtcblxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1jYW5jZWwnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tc2VhcmNoJyk7XG5cblx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSBmYWxzZTtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gMDtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuY29uZmlnRGF0YTtcblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmNvbmZpZ0RhdGFbMF07XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdH1cblx0bmV4dCgkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPCB0aGlzLmNvbmZpZy50b3RhbFBhZ2UpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlKys7XG4gXHRcdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9MDtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHByZXYoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UtLTtcbiBcdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGFzdCgkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPCB0aGlzLmNvbmZpZy50b3RhbFBhZ2UpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gdGhpcy5jb25maWcudG90YWxQYWdlO1xuXHRcdCAgICB0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD0wO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZpcnN0KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zaXplLTE7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJlbmRlckljb25Db250YWluZXIoKXtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9ICh0aGlzLmNvbmZpZy5pc1NlYXJjaCA/IHRoaXMuc2VhcmNoZWREYXRhIDogdGhpcy5jb25maWdEYXRhKTtcblx0XHR0aGlzLmNvbmZpZy50b3RhbFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIC8gdGhpcy5zaXplKTtcblx0XHRcblx0XHR0aGlzLmNvbmZpZy5zaG93Rm9vdGVyID0gKHRoaXMuY29uZmlnLnRvdGFsUGFnZSA+IDEpO1xuXG5cdFx0bGV0IG9mZnNldCA9ICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5zaXplO1xuXG5cdFx0aWYodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoPDEgKXtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gdHJ1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmRpc3BsYXlJdGVtcy5zbGljZShvZmZzZXQsIG9mZnNldCArIHRoaXMuc2l6ZSk7XG5cdFx0fVxuXHR9XG5cdHRvZ2dsZUljb25TZWxlY3Rvcigpe1xuXHRcdHRoaXMuY29uZmlnLm9wZW4gPSAhdGhpcy5jb25maWcub3BlbjtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5vcGVuICYmIHRoaXMuc2VhcmNoRW5hYmxlZCkge1xuXHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdmb2N1cycsIFtdKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0JywgW10pO1xuXHRcdFx0fSwgMjApO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIGZpbmRTZWxlY3RlZEluZGV4KCl7XG5cdFx0aWYodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKXtcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmNvbmZpZ0RhdGEubGVuZ3RoO2krKyl7XG5cdFx0XHRpZih0aGlzLmNvbmZpZ0RhdGFbaV0uaWQ9PXRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5pZCl7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdH1cblx0fVxuXHRzZWxlY3RJY29uKGluZGV4Om51bWJlcil7XG5cdFx0aWYodGhpcy5kaXNwbGF5SXRlbXMpe1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdO1xuXHRcdFx0dGhpcy5maW5kU2VsZWN0ZWRJbmRleCgpO1xuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSk7XG5cdFx0fVxuXHR9XG5cdGhpZ2hsaWdodEljb24oaW5kZXg6bnVtYmVyKXtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gaW5kZXg7XG5cdFx0aWYodGhpcy5kaXNwbGF5SXRlbXMpe1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0XHR0aGlzLmZpbmRTZWxlY3RlZEluZGV4KCk7XG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHR9XG5cdH1cblx0cG9wSWNvbnMoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPGdsb2JhbEFjdGl2ZURyb3Bkb3duLmxlbmd0aDtpKyspe1xuXHRcdFx0aWYoZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0hPXRoaXMgJiYgZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0uY29uZmlnLm9wZW4pe1xuXHRcdFx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bltpXS50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOmFueSkge1xuXHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmNvbmZpZ0RhdGEubGVuZ3RoO2krKyl7dGhpcy5jb25maWdEYXRhW2ldLmlkPSBpfVxuXHRcblx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IE1hdGguY2VpbCh0aGlzLnNlbGVjdGVkSW5kZXgvKHRoaXMuc2l6ZS0xKSk7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD10aGlzLnNlbGVjdGVkSW5kZXgtKCh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZS0xKSp0aGlzLnNpemUpO1xuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXG5cdFx0Z2xvYmFsQWN0aXZlRHJvcGRvd24ucHVzaCh0aGlzKTtcblx0XHRpZih0aGlzLmNvbmZpZy50b3RhbFBhZ2U+MSl7XG5cdFx0XHR0aGlzLmNvbmZpZy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW3RoaXMuaGlnaGxpZ2h0SW5kZXhdO1xuXHRcdHRoaXMub25jaGFuZ2UuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdH0sMTApO1xuXHR9XG5cbn1cbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEVtYmVkZGVkVmlld1JlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSVNlbGVjdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tpLXNlbGVjdF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJU2VsZWN0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgZGF0YSA9IFtdO1xyXG5cclxuXHRASW5wdXQoXCJzZWFyY2hFbmFibGVkXCIpXHJcblx0cHVibGljIHNlYXJjaEVuYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBAT3V0cHV0KFwiY2hhbmdlXCIpXHJcbiAgICBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHB1YmxpYyBlbDpFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICBcclxuXHRuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImRpc3BsYXk6bm9uZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgY29uc3QgbGlzdDogSFRNTENvbGxlY3Rpb24gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ub2RlVHlwZSA9PT0gMSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwidmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbi5pbm5lckhUTUxcclxuICAgICAgICAgICAgICAgICAgICB9KSAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KElTZWxlY3QpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZiA8IGFueSA+ICkucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2U6SVNlbGVjdCA9ICg8SVNlbGVjdD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zZWFyY2hFbmFibGVkID0gdGhpcy5zZWFyY2hFbmFibGVkO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdJRCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCtcIi1pc2VsZWN0XCI7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNpemUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2l6ZTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnTmFtZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5vbmNoYW5nZS5zdWJzY3JpYmUodGhpcy5jaGFuZ2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdEYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZ09uQ2hhbmdlcyh1bmRlZmluZWQpO1xyXG4gICAgICAgIH0sIDY2KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERhdGVQaXBlLCBDdXJyZW5jeVBpcGUsIERlY2ltYWxQaXBlLCBKc29uUGlwZSwgU2xpY2VQaXBlLCBVcHBlckNhc2VQaXBlLCBMb3dlckNhc2VQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QsIENTU0ltYWdlUGlwZSB9IGZyb20gJy4vY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IElTZWxlY3REaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaXNlbGVjdC5kaXJlY3RpdmUnXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBJU2VsZWN0LFxyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSVNlbGVjdCxcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgSVNlbGVjdFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBJU2VsZWN0TW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBO0FBdUJBLElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDOztJQUt0QyxzQkFBb0IsU0FBc0I7UUFBdEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtLQUFHOzs7Ozs7SUFDN0MsZ0NBQVM7Ozs7O0lBQVQsVUFBVSxHQUFXLEVBQUMsTUFBZTtRQUNwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsT0FBTyxHQUFDLEdBQUcsR0FBQyxLQUFLLElBQUUsTUFBTSxHQUFHLFFBQVEsR0FBQyxXQUFXLENBQUMsR0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3JIOztnQkFORixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDOzs7O2dCQXhCZCxZQUFZOzt1QkFGckI7OztJQThH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