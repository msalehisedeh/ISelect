/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ViewContainerRef, Input, Output, Renderer, HostListener, EventEmitter, ViewChild, ElementRef } from "@angular/core";
/**
 * @record
 */
export function IconInfo() { }
/** @type {?|undefined} */
IconInfo.prototype.id;
/** @type {?} */
IconInfo.prototype.name;
/** @type {?} */
IconInfo.prototype.value;
/** @type {?|undefined} */
IconInfo.prototype.label;
/** @type {?|undefined} */
IconInfo.prototype.selected;
/** @type {?|undefined} */
IconInfo.prototype.disabled;
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
export { CSSImagePipe };
if (false) {
    /** @type {?} */
    CSSImagePipe.prototype.sanitizer;
}
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
        { type: Component, args: [{
                    selector: 'i-select',
                    template: "<div class=\"i-select\" [id]=\"configID\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" \n            [style.background]=\"config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''\"></div>\n        <div class=\"fa-li fa fa-spinner fa-spin select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" class=\"i-select-button\" \n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{configID}}name\" [textContent]=\"configName\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{configID}}name\" class=\"select-icons-container\" #iconContainer>\n    <div \n        role=\"listitem\" \n        class=\"select-box\" \n        *ngFor=\"let item of displayItems; let i = index\">\n        <div [class.highlight-icon]=\"highlightIndex==i\"\n            [class.cover]=\"!true\" [title]=\"showIconName ? '':item.name\"\n            [style.background]=\"item.value | CSSImage:true\"\n            (click)=\"selectIcon(i)\"><span class=\"off-screen\" [textContent]=\"item.name\"></span></div>\n    </div>\n    </div>\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\"><div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div></div>\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n    <div class=\"i-select-arrows\">\n        <div class=\"fa fa-angle-left\"\n            (click)=\"prev($event)\"\n            [class.disabled]=\"config.currentPage==1\">\n            <span class=\"prev\" [textContent]=\"'previous'\"></span>\n        </div>\n        <div class=\"fa fa-angle-double-left\"\n                (click)=\"first($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n            <span class=\"first\" [textContent]=\"'first'\"></span>\n        </div>\n        <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n        <div class=\"fa fa-angle-double-right\"\n                (click)=\"last($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"last\" [textContent]=\"'last'\"></span>\n        </div>\n        <div class=\"fa fa-angle-right\"\n                (click)=\"next($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n        </div>\n    </div>\n    </div>\n    <div class=\"name\" *ngIf=\"showIconName\" [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                    providers: [CSSImagePipe],
                    styles: [":host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:block;text-align:left;vertical-align:middle;margin:2px 0}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:60px;height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:60px}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;float:left;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 4px 4px 0}:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{position:absolute;top:0;left:0;width:16px!important;height:16px!important;display:inline-block;margin:0!important;padding:3px!important}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}"]
                }] }
    ];
    /** @nocollapse */
    ISelect.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    ISelect.propDecorators = {
        searchIcon: [{ type: ViewChild, args: ['searchIcon', { read: ViewContainerRef },] }],
        searchInput: [{ type: ViewChild, args: ['searchInput', { read: ViewContainerRef },] }],
        iconContainer: [{ type: ViewChild, args: ['iconContainer', { read: ViewContainerRef },] }],
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
export { ISelect };
if (false) {
    /** @type {?} */
    ISelect.prototype.selectedIndex;
    /** @type {?} */
    ISelect.prototype.searchIcon;
    /** @type {?} */
    ISelect.prototype.searchInput;
    /** @type {?} */
    ISelect.prototype.iconContainer;
    /** @type {?} */
    ISelect.prototype.configID;
    /** @type {?} */
    ISelect.prototype.configName;
    /** @type {?} */
    ISelect.prototype.searchEnabled;
    /** @type {?} */
    ISelect.prototype.size;
    /** @type {?} */
    ISelect.prototype.multiselect;
    /** @type {?} */
    ISelect.prototype.showIconName;
    /** @type {?} */
    ISelect.prototype.configData;
    /** @type {?} */
    ISelect.prototype.displayItems;
    /** @type {?} */
    ISelect.prototype.onchange;
    /** @type {?} */
    ISelect.prototype.highlightIndex;
    /** @type {?} */
    ISelect.prototype.searchedData;
    /** @type {?} */
    ISelect.prototype.config;
    /** @type {?} */
    ISelect.prototype.el;
    /** @type {?} */
    ISelect.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pY29uLXNlbGVjdC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvaXNlbGVjdC9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUNOLFNBQVMsRUFHVCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBRVQsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXbEMsSUFBSSxvQkFBb0IsR0FBYSxFQUFFLENBQUM7O0lBS3RDLHNCQUFvQixTQUFzQjtRQUF0QixjQUFTLEdBQVQsU0FBUyxDQUFhO0tBQUc7Ozs7OztJQUM3QyxnQ0FBUzs7Ozs7SUFBVCxVQUFVLEdBQVcsRUFBQyxNQUFlO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsS0FBSyxHQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLFdBQVcsQ0FBQyxHQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDckg7O2dCQU5GLElBQUksU0FBQyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUM7Ozs7Z0JBMUJkLFlBQVk7O3VCQUZyQjs7U0E2QmEsWUFBWTs7Ozs7O0lBaUZ4QixpQkFBWSxFQUFjLEVBQVMsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs2QkE5RHZCLENBQUM7d0JBT04sRUFBRTswQkFHQSxFQUFFOzs7OzZCQU9BLEtBQUs7b0JBR2IsQ0FBQzsyQkFHRCxLQUFLOzs0QkFJWCxLQUFL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LEVBQUUsQ0FBQyxDQUFDO0tBQ047O2dCQWxSRCxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFDLFVBQVU7b0JBQ3RCLGkxR0FBcUM7b0JBRXJDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQzs7aUJBQ3pCOzs7O2dCQTlCQSxVQUFVO2dCQUxWLFFBQVE7Ozs2QkF3Q1AsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs4QkFDaEQsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQztnQ0FDakQsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzsyQkFFbkQsS0FBSyxTQUFDLElBQUk7NkJBR1YsS0FBSyxTQUFDLE1BQU07Z0NBT1osS0FBSyxTQUFDLGVBQWU7dUJBR3JCLEtBQUssU0FBQyxNQUFNOzhCQUdaLEtBQUssU0FBQyxhQUFhOytCQUluQixLQUFLLFNBQUMsY0FBYzs2QkFHcEIsS0FBSyxTQUFDLFNBQVM7MkJBS2YsTUFBTSxTQUFDLFVBQVU7MEJBbUJqQixZQUFZLFNBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDOztrQkFyR3pDOztTQThDYSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Q29tcG9uZW50RmFjdG9yeSwgXG5cdFJlZmxlY3RpdmVJbmplY3Rvcixcblx0Vmlld0NvbnRhaW5lclJlZixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRWaWV3Q2hpbGQsXG5cdE9uSW5pdCxcblx0RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJY29uSW5mbyB7XG5cdGlkPzpudW1iZXIsXG5cdG5hbWU6c3RyaW5nLFxuXHR2YWx1ZTpzdHJpbmcsXG5cdGxhYmVsPzpzdHJpbmcsXG5cdHNlbGVjdGVkPzpib29sZWFuLFxuXHRkaXNhYmxlZD86Ym9vbGVhblxufVxuXG52YXIgZ2xvYmFsQWN0aXZlRHJvcGRvd246SVNlbGVjdFtdID0gW107XG5cbkBQaXBlKHtuYW1lOidDU1NJbWFnZSd9KVxuZXhwb3J0IGNsYXNzIENTU0ltYWdlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm17XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6RG9tU2FuaXRpemVyKXt9XG4gIHRyYW5zZm9ybSh1cmw6IHN0cmluZyxyZXBlYXQ/OmJvb2xlYW4pOiBhbnkgeyBcblx0ICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFwidXJsKCdcIit1cmwrXCInKSBcIisocmVwZWF0ID8gXCJyZXBlYXRcIjpcIm5vLXJlcGVhdFwiKStcIiAwIDAgdHJhbnNwYXJlbnRcIik7XG4gIH1cbn1cblxuLypcbiogTGlrZSBhIHJlZ3VsYXIgZHJvcGRvd24sIHdlIHdhbnQgdG8gc2V0L2dldCBzZWxlY3RlZEluZGV4LCBzZWxlY3QgaXRlbXMgb24gYXJyb3cgdXAvZG93biwgYW5kIHNlbGVjdCBpdGVtIG9uIGNsaWNrLlxuKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOidpLXNlbGVjdCcsXG5cdHRlbXBsYXRlVXJsOiAnaXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydpc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG5cdHByb3ZpZGVyczogW0NTU0ltYWdlUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgSVNlbGVjdCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHVibGljIHNlbGVjdGVkSW5kZXg6bnVtYmVyID0gMTtcblx0XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaEljb24nLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHByaXZhdGUgc2VhcmNoSWNvbjogVmlld0NvbnRhaW5lclJlZjtcblx0QFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHByaXZhdGUgc2VhcmNoSW5wdXQ6IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ2ljb25Db250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHByaXZhdGUgaWNvbkNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBJbnB1dChcImlkXCIpXG5cdHB1YmxpYyBjb25maWdJRDpzdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dChcIm5hbWVcIilcblx0cHVibGljIGNvbmZpZ05hbWU6c3RyaW5nID0gXCJcIjtcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHQvLyBASW5wdXQoXCJ0aWxlXCIpXG5cdC8vIHByaXZhdGUgY29uZmlnVGlsZTpib29sZWFuPXRydWU7XG5cblx0QElucHV0KFwic2VhcmNoRW5hYmxlZFwiKVxuXHRwdWJsaWMgc2VhcmNoRW5hYmxlZDpib29sZWFuPWZhbHNlO1xuXG5cdEBJbnB1dChcInNpemVcIilcblx0cHVibGljIHNpemU6bnVtYmVyID0gMztcblxuXHRASW5wdXQoXCJtdWx0aXNlbGVjdFwiKVxuXHRwdWJsaWMgbXVsdGlzZWxlY3QgPSBmYWxzZTtcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHRASW5wdXQoXCJzaG93SWNvbk5hbWVcIilcblx0c2hvd0ljb25OYW1lID0gZmFsc2U7XG5cdFxuXHRASW5wdXQoXCJlbnRyaWVzXCIpXG5cdHB1YmxpYyBjb25maWdEYXRhOkljb25JbmZvW10gPSBbXTtcblx0XG5cdGRpc3BsYXlJdGVtczpJY29uSW5mb1tdID0gW107XG5cdFxuXHRAT3V0cHV0KFwib25jaGFuZ2VcIilcblx0cHVibGljIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdGhpZ2hsaWdodEluZGV4PTA7XG5cdHNlYXJjaGVkRGF0YTpJY29uSW5mb1tdID0gW107XG5cblxuXHRjb25maWcgPXtcblx0XHR0b3RhbFBhZ2U6MSxcblx0XHRjdXJyZW50UGFnZTowLFxuXHRcdG9wZW46ZmFsc2UsXG5cdFx0c2hvd0Zvb3RlcjpmYWxzZSxcblx0XHRoYXNFcnJvcjpmYWxzZSxcblx0XHRpc0ZvY3VzZWQ6ZmFsc2UsXG5cdFx0aXNTZWFyY2g6ZmFsc2UsXG5cdFx0bG9hZGluZzp0cnVlLFxuXHRcdHNlbGVjdGVkSXRlbTo8SWNvbkluZm8+bnVsbFxuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcignd2luZG93OmNsaWNrJywgWyckZXZlbnQnXSlcblx0b25DbGljaygkZXZlbnQ6S2V5Ym9hcmRFdmVudCkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5vcGVuKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZWw6SFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYscHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcblx0XHR0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5jb25maWdEYXRhO1xuXHR9XG5cblx0a2V5Ym9hcmRUcmFja2VyKCRldmVudDpLZXlib2FyZEV2ZW50KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0JGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXHRcdGNvbnNvbGUubG9nKGtleSlcblx0XHRpZihrZXk9PT0zOSB8fCBrZXk9PT00MCl7Ly9yaWdodCBvciBkb3duIGFycm93XG5cdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdGlmKGluZGV4PHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aC0xKXtcblx0XHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKGluZGV4KzEpO1xuXHRcdFx0fWVsc2UgaWYodGhpcy5jb25maWcuY3VycmVudFBhZ2U8dGhpcy5jb25maWcudG90YWxQYWdlKXtcblx0XHRcdFx0dGhpcy5uZXh0KCRldmVudCk7XG5cdFx0XHR9XG5cdFx0fSw2Nik7XG5cdFx0fWVsc2UgaWYoa2V5PT09MzcgfHwga2V5PT09Mzgpey8vbGVmdCBvciB1cCBhcnJvd1xuXHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRpZihpbmRleD4wKXtcblx0XHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKGluZGV4LTEpO1xuXHRcdFx0fWVsc2UgaWYodGhpcy5jb25maWcuY3VycmVudFBhZ2U+MSl7XG5cdFx0XHRcdHRoaXMucHJldigkZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH0sNjYpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cGVyZm9ybVNlYXJjaCgkZXZlbnQ6S2V5Ym9hcmRFdmVudCwgc2VhcmNoU3RyaW5nOnN0cmluZyl7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXHRcdGlmKGtleT4zNiAmJiBrZXk8NDEpe1xuXHRcdFx0cmV0dXJuIHRoaXMua2V5Ym9hcmRUcmFja2VyKCRldmVudCk7XG5cdFx0fVxuXHRcdGlmIChzZWFyY2hTdHJpbmcgPT09ICcnKSB7XG5cdFx0XHR0aGlzLnJlc2V0U2VhcmNoKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSB0cnVlO1xuXG5cdFx0dGhpcy5zZWFyY2hlZERhdGEgPSBbXTtcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmNvbmZpZ0RhdGEubGVuZ3RoO2krKyl7XG5cdFx0XHRsZXQgaW5mbyA9IHRoaXMuY29uZmlnRGF0YVtpXTtcblx0XHRcdGlmIChpbmZvLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZy50b0xvd2VyQ2FzZSgpKT49MCkge1xuXHRcdFx0XHR0aGlzLnNlYXJjaGVkRGF0YS5wdXNoKGluZm8pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLnNlYXJjaGVkRGF0YS5sZW5ndGgpe1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IDA7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnNlYXJjaGVkRGF0YVswXTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5zZWFyY2hlZERhdGE7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gbnVsbDtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdH1cblx0cmVzZXRTZWFyY2goKXtcblx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsJ3ZhbHVlJywnJyk7XG5cblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5yZW1vdmVDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0Ly90aGlzLnNlYXJjaEljb24uYWRkQ2xhc3MoJ3BpY2tlci1pY29uLXNlYXJjaCcpO1xuXG5cdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdHRoaXMuY29uZmlnLmlzU2VhcmNoID0gZmFsc2U7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IDA7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmNvbmZpZ0RhdGE7XG5cdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5jb25maWdEYXRhWzBdO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHR9XG5cdG5leHQoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSsrO1xuIFx0XHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwcmV2KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlLS07XG4gXHRcdCAgICB0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD10aGlzLnNpemUtMTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxhc3QoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IHRoaXMuY29uZmlnLnRvdGFsUGFnZTtcblx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9MDtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmaXJzdCgkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZW5kZXJJY29uQ29udGFpbmVyKCl7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSAodGhpcy5jb25maWcuaXNTZWFyY2ggPyB0aGlzLnNlYXJjaGVkRGF0YSA6IHRoaXMuY29uZmlnRGF0YSk7XG5cdFx0dGhpcy5jb25maWcudG90YWxQYWdlID0gTWF0aC5jZWlsKHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aCAvIHRoaXMuc2l6ZSk7XG5cdFx0XG5cdFx0dGhpcy5jb25maWcuc2hvd0Zvb3RlciA9ICh0aGlzLmNvbmZpZy50b3RhbFBhZ2UgPiAxKTtcblxuXHRcdGxldCBvZmZzZXQgPSAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZTtcblxuXHRcdGlmKHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aDwxICl7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IHRydWU7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5jb25maWcuaGFzRXJyb3IgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5kaXNwbGF5SXRlbXMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0aGlzLnNpemUpO1xuXHRcdH1cblx0fVxuXHR0b2dnbGVJY29uU2VsZWN0b3IoKXtcblx0XHR0aGlzLmNvbmZpZy5vcGVuID0gIXRoaXMuY29uZmlnLm9wZW47XG5cblx0XHRpZiAodGhpcy5jb25maWcub3BlbiAmJiB0aGlzLnNlYXJjaEVuYWJsZWQpIHtcblx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSk7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdCcsIFtdKTtcblx0XHRcdH0sIDIwKTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBmaW5kU2VsZWN0ZWRJbmRleCgpe1xuXHRcdGlmKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSl7XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8dGhpcy5jb25maWdEYXRhLmxlbmd0aDtpKyspe1xuXHRcdFx0aWYodGhpcy5jb25maWdEYXRhW2ldLmlkPT10aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uaWQpe1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR9XG5cdH1cblx0c2VsZWN0SWNvbihpbmRleDpudW1iZXIpe1xuXHRcdGlmKHRoaXMuZGlzcGxheUl0ZW1zKXtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW2luZGV4XTtcblx0XHRcdHRoaXMuZmluZFNlbGVjdGVkSW5kZXgoKTtcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdH1cblx0fVxuXHRoaWdobGlnaHRJY29uKGluZGV4Om51bWJlcil7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IGluZGV4O1xuXHRcdGlmKHRoaXMuZGlzcGxheUl0ZW1zKXtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW3RoaXMuaGlnaGxpZ2h0SW5kZXhdO1xuXHRcdFx0dGhpcy5maW5kU2VsZWN0ZWRJbmRleCgpO1xuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSk7XG5cdFx0fVxuXHR9XG5cdHBvcEljb25zKCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRmb3IobGV0IGk6bnVtYmVyPTA7aTxnbG9iYWxBY3RpdmVEcm9wZG93bi5sZW5ndGg7aSsrKXtcblx0XHRcdGlmKGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldIT10aGlzICYmIGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldLmNvbmZpZy5vcGVuKXtcblx0XHRcdFx0Z2xvYmFsQWN0aXZlRHJvcGRvd25baV0udG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlczphbnkpIHtcblx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8dGhpcy5jb25maWdEYXRhLmxlbmd0aDtpKyspe3RoaXMuY29uZmlnRGF0YVtpXS5pZD0gaX1cblx0XG5cdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zZWxlY3RlZEluZGV4Lyh0aGlzLnNpemUtMSkpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zZWxlY3RlZEluZGV4LSgodGhpcy5jb25maWcuY3VycmVudFBhZ2UtMSkqdGhpcy5zaXplKTtcblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblxuXHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duLnB1c2godGhpcyk7XG5cdFx0aWYodGhpcy5jb25maWcudG90YWxQYWdlPjEpe1xuXHRcdFx0dGhpcy5jb25maWcubG9hZGluZyA9IGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHR0aGlzLm9uY2hhbmdlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHR9LDEwKTtcblx0fVxuXG59XG4iXX0=