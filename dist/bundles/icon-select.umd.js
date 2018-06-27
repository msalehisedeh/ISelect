(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/common'], factory) :
	(factory((global['icon-select'] = {}),global.ng.core,global.ng.platformBrowser,global.ng.common));
}(this, (function (exports,core,platformBrowser,common) { 'use strict';

var globalActiveDropdown = [];
var CSSImagePipe = /** @class */ (function () {
    function CSSImagePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    CSSImagePipe.prototype.transform = function (url, repeat) {
        return this.sanitizer.bypassSecurityTrustStyle("url('" + url + "') " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent");
    };
    return CSSImagePipe;
}());
CSSImagePipe.decorators = [
    { type: core.Pipe, args: [{ name: 'CSSImage' },] },
];
CSSImagePipe.ctorParameters = function () { return [
    { type: platformBrowser.DomSanitizer, },
]; };
var ISelect = /** @class */ (function () {
    function ISelect(el, renderer) {
        this.renderer = renderer;
        this.selectedIndex = 1;
        this.configID = "";
        this.configName = "";
        this.searchEnabled = false;
        this.size = 3;
        this.multiselect = false;
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
            selectedItem: (null)
        };
        this.el = el.nativeElement;
    }
    ISelect.prototype.onClick = function ($event) {
        if (this.config.open) {
            this.toggleIconSelector();
        }
    };
    ISelect.prototype.ngOnInit = function () {
        this.displayItems = this.configData;
    };
    ISelect.prototype.keyboardTracker = function ($event) {
        var _this = this;
        $event.stopPropagation();
        $event.preventDefault();
        var key = $event.charCode || $event.keyCode || 0;
        console.log(key);
        if (key === 39 || key === 40) {
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
        else if (key === 37 || key === 38) {
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
        return false;
    };
    ISelect.prototype.performSearch = function ($event, searchString) {
        var key = $event.charCode || $event.keyCode || 0;
        if (key > 36 && key < 41) {
            return this.keyboardTracker($event);
        }
        if (searchString === '') {
            this.resetSearch();
            return;
        }
        this.config.isSearch = true;
        this.searchedData = [];
        for (var i = 0; i < this.configData.length; i++) {
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
    ISelect.prototype.resetSearch = function () {
        this.renderer.setElementAttribute(this.searchInput.element.nativeElement, 'value', '');
        this.config.currentPage = 1;
        this.config.isSearch = false;
        this.highlightIndex = 0;
        this.displayItems = this.configData;
        this.config.selectedItem = this.configData[0];
        this.highlightIcon(this.highlightIndex);
        this.renderIconContainer();
    };
    ISelect.prototype.next = function ($event) {
        $event.stopPropagation();
        if (this.config.currentPage < this.config.totalPage) {
            this.config.currentPage++;
            this.renderIconContainer();
        }
        this.highlightIndex = 0;
        this.highlightIcon(this.highlightIndex);
        return false;
    };
    ISelect.prototype.prev = function ($event) {
        $event.stopPropagation();
        if (this.config.currentPage > 1) {
            this.config.currentPage--;
            this.renderIconContainer();
        }
        this.highlightIndex = this.size - 1;
        this.highlightIcon(this.highlightIndex);
        return false;
    };
    ISelect.prototype.last = function ($event) {
        $event.stopPropagation();
        if (this.config.currentPage < this.config.totalPage) {
            this.config.currentPage = this.config.totalPage;
            this.renderIconContainer();
        }
        this.highlightIndex = 0;
        this.highlightIcon(this.highlightIndex);
        return false;
    };
    ISelect.prototype.first = function ($event) {
        $event.stopPropagation();
        if (this.config.currentPage > 1) {
            this.config.currentPage = 1;
            this.renderIconContainer();
        }
        this.highlightIndex = this.size - 1;
        this.highlightIcon(this.highlightIndex);
        return false;
    };
    ISelect.prototype.renderIconContainer = function () {
        this.displayItems = (this.config.isSearch ? this.searchedData : this.configData);
        this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
        this.config.showFooter = (this.config.totalPage > 1);
        var offset = (this.config.currentPage - 1) * this.size;
        if (this.displayItems.length < 1) {
            this.config.hasError = true;
        }
        else {
            this.config.hasError = false;
            this.displayItems = this.displayItems.slice(offset, offset + this.size);
        }
    };
    ISelect.prototype.toggleIconSelector = function () {
        var _this = this;
        this.config.open = !this.config.open;
        if (this.config.open && this.searchEnabled) {
            setTimeout(function () {
                _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'focus', []);
                _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'select', []);
            }, 20);
        }
    };
    ISelect.prototype.findSelectedIndex = function () {
        if (this.config.selectedItem) {
            for (var i = 0; i < this.configData.length; i++) {
                if (this.configData[i].id == this.config.selectedItem.id) {
                    this.selectedIndex = i;
                }
            }
        }
    };
    ISelect.prototype.selectIcon = function (index) {
        if (this.displayItems) {
            this.config.selectedItem = this.displayItems[index];
            this.findSelectedIndex();
            this.onchange.emit(this.config.selectedItem);
        }
    };
    ISelect.prototype.highlightIcon = function (index) {
        this.highlightIndex = index;
        if (this.displayItems) {
            this.config.selectedItem = this.displayItems[this.highlightIndex];
            this.findSelectedIndex();
            this.onchange.emit(this.config.selectedItem);
        }
    };
    ISelect.prototype.popIcons = function ($event) {
        $event.stopPropagation();
        for (var i = 0; i < globalActiveDropdown.length; i++) {
            if (globalActiveDropdown[i] != this && globalActiveDropdown[i].config.open) {
                globalActiveDropdown[i].toggleIconSelector();
            }
        }
        this.toggleIconSelector();
        return false;
    };
    ISelect.prototype.ngOnChanges = function (changes) {
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
    return ISelect;
}());
ISelect.decorators = [
    { type: core.Component, args: [{
                selector: 'i-select',
                template: "<div class=\"i-select\" [id]=\"configID\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\"\n            [style.background]=\"config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''\"></div>\n        <div class=\"fa-li fa fa-spinner fa-spin select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" class=\"i-select-button\"\n        (click)=\"popIcons($event)\"\n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{configID}}name\" [textContent]=\"configName\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\"\n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{configID}}name\" class=\"select-icons-container\" #iconContainer>\n    <div\n        role=\"listitem\"\n        class=\"select-box\"\n        *ngFor=\"let item of displayItems; let i = index\">\n        <div [class.highlight-icon]=\"highlightIndex==i\"\n            [class.cover]=\"!true\" [title]=\"showIconName ? '':item.name\"\n            [style.background]=\"item.value | CSSImage:true\"\n            (click)=\"selectIcon(i)\"><span class=\"off-screen\" [textContent]=\"item.name\"></span></div>\n    </div>\n    </div>\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\"><div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div></div>\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n    <div class=\"i-select-arrows\">\n        <div class=\"fa fa-angle-left\"\n            (click)=\"prev($event)\"\n            [class.disabled]=\"config.currentPage==1\">\n            <span class=\"prev\" [textContent]=\"'previous'\"></span>\n        </div>\n        <div class=\"fa fa-angle-double-left\"\n                (click)=\"first($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n            <span class=\"first\" [textContent]=\"'first'\"></span>\n        </div>\n        <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n        <div class=\"fa fa-angle-double-right\"\n                (click)=\"last($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"last\" [textContent]=\"'last'\"></span>\n        </div>\n        <div class=\"fa fa-angle-right\"\n                (click)=\"next($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n        </div>\n    </div>\n    </div>\n    <div class=\"name\" *ngIf=\"showIconName\" [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                styles: [":host *{\n  margin:0;\n  padding:0;\n  border:0;\n  vertical-align:baseline; }\n:host{\n  display:block;\n  text-align:left;\n  vertical-align:middle;\n  margin:2px 0; }\n  :host .off-screen{\n    display:block;\n    text-indent:-9999px;\n    width:0;\n    height:0; }\n  :host .select-box{\n    background-color:#ccc;\n    background-size:contain;\n    display:inline-block;\n    margin:2px;\n    width:60px;\n    line-height:42px;\n    text-align:center;\n    cursor:pointer;\n    vertical-align:top;\n    height:40px;\n    border:1px solid #EFEFEF; }\n    :host .select-box:hover, :host .select-box:focus{\n      border:1px solid #888; }\n    :host .select-box div{\n      background-repeat:repeat;\n      background-color:transparent;\n      background-position:0 0;\n      border:1px solid transparent;\n      height:40px;\n      width:60px; }\n    :host .select-box .highlight-icon{\n      background-repeat:repeat;\n      background-color:transparent;\n      background-position:0 0;\n      border:2px solid red;\n      height:40px;\n      width:60px; }\n  :host .name{\n    color:#444;\n    font-size:0.8em;\n    text-align:center;\n    text-shadow:0 1px 0 #eee; }\n  :host .i-select-footer{\n    line-height:12px;\n    text-align:center; }\n    :host .i-select-footer .i-select-arrows{\n      float:right; }\n      :host .i-select-footer .i-select-arrows div{\n        color:#444;\n        cursor:pointer;\n        display:inline-block;\n        height:16px; }\n        :host .i-select-footer .i-select-arrows div.disabled{\n          color:#ddd;\n          cursor:default;\n          font-weight:bold; }\n        :host .i-select-footer .i-select-arrows div .next,\n        :host .i-select-footer .i-select-arrows div .prev,\n        :host .i-select-footer .i-select-arrows div .last,\n        :host .i-select-footer .i-select-arrows div .first{\n          cursor:pointer;\n          width:auto;\n          display:inline-block;\n          height:39px;\n          text-indent:-99999px;\n          -webkit-box-sizing:border-box;\n                  box-sizing:border-box; }\n        :host .i-select-footer .i-select-arrows div .i-select-pages{\n          font-size:11px; }\n        :host .i-select-footer .i-select-arrows div:hover, :host .i-select-footer .i-select-arrows div:focus{\n          color:#777777; }\n  :host .selected-icon{\n    background-color:#ccc;\n    background-size:contain;\n    display:block;\n    width:60px;\n    height:100%;\n    float:left;\n    position:relative;\n    text-align:center; }\n    :host .selected-icon div{\n      cursor:default;\n      color:#404040;\n      height:100%;\n      width:60px; }\n  :host .i-select{\n    height:22px;\n    background-color:#fff;\n    border:1px solid #ededed;\n    border-radius:0 4px 4px 0; }\n    :host .i-select.focused{\n      border:1px dotted #444; }\n  :host .i-select-category select{\n    border:0;\n    line-height:20px;\n    padding:3px;\n    width:100%;\n    height:40px;\n    -ms-box-sizing:border-box;\n    -o-box-sizing:border-box;\n    -webkit-box-sizing:border-box;\n    box-sizing:border-box;\n    margin-bottom:5px;\n    font-size:12px;\n    display:block;\n    border:1px solid #EDEDED;\n    color:#404040;\n    -ms-box-shadow:none;\n    -o-box-shadow:none;\n    -webkit-box-shadow:none;\n    box-shadow:none;\n    outline:none; }\n    :host .i-select-category select option{\n      padding:10px; }\n  :host .i-select-button{\n    cursor:pointer;\n    display:block;\n    float:left;\n    height:100%;\n    text-align:center;\n    width:20px;\n    background-color:#f4f4f4;\n    border-left:1px solid #e1e1e1;\n    border-radius:0 4px 4px 0; }\n    :host .i-select-button:focus .select-icon-up-dir{\n      border-top:5px solid grey; }\n    :host .i-select-button:focus .select-icon-down-dir{\n      border-top:5px solid grey; }\n    :host .i-select-button:hover, :host .i-select-button:focus{\n      background-color:#f1f1f1 div;\n        background-color-color:#999999; }\n    :host .i-select-button div{\n      color:#aaaaaa;\n      text-shadow:0px 1px 0px #FFF; }\n    :host .i-select-button .select-icon-down-dir{\n      border-left:5px solid transparent;\n      border-right:5px solid transparent;\n      border-top:5px solid black;\n      float:left;\n      height:0;\n      margin:10px 5px;\n      width:0; }\n    :host .i-select-button .select-icon-up-dir{\n      border-left:5px solid transparent;\n      border-right:5px solid transparent;\n      border-top:5px solid black;\n      float:left;\n      height:0;\n      margin:15px 10px;\n      width:0; }\n  :host .select-icons-container{\n    width:100%;\n    -webkit-box-sizing:border-box;\n    box-sizing:border-box;\n    padding:5px;\n    background-color:#fff;\n    border:1px solid #d3d3d3; }\n    :host .select-icons-container .loading{\n      color:#eee;\n      font-size:24px;\n      margin:0 auto;\n      padding:20px 0;\n      text-align:center;\n      width:100%; }\n  :host .i-select-popup{\n    position:absolute;\n    z-index:10000;\n    background-color:#fefefe;\n    padding:5px;\n    height:auto;\n    width:210px;\n    margin-top:-1px;\n    -ms-box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);\n    -o-box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);\n    -webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);\n    box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);\n    border:1px solid #E5E5E5; }\n  :host .i-select-search{\n    position:relative; }\n    :host .i-select-search input[type=\"text\"]{\n      text-transform:uppercase;\n      border:1px solid #EDEDED;\n      color:#404040;\n      -ms-box-shadow:none;\n      -o-box-shadow:none;\n      -webkit-box-shadow:none;\n      box-shadow:none;\n      outline:none;\n      width:100%;\n      margin:3px 0;\n      padding:3px;\n      -webkit-box-sizing:border-box;\n              box-sizing:border-box; }\n    :host .i-select-search div{\n      color:#ddd;\n      position:absolute;\n      right:10px;\n      top:7px; }\n  :host input::-webkit-input-placeholder{\n    text-transform:uppercase;\n    color:#ddd; }\n  :host input:-moz-placeholder{\n    text-transform:uppercase;\n    color:#ddd; }\n  :host input::-moz-placeholder{\n    text-transform:uppercase;\n    color:#ddd; }\n  :host input:-ms-input-placeholder{\n    text-transform:uppercase;\n    color:#ddd !important; }\n  :host .select-icon-spin3{\n    position:absolute;\n    top:0;\n    left:0;\n    width:16px !important;\n    height:16px !important;\n    display:inline-block;\n    margin:0 !important;\n    padding:3px !important; }\n  :host .icons-select-error div:before{\n    color:#444; }\n  :host .select-icon-search{\n    cursor:default; }\n  :host .select-icon-cancel{\n    cursor:pointer; }\n  :host .select-icon-block{\n    background-color:#fed0d0;\n    background-size:contain; }\n  :host .current-icon,\n  :host .current-icon:hover,\n  :host .current-icon:focus{\n    border:1px solid #444; }\n  :host .fa{\n    padding:3px 6px;\n    margin-top:5px; }\n"],
                providers: [CSSImagePipe]
            },] },
];
ISelect.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer, },
]; };
ISelect.propDecorators = {
    "searchIcon": [{ type: core.ViewChild, args: ['searchIcon', { read: core.ViewContainerRef },] },],
    "searchInput": [{ type: core.ViewChild, args: ['searchInput', { read: core.ViewContainerRef },] },],
    "iconContainer": [{ type: core.ViewChild, args: ['iconContainer', { read: core.ViewContainerRef },] },],
    "configID": [{ type: core.Input, args: ["id",] },],
    "configName": [{ type: core.Input, args: ["name",] },],
    "searchEnabled": [{ type: core.Input, args: ["searchEnabled",] },],
    "size": [{ type: core.Input, args: ["size",] },],
    "multiselect": [{ type: core.Input, args: ["multiselect",] },],
    "showIconName": [{ type: core.Input, args: ["showIconName",] },],
    "configData": [{ type: core.Input, args: ["entries",] },],
    "onchange": [{ type: core.Output, args: ["onchange",] },],
    "onClick": [{ type: core.HostListener, args: ['window:click', ['$event'],] },],
};
var ISelectDirective = /** @class */ (function () {
    function ISelectDirective(viewRef, el, componentFactoryResolver) {
        this.viewRef = viewRef;
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.data = [];
        this.searchEnabled = false;
        this.change = new core.EventEmitter();
    }
    ISelectDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.el.nativeElement.setAttribute("style", "display:none");
        setTimeout(function () {
            var list = _this.el.nativeElement.children;
            for (var i = 0; i < list.length; i++) {
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
            var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(ISelect);
            var componentRef = _this.viewRef.createComponent(componentFactory);
            var domElem = (((componentRef.hostView)).rootNodes[0]);
            _this.el.nativeElement.parentNode.appendChild(domElem);
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
    return ISelectDirective;
}());
ISelectDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[i-select]'
            },] },
];
ISelectDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.ElementRef, },
    { type: core.ComponentFactoryResolver, },
]; };
ISelectDirective.propDecorators = {
    "searchEnabled": [{ type: core.Input, args: ["searchEnabled",] },],
    "change": [{ type: core.Output, args: ["change",] },],
};
var ISelectModule = /** @class */ (function () {
    function ISelectModule() {
    }
    return ISelectModule;
}());
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
            },] },
];
ISelectModule.ctorParameters = function () { return []; };

exports.ISelect = ISelect;
exports.CSSImagePipe = CSSImagePipe;
exports.ISelectDirective = ISelectDirective;
exports.ISelectModule = ISelectModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=icon-select.umd.js.map
