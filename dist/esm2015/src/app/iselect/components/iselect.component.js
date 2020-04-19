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
            if (this.config.selectedItem) {
                this.preloader.contains(this.id, this.config.selectedItem.value);
                if (!this.startSlideShow()) {
                    setTimeout(() => {
                        this.ontoggle.emit(this.config.selectedItem);
                    }, 66);
                }
            }
            this.detector.detectChanges();
        }
    }
    repeat(event) {
        if (this.config.selectedItem) {
            this.config.selectedItem.repeat = !this.config.selectedItem.repeat;
        }
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
        if (this.config.selectedItem) {
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
    }
    mold(event) {
        if (this.config.selectedItem) {
            this.config.selectedItem.molded = !this.config.selectedItem.molded;
            this.stopSlideShow();
            this.emitChange(this.config.selectedItem, () => this.startSlideShow());
        }
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
        return this.config.selectedItem ?
            ((!this.config.selectedItem.type || this.config.selectedItem.type == 'image') ?
                this.config.selectedItem.value :
                this.config.selectedItem.poster) :
            '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2hELElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDO0FBRXhDOztFQUVFO0FBTUYsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQTZFbkIsWUFDQyxFQUFjLEVBQ04sU0FBb0IsRUFDcEIsUUFBMkIsRUFDM0IsUUFBa0I7UUFGbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBL0VwQixrQkFBYSxHQUFVLENBQUMsQ0FBQztRQUNoQyxpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFjLEVBQUUsQ0FBQztRQUM5QixtQkFBYyxHQUFDLENBQUMsQ0FBQztRQUVqQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV0QixXQUFNLEdBQUU7WUFDUCxTQUFTLEVBQUMsQ0FBQztZQUNYLFdBQVcsRUFBQyxDQUFDO1lBQ2IsSUFBSSxFQUFDLEtBQUs7WUFDVixVQUFVLEVBQUMsS0FBSztZQUNoQixRQUFRLEVBQUMsS0FBSztZQUNkLFNBQVMsRUFBQyxLQUFLO1lBQ2YsUUFB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UixLQUFLLEVBQUU7eUNBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTtpREFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7Z0RBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFOzZDQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs2Q0FBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7K0NBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFOytDQUF3QjtBQUN2QjtJQUFSLEtBQUssRUFBRTt3Q0FBMEI7QUFFeEI7SUFBVCxNQUFNLEVBQUU7eUNBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFO3lDQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTs0Q0FBa0M7QUFHM0M7SUFEQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7c0NBY3hDO0FBekVXLE9BQU87SUFMbkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFDLFVBQVU7UUFDdEIsbXNSQUFxQzs7S0FFckMsQ0FBQztHQUNXLE9BQU8sQ0EyYW5CO1NBM2FZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Vmlld0NvbnRhaW5lclJlZixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWYsXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRBZnRlclZpZXdJbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBQcmVsb2FkZXIgfSBmcm9tIFwiLi9wcmVsb2FkZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgSWNvbkluZm99IGZyb20gXCIuL2lzZWxlY3QuaW50ZXJmYWNlXCI7XG5cbnZhciBnbG9iYWxBY3RpdmVEcm9wZG93bjpJU2VsZWN0W10gPSBbXTtcblxuLypcbiogTGlrZSBhIHJlZ3VsYXIgZHJvcGRvd24sIHdlIHdhbnQgdG8gc2V0L2dldCBzZWxlY3RlZEluZGV4LCBzZWxlY3QgaXRlbXMgb24gYXJyb3cgdXAvZG93biwgYW5kIHNlbGVjdCBpdGVtIG9uIGNsaWNrLlxuKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOidpLXNlbGVjdCcsXG5cdHRlbXBsYXRlVXJsOiAnaXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydpc2VsZWN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSVNlbGVjdCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG5cdHB1YmxpYyBzZWxlY3RlZEluZGV4Om51bWJlciA9IDE7XG5cdGRpc3BsYXlJdGVtczpJY29uSW5mb1tdID0gW107XG5cdGZhdm9yaXRlSXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRoaWdobGlnaHRJbmRleD0wO1xuXHRzbGlkZVNob3dJbnRlcnZhbDogYW55O1xuXHRzbGlkZVNob3dJbmRleCA9IDA7XG5cdHNlYXJjaGVkRGF0YTpJY29uSW5mb1tdID0gW107XG5cdGluaXRpYW5hbGl6ZWQgPSBmYWxzZTtcblxuXHRjb25maWcgPXtcblx0XHR0b3RhbFBhZ2U6MSxcblx0XHRjdXJyZW50UGFnZTowLFxuXHRcdG9wZW46ZmFsc2UsXG5cdFx0c2hvd0Zvb3RlcjpmYWxzZSxcblx0XHRoYXNFcnJvcjpmYWxzZSxcblx0XHRpc0ZvY3VzZWQ6ZmFsc2UsXG5cdFx0aXNTZWFyY2g6ZmFsc2UsXG5cdFx0bG9hZGluZzp0cnVlLFxuXHRcdHNlbGVjdGVkSXRlbTo8SWNvbkluZm8+bnVsbFxuXHR9XG5cblx0QFZpZXdDaGlsZCgnaWNvbkJveCcsIHtzdGF0aWM6IGZhbHNlfSkgcHJpdmF0ZSBpY29uQm94OiBFbGVtZW50UmVmO1xuXHQvLyBAVmlld0NoaWxkKCdzZWFyY2hJY29uJywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaEljb246IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hCdXR0b24nLCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgc2VhcmNoQnV0dG9uOiBFbGVtZW50UmVmO1xuXHRcblx0QElucHV0KCkgaWQ6IHN0cmluZyA9IFwiXCI7XG5cdEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IFwiXCI7XG5cdEBJbnB1dCgpIGNvbnRyb2xsczogYW55ID0ge1xuXHRcdGZpcnN0UGFnZTogJycsXG5cdFx0cHJldmlvdXNQYWdlOiAnJyxcblx0XHRuZXh0UGFnZTogJycsXG5cdFx0bGFzdFBhZ2U6ICcnXG5cdH07XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0Ly8gQElucHV0KFwidGlsZVwiKVxuXHQvLyBwcml2YXRlIGNvbmZpZ1RpbGU6Ym9vbGVhbj10cnVlO1xuXG5cdEBJbnB1dCgpIHNlYXJjaEVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0QElucHV0KCkgc2l6ZTogbnVtYmVyID0gMztcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHRASW5wdXQoKSBzaG93SWNvbk5hbWUgPSBmYWxzZTtcblx0QElucHV0KCkgdGVtcGxhdGU6IGFueTtcblx0QElucHV0KCkgc2xpZGVTaG93RW5hYmxlZCA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseUxheW91dFR5cGUgPSBmYWxzZTtcblx0QElucHV0KCkgYXBwbHlPcGFjaXR5ID0gZmFsc2U7XG5cdEBJbnB1dCgpIGFwcGx5UGF0dGVybiA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseUFuaW1hdGlvbiA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseVNsaWRlU2hvdyA9IGZhbHNlO1xuXHRASW5wdXQoKSBlbnRyaWVzOiBJY29uSW5mb1tdID0gW107XG5cblx0QE91dHB1dCgpIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRAT3V0cHV0KCkgb250b2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBlbmFibGVkU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6Y2xpY2snLCBbJyRldmVudCddKVxuXHRvbkNsaWNrKCRldmVudDogYW55KSB7XG5cdFx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXHRcdGxldCBub2RlID0gJGV2ZW50LnRhcmdldDtcblx0XHR3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0XHRpZiAobm9kZSA9PT0gdGhpcy5ob3N0KSB7XG5cdFx0XHRcdGluc2lkZSA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0aWYgKCFpbnNpZGUgJiYgdGhpcy5pY29uQm94ICYmICRldmVudC50YXJnZXQgIT09IHRoaXMuaWNvbkJveC5uYXRpdmVFbGVtZW50ICAmJiB0aGlzLmNvbmZpZy5vcGVuKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaG9zdDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0ZWw6IEVsZW1lbnRSZWYsXG5cdFx0cHJpdmF0ZSBwcmVsb2FkZXI6IFByZWxvYWRlcixcblx0XHRwcml2YXRlIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlclxuXHQpIHtcblx0XHR0aGlzLmhvc3QgPSBlbC5uYXRpdmVFbGVtZW50O1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGlmICghdGhpcy5pbml0aWFuYWxpemVkKSB7XG5cdFx0XHR0aGlzLmluaXRpYW5hbGl6ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmVudHJpZXM7XG5cdFx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5pZCA9IGk7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5vd25lcklkID0gdGhpcy5pZDtcblx0XHRcdFx0dGhpcy5lbnRyaWVzW2ldLnJlcGVhdCA9IHRoaXMuZW50cmllc1tpXS5yZXBlYXQgPyB0aGlzLmVudHJpZXNbaV0ucmVwZWF0IDogZmFsc2U7XG5cdFx0XHRcdGlmICh0aGlzLmVudHJpZXNbaV0uc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLmVudHJpZXNbaV0uZmF2b3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmZhdm9yaXRlSXRlbXMucHVzaCh0aGlzLmVudHJpZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IE1hdGguY2VpbCh0aGlzLnNlbGVjdGVkSW5kZXggLyAodGhpcy5zaXplLTEpKTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggPiAwID9cblx0XHRcdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4IC0gKCh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5zaXplKSA6IDA7XG5cdFx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duLnB1c2godGhpcyk7XG5cdFx0XHRpZiAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSkge1xuXHRcdFx0XHR0aGlzLmNvbmZpZy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdFx0dGhpcy5wcmVsb2FkZXIuY29udGFpbnModGhpcy5pZCwgdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnZhbHVlKTtcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXJ0U2xpZGVTaG93KCkpIHtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub250b2dnbGUuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdFx0XHRcdH0sIDY2KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0fVxuXHR9XG5cdHJlcGVhdChldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnJlcGVhdCA9ICF0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0ucmVwZWF0O1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIHN0b3BTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW50ZXJ2YWwpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zbGlkZVNob3dJbnRlcnZhbCk7XG5cdFx0XHR0aGlzLnNsaWRlU2hvd0ludGVydmFsID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbmRleCA9IDA7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgc3RhcnRTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93RW5hYmxlZCAmJiB0aGlzLmZhdm9yaXRlSXRlbXMubGVuZ3RoID4gMSAmJiAhdGhpcy5zbGlkZVNob3dJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5wcmVsb2FkZXIucHJlbG9hZCh0aGlzLmlkLCB0aGlzLmZhdm9yaXRlSXRlbXMpO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2xpZGVTaG93LmJpbmQodGhpcyksIDIwMDAwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0ZW5hYmxlU2hvdyhldmVudDogYW55KSB7XG5cdFx0dGhpcy5zbGlkZVNob3dFbmFibGVkID0gIXRoaXMuc2xpZGVTaG93RW5hYmxlZDtcblx0XHR0aGlzLmVuYWJsZWRTaG93LmVtaXQodGhpcy5zbGlkZVNob3dFbmFibGVkKTtcblx0XHRpZiAodGhpcy5zbGlkZVNob3dFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnN0YXJ0U2xpZGVTaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdH1cblx0fVxuXHRzbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW5kZXggPT09IHRoaXMuZmF2b3JpdGVJdGVtcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuc2xpZGVTaG93SW5kZXggPSAwO1xuXHRcdH1cblx0XHRjb25zdCBpdGVtID0gdGhpcy5mYXZvcml0ZUl0ZW1zW3RoaXMuc2xpZGVTaG93SW5kZXhdO1xuXHRcdHRoaXMuZW1pdFRvZ2dsZShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdHRoaXMuc2xpZGVTaG93SW5kZXgrKztcblx0fVxuXHRhZGRUb0Zhdm9yaXRlKGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uZmF2b3JpdGUgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmZhdm9yaXRlXG5cdFx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmZhdm9yaXRlKSB7XG5cdFx0XHRcdHRoaXMucHJlbG9hZGVyLmltYWdlKHRoaXMuaWQsIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS52YWx1ZSk7XG5cdFx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtcy5wdXNoKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5mYXZvcml0ZUl0ZW1zLmluZGV4T2YodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnN0YXJ0U2xpZGVTaG93KCk7XG5cdFx0fVxuXHR9XG5cdG1vbGQoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5tb2xkZWQgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLm1vbGRlZFxuXHRcdFx0dGhpcy5zdG9wU2xpZGVTaG93KCk7XG5cdFx0XHR0aGlzLmVtaXRDaGFuZ2UodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKT0+IHRoaXMuc3RhcnRTbGlkZVNob3coKSk7XG5cdFx0fVxuXHR9XG5cdGtleWJvYXJkVHJhY2tlcigkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0JGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXG5cdFx0aWYgKGtleSA9PT0gMzkgfHwga2V5ID09PSA0MCkgey8vcmlnaHQgb3IgZG93biBhcnJvd1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRcdGlmIChpbmRleCA8IHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXggKyAxKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0XHRcdHRoaXMubmV4dCgkZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LDY2KTtcblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMzcgfHwga2V5ID09PSAzOCkgey8vbGVmdCBvciB1cCBhcnJvd1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRcdGlmIChpbmRleCA+IDApIHtcblx0XHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXggLSAxKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdFx0XHR0aGlzLnByZXYoJGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSw2Nik7XG5cdFx0fVxuXHRcdGlmIChrZXkgPT09IDQwKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5vcGVuID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSlcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCA2Nik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChrZXkgPT09IDM4ICYmIHRoaXMuaGlnaGxpZ2h0SW5kZXggPT09IDApIHtcblx0XHRcdHRoaXMuY29uZmlnLm9wZW4gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLnNlYXJjaEJ1dHRvbikge1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hCdXR0b24ubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0a2V5dXAoZXZlbnQ6IGFueSkge1xuXHRcdGxldCBrZXkgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0aWYgKGtleSA9PT0gMTMpIHtcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xuXHRcdH1cblx0fVxuXHRwZXJmb3JtU2VhcmNoKCRldmVudDpLZXlib2FyZEV2ZW50LCBzZWFyY2hTdHJpbmc6c3RyaW5nKSB7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXHRcdGlmIChrZXkgPiAzNiAmJiBrZXkgPCA0MSkge1xuXHRcdFx0cmV0dXJuIHRoaXMua2V5Ym9hcmRUcmFja2VyKCRldmVudCk7XG5cdFx0fVxuXHRcdGlmIChzZWFyY2hTdHJpbmcgPT09ICcnKSB7XG5cdFx0XHRpZiAoa2V5ID09PSAxMykge1xuXHRcdFx0XHR0aGlzLmtleWJvYXJkVHJhY2tlcigkZXZlbnQpO1xuXHRcdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0U2VhcmNoKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSB0cnVlO1xuXG5cdFx0dGhpcy5zZWFyY2hlZERhdGEgPSBbXTtcblx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgaW5mbyA9IHRoaXMuZW50cmllc1tpXTtcblx0XHRcdGlmIChpbmZvLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZy50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuc2VhcmNoZWREYXRhLnB1c2goaW5mbyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNlYXJjaGVkRGF0YS5sZW5ndGgpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWFyY2hlZERhdGFbMF07XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuc2VhcmNoZWREYXRhO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHR9XG5cdHJlc2V0U2VhcmNoKCkge1xuXHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCAnJyk7XG5cdFx0fVxuXG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IGZhbHNlO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5lbnRyaWVzO1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZW50cmllc1swXTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0fVxuXHRuZXh0KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSsrO1xuIFx0XHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwcmV2KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UtLTtcbiBcdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGFzdCgkZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSB0aGlzLmNvbmZpZy50b3RhbFBhZ2U7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zmlyc3QoJGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZW5kZXJJY29uQ29udGFpbmVyKCkge1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gKHRoaXMuY29uZmlnLmlzU2VhcmNoID8gdGhpcy5zZWFyY2hlZERhdGEgOiB0aGlzLmVudHJpZXMpO1xuXHRcdHRoaXMuY29uZmlnLnRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGggLyB0aGlzLnNpemUpO1xuXHRcdFxuXHRcdHRoaXMuY29uZmlnLnNob3dGb290ZXIgPSAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSk7XG5cblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5jb25maWcuY3VycmVudFBhZ2UgPyAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZSA6IDA7XG5cblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIDwgMSApIHtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gdHJ1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmRpc3BsYXlJdGVtcy5zbGljZShvZmZzZXQsIG9mZnNldCArIHRoaXMuc2l6ZSk7XG5cdFx0XHR0aGlzLnByZWxvYWRlci5wcmVsb2FkKHRoaXMuaWQsIHRoaXMuZGlzcGxheUl0ZW1zKTtcblx0XHR9XG5cdH1cblx0dG9nZ2xlSWNvblNlbGVjdG9yKCkge1xuXHRcdHRoaXMuY29uZmlnLm9wZW4gPSAhdGhpcy5jb25maWcub3BlbjtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5vcGVuICYmIHRoaXMuc2VhcmNoRW5hYmxlZCkge1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDY2KTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBlbWl0Q2hhbmdlKGl0ZW06IGFueSwgY2FsbGJhY2s6IGFueSkge1xuXHRcdGNvbnN0IGRlbGF5VGltZSA9IChpdGVtLm1vbGRlZCAmJiAhdGhpcy5wcmVsb2FkZXIuY29udGFpbnModGhpcy5pZCwgaXRlbS52YWx1ZSkpID8gNzc3IDogNjY7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQoaXRlbSk7XG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdH1cblx0XHR9LCBkZWxheVRpbWUpO1xuXHR9XG5cdHByaXZhdGUgZW1pdFRvZ2dsZShpdGVtOiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcblx0XHRjb25zdCBkZWxheVRpbWUgPSAoaXRlbS5tb2xkZWQgJiYgIXRoaXMucHJlbG9hZGVyLmNvbnRhaW5zKHRoaXMuaWQsIGl0ZW0udmFsdWUpKSA/IDc3NyA6IDY2O1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5vbnRvZ2dsZS5lbWl0KGl0ZW0pO1xuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHR9XG5cdFx0fSwgZGVsYXlUaW1lKTtcblx0fVxuXHRwcml2YXRlIGRlc2VsZWN0QWxsKCkge1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcykge1xuXHRcdFx0Zm9yKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNlbGVjdEljb24oaW5kZXg6IG51bWJlcikge1xuXHRcdHRoaXMuZGVzZWxlY3RBbGwoKTtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gaW5kZXg7XG5cdFx0aWYgKHRoaXMuZGlzcGxheUl0ZW1zICYmICF0aGlzLmRpc3BsYXlJdGVtc1tpbmRleF0uZGlzYWJsZWQpIHtcblx0XHRcdGZvciAobGV0IGk6bnVtYmVyPTA7aTx0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGg7aSsrKXtcblx0XHRcdFx0dGhpcy5lbnRyaWVzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmIChpbmRleCA9PT0gaSkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5SXRlbXNbaV0uc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1tpbmRleF07XG5cdFx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdFx0dGhpcy5zdG9wU2xpZGVTaG93KCk7XG5cdFx0XHRcdHRoaXMuZW1pdENoYW5nZSh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0sICgpID0+IHRoaXMuc3RhcnRTbGlkZVNob3coKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGhpZ2hsaWdodEljb24oaW5kZXg6IG51bWJlcikge1xuXHRcdHRoaXMuZGVzZWxlY3RBbGwoKTtcblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gaW5kZXg7XG5cdFx0aWYgKHRoaXMuZGlzcGxheUl0ZW1zICYmICF0aGlzLmRpc3BsYXlJdGVtc1tpbmRleF0uZGlzYWJsZWQpIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheUl0ZW1zW3RoaXMuaGlnaGxpZ2h0SW5kZXhdO1xuXHRcdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdFx0XHR0aGlzLmVtaXRUb2dnbGUodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKSA9PiB0aGlzLnN0YXJ0U2xpZGVTaG93KCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRhbmltYXRpb24oJGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMgJiYgdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uYW5pbWF0aW9uID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcblx0XHR9XG5cdH1cblx0cG9wSWNvbnMoJGV2ZW50OiBhbnkpIHtcblx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgZ2xvYmFsQWN0aXZlRHJvcGRvd24ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChnbG9iYWxBY3RpdmVEcm9wZG93bltpXSE9dGhpcyAmJiBnbG9iYWxBY3RpdmVEcm9wZG93bltpXS5jb25maWcub3Blbikge1xuXHRcdFx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bltpXS50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0c2VsZWN0ZWRTb3VyY2VVcmwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA/XG5cdFx0XHRcdFx0KCghdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnR5cGUgfHwgdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnR5cGUgPT0gJ2ltYWdlJykgP1xuXHRcdFx0XHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnZhbHVlIDpcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5wb3N0ZXIpIDpcblx0XHRcdFx0XHQnJztcblx0fVxufVxuIl19