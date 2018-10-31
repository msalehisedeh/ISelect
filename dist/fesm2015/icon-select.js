import { Pipe, Component, ViewContainerRef, Input, Output, Renderer, HostListener, EventEmitter, ViewChild, ElementRef, Directive, ComponentFactoryResolver, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var globalActiveDropdown = [];
class CSSImagePipe {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} url
     * @param {?=} repeat
     * @return {?}
     */
    transform(url, repeat) {
        return this.sanitizer.bypassSecurityTrustStyle("url('" + url + "') " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent");
    }
}
CSSImagePipe.decorators = [
    { type: Pipe, args: [{ name: 'CSSImage' },] }
];
/** @nocollapse */
CSSImagePipe.ctorParameters = () => [
    { type: DomSanitizer }
];
class ISelect {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
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
    onClick($event) {
        if (this.config.open) {
            this.toggleIconSelector();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.displayItems = this.configData;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    keyboardTracker($event) {
        $event.stopPropagation();
        $event.preventDefault();
        /** @type {?} */
        let key = $event.charCode || $event.keyCode || 0;
        console.log(key);
        if (key === 39 || key === 40) {
            //right or down arrow
            setTimeout(() => {
                /** @type {?} */
                let index = this.highlightIndex;
                if (index < this.displayItems.length - 1) {
                    this.highlightIcon(index + 1);
                }
                else if (this.config.currentPage < this.config.totalPage) {
                    this.next($event);
                }
            }, 66);
        }
        else if (key === 37 || key === 38) {
            //left or up arrow
            setTimeout(() => {
                /** @type {?} */
                let index = this.highlightIndex;
                if (index > 0) {
                    this.highlightIcon(index - 1);
                }
                else if (this.config.currentPage > 1) {
                    this.prev($event);
                }
            }, 66);
        }
        return false;
    }
    /**
     * @param {?} $event
     * @param {?} searchString
     * @return {?}
     */
    performSearch($event, searchString) {
        /** @type {?} */
        let key = $event.charCode || $event.keyCode || 0;
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
        for (let i = 0; i < this.configData.length; i++) {
            /** @type {?} */
            let info = this.configData[i];
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
    }
    /**
     * @return {?}
     */
    resetSearch() {
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
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    next($event) {
        $event.stopPropagation();
        if (this.config.currentPage < this.config.totalPage) {
            this.config.currentPage++;
            this.renderIconContainer();
        }
        this.highlightIndex = 0;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    prev($event) {
        $event.stopPropagation();
        if (this.config.currentPage > 1) {
            this.config.currentPage--;
            this.renderIconContainer();
        }
        this.highlightIndex = this.size - 1;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    last($event) {
        $event.stopPropagation();
        if (this.config.currentPage < this.config.totalPage) {
            this.config.currentPage = this.config.totalPage;
            this.renderIconContainer();
        }
        this.highlightIndex = 0;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    first($event) {
        $event.stopPropagation();
        if (this.config.currentPage > 1) {
            this.config.currentPage = 1;
            this.renderIconContainer();
        }
        this.highlightIndex = this.size - 1;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    /**
     * @return {?}
     */
    renderIconContainer() {
        this.displayItems = (this.config.isSearch ? this.searchedData : this.configData);
        this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
        this.config.showFooter = (this.config.totalPage > 1);
        /** @type {?} */
        let offset = (this.config.currentPage - 1) * this.size;
        if (this.displayItems.length < 1) {
            this.config.hasError = true;
        }
        else {
            this.config.hasError = false;
            this.displayItems = this.displayItems.slice(offset, offset + this.size);
        }
    }
    /**
     * @return {?}
     */
    toggleIconSelector() {
        this.config.open = !this.config.open;
        if (this.config.open && this.searchEnabled) {
            setTimeout(() => {
                this.renderer.invokeElementMethod(this.searchInput.element.nativeElement, 'focus', []);
                this.renderer.invokeElementMethod(this.searchInput.element.nativeElement, 'select', []);
            }, 20);
        }
    }
    /**
     * @return {?}
     */
    findSelectedIndex() {
        if (this.config.selectedItem) {
            for (let i = 0; i < this.configData.length; i++) {
                if (this.configData[i].id == this.config.selectedItem.id) {
                    this.selectedIndex = i;
                }
            }
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectIcon(index) {
        if (this.displayItems) {
            this.config.selectedItem = this.displayItems[index];
            this.findSelectedIndex();
            this.onchange.emit(this.config.selectedItem);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    highlightIcon(index) {
        this.highlightIndex = index;
        if (this.displayItems) {
            this.config.selectedItem = this.displayItems[this.highlightIndex];
            this.findSelectedIndex();
            this.onchange.emit(this.config.selectedItem);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    popIcons($event) {
        $event.stopPropagation();
        for (let i = 0; i < globalActiveDropdown.length; i++) {
            if (globalActiveDropdown[i] != this && globalActiveDropdown[i].config.open) {
                globalActiveDropdown[i].toggleIconSelector();
            }
        }
        this.toggleIconSelector();
        return false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        setTimeout(() => {
            for (let i = 0; i < this.configData.length; i++) {
                this.configData[i].id = i;
            }
            this.config.currentPage = Math.ceil(this.selectedIndex / (this.size - 1));
            this.highlightIndex = this.selectedIndex - ((this.config.currentPage - 1) * this.size);
            this.renderIconContainer();
            globalActiveDropdown.push(this);
            if (this.config.totalPage > 1) {
                this.config.loading = false;
            }
            this.config.selectedItem = this.displayItems[this.highlightIndex];
            this.onchange.emit(this.config.selectedItem);
        }, 10);
    }
}
ISelect.decorators = [
    { type: Component, args: [{
                selector: 'i-select',
                template: "<div class=\"i-select\" [id]=\"configID\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" \n            [style.background]=\"config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''\"></div>\n        <div class=\"fa-li fa fa-spinner fa-spin select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" class=\"i-select-button\" \n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{configID}}name\" [textContent]=\"configName\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{configID}}name\" class=\"select-icons-container\" #iconContainer>\n    <div \n        role=\"listitem\" \n        class=\"select-box\" \n        *ngFor=\"let item of displayItems; let i = index\">\n        <div [class.highlight-icon]=\"highlightIndex==i\"\n            [class.cover]=\"!true\" [title]=\"showIconName ? '':item.name\"\n            [style.background]=\"item.value | CSSImage:true\"\n            (click)=\"selectIcon(i)\"><span class=\"off-screen\" [textContent]=\"item.name\"></span></div>\n    </div>\n    </div>\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\"><div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div></div>\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n    <div class=\"i-select-arrows\">\n        <div class=\"fa fa-angle-left\"\n            (click)=\"prev($event)\"\n            [class.disabled]=\"config.currentPage==1\">\n            <span class=\"prev\" [textContent]=\"'previous'\"></span>\n        </div>\n        <div class=\"fa fa-angle-double-left\"\n                (click)=\"first($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n            <span class=\"first\" [textContent]=\"'first'\"></span>\n        </div>\n        <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n        <div class=\"fa fa-angle-double-right\"\n                (click)=\"last($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"last\" [textContent]=\"'last'\"></span>\n        </div>\n        <div class=\"fa fa-angle-right\"\n                (click)=\"next($event)\"\n                [class.disabled]=\"config.currentPage==config.totalPage\">\n            <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n        </div>\n    </div>\n    </div>\n    <div class=\"name\" *ngIf=\"showIconName\" [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
                providers: [CSSImagePipe],
                styles: [":host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:block;text-align:left;vertical-align:middle;margin:2px 0}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:60px;height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:60px}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;float:left;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 4px 4px 0}:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{position:absolute;top:0;left:0;width:16px!important;height:16px!important;display:inline-block;margin:0!important;padding:3px!important}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}"]
            }] }
];
/** @nocollapse */
ISelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ISelectDirective {
    /**
     * @param {?} viewRef
     * @param {?} el
     * @param {?} componentFactoryResolver
     */
    constructor(viewRef, el, componentFactoryResolver) {
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
    ngOnInit() {
        this.el.nativeElement.setAttribute("style", "display:none");
        setTimeout(() => {
            /** @type {?} */
            const list = this.el.nativeElement.children;
            for (let i = 0; i < list.length; i++) {
                /** @type {?} */
                const option = list[i];
                if (option.nodeType === 1) {
                    this.data.push({
                        value: option.getAttribute("value"),
                        selected: option.getAttribute("selected"),
                        disabled: option.getAttribute("disabled"),
                        name: option.innerHTML
                    });
                }
            }
            /** @type {?} */
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ISelect);
            /** @type {?} */
            let componentRef = this.viewRef.createComponent(componentFactory);
            /** @type {?} */
            const domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
            this.el.nativeElement.parentNode.appendChild(domElem);
            /** @type {?} */
            const instance = (/** @type {?} */ (componentRef.instance));
            instance.searchEnabled = this.searchEnabled;
            instance.configID = this.el.nativeElement.id + "-iselect";
            instance.size = this.el.nativeElement.size;
            instance.configName = this.el.nativeElement.name;
            instance.onchange.subscribe(this.change);
            instance.configData = this.data;
            instance.ngOnInit();
            instance.ngOnChanges(undefined);
        }, 66);
    }
}
ISelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[i-select]'
            },] }
];
/** @nocollapse */
ISelectDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: ComponentFactoryResolver }
];
ISelectDirective.propDecorators = {
    searchEnabled: [{ type: Input, args: ["searchEnabled",] }],
    change: [{ type: Output, args: ["change",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ISelectModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ISelect, CSSImagePipe, ISelectDirective, ISelectModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1zZWxlY3QuanMubWFwIiwic291cmNlcyI6WyJuZzovL2ljb24tc2VsZWN0L3NyYy9hcHAvaXNlbGVjdC9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9pY29uLXNlbGVjdC9zcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyIsIm5nOi8vaWNvbi1zZWxlY3Qvc3JjL2FwcC9pc2VsZWN0L2lzZWxlY3QubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudEZhY3RvcnksIFxuXHRSZWZsZWN0aXZlSW5qZWN0b3IsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyLFxuXHRIb3N0TGlzdGVuZXIsXG5cdEV2ZW50RW1pdHRlcixcblx0Vmlld0NoaWxkLFxuXHRPbkluaXQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSWNvbkluZm8ge1xuXHRpZD86bnVtYmVyLFxuXHRuYW1lOnN0cmluZyxcblx0dmFsdWU6c3RyaW5nLFxuXHRsYWJlbD86c3RyaW5nLFxuXHRzZWxlY3RlZD86Ym9vbGVhbixcblx0ZGlzYWJsZWQ/OmJvb2xlYW5cbn1cblxudmFyIGdsb2JhbEFjdGl2ZURyb3Bkb3duOklTZWxlY3RbXSA9IFtdO1xuXG5AUGlwZSh7bmFtZTonQ1NTSW1hZ2UnfSlcbmV4cG9ydCBjbGFzcyBDU1NJbWFnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3Jte1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOkRvbVNhbml0aXplcil7fVxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcscmVwZWF0Pzpib29sZWFuKTogYW55IHsgXG5cdCAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcInVybCgnXCIrdXJsK1wiJykgXCIrKHJlcGVhdCA/IFwicmVwZWF0XCI6XCJuby1yZXBlYXRcIikrXCIgMCAwIHRyYW5zcGFyZW50XCIpO1xuICB9XG59XG5cbi8qXG4qIExpa2UgYSByZWd1bGFyIGRyb3Bkb3duLCB3ZSB3YW50IHRvIHNldC9nZXQgc2VsZWN0ZWRJbmRleCwgc2VsZWN0IGl0ZW1zIG9uIGFycm93IHVwL2Rvd24sIGFuZCBzZWxlY3QgaXRlbSBvbiBjbGljay5cbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjonaS1zZWxlY3QnLFxuXHR0ZW1wbGF0ZVVybDogJ2lzZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnaXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuXHRwcm92aWRlcnM6IFtDU1NJbWFnZVBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIElTZWxlY3QgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHB1YmxpYyBzZWxlY3RlZEluZGV4Om51bWJlciA9IDE7XG5cdFxuXHRAVmlld0NoaWxkKCdzZWFyY2hJY29uJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIHNlYXJjaEljb246IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIHNlYXJjaElucHV0OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdpY29uQ29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIGljb25Db250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRASW5wdXQoXCJpZFwiKVxuXHRwdWJsaWMgY29uZmlnSUQ6c3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoXCJuYW1lXCIpXG5cdHB1YmxpYyBjb25maWdOYW1lOnN0cmluZyA9IFwiXCI7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0Ly8gQElucHV0KFwidGlsZVwiKVxuXHQvLyBwcml2YXRlIGNvbmZpZ1RpbGU6Ym9vbGVhbj10cnVlO1xuXG5cdEBJbnB1dChcInNlYXJjaEVuYWJsZWRcIilcblx0cHVibGljIHNlYXJjaEVuYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcblxuXHRASW5wdXQoXCJzaXplXCIpXG5cdHB1YmxpYyBzaXplOm51bWJlciA9IDM7XG5cblx0QElucHV0KFwibXVsdGlzZWxlY3RcIilcblx0cHVibGljIG11bHRpc2VsZWN0ID0gZmFsc2U7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0QElucHV0KFwic2hvd0ljb25OYW1lXCIpXG5cdHNob3dJY29uTmFtZSA9IGZhbHNlO1xuXHRcblx0QElucHV0KFwiZW50cmllc1wiKVxuXHRwdWJsaWMgY29uZmlnRGF0YTpJY29uSW5mb1tdID0gW107XG5cdFxuXHRkaXNwbGF5SXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRcblx0QE91dHB1dChcIm9uY2hhbmdlXCIpXG5cdHB1YmxpYyBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRoaWdobGlnaHRJbmRleD0wO1xuXHRzZWFyY2hlZERhdGE6SWNvbkluZm9bXSA9IFtdO1xuXG5cblx0Y29uZmlnID17XG5cdFx0dG90YWxQYWdlOjEsXG5cdFx0Y3VycmVudFBhZ2U6MCxcblx0XHRvcGVuOmZhbHNlLFxuXHRcdHNob3dGb290ZXI6ZmFsc2UsXG5cdFx0aGFzRXJyb3I6ZmFsc2UsXG5cdFx0aXNGb2N1c2VkOmZhbHNlLFxuXHRcdGlzU2VhcmNoOmZhbHNlLFxuXHRcdGxvYWRpbmc6dHJ1ZSxcblx0XHRzZWxlY3RlZEl0ZW06PEljb25JbmZvPm51bGxcblx0fVxuXG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpjbGljaycsIFsnJGV2ZW50J10pXG5cdG9uQ2xpY2soJGV2ZW50OktleWJvYXJkRXZlbnQpIHtcblx0XHRpZiAodGhpcy5jb25maWcub3Blbikge1xuXHRcdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGVsOkhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG5cdFx0dGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuY29uZmlnRGF0YTtcblx0fVxuXG5cdGtleWJvYXJkVHJhY2tlcigkZXZlbnQ6S2V5Ym9hcmRFdmVudCl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdCRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBrZXkgPSAkZXZlbnQuY2hhckNvZGUgfHwgJGV2ZW50LmtleUNvZGUgfHwgMDtcblx0XHRjb25zb2xlLmxvZyhrZXkpXG5cdFx0aWYoa2V5PT09MzkgfHwga2V5PT09NDApey8vcmlnaHQgb3IgZG93biBhcnJvd1xuXHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRpZihpbmRleDx0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGgtMSl7XG5cdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCsxKTtcblx0XHRcdH1lbHNlIGlmKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlPHRoaXMuY29uZmlnLnRvdGFsUGFnZSl7XG5cdFx0XHRcdHRoaXMubmV4dCgkZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH0sNjYpO1xuXHRcdH1lbHNlIGlmKGtleT09PTM3IHx8IGtleT09PTM4KXsvL2xlZnQgb3IgdXAgYXJyb3dcblx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLmhpZ2hsaWdodEluZGV4O1xuXHRcdFx0aWYoaW5kZXg+MCl7XG5cdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleC0xKTtcblx0XHRcdH1lbHNlIGlmKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlPjEpe1xuXHRcdFx0XHR0aGlzLnByZXYoJGV2ZW50KTtcblx0XHRcdH1cblx0XHR9LDY2KTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHBlcmZvcm1TZWFyY2goJGV2ZW50OktleWJvYXJkRXZlbnQsIHNlYXJjaFN0cmluZzpzdHJpbmcpe1xuXHRcdGxldCBrZXkgPSAkZXZlbnQuY2hhckNvZGUgfHwgJGV2ZW50LmtleUNvZGUgfHwgMDtcblx0XHRpZihrZXk+MzYgJiYga2V5PDQxKXtcblx0XHRcdHJldHVybiB0aGlzLmtleWJvYXJkVHJhY2tlcigkZXZlbnQpO1xuXHRcdH1cblx0XHRpZiAoc2VhcmNoU3RyaW5nID09PSAnJykge1xuXHRcdFx0dGhpcy5yZXNldFNlYXJjaCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5yZW1vdmVDbGFzcygncGlja2VyLWljb24tc2VhcmNoJyk7XG5cdFx0Ly90aGlzLnNlYXJjaEljb24uYWRkQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdHRoaXMuY29uZmlnLmlzU2VhcmNoID0gdHJ1ZTtcblxuXHRcdHRoaXMuc2VhcmNoZWREYXRhID0gW107XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8dGhpcy5jb25maWdEYXRhLmxlbmd0aDtpKyspe1xuXHRcdFx0bGV0IGluZm8gPSB0aGlzLmNvbmZpZ0RhdGFbaV07XG5cdFx0XHRpZiAoaW5mby5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hTdHJpbmcudG9Mb3dlckNhc2UoKSk+PTApIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hlZERhdGEucHVzaChpbmZvKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYodGhpcy5zZWFyY2hlZERhdGEubGVuZ3RoKXtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWFyY2hlZERhdGFbMF07XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuc2VhcmNoZWREYXRhO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHR9XG5cdHJlc2V0U2VhcmNoKCl7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCd2YWx1ZScsJycpO1xuXG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IGZhbHNlO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5jb25maWdEYXRhO1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuY29uZmlnRGF0YVswXTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0fVxuXHRuZXh0KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UrKztcbiBcdFx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD0wO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHJldigkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZS0tO1xuIFx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zaXplLTE7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsYXN0KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSB0aGlzLmNvbmZpZy50b3RhbFBhZ2U7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zmlyc3QoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdCAgICB0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD10aGlzLnNpemUtMTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmVuZGVySWNvbkNvbnRhaW5lcigpe1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gKHRoaXMuY29uZmlnLmlzU2VhcmNoID8gdGhpcy5zZWFyY2hlZERhdGEgOiB0aGlzLmNvbmZpZ0RhdGEpO1xuXHRcdHRoaXMuY29uZmlnLnRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGggLyB0aGlzLnNpemUpO1xuXHRcdFxuXHRcdHRoaXMuY29uZmlnLnNob3dGb290ZXIgPSAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSk7XG5cblx0XHRsZXQgb2Zmc2V0ID0gKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnNpemU7XG5cblx0XHRpZih0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGg8MSApe1xuXHRcdFx0dGhpcy5jb25maWcuaGFzRXJyb3IgPSB0cnVlO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuZGlzcGxheUl0ZW1zLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5zaXplKTtcblx0XHR9XG5cdH1cblx0dG9nZ2xlSWNvblNlbGVjdG9yKCl7XG5cdFx0dGhpcy5jb25maWcub3BlbiA9ICF0aGlzLmNvbmZpZy5vcGVuO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLm9wZW4gJiYgdGhpcy5zZWFyY2hFbmFibGVkKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHR9LCAyMCk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgZmluZFNlbGVjdGVkSW5kZXgoKXtcblx0XHRpZih0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pe1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPHRoaXMuY29uZmlnRGF0YS5sZW5ndGg7aSsrKXtcblx0XHRcdGlmKHRoaXMuY29uZmlnRGF0YVtpXS5pZD09dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmlkKXtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0fVxuXHR9XG5cdHNlbGVjdEljb24oaW5kZXg6bnVtYmVyKXtcblx0XHRpZih0aGlzLmRpc3BsYXlJdGVtcyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1tpbmRleF07XG5cdFx0XHR0aGlzLmZpbmRTZWxlY3RlZEluZGV4KCk7XG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHR9XG5cdH1cblx0aGlnaGxpZ2h0SWNvbihpbmRleDpudW1iZXIpe1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSBpbmRleDtcblx0XHRpZih0aGlzLmRpc3BsYXlJdGVtcyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHRcdHRoaXMuZmluZFNlbGVjdGVkSW5kZXgoKTtcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdH1cblx0fVxuXHRwb3BJY29ucygkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8Z2xvYmFsQWN0aXZlRHJvcGRvd24ubGVuZ3RoO2krKyl7XG5cdFx0XHRpZihnbG9iYWxBY3RpdmVEcm9wZG93bltpXSE9dGhpcyAmJiBnbG9iYWxBY3RpdmVEcm9wZG93bltpXS5jb25maWcub3Blbil7XG5cdFx0XHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6YW55KSB7XG5cdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPHRoaXMuY29uZmlnRGF0YS5sZW5ndGg7aSsrKXt0aGlzLmNvbmZpZ0RhdGFbaV0uaWQ9IGl9XG5cdFxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKHRoaXMuc2VsZWN0ZWRJbmRleC8odGhpcy5zaXplLTEpKTtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2VsZWN0ZWRJbmRleC0oKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlLTEpKnRoaXMuc2l6ZSk7XG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cblx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bi5wdXNoKHRoaXMpO1xuXHRcdGlmKHRoaXMuY29uZmlnLnRvdGFsUGFnZT4xKXtcblx0XHRcdHRoaXMuY29uZmlnLmxvYWRpbmcgPSBmYWxzZTtcblx0XHR9XG5cdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSk7XG5cdFx0fSwxMCk7XG5cdH1cblxufVxuIiwiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBPbkluaXQsXHJcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJU2VsZWN0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2ktc2VsZWN0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIElTZWxlY3REaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBkYXRhID0gW107XHJcblxyXG5cdEBJbnB1dChcInNlYXJjaEVuYWJsZWRcIilcclxuXHRwdWJsaWMgc2VhcmNoRW5hYmxlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIEBPdXRwdXQoXCJjaGFuZ2VcIilcclxuICAgIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHVibGljIGVsOkVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbiAgICApIHtcclxuICAgIH1cclxuICAgIFxyXG5cdG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwiZGlzcGxheTpub25lXCIpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0OiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLm5vZGVUeXBlID09PSAxKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0aW9uLmlubmVySFRNTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoSVNlbGVjdCk7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZTpJU2VsZWN0ID0gKDxJU2VsZWN0PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNlYXJjaEVuYWJsZWQgPSB0aGlzLnNlYXJjaEVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbmZpZ0lEID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkK1wiLWlzZWxlY3RcIjtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2l6ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zaXplO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdOYW1lID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uY2hhbmdlLnN1YnNjcmliZSh0aGlzLmNoYW5nZSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbmZpZ0RhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm5nT25Jbml0KCk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm5nT25DaGFuZ2VzKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSwgNjYpXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUsIEN1cnJlbmN5UGlwZSwgRGVjaW1hbFBpcGUsIEpzb25QaXBlLCBTbGljZVBpcGUsIFVwcGVyQ2FzZVBpcGUsIExvd2VyQ2FzZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSVNlbGVjdCwgQ1NTSW1hZ2VQaXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSVNlbGVjdERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZSdcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIElTZWxlY3QsXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJU2VsZWN0LFxyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBJU2VsZWN0XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIElTZWxlY3RNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7QUF5QkEsSUFBSSxvQkFBb0IsR0FBYSxFQUFFLENBQUM7QUFHeEM7Ozs7SUFFRSxZQUFvQixTQUFzQjtRQUF0QixjQUFTLEdBQVQsU0FBUyxDQUFhO0tBQUc7Ozs7OztJQUM3QyxTQUFTLENBQUMsR0FBVyxFQUFDLE1BQWU7UUFDcEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsS0FBSyxJQUFF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