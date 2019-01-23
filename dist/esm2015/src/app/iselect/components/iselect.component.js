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
export class CSSImagePipe {
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
if (false) {
    /** @type {?} */
    CSSImagePipe.prototype.sanitizer;
}
export class ISelect {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFDTixTQUFTLEVBR1QsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLFlBQVksRUFDWixZQUFZLEVBQ1osU0FBUyxFQUVULFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV2xDLElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDO0FBR3hDLE1BQU07Ozs7SUFFSixZQUFvQixTQUFzQjtRQUF0QixjQUFTLEdBQVQsU0FBUyxDQUFhO0tBQUc7Ozs7OztJQUM3QyxTQUFTLENBQUMsR0FBVyxFQUFDLE1BQWU7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsT0FBTyxHQUFDLEdBQUcsR0FBQyxLQUFLLEdBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUEsV0FBVyxDQUFDLEdBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNySDs7O1lBTkYsSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQzs7OztZQTFCZCxZQUFZOzs7Ozs7QUE0Q3JCLE1BQU07Ozs7O0lBZ0VMLFlBQVksRUFBYyxFQUFTLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7NkJBOUR2QixDQUFDO3dCQU9OLEVBQUU7MEJBR0EsRUFBRTs7Ozs2QkFPQSxLQUFLO29CQUdiLENBQUM7MkJBR0QsS0FBSzs7NEJBSVgsS0FB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WUFMVixRQUFROzs7eUJBd0NQLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7MEJBQ2hELFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7NEJBQ2pELFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7dUJBRW5ELEtBQUssU0FBQyxJQUFJO3lCQUdWLEtBQUssU0FBQyxNQUFNOzRCQU9aLEtBQUssU0FBQyxlQUFlO21CQUdyQixLQUFLLFNBQUMsTUFBTTswQkFHWixLQUFLLFNBQUMsYUFBYTsyQkFJbkIsS0FBSyxTQUFDLGNBQWM7eUJBR3BCLEtBQUssU0FBQyxTQUFTO3VCQUtmLE1BQU0sU0FBQyxVQUFVO3NCQW1CakIsWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudEZhY3RvcnksIFxuXHRSZWZsZWN0aXZlSW5qZWN0b3IsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyLFxuXHRIb3N0TGlzdGVuZXIsXG5cdEV2ZW50RW1pdHRlcixcblx0Vmlld0NoaWxkLFxuXHRPbkluaXQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSWNvbkluZm8ge1xuXHRpZD86bnVtYmVyLFxuXHRuYW1lOnN0cmluZyxcblx0dmFsdWU6c3RyaW5nLFxuXHRsYWJlbD86c3RyaW5nLFxuXHRzZWxlY3RlZD86Ym9vbGVhbixcblx0ZGlzYWJsZWQ/OmJvb2xlYW5cbn1cblxudmFyIGdsb2JhbEFjdGl2ZURyb3Bkb3duOklTZWxlY3RbXSA9IFtdO1xuXG5AUGlwZSh7bmFtZTonQ1NTSW1hZ2UnfSlcbmV4cG9ydCBjbGFzcyBDU1NJbWFnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3Jte1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOkRvbVNhbml0aXplcil7fVxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcscmVwZWF0Pzpib29sZWFuKTogYW55IHsgXG5cdCAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcInVybCgnXCIrdXJsK1wiJykgXCIrKHJlcGVhdCA/IFwicmVwZWF0XCI6XCJuby1yZXBlYXRcIikrXCIgMCAwIHRyYW5zcGFyZW50XCIpO1xuICB9XG59XG5cbi8qXG4qIExpa2UgYSByZWd1bGFyIGRyb3Bkb3duLCB3ZSB3YW50IHRvIHNldC9nZXQgc2VsZWN0ZWRJbmRleCwgc2VsZWN0IGl0ZW1zIG9uIGFycm93IHVwL2Rvd24sIGFuZCBzZWxlY3QgaXRlbSBvbiBjbGljay5cbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjonaS1zZWxlY3QnLFxuXHR0ZW1wbGF0ZVVybDogJ2lzZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnaXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuXHRwcm92aWRlcnM6IFtDU1NJbWFnZVBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIElTZWxlY3QgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHB1YmxpYyBzZWxlY3RlZEluZGV4Om51bWJlciA9IDE7XG5cdFxuXHRAVmlld0NoaWxkKCdzZWFyY2hJY29uJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIHNlYXJjaEljb246IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIHNlYXJjaElucHV0OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdpY29uQ29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwcml2YXRlIGljb25Db250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRASW5wdXQoXCJpZFwiKVxuXHRwdWJsaWMgY29uZmlnSUQ6c3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoXCJuYW1lXCIpXG5cdHB1YmxpYyBjb25maWdOYW1lOnN0cmluZyA9IFwiXCI7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0Ly8gQElucHV0KFwidGlsZVwiKVxuXHQvLyBwcml2YXRlIGNvbmZpZ1RpbGU6Ym9vbGVhbj10cnVlO1xuXG5cdEBJbnB1dChcInNlYXJjaEVuYWJsZWRcIilcblx0cHVibGljIHNlYXJjaEVuYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcblxuXHRASW5wdXQoXCJzaXplXCIpXG5cdHB1YmxpYyBzaXplOm51bWJlciA9IDM7XG5cblx0QElucHV0KFwibXVsdGlzZWxlY3RcIilcblx0cHVibGljIG11bHRpc2VsZWN0ID0gZmFsc2U7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0QElucHV0KFwic2hvd0ljb25OYW1lXCIpXG5cdHNob3dJY29uTmFtZSA9IGZhbHNlO1xuXHRcblx0QElucHV0KFwiZW50cmllc1wiKVxuXHRwdWJsaWMgY29uZmlnRGF0YTpJY29uSW5mb1tdID0gW107XG5cdFxuXHRkaXNwbGF5SXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRcblx0QE91dHB1dChcIm9uY2hhbmdlXCIpXG5cdHB1YmxpYyBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRoaWdobGlnaHRJbmRleD0wO1xuXHRzZWFyY2hlZERhdGE6SWNvbkluZm9bXSA9IFtdO1xuXG5cblx0Y29uZmlnID17XG5cdFx0dG90YWxQYWdlOjEsXG5cdFx0Y3VycmVudFBhZ2U6MCxcblx0XHRvcGVuOmZhbHNlLFxuXHRcdHNob3dGb290ZXI6ZmFsc2UsXG5cdFx0aGFzRXJyb3I6ZmFsc2UsXG5cdFx0aXNGb2N1c2VkOmZhbHNlLFxuXHRcdGlzU2VhcmNoOmZhbHNlLFxuXHRcdGxvYWRpbmc6dHJ1ZSxcblx0XHRzZWxlY3RlZEl0ZW06PEljb25JbmZvPm51bGxcblx0fVxuXG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpjbGljaycsIFsnJGV2ZW50J10pXG5cdG9uQ2xpY2soJGV2ZW50OktleWJvYXJkRXZlbnQpIHtcblx0XHRpZiAodGhpcy5jb25maWcub3Blbikge1xuXHRcdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGVsOkhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG5cdFx0dGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuY29uZmlnRGF0YTtcblx0fVxuXG5cdGtleWJvYXJkVHJhY2tlcigkZXZlbnQ6S2V5Ym9hcmRFdmVudCl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdCRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBrZXkgPSAkZXZlbnQuY2hhckNvZGUgfHwgJGV2ZW50LmtleUNvZGUgfHwgMDtcblx0XHRjb25zb2xlLmxvZyhrZXkpXG5cdFx0aWYoa2V5PT09MzkgfHwga2V5PT09NDApey8vcmlnaHQgb3IgZG93biBhcnJvd1xuXHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRpZihpbmRleDx0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGgtMSl7XG5cdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCsxKTtcblx0XHRcdH1lbHNlIGlmKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlPHRoaXMuY29uZmlnLnRvdGFsUGFnZSl7XG5cdFx0XHRcdHRoaXMubmV4dCgkZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH0sNjYpO1xuXHRcdH1lbHNlIGlmKGtleT09PTM3IHx8IGtleT09PTM4KXsvL2xlZnQgb3IgdXAgYXJyb3dcblx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLmhpZ2hsaWdodEluZGV4O1xuXHRcdFx0aWYoaW5kZXg+MCl7XG5cdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleC0xKTtcblx0XHRcdH1lbHNlIGlmKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlPjEpe1xuXHRcdFx0XHR0aGlzLnByZXYoJGV2ZW50KTtcblx0XHRcdH1cblx0XHR9LDY2KTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHBlcmZvcm1TZWFyY2goJGV2ZW50OktleWJvYXJkRXZlbnQsIHNlYXJjaFN0cmluZzpzdHJpbmcpe1xuXHRcdGxldCBrZXkgPSAkZXZlbnQuY2hhckNvZGUgfHwgJGV2ZW50LmtleUNvZGUgfHwgMDtcblx0XHRpZihrZXk+MzYgJiYga2V5PDQxKXtcblx0XHRcdHJldHVybiB0aGlzLmtleWJvYXJkVHJhY2tlcigkZXZlbnQpO1xuXHRcdH1cblx0XHRpZiAoc2VhcmNoU3RyaW5nID09PSAnJykge1xuXHRcdFx0dGhpcy5yZXNldFNlYXJjaCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5yZW1vdmVDbGFzcygncGlja2VyLWljb24tc2VhcmNoJyk7XG5cdFx0Ly90aGlzLnNlYXJjaEljb24uYWRkQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdHRoaXMuY29uZmlnLmlzU2VhcmNoID0gdHJ1ZTtcblxuXHRcdHRoaXMuc2VhcmNoZWREYXRhID0gW107XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8dGhpcy5jb25maWdEYXRhLmxlbmd0aDtpKyspe1xuXHRcdFx0bGV0IGluZm8gPSB0aGlzLmNvbmZpZ0RhdGFbaV07XG5cdFx0XHRpZiAoaW5mby5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hTdHJpbmcudG9Mb3dlckNhc2UoKSk+PTApIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hlZERhdGEucHVzaChpbmZvKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYodGhpcy5zZWFyY2hlZERhdGEubGVuZ3RoKXtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWFyY2hlZERhdGFbMF07XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuc2VhcmNoZWREYXRhO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHR9XG5cdHJlc2V0U2VhcmNoKCl7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCd2YWx1ZScsJycpO1xuXG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IGZhbHNlO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5jb25maWdEYXRhO1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuY29uZmlnRGF0YVswXTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0fVxuXHRuZXh0KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UrKztcbiBcdFx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD0wO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHJldigkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZS0tO1xuIFx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zaXplLTE7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsYXN0KCRldmVudDphbnkpe1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSB0aGlzLmNvbmZpZy50b3RhbFBhZ2U7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zmlyc3QoJGV2ZW50OmFueSl7XG5cdFx0JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdCAgICB0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleD10aGlzLnNpemUtMTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmVuZGVySWNvbkNvbnRhaW5lcigpe1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gKHRoaXMuY29uZmlnLmlzU2VhcmNoID8gdGhpcy5zZWFyY2hlZERhdGEgOiB0aGlzLmNvbmZpZ0RhdGEpO1xuXHRcdHRoaXMuY29uZmlnLnRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGggLyB0aGlzLnNpemUpO1xuXHRcdFxuXHRcdHRoaXMuY29uZmlnLnNob3dGb290ZXIgPSAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSk7XG5cblx0XHRsZXQgb2Zmc2V0ID0gKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnNpemU7XG5cblx0XHRpZih0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGg8MSApe1xuXHRcdFx0dGhpcy5jb25maWcuaGFzRXJyb3IgPSB0cnVlO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuZGlzcGxheUl0ZW1zLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5zaXplKTtcblx0XHR9XG5cdH1cblx0dG9nZ2xlSWNvblNlbGVjdG9yKCl7XG5cdFx0dGhpcy5jb25maWcub3BlbiA9ICF0aGlzLmNvbmZpZy5vcGVuO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLm9wZW4gJiYgdGhpcy5zZWFyY2hFbmFibGVkKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHR9LCAyMCk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgZmluZFNlbGVjdGVkSW5kZXgoKXtcblx0XHRpZih0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pe1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPHRoaXMuY29uZmlnRGF0YS5sZW5ndGg7aSsrKXtcblx0XHRcdGlmKHRoaXMuY29uZmlnRGF0YVtpXS5pZD09dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmlkKXtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0fVxuXHR9XG5cdHNlbGVjdEljb24oaW5kZXg6bnVtYmVyKXtcblx0XHRpZih0aGlzLmRpc3BsYXlJdGVtcyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1tpbmRleF07XG5cdFx0XHR0aGlzLmZpbmRTZWxlY3RlZEluZGV4KCk7XG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHR9XG5cdH1cblx0aGlnaGxpZ2h0SWNvbihpbmRleDpudW1iZXIpe1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSBpbmRleDtcblx0XHRpZih0aGlzLmRpc3BsYXlJdGVtcyl7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHRcdHRoaXMuZmluZFNlbGVjdGVkSW5kZXgoKTtcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdH1cblx0fVxuXHRwb3BJY29ucygkZXZlbnQ6YW55KXtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0Zm9yKGxldCBpOm51bWJlcj0wO2k8Z2xvYmFsQWN0aXZlRHJvcGRvd24ubGVuZ3RoO2krKyl7XG5cdFx0XHRpZihnbG9iYWxBY3RpdmVEcm9wZG93bltpXSE9dGhpcyAmJiBnbG9iYWxBY3RpdmVEcm9wZG93bltpXS5jb25maWcub3Blbil7XG5cdFx0XHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6YW55KSB7XG5cdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdGZvcihsZXQgaTpudW1iZXI9MDtpPHRoaXMuY29uZmlnRGF0YS5sZW5ndGg7aSsrKXt0aGlzLmNvbmZpZ0RhdGFbaV0uaWQ9IGl9XG5cdFxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKHRoaXMuc2VsZWN0ZWRJbmRleC8odGhpcy5zaXplLTEpKTtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2VsZWN0ZWRJbmRleC0oKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlLTEpKnRoaXMuc2l6ZSk7XG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cblx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bi5wdXNoKHRoaXMpO1xuXHRcdGlmKHRoaXMuY29uZmlnLnRvdGFsUGFnZT4xKXtcblx0XHRcdHRoaXMuY29uZmlnLmxvYWRpbmcgPSBmYWxzZTtcblx0XHR9XG5cdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSk7XG5cdFx0fSwxMCk7XG5cdH1cblxufVxuIl19