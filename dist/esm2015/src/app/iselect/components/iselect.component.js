import * as tslib_1 from "tslib";
import { Component, ViewContainerRef, Input, Output, Renderer, HostListener, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { Preloader } from "./preloader.service";
var globalActiveDropdown = [];
/*
* Like a regular dropdown, we want to set/get selectedIndex, select items on arrow up/down, and select item on click.
*/
let ISelect = class ISelect {
    constructor(el, preloader, detector, renderer) {
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
        this.onchange = new EventEmitter();
        this.ontoggle = new EventEmitter();
        this.enabledShow = new EventEmitter();
        this.host = el.nativeElement;
    }
    onClick($event) {
        let inside = false;
        let node = $event.target;
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
    }
    ngAfterViewInit() {
        if (!this.initianalized) {
            this.initianalized = true;
            this.displayItems = this.entries;
            for (let i = 0; i < this.entries.length; i++) {
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
            this.detector.detectChanges();
            this.preloader.contains(this.id, this.config.selectedItem.value);
            if (!this.startSlideShow()) {
                setTimeout(() => {
                    this.ontoggle.emit(this.config.selectedItem);
                }, 66);
            }
        }
    }
    repeat(event) {
        this.config.selectedItem.repeat = !this.config.selectedItem.repeat;
    }
    stopSlideShow() {
        if (this.slideShowInterval) {
            clearInterval(this.slideShowInterval);
            this.slideShowInterval = undefined;
            this.slideShowIndex = 0;
        }
    }
    startSlideShow() {
        if (this.slideShowEnabled && this.favoriteItems.length > 1 && !this.slideShowInterval) {
            this.preloader.preload(this.id, this.favoriteItems);
            this.slideShowInterval = setInterval(this.slideShow.bind(this), 20000);
            return true;
        }
        return false;
    }
    enableShow(event) {
        this.slideShowEnabled = !this.slideShowEnabled;
        this.enabledShow.emit(this.slideShowEnabled);
        if (this.slideShowEnabled) {
            this.startSlideShow();
        }
        else {
            this.stopSlideShow();
        }
    }
    slideShow() {
        if (this.slideShowIndex === this.favoriteItems.length) {
            this.slideShowIndex = 0;
        }
        const item = this.favoriteItems[this.slideShowIndex];
        this.emitToggle(item, undefined);
        this.slideShowIndex++;
    }
    addToFavorite(event) {
        this.config.selectedItem.favorite = !this.config.selectedItem.favorite;
        if (this.config.selectedItem.favorite) {
            this.preloader.image(this.id, this.config.selectedItem.value);
            this.favoriteItems.push(this.config.selectedItem);
        }
        else {
            const index = this.favoriteItems.indexOf(this.config.selectedItem);
            this.favoriteItems.splice(index, 1);
        }
        this.startSlideShow();
    }
    mold(event) {
        this.config.selectedItem.molded = !this.config.selectedItem.molded;
        this.stopSlideShow();
        this.emitChange(this.config.selectedItem, () => this.startSlideShow());
    }
    keyboardTracker($event) {
        $event.stopPropagation();
        $event.preventDefault();
        let key = $event.charCode || $event.keyCode || 0;
        if (key === 39 || key === 40) { //right or down arrow
            setTimeout(() => {
                let index = this.highlightIndex;
                if (index < this.displayItems.length - 1) {
                    this.highlightIcon(index + 1);
                }
                else if (this.config.currentPage < this.config.totalPage) {
                    this.next($event);
                }
            }, 66);
        }
        else if (key === 37 || key === 38) { //left or up arrow
            setTimeout(() => {
                let index = this.highlightIndex;
                if (index > 0) {
                    this.highlightIcon(index - 1);
                }
                else if (this.config.currentPage > 1) {
                    this.prev($event);
                }
            }, 66);
        }
        if (key === 40) {
            this.config.open = true;
            if (this.searchInput) {
                setTimeout(() => {
                    if (this.searchInput) {
                        this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus', []);
                        this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'select', []);
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
    }
    keyup(event) {
        let key = event.charCode || event.keyCode || 0;
        if (key === 13) {
            event.target.click();
        }
    }
    performSearch($event, searchString) {
        let key = $event.charCode || $event.keyCode || 0;
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
        for (let i = 0; i < this.entries.length; i++) {
            let info = this.entries[i];
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
    }
    resetSearch() {
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
    }
    next($event) {
        if (this.config.currentPage < this.config.totalPage) {
            this.config.currentPage++;
            this.renderIconContainer();
        }
        this.highlightIndex = 0;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    prev($event) {
        if (this.config.currentPage > 1) {
            this.config.currentPage--;
            this.renderIconContainer();
        }
        this.highlightIndex = this.size - 1;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    last($event) {
        if (this.config.currentPage < this.config.totalPage) {
            this.config.currentPage = this.config.totalPage;
            this.renderIconContainer();
        }
        this.highlightIndex = 0;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    first($event) {
        if (this.config.currentPage > 1) {
            this.config.currentPage = 1;
            this.renderIconContainer();
        }
        this.highlightIndex = this.size - 1;
        this.highlightIcon(this.highlightIndex);
        return false;
    }
    renderIconContainer() {
        this.displayItems = (this.config.isSearch ? this.searchedData : this.entries);
        this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
        this.config.showFooter = (this.config.totalPage > 1);
        let offset = this.config.currentPage ? (this.config.currentPage - 1) * this.size : 0;
        if (this.displayItems.length < 1) {
            this.config.hasError = true;
        }
        else {
            this.config.hasError = false;
            this.displayItems = this.displayItems.slice(offset, offset + this.size);
            this.preloader.preload(this.id, this.displayItems);
        }
    }
    toggleIconSelector() {
        this.config.open = !this.config.open;
        if (this.config.open && this.searchEnabled) {
            setTimeout(() => {
                if (this.searchInput) {
                    this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus', []);
                    this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'select', []);
                }
            }, 66);
        }
    }
    emitChange(item, callback) {
        const delayTime = (item.molded && !this.preloader.contains(this.id, item.value)) ? 777 : 66;
        setTimeout(() => {
            this.onchange.emit(item);
            if (callback) {
                callback();
            }
        }, delayTime);
    }
    emitToggle(item, callback) {
        const delayTime = (item.molded && !this.preloader.contains(this.id, item.value)) ? 777 : 66;
        setTimeout(() => {
            this.ontoggle.emit(item);
            if (callback) {
                callback();
            }
        }, delayTime);
    }
    deselectAll() {
        if (this.displayItems) {
            for (let i = 0; i < this.entries.length; i++) {
                this.selectedIndex = i;
            }
        }
    }
    selectIcon(index) {
        this.deselectAll();
        this.highlightIndex = index;
        if (this.displayItems && !this.displayItems[index].disabled) {
            for (let i = 0; i < this.displayItems.length; i++) {
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
                this.emitChange(this.config.selectedItem, () => this.startSlideShow());
            }
        }
    }
    highlightIcon(index) {
        this.deselectAll();
        this.highlightIndex = index;
        if (this.displayItems && !this.displayItems[index].disabled) {
            this.config.selectedItem = this.displayItems[this.highlightIndex];
            this.detector.detectChanges();
            if (this.config.selectedItem) {
                this.stopSlideShow();
                this.emitToggle(this.config.selectedItem, () => this.startSlideShow());
            }
        }
    }
    animation($event) {
        if (this.displayItems && this.config.selectedItem) {
            this.config.selectedItem.animation = $event.target.value;
        }
    }
    popIcons($event) {
        for (let i = 0; i < globalActiveDropdown.length; i++) {
            if (globalActiveDropdown[i] != this && globalActiveDropdown[i].config.open) {
                globalActiveDropdown[i].toggleIconSelector();
            }
        }
        this.toggleIconSelector();
        return false;
    }
    selectedSourceUrl() {
        return (!this.config.selectedItem.type || this.config.selectedItem.type == 'image') ?
            this.config.selectedItem.value : this.config.selectedItem.poster;
    }
};
ISelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Preloader },
    { type: ChangeDetectorRef },
    { type: Renderer }
];
tslib_1.__decorate([
    ViewChild('iconBox', { static: false })
], ISelect.prototype, "iconBox", void 0);
tslib_1.__decorate([
    ViewChild('searchInput', { static: false })
], ISelect.prototype, "searchInput", void 0);
tslib_1.__decorate([
    ViewChild('searchButton', { static: false })
], ISelect.prototype, "searchButton", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "id", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "name", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "controlls", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "searchEnabled", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "size", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "showIconName", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "template", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "slideShowEnabled", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "applyLayoutType", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "applyOpacity", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "applyPattern", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "applyAnimation", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "applySlideShow", void 0);
tslib_1.__decorate([
    Input()
], ISelect.prototype, "entries", void 0);
tslib_1.__decorate([
    Output()
], ISelect.prototype, "onchange", void 0);
tslib_1.__decorate([
    Output()
], ISelect.prototype, "ontoggle", void 0);
tslib_1.__decorate([
    Output()
], ISelect.prototype, "enabledShow", void 0);
tslib_1.__decorate([
    HostListener('window:click', ['$event'])
], ISelect.prototype, "onClick", null);
ISelect = tslib_1.__decorate([
    Component({
        selector: 'i-select',
        template: "<div class=\"i-select\" [id]=\"id\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" (click)=\"toggleIconSelector()\" #iconBox\n            [style.background]=\"config.selectedItem ? (selectedSourceUrl() | CSSImage:id:true:false)  : ''\"></div>\n        <div class=\"select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" #searchButton\n        class=\"i-select-button\" \n        [class.focus]=\"config.open\"\n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{id}}name\" [textContent]=\"name\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div class=\"i-select-search\" *ngIf=\"template\">\n        <ng-container [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{data: false}\">\n        </ng-container>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div *ngIf=\"applySlideShow\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'slideshow'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'slideshow'\"\n                [checked]=\"slideShowEnabled ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"enableShow($event)\" />\n            Enable slideshow\n        </label>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{id}}name\" class=\"select-icons-container\" #iconContainer>\n        <div \n            role=\"listitem\" \n            class=\"select-box\" \n            *ngFor=\"let item of displayItems; let i = index\">\n            <div *ngIf=\"!item.type || item.type === 'image' || item.type === 'stream'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [class.streaming]=\"item.type === 'stream'\"\n                [title]=\"showIconName ? '':item.name\"\n                [style.background]=\"item.value | CSSImage:id:true:false\"\n                (click)=\"selectIcon(i)\">\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n            <div *ngIf=\"item.type === 'video'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [title]=\"showIconName ? '':item.name\"\n                (click)=\"selectIcon(i)\">\n                <video [attr.src]=\"item.value\" [attr.poster]=\"item.poster\" crossorigin disabled></video>\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n            <div *ngIf=\"item.type === 'webGL'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [title]=\"showIconName ? '':item.name\"\n                [style.background]=\"item.poster | CSSImage:id:true:false\"\n                (click)=\"selectIcon(i)\">\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\">\n        <div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div>\n    </div>\n\n    <div class=\"clear-fix\"></div>\n\n    <div *ngIf=\"applyAnimation && config.selectedItem\"\n        class=\"i-select-search layout\">\n        <select \n            tabindex=\"0\" \n            style=\"width: 100%\" \n            [id]=\"id + 'select'\" \n            (keyup)=\"keyup($event)\" \n            (change)=\"animation($event)\">\n            <option value=\"disabled\" [selected]=\"config.selectedItem.animation === 'disabled' ? true : null\">Disabled</option>\n            <option value=\"zoom\" [selected]=\"config.selectedItem.animation === 'zoom' ? true : null\">Zoom</option>\n            <option value=\"fade\" [selected]=\"config.selectedItem.animation === 'fade' ? true : null\">Fade</option>\n            <option value=\"sepia\" [selected]=\"config.selectedItem.animation === 'sepia' ? true : null\">Sepia</option>\n            <option value=\"grayout\" [selected]=\"config.selectedItem.animation === 'grayout' ? true : null\">Grayout</option>\n            <option value=\"shake\" [selected]=\"config.selectedItem.animation === 'shake' ? true : null\">Shake</option>\n        </select>\n    </div>\n    <div *ngIf=\"applySlideShow && config.selectedItem\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'favorite'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'favorite'\"\n                [checked]=\"config.selectedItem.favorite ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"addToFavorite($event)\" />\n            Add to favorite\n        </label>\n    </div>\n    <div *ngIf=\"applyLayoutType && config.selectedItem && (!config.selectedItem.type || config.selectedItem.type === 'image')\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'pattern'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'pattern'\"\n                [checked]=\"config.selectedItem.repeat ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"repeat($event)\" />\n            Display Repeat\n        </label>\n    </div>\n    <div *ngIf=\"applyPattern && config.selectedItem && (!config.selectedItem.type || config.selectedItem.type === 'image')\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'mold'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'mold'\"\n                [checked]=\"config.selectedItem.molded ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"mold($event)\" />\n            Make Pattern\n        </label>\n    </div>\n    <div *ngIf=\"applyOpacity && config.selectedItem\"\n        class=\"i-select-search opacity\" \n        (click)=\"$event.preventDefault();$event.stopPropagation()\">\n        <input class=\"range\" [attr.min]=\"0\" [attr.max]=\"100\"  type=\"range\" \n            [attr.value]=\"config.selectedItem.opacity * 100\" \n            (input)=\"config.selectedItem.opacity = $event.target.value / 100\" \n            (change)=\"config.selectedItem.opacity = $event.target.value / 100\" />\n        <span class=\"slide-counter\" [textContent]=\"config.selectedItem.opacity\"></span>\n    </div>\n\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n        <div class=\"i-select-arrows\">\n            <div class=\"{{controlls.previousPage ? controlls.previousPage : 'angle-left'}}\"\n                (click)=\"prev($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n                <span class=\"prev\" [textContent]=\"'previous'\"></span>\n            </div>\n            <div class=\"{{controlls.firstPage ? controlls.firstPage: 'angle-double-left'}}\"\n                    (click)=\"first($event)\"\n                    [class.disabled]=\"config.currentPage==1\">\n                <span class=\"first\" [textContent]=\"'first'\"></span>\n            </div>\n            <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n            <div class=\"{{controlls.lastPage ? controlls.lastPage : 'angle-double-right'}}\"\n                    (click)=\"last($event)\"\n                    [class.disabled]=\"config.currentPage==config.totalPage\">\n                <span class=\"last\" [textContent]=\"'last'\"></span>\n            </div>\n            <div class=\"{{controlls.nextPage ? controlls.nextPage : 'angle-right'}}\"\n                    (click)=\"next($event)\"\n                    [class.disabled]=\"config.currentPage==config.totalPage\">\n                <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"showIconName\" \n        class=\"name\" \n        [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
        styles: ["@charset \"UTF-8\";:host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:table;text-align:left;vertical-align:middle;margin:2px 0;width:150px;position:relative}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box .disabled{opacity:.7}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box div.streaming{background-size:contain!important}:host .select-box div iframe{border:0;width:100%}:host .select-box div video{border:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;background-size:cover!important;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center;margin-top:5px}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div.angle-left:before{content:\"\u2039\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-left:before{content:\"\u00AB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-right:before{content:\"\u00BB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-right:before{content:\"\u203A\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:calc(100% - 20px);height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:100%}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0;position:relative}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 2px 2px 0;position:absolute;right:-1px}:host .i-select-button.focus .select-icon-up-dir,:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button.focus .select-icon-down-dir,:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search.layout{border:1px solid #ddd;padding:2px;margin:2px 0}:host .i-select-search.layout label{color:#000;font-size:.8rem}:host .i-select-search.opacity{border:1px solid #ddd;padding:2px;margin:2px 0}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{border-radius:50%;width:.8em!important;height:.8em!important;-webkit-animation:1.8s ease-in-out -.16s infinite load7;animation:1.8s ease-in-out -.16s infinite load7;color:#fff!important;position:absolute;top:-35px;left:.2rem;transform:translateZ(0)}:host .select-icon-spin3:after,:host .select-icon-spin3:before{color:#fff;border-radius:50%;width:.8em;height:.8em;-webkit-animation:1.8s ease-in-out infinite load7;animation:1.8s ease-in-out infinite load7;content:\"\";position:absolute;top:0}:host .select-icon-spin3:before{left:1.2rem;-webkit-animation-delay:-.32s;animation-delay:-.32s}:host .select-icon-spin3:after{left:2.4em}@-webkit-keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}@keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain;background-position:center center!important}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}:host .slide-counter{color:#000;font-size:.8rem}:host .range{width:80%}:host .range:hover{opacity:1}:host .range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:#444;background-image:linear-gradient(#444,#ddd,#444);cursor:pointer;border-radius:5px;border:2px solid #000;width:22px;height:12px}:host .range::-moz-range-thumb{background:#444;background-image:linear-gradient(#444,#ddd,#444);border-radius:5px;border:2px solid #000;cursor:pointer;width:22px;height:10px}"]
    })
], ISelect);
export { ISelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2hELElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDO0FBRXhDOztFQUVFO0FBTUYsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQTZFbkIsWUFDQyxFQUFjLEVBQ04sU0FBb0IsRUFDcEIsUUFBMkIsRUFDM0IsUUFBa0I7UUFGbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBL0VwQixrQkFBYSxHQUFVLENBQUMsQ0FBQztRQUNoQyxpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFjLEVBQUUsQ0FBQztRQUM5QixtQkFBYyxHQUFDLENBQUMsQ0FBQztRQUVqQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV0QixXQUFNLEdBQUU7WUFDUCxTQUFTLEVBQUMsQ0FBQztZQUNYLFdBQVcsRUFBQyxDQUFDO1lBQ2IsSUFBSSxFQUFDLEtBQUs7WUFDVixVQUFVLEVBQUMsS0FBSztZQUNoQixRQUFRLEVBQUMsS0FBSztZQUNkLFNBQVMsRUFBQyxLQUFLO1lBQ2YsUUFB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K0I7QUFDOUI7SUFBVCxNQUFNLEVBQUU7NENBQWtDO0FBRzNDO0lBREMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3NDQWN4QztBQXpFVyxPQUFPO0lBTG5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBQyxVQUFVO1FBQ3RCLG1zUkFBcUM7O0tBRXJDLENBQUM7R0FDVyxPQUFPLENBZ2FuQjtTQWhhWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyLFxuXHRIb3N0TGlzdGVuZXIsXG5cdEV2ZW50RW1pdHRlcixcblx0Vmlld0NoaWxkLFxuXHRFbGVtZW50UmVmLFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0QWZ0ZXJWaWV3SW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgUHJlbG9hZGVyIH0gZnJvbSBcIi4vcHJlbG9hZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEljb25JbmZvfSBmcm9tIFwiLi9pc2VsZWN0LmludGVyZmFjZVwiO1xuXG52YXIgZ2xvYmFsQWN0aXZlRHJvcGRvd246SVNlbGVjdFtdID0gW107XG5cbi8qXG4qIExpa2UgYSByZWd1bGFyIGRyb3Bkb3duLCB3ZSB3YW50IHRvIHNldC9nZXQgc2VsZWN0ZWRJbmRleCwgc2VsZWN0IGl0ZW1zIG9uIGFycm93IHVwL2Rvd24sIGFuZCBzZWxlY3QgaXRlbSBvbiBjbGljay5cbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjonaS1zZWxlY3QnLFxuXHR0ZW1wbGF0ZVVybDogJ2lzZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnaXNlbGVjdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIElTZWxlY3QgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHRwdWJsaWMgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSAxO1xuXHRkaXNwbGF5SXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRmYXZvcml0ZUl0ZW1zOkljb25JbmZvW10gPSBbXTtcblx0aGlnaGxpZ2h0SW5kZXg9MDtcblx0c2xpZGVTaG93SW50ZXJ2YWw6IGFueTtcblx0c2xpZGVTaG93SW5kZXggPSAwO1xuXHRzZWFyY2hlZERhdGE6SWNvbkluZm9bXSA9IFtdO1xuXHRpbml0aWFuYWxpemVkID0gZmFsc2U7XG5cblx0Y29uZmlnID17XG5cdFx0dG90YWxQYWdlOjEsXG5cdFx0Y3VycmVudFBhZ2U6MCxcblx0XHRvcGVuOmZhbHNlLFxuXHRcdHNob3dGb290ZXI6ZmFsc2UsXG5cdFx0aGFzRXJyb3I6ZmFsc2UsXG5cdFx0aXNGb2N1c2VkOmZhbHNlLFxuXHRcdGlzU2VhcmNoOmZhbHNlLFxuXHRcdGxvYWRpbmc6dHJ1ZSxcblx0XHRzZWxlY3RlZEl0ZW06PEljb25JbmZvPm51bGxcblx0fVxuXG5cdEBWaWV3Q2hpbGQoJ2ljb25Cb3gnLCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgaWNvbkJveDogRWxlbWVudFJlZjtcblx0Ly8gQFZpZXdDaGlsZCgnc2VhcmNoSWNvbicsIHtzdGF0aWM6IGZhbHNlfSkgcHJpdmF0ZSBzZWFyY2hJY29uOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcsIHtzdGF0aWM6IGZhbHNlfSkgcHJpdmF0ZSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcblx0QFZpZXdDaGlsZCgnc2VhcmNoQnV0dG9uJywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaEJ1dHRvbjogRWxlbWVudFJlZjtcblx0XG5cdEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBcIlwiO1xuXHRASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xuXHRASW5wdXQoKSBjb250cm9sbHM6IGFueSA9IHtcblx0XHRmaXJzdFBhZ2U6ICcnLFxuXHRcdHByZXZpb3VzUGFnZTogJycsXG5cdFx0bmV4dFBhZ2U6ICcnLFxuXHRcdGxhc3RQYWdlOiAnJ1xuXHR9O1xuXG5cdC8vIHNob3dJY29uTmFtZSBzaG91bGQgYmUgaGFuZGxlZCBieSBjc3MgZnJvbSB1c2VyXG5cdC8vIEBJbnB1dChcInRpbGVcIilcblx0Ly8gcHJpdmF0ZSBjb25maWdUaWxlOmJvb2xlYW49dHJ1ZTtcblxuXHRASW5wdXQoKSBzZWFyY2hFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdEBJbnB1dCgpIHNpemU6IG51bWJlciA9IDM7XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0QElucHV0KCkgc2hvd0ljb25OYW1lID0gZmFsc2U7XG5cdEBJbnB1dCgpIHRlbXBsYXRlOiBhbnk7XG5cdEBJbnB1dCgpIHNsaWRlU2hvd0VuYWJsZWQgPSBmYWxzZTtcblx0QElucHV0KCkgYXBwbHlMYXlvdXRUeXBlID0gZmFsc2U7XG5cdEBJbnB1dCgpIGFwcGx5T3BhY2l0eSA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseVBhdHRlcm4gPSBmYWxzZTtcblx0QElucHV0KCkgYXBwbHlBbmltYXRpb24gPSBmYWxzZTtcblx0QElucHV0KCkgYXBwbHlTbGlkZVNob3cgPSBmYWxzZTtcblx0QElucHV0KCkgZW50cmllczogSWNvbkluZm9bXSA9IFtdO1xuXG5cdEBPdXRwdXQoKSBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0QE91dHB1dCgpIG9udG9nZ2xlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRAT3V0cHV0KCkgZW5hYmxlZFNob3cgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0QEhvc3RMaXN0ZW5lcignd2luZG93OmNsaWNrJywgWyckZXZlbnQnXSlcblx0b25DbGljaygkZXZlbnQ6IGFueSkge1xuXHRcdGxldCBpbnNpZGUgPSBmYWxzZTtcblx0XHRsZXQgbm9kZSA9ICRldmVudC50YXJnZXQ7XG5cdFx0d2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuXHRcdFx0aWYgKG5vZGUgPT09IHRoaXMuaG9zdCkge1xuXHRcdFx0XHRpbnNpZGUgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0fVxuXHRcdGlmICghaW5zaWRlICYmIHRoaXMuaWNvbkJveCAmJiAkZXZlbnQudGFyZ2V0ICE9PSB0aGlzLmljb25Cb3gubmF0aXZlRWxlbWVudCAgJiYgdGhpcy5jb25maWcub3Blbikge1xuXHRcdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhvc3Q6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGVsOiBFbGVtZW50UmVmLFxuXHRcdHByaXZhdGUgcHJlbG9hZGVyOiBQcmVsb2FkZXIsXG5cdFx0cHJpdmF0ZSBkZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXJcblx0KSB7XG5cdFx0dGhpcy5ob3N0ID0gZWwubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRpZiAoIXRoaXMuaW5pdGlhbmFsaXplZCkge1xuXHRcdFx0dGhpcy5pbml0aWFuYWxpemVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5lbnRyaWVzO1xuXHRcdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLmVudHJpZXNbaV0uaWQgPSBpO1xuXHRcdFx0XHR0aGlzLmVudHJpZXNbaV0ub3duZXJJZCA9IHRoaXMuaWQ7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5yZXBlYXQgPSB0aGlzLmVudHJpZXNbaV0ucmVwZWF0ID8gdGhpcy5lbnRyaWVzW2ldLnJlcGVhdCA6IGZhbHNlO1xuXHRcdFx0XHRpZiAodGhpcy5lbnRyaWVzW2ldLnNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5lbnRyaWVzW2ldLmZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW1zLnB1c2godGhpcy5lbnRyaWVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zZWxlY3RlZEluZGV4IC8gKHRoaXMuc2l6ZS0xKSk7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ID4gMCA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCAtICgodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZSkgOiAwO1xuXHRcdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bi5wdXNoKHRoaXMpO1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnRvdGFsUGFnZSA+IDEpIHtcblx0XHRcdFx0dGhpcy5jb25maWcubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0XHRcdHRoaXMucHJlbG9hZGVyLmNvbnRhaW5zKHRoaXMuaWQsIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS52YWx1ZSk7XG5cdFx0XHRpZiAoIXRoaXMuc3RhcnRTbGlkZVNob3coKSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLm9udG9nZ2xlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHRcdFx0fSwgNjYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXBlYXQoZXZlbnQ6IGFueSkge1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5yZXBlYXQgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnJlcGVhdDtcblx0fVxuXHRwcml2YXRlIHN0b3BTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW50ZXJ2YWwpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zbGlkZVNob3dJbnRlcnZhbCk7XG5cdFx0XHR0aGlzLnNsaWRlU2hvd0ludGVydmFsID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbmRleCA9IDA7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgc3RhcnRTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93RW5hYmxlZCAmJiB0aGlzLmZhdm9yaXRlSXRlbXMubGVuZ3RoID4gMSAmJiAhdGhpcy5zbGlkZVNob3dJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5wcmVsb2FkZXIucHJlbG9hZCh0aGlzLmlkLCB0aGlzLmZhdm9yaXRlSXRlbXMpO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2xpZGVTaG93LmJpbmQodGhpcyksIDIwMDAwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0ZW5hYmxlU2hvdyhldmVudDogYW55KSB7XG5cdFx0dGhpcy5zbGlkZVNob3dFbmFibGVkID0gIXRoaXMuc2xpZGVTaG93RW5hYmxlZDtcblx0XHR0aGlzLmVuYWJsZWRTaG93LmVtaXQodGhpcy5zbGlkZVNob3dFbmFibGVkKTtcblx0XHRpZiAodGhpcy5zbGlkZVNob3dFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnN0YXJ0U2xpZGVTaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdH1cblx0fVxuXHRzbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW5kZXggPT09IHRoaXMuZmF2b3JpdGVJdGVtcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuc2xpZGVTaG93SW5kZXggPSAwO1xuXHRcdH1cblx0XHRjb25zdCBpdGVtID0gdGhpcy5mYXZvcml0ZUl0ZW1zW3RoaXMuc2xpZGVTaG93SW5kZXhdO1xuXHRcdHRoaXMuZW1pdFRvZ2dsZShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdHRoaXMuc2xpZGVTaG93SW5kZXgrKztcblx0fVxuXHRhZGRUb0Zhdm9yaXRlKGV2ZW50OiBhbnkpIHtcblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uZmF2b3JpdGUgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmZhdm9yaXRlXG5cdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5mYXZvcml0ZSkge1xuXHRcdFx0dGhpcy5wcmVsb2FkZXIuaW1hZ2UodGhpcy5pZCwgdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnZhbHVlKTtcblx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtcy5wdXNoKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLmZhdm9yaXRlSXRlbXMuaW5kZXhPZih0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuc3RhcnRTbGlkZVNob3coKTtcblx0fVxuXHRtb2xkKGV2ZW50OiBhbnkpIHtcblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0ubW9sZGVkID0gIXRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5tb2xkZWRcblx0XHR0aGlzLnN0b3BTbGlkZVNob3coKTtcblx0XHR0aGlzLmVtaXRDaGFuZ2UodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKT0+IHRoaXMuc3RhcnRTbGlkZVNob3coKSk7XG5cdH1cblx0a2V5Ym9hcmRUcmFja2VyKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHQkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQga2V5ID0gJGV2ZW50LmNoYXJDb2RlIHx8ICRldmVudC5rZXlDb2RlIHx8IDA7XG5cblx0XHRpZiAoa2V5ID09PSAzOSB8fCBrZXkgPT09IDQwKSB7Ly9yaWdodCBvciBkb3duIGFycm93XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdFx0aWYgKGluZGV4IDwgdGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCArIDEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHRcdFx0dGhpcy5uZXh0KCRldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sNjYpO1xuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAzNyB8fCBrZXkgPT09IDM4KSB7Ly9sZWZ0IG9yIHVwIGFycm93XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdFx0aWYgKGluZGV4ID4gMCkge1xuXHRcdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCAtIDEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0XHRcdHRoaXMucHJldigkZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LDY2KTtcblx0XHR9XG5cdFx0aWYgKGtleSA9PT0gNDApIHtcblx0XHRcdHRoaXMuY29uZmlnLm9wZW4gPSB0cnVlO1xuXHRcdFx0aWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdmb2N1cycsIFtdKVxuXHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdCcsIFtdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDY2KTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMzggJiYgdGhpcy5oaWdobGlnaHRJbmRleCA9PT0gMCkge1xuXHRcdFx0dGhpcy5jb25maWcub3BlbiA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuc2VhcmNoQnV0dG9uKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaEJ1dHRvbi5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRrZXl1cChldmVudDogYW55KSB7XG5cdFx0bGV0IGtleSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGUgfHwgMDtcblx0XHRpZiAoa2V5ID09PSAxMykge1xuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XG5cdFx0fVxuXHR9XG5cdHBlcmZvcm1TZWFyY2goJGV2ZW50OktleWJvYXJkRXZlbnQsIHNlYXJjaFN0cmluZzpzdHJpbmcpIHtcblx0XHRsZXQga2V5ID0gJGV2ZW50LmNoYXJDb2RlIHx8ICRldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0aWYgKGtleSA+IDM2ICYmIGtleSA8IDQxKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5rZXlib2FyZFRyYWNrZXIoJGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKHNlYXJjaFN0cmluZyA9PT0gJycpIHtcblx0XHRcdGlmIChrZXkgPT09IDEzKSB7XG5cdFx0XHRcdHRoaXMua2V5Ym9hcmRUcmFja2VyKCRldmVudCk7XG5cdFx0XHRcdHRoaXMudG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzZXRTZWFyY2goKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLXNlYXJjaCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1jYW5jZWwnKTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IHRydWU7XG5cblx0XHR0aGlzLnNlYXJjaGVkRGF0YSA9IFtdO1xuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBpbmZvID0gdGhpcy5lbnRyaWVzW2ldO1xuXHRcdFx0aWYgKGluZm8ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nLnRvTG93ZXJDYXNlKCkpID49IDApIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hlZERhdGEucHVzaChpbmZvKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuc2VhcmNoZWREYXRhLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IDA7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnNlYXJjaGVkRGF0YVswXTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5zZWFyY2hlZERhdGE7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gbnVsbDtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG5cdH1cblx0cmVzZXRTZWFyY2goKSB7XG5cdFx0aWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsICcnKTtcblx0XHR9XG5cblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5yZW1vdmVDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0Ly90aGlzLnNlYXJjaEljb24uYWRkQ2xhc3MoJ3BpY2tlci1pY29uLXNlYXJjaCcpO1xuXG5cdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSAxO1xuXHRcdHRoaXMuY29uZmlnLmlzU2VhcmNoID0gZmFsc2U7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IDA7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmVudHJpZXM7XG5cdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5lbnRyaWVzWzBdO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHR9XG5cdG5leHQoJGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPCB0aGlzLmNvbmZpZy50b3RhbFBhZ2UpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlKys7XG4gXHRcdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9MDtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHByZXYoJGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZS0tO1xuIFx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zaXplLTE7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsYXN0KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IHRoaXMuY29uZmlnLnRvdGFsUGFnZTtcblx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9MDtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmaXJzdCgkZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHQgICAgdGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0fVxuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXg9dGhpcy5zaXplLTE7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJlbmRlckljb25Db250YWluZXIoKSB7XG5cdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSAodGhpcy5jb25maWcuaXNTZWFyY2ggPyB0aGlzLnNlYXJjaGVkRGF0YSA6IHRoaXMuZW50cmllcyk7XG5cdFx0dGhpcy5jb25maWcudG90YWxQYWdlID0gTWF0aC5jZWlsKHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aCAvIHRoaXMuc2l6ZSk7XG5cdFx0XG5cdFx0dGhpcy5jb25maWcuc2hvd0Zvb3RlciA9ICh0aGlzLmNvbmZpZy50b3RhbFBhZ2UgPiAxKTtcblxuXHRcdGxldCBvZmZzZXQgPSB0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA/ICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5zaXplIDogMDtcblxuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGggPCAxICkge1xuXHRcdFx0dGhpcy5jb25maWcuaGFzRXJyb3IgPSB0cnVlO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuZGlzcGxheUl0ZW1zLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5zaXplKTtcblx0XHRcdHRoaXMucHJlbG9hZGVyLnByZWxvYWQodGhpcy5pZCwgdGhpcy5kaXNwbGF5SXRlbXMpO1xuXHRcdH1cblx0fVxuXHR0b2dnbGVJY29uU2VsZWN0b3IoKSB7XG5cdFx0dGhpcy5jb25maWcub3BlbiA9ICF0aGlzLmNvbmZpZy5vcGVuO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLm9wZW4gJiYgdGhpcy5zZWFyY2hFbmFibGVkKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSk7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdCcsIFtdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgNjYpO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIGVtaXRDaGFuZ2UoaXRlbTogYW55LCBjYWxsYmFjazogYW55KSB7XG5cdFx0Y29uc3QgZGVsYXlUaW1lID0gKGl0ZW0ubW9sZGVkICYmICF0aGlzLnByZWxvYWRlci5jb250YWlucyh0aGlzLmlkLCBpdGVtLnZhbHVlKSkgPyA3NzcgOiA2Njtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdChpdGVtKTtcblx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0fVxuXHRcdH0sIGRlbGF5VGltZSk7XG5cdH1cblx0cHJpdmF0ZSBlbWl0VG9nZ2xlKGl0ZW06IGFueSwgY2FsbGJhY2s6IGFueSkge1xuXHRcdGNvbnN0IGRlbGF5VGltZSA9IChpdGVtLm1vbGRlZCAmJiAhdGhpcy5wcmVsb2FkZXIuY29udGFpbnModGhpcy5pZCwgaXRlbS52YWx1ZSkpID8gNzc3IDogNjY7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLm9udG9nZ2xlLmVtaXQoaXRlbSk7XG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdH1cblx0XHR9LCBkZWxheVRpbWUpO1xuXHR9XG5cdHByaXZhdGUgZGVzZWxlY3RBbGwoKSB7XG5cdFx0aWYgKHRoaXMuZGlzcGxheUl0ZW1zKSB7XG5cdFx0XHRmb3IobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0c2VsZWN0SWNvbihpbmRleDogbnVtYmVyKSB7XG5cdFx0dGhpcy5kZXNlbGVjdEFsbCgpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSBpbmRleDtcblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMgJiYgIXRoaXMuZGlzcGxheUl0ZW1zW2luZGV4XS5kaXNhYmxlZCkge1xuXHRcdFx0Zm9yIChsZXQgaTpudW1iZXI9MDtpPHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aDtpKyspe1xuXHRcdFx0XHR0aGlzLmVudHJpZXNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYgKGluZGV4ID09PSBpKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXlJdGVtc1tpXS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW2luZGV4XTtcblx0XHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0XHR0aGlzLnN0b3BTbGlkZVNob3coKTtcblx0XHRcdFx0dGhpcy5lbWl0Q2hhbmdlKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSwgKCkgPT4gdGhpcy5zdGFydFNsaWRlU2hvdygpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aGlnaGxpZ2h0SWNvbihpbmRleDogbnVtYmVyKSB7XG5cdFx0dGhpcy5kZXNlbGVjdEFsbCgpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSBpbmRleDtcblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMgJiYgIXRoaXMuZGlzcGxheUl0ZW1zW2luZGV4XS5kaXNhYmxlZCkge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdFx0dGhpcy5zdG9wU2xpZGVTaG93KCk7XG5cdFx0XHRcdHRoaXMuZW1pdFRvZ2dsZSh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0sICgpID0+IHRoaXMuc3RhcnRTbGlkZVNob3coKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGFuaW1hdGlvbigkZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcyAmJiB0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5hbmltYXRpb24gPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuXHRcdH1cblx0fVxuXHRwb3BJY29ucygkZXZlbnQ6IGFueSkge1xuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBnbG9iYWxBY3RpdmVEcm9wZG93bi5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldIT10aGlzICYmIGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldLmNvbmZpZy5vcGVuKSB7XG5cdFx0XHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duW2ldLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRzZWxlY3RlZFNvdXJjZVVybCgpIHtcblx0XHRyZXR1cm4gKCF0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0udHlwZSB8fCB0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0udHlwZSA9PSAnaW1hZ2UnKSA/XG5cdFx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS52YWx1ZSA6IHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5wb3N0ZXI7XG5cdH1cbn1cbiJdfQ==