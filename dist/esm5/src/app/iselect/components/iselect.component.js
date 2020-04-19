import * as tslib_1 from "tslib";
import { Component, ViewContainerRef, Input, Output, Renderer, HostListener, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { Preloader } from "./preloader.service";
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
        this.onchange = new EventEmitter();
        this.ontoggle = new EventEmitter();
        this.enabledShow = new EventEmitter();
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
        if (this.displayItems && !this.displayItems[index].disabled) {
            this.deselectAll();
            this.highlightIndex = index;
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
        { type: ElementRef },
        { type: Preloader },
        { type: ChangeDetectorRef },
        { type: Renderer }
    ]; };
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
            template: "<div class=\"i-select\" [id]=\"id\">\n    <div class=\"selected-icon\">\n        <div class=\"select-icon-block\" (click)=\"toggleIconSelector()\" #iconBox\n            [style.background]=\"config.selectedItem ? (selectedSourceUrl() | CSSImage:id:true:false)  : ''\"></div>\n        <div class=\"select-icon-spin3\" *ngIf=\"config.loading\"></div>\n    </div>\n    <a href=\"#\" #searchButton\n        class=\"i-select-button\" \n        [class.focus]=\"config.open\"\n        (click)=\"popIcons($event)\" \n        (keyup)=\"keyboardTracker($event)\" >\n    <span class=\"off-screen\" id=\"{{id}}name\" [textContent]=\"name\"></span>\n    <span class=\"select-icon-down-dir\"></span>\n    </a>\n</div>\n\n<div class=\"i-select-popup\" [style.display]=\"config.open ? 'block':'none'\" >\n    <div class=\"i-select-search\" (click)=\"searchInput.focus()\" *ngIf=\"searchEnabled\">\n        <input type=\"text\" placeholder=\"placeholder\" #searchInput\n            class=\"icons-search-input\" \n            [class.focused]=\"config.isFocused\"\n            (focus)=\"config.isFocused=true\"\n            (blur)=\"config.isFocused=false\"\n            (keyup)=\"performSearch($event, searchInput.value)\" />\n        <div class=\"select-icon-search\" #searchIcon [class]=\"config.isSearch ? 'select-icon-cancel' : 'select-icon-search'\"></div>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div class=\"i-select-search\" *ngIf=\"template\">\n        <ng-container [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{data: false}\">\n        </ng-container>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div *ngIf=\"applySlideShow\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'slideshow'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'slideshow'\"\n                [checked]=\"slideShowEnabled ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"enableShow($event)\" />\n            Enable slideshow\n        </label>\n    </div>\n    <div class=\"clear-fix\"></div>\n    <div role=\"list\" attr.aria-nameledby=\"{{id}}name\" class=\"select-icons-container\" #iconContainer>\n        <div \n            role=\"listitem\" \n            class=\"select-box\" \n            *ngFor=\"let item of displayItems; let i = index\">\n            <div *ngIf=\"!item.type || item.type === 'image' || item.type === 'stream'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [class.streaming]=\"item.type === 'stream'\"\n                [title]=\"showIconName ? '':item.name\"\n                [style.background]=\"item.value | CSSImage:id:true:false\"\n                (click)=\"selectIcon(i)\">\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n            <div *ngIf=\"item.type === 'video'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [title]=\"showIconName ? '':item.name\"\n                (click)=\"selectIcon(i)\">\n                <video [attr.src]=\"item.value\" [attr.poster]=\"item.poster\" crossorigin disabled></video>\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n            <div *ngIf=\"item.type === 'webGL'\"\n                [class.highlight-icon]=\"highlightIndex === i\"\n                [class.disabled]=\"item.disabled\"\n                [title]=\"showIconName ? '':item.name\"\n                [style.background]=\"item.poster | CSSImage:id:true:false\"\n                (click)=\"selectIcon(i)\">\n                <span class=\"off-screen\" [textContent]=\"item.name\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"icons-select-error\" *ngIf=\"config.hasError\">\n        <div class=\"select-icon-block\" data-select-value=\"select-icon-block\"></div>\n    </div>\n\n    <div class=\"clear-fix\"></div>\n\n    <div *ngIf=\"applyAnimation && config.selectedItem\"\n        class=\"i-select-search layout\">\n        <select \n            tabindex=\"0\" \n            title=\"Animation\"\n            style=\"width: 100%\" \n            [id]=\"id + 'select'\" \n            (keyup)=\"keyup($event)\" \n            (change)=\"animation($event)\">\n            <option value=\"disabled\" [selected]=\"config.selectedItem.animation === 'disabled' ? true : null\">Disabled</option>\n            <option value=\"zoom\" [selected]=\"config.selectedItem.animation === 'zoom' ? true : null\">Zoom</option>\n            <option value=\"fade\" [selected]=\"config.selectedItem.animation === 'fade' ? true : null\">Fade</option>\n            <option value=\"sepia\" [selected]=\"config.selectedItem.animation === 'sepia' ? true : null\">Sepia</option>\n            <option value=\"grayout\" [selected]=\"config.selectedItem.animation === 'grayout' ? true : null\">Grayout</option>\n            <option value=\"shake\" [selected]=\"config.selectedItem.animation === 'shake' ? true : null\">Shake</option>\n        </select>\n    </div>\n    <div *ngIf=\"applySlideShow && config.selectedItem\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'favorite'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'favorite'\"\n                [checked]=\"config.selectedItem.favorite ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"addToFavorite($event)\" />\n            Add to favorite\n        </label>\n    </div>\n    <div *ngIf=\"applyLayoutType && config.selectedItem && (!config.selectedItem.type || config.selectedItem.type === 'image')\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'pattern'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'pattern'\"\n                [checked]=\"config.selectedItem.repeat ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"repeat($event)\" />\n            Display Repeat\n        </label>\n    </div>\n    <div *ngIf=\"applyPattern && config.selectedItem && (!config.selectedItem.type || config.selectedItem.type === 'image')\"\n        class=\"i-select-search layout\">\n        <label [for]=\"id + 'mold'\">\n            <input type=\"checkbox\" tabindex=\"0\"\n                [id]=\"id + 'mold'\"\n                [checked]=\"config.selectedItem.molded ? true : null\"\n                (keyup)=\"keyup($event)\" \n                (change)=\"mold($event)\" />\n            Make Pattern\n        </label>\n    </div>\n    <div *ngIf=\"applyOpacity && config.selectedItem\"\n        class=\"i-select-search opacity\" \n        (click)=\"$event.preventDefault();$event.stopPropagation()\">\n        <input class=\"range\" \n            [attr.min]=\"0\" \n            [attr.max]=\"100\"  \n            type=\"range\" \n            title=\"Opacity\"\n            [attr.value]=\"config.selectedItem.opacity * 100\" \n            (input)=\"config.selectedItem.opacity = $event.target.value / 100\" \n            (change)=\"config.selectedItem.opacity = $event.target.value / 100\" />\n        <span class=\"slide-counter\" [textContent]=\"config.selectedItem.opacity\"></span>\n    </div>\n\n    <div class=\"i-select-footer\" *ngIf=\"config.showFooter\">\n        <div class=\"iselect-total\">Total: {{entries.length}}</div>\n        <div class=\"i-select-arrows\">\n            <div class=\"{{controlls.previousPage ? controlls.previousPage : 'angle-left'}}\"\n                (click)=\"prev($event)\"\n                [class.disabled]=\"config.currentPage==1\">\n                <span class=\"prev\" [textContent]=\"'previous'\"></span>\n            </div>\n            <div class=\"{{controlls.firstPage ? controlls.firstPage: 'angle-double-left'}}\"\n                    (click)=\"first($event)\"\n                    [class.disabled]=\"config.currentPage==1\">\n                <span class=\"first\" [textContent]=\"'first'\"></span>\n            </div>\n            <div class=\"i-select-pages\"><span [textContent]=\"config.currentPage + ' / ' + config.totalPage\"></span></div>\n            <div class=\"{{controlls.lastPage ? controlls.lastPage : 'angle-double-right'}}\"\n                    (click)=\"last($event)\"\n                    [class.disabled]=\"config.currentPage==config.totalPage\">\n                <span class=\"last\" [textContent]=\"'last'\"></span>\n            </div>\n            <div class=\"{{controlls.nextPage ? controlls.nextPage : 'angle-right'}}\"\n                    (click)=\"next($event)\"\n                    [class.disabled]=\"config.currentPage==config.totalPage\">\n                <span class=\"next\" [textContent]=\"'nextPage'\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"showIconName\" \n        class=\"name\" \n        [textContent]=\"config.selectedItem ? config.selectedItem.name : ''\"></div>\n</div>\n",
            styles: ["@charset \"UTF-8\";:host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:table;text-align:left;vertical-align:middle;margin:2px 0;width:150px;position:relative}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box .disabled{opacity:.7}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box div.streaming{background-size:contain!important}:host .select-box div iframe{border:0;width:100%}:host .select-box div video{border:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;background-size:cover!important;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center;margin-top:5px}:host .i-select-footer .iselect-total{float:left;color:#000;font-size:.9rem;margin:2px}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div.angle-left:before{content:\"\u2039\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-left:before{content:\"\u00AB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-right:before{content:\"\u00BB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-right:before{content:\"\u203A\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:calc(100% - 20px);height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:100%}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0;position:relative}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 2px 2px 0;position:absolute;right:-1px}:host .i-select-button.focus .select-icon-up-dir,:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button.focus .select-icon-down-dir,:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search.layout{padding:2px;margin:0}:host .i-select-search.layout label{color:#000;font-size:.8rem}:host .i-select-search.opacity{border-bottom:1px solid #ddd;padding:2px;margin:0}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{border-radius:50%;width:.8em!important;height:.8em!important;-webkit-animation:1.8s ease-in-out -.16s infinite load7;animation:1.8s ease-in-out -.16s infinite load7;color:#fff!important;position:absolute;top:-35px;left:.2rem;transform:translateZ(0)}:host .select-icon-spin3:after,:host .select-icon-spin3:before{color:#fff;border-radius:50%;width:.8em;height:.8em;-webkit-animation:1.8s ease-in-out infinite load7;animation:1.8s ease-in-out infinite load7;content:\"\";position:absolute;top:0}:host .select-icon-spin3:before{left:1.2rem;-webkit-animation-delay:-.32s;animation-delay:-.32s}:host .select-icon-spin3:after{left:2.4em}@-webkit-keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}@keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain;background-position:center center!important}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}:host .slide-counter{color:#000;font-size:.8rem;float:right}:host .range{width:80%}:host .range:hover{opacity:1}:host .range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:#444;background-image:linear-gradient(#444,#ddd,#444);cursor:pointer;border-radius:5px;border:2px solid #000;width:22px;height:12px}:host .range::-moz-range-thumb{background:#444;background-image:linear-gradient(#444,#ddd,#444);border-radius:5px;border:2px solid #000;cursor:pointer;width:22px;height:10px}"]
        })
    ], ISelect);
    return ISelect;
}());
export { ISelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2hELElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDO0FBRXhDOztFQUVFO0FBTUY7SUE2RUMsaUJBQ0MsRUFBYyxFQUNOLFNBQW9CLEVBQ3BCLFFBQTJCLEVBQzNCLFFBQWtCO1FBRmxCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFDM0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQS9FcEIsa0JBQWEsR0FBVSxDQUFDLENBQUM7UUFDaEMsaUJBQVksR0FBYyxFQUFFLENBQUM7UUFDN0Isa0JBQWEsR0FBYyxFQUFFLENBQUM7UUFDOUIsbUJBQWMsR0FBQyxDQUFDLENBQUM7UUFFakIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsaUJBQVksR0FBYyxFQUFFLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsV0FBTSxHQUFFO1lBQ1AsU0FBUyxFQUFDLENBQUM7WUFDWCxXQUFXLEVBQUMsQ0FBQztZQUNiLElBQUksRUFBQyxLQUFLO1lBQ1YsVUFBVSxFQUFDLEtBQUs7WUFDaEIsUUFBUSxFQUFDLEtBQUs7WUFDZCxTQUFTLEVBQUMsS0FBSztZQUNmLFFBQVEsRUFBQyxLQUFLO1lBQ2QsT0FBTyxFQUFD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QztJQUVwRTtRQUFSLEtBQUssRUFBRTt1Q0FBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7eUNBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzhDQUtOO0lBTU87UUFBUixLQUFLLEVBQUU7a0RBQWdDO0lBQy9CO1FBQVIsS0FBSyxFQUFFO3lDQUFrQjtJQUdqQjtRQUFSLEtBQUssRUFBRTtpREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7NkNBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTtxREFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7b0RBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFO2lEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTtpREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7bURBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFO21EQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTs0Q0FBMEI7SUFFeEI7UUFBVCxNQUFNLEVBQUU7NkNBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzZDQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTtnREFBa0M7SUFHM0M7UUFEQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7MENBY3hDO0lBekVXLE9BQU87UUFMbkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFDLFVBQVU7WUFDdEIsbTNSQUFxQzs7U0FFckMsQ0FBQztPQUNXLE9BQU8sQ0EyYW5CO0lBQUQsY0FBQztDQUFBLEFBM2FELElBMmFDO1NBM2FZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Vmlld0NvbnRhaW5lclJlZixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWYsXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRBZnRlclZpZXdJbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBQcmVsb2FkZXIgfSBmcm9tIFwiLi9wcmVsb2FkZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgSWNvbkluZm99IGZyb20gXCIuL2lzZWxlY3QuaW50ZXJmYWNlXCI7XG5cbnZhciBnbG9iYWxBY3RpdmVEcm9wZG93bjpJU2VsZWN0W10gPSBbXTtcblxuLypcbiogTGlrZSBhIHJlZ3VsYXIgZHJvcGRvd24sIHdlIHdhbnQgdG8gc2V0L2dldCBzZWxlY3RlZEluZGV4LCBzZWxlY3QgaXRlbXMgb24gYXJyb3cgdXAvZG93biwgYW5kIHNlbGVjdCBpdGVtIG9uIGNsaWNrLlxuKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOidpLXNlbGVjdCcsXG5cdHRlbXBsYXRlVXJsOiAnaXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydpc2VsZWN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSVNlbGVjdCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG5cdHB1YmxpYyBzZWxlY3RlZEluZGV4Om51bWJlciA9IDE7XG5cdGRpc3BsYXlJdGVtczpJY29uSW5mb1tdID0gW107XG5cdGZhdm9yaXRlSXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRoaWdobGlnaHRJbmRleD0wO1xuXHRzbGlkZVNob3dJbnRlcnZhbDogYW55O1xuXHRzbGlkZVNob3dJbmRleCA9IDA7XG5cdHNlYXJjaGVkRGF0YTpJY29uSW5mb1tdID0gW107XG5cdGluaXRpYW5hbGl6ZWQgPSBmYWxzZTtcblxuXHRjb25maWcgPXtcblx0XHR0b3RhbFBhZ2U6MSxcblx0XHRjdXJyZW50UGFnZTowLFxuXHRcdG9wZW46ZmFsc2UsXG5cdFx0c2hvd0Zvb3RlcjpmYWxzZSxcblx0XHRoYXNFcnJvcjpmYWxzZSxcblx0XHRpc0ZvY3VzZWQ6ZmFsc2UsXG5cdFx0aXNTZWFyY2g6ZmFsc2UsXG5cdFx0bG9hZGluZzp0cnVlLFxuXHRcdHNlbGVjdGVkSXRlbTo8SWNvbkluZm8+bnVsbFxuXHR9XG5cblx0QFZpZXdDaGlsZCgnaWNvbkJveCcsIHtzdGF0aWM6IGZhbHNlfSkgcHJpdmF0ZSBpY29uQm94OiBFbGVtZW50UmVmO1xuXHQvLyBAVmlld0NoaWxkKCdzZWFyY2hJY29uJywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaEljb246IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hCdXR0b24nLCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgc2VhcmNoQnV0dG9uOiBFbGVtZW50UmVmO1xuXHRcblx0QElucHV0KCkgaWQ6IHN0cmluZyA9IFwiXCI7XG5cdEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IFwiXCI7XG5cdEBJbnB1dCgpIGNvbnRyb2xsczogYW55ID0ge1xuXHRcdGZpcnN0UGFnZTogJycsXG5cdFx0cHJldmlvdXNQYWdlOiAnJyxcblx0XHRuZXh0UGFnZTogJycsXG5cdFx0bGFzdFBhZ2U6ICcnXG5cdH07XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0Ly8gQElucHV0KFwidGlsZVwiKVxuXHQvLyBwcml2YXRlIGNvbmZpZ1RpbGU6Ym9vbGVhbj10cnVlO1xuXG5cdEBJbnB1dCgpIHNlYXJjaEVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0QElucHV0KCkgc2l6ZTogbnVtYmVyID0gMztcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHRASW5wdXQoKSBzaG93SWNvbk5hbWUgPSBmYWxzZTtcblx0QElucHV0KCkgdGVtcGxhdGU6IGFueTtcblx0QElucHV0KCkgc2xpZGVTaG93RW5hYmxlZCA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseUxheW91dFR5cGUgPSBmYWxzZTtcblx0QElucHV0KCkgYXBwbHlPcGFjaXR5ID0gZmFsc2U7XG5cdEBJbnB1dCgpIGFwcGx5UGF0dGVybiA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseUFuaW1hdGlvbiA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseVNsaWRlU2hvdyA9IGZhbHNlO1xuXHRASW5wdXQoKSBlbnRyaWVzOiBJY29uSW5mb1tdID0gW107XG5cblx0QE91dHB1dCgpIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRAT3V0cHV0KCkgb250b2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBlbmFibGVkU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6Y2xpY2snLCBbJyRldmVudCddKVxuXHRvbkNsaWNrKCRldmVudDogYW55KSB7XG5cdFx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXHRcdGxldCBub2RlID0gJGV2ZW50LnRhcmdldDtcblx0XHR3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0XHRpZiAobm9kZSA9PT0gdGhpcy5ob3N0KSB7XG5cdFx0XHRcdGluc2lkZSA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0aWYgKCFpbnNpZGUgJiYgdGhpcy5pY29uQm94ICYmICRldmVudC50YXJnZXQgIT09IHRoaXMuaWNvbkJveC5uYXRpdmVFbGVtZW50ICAmJiB0aGlzLmNvbmZpZy5vcGVuKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaG9zdDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0ZWw6IEVsZW1lbnRSZWYsXG5cdFx0cHJpdmF0ZSBwcmVsb2FkZXI6IFByZWxvYWRlcixcblx0XHRwcml2YXRlIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlclxuXHQpIHtcblx0XHR0aGlzLmhvc3QgPSBlbC5uYXRpdmVFbGVtZW50O1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGlmICghdGhpcy5pbml0aWFuYWxpemVkKSB7XG5cdFx0XHR0aGlzLmluaXRpYW5hbGl6ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmVudHJpZXM7XG5cdFx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5pZCA9IGk7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5vd25lcklkID0gdGhpcy5pZDtcblx0XHRcdFx0dGhpcy5lbnRyaWVzW2ldLnJlcGVhdCA9IHRoaXMuZW50cmllc1tpXS5yZXBlYXQgPyB0aGlzLmVudHJpZXNbaV0ucmVwZWF0IDogZmFsc2U7XG5cdFx0XHRcdGlmICh0aGlzLmVudHJpZXNbaV0uc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLmVudHJpZXNbaV0uZmF2b3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmZhdm9yaXRlSXRlbXMucHVzaCh0aGlzLmVudHJpZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IE1hdGguY2VpbCh0aGlzLnNlbGVjdGVkSW5kZXggLyAodGhpcy5zaXplLTEpKTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggPiAwID9cblx0XHRcdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4IC0gKCh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5zaXplKSA6IDA7XG5cdFx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHRcdGdsb2JhbEFjdGl2ZURyb3Bkb3duLnB1c2godGhpcyk7XG5cdFx0XHRpZiAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSkge1xuXHRcdFx0XHR0aGlzLmNvbmZpZy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdFx0dGhpcy5wcmVsb2FkZXIuY29udGFpbnModGhpcy5pZCwgdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnZhbHVlKTtcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXJ0U2xpZGVTaG93KCkpIHtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub250b2dnbGUuZW1pdCh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdFx0XHRcdH0sIDY2KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0fVxuXHR9XG5cdHJlcGVhdChldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnJlcGVhdCA9ICF0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0ucmVwZWF0O1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIHN0b3BTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW50ZXJ2YWwpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zbGlkZVNob3dJbnRlcnZhbCk7XG5cdFx0XHR0aGlzLnNsaWRlU2hvd0ludGVydmFsID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbmRleCA9IDA7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgc3RhcnRTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93RW5hYmxlZCAmJiB0aGlzLmZhdm9yaXRlSXRlbXMubGVuZ3RoID4gMSAmJiAhdGhpcy5zbGlkZVNob3dJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5wcmVsb2FkZXIucHJlbG9hZCh0aGlzLmlkLCB0aGlzLmZhdm9yaXRlSXRlbXMpO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2xpZGVTaG93LmJpbmQodGhpcyksIDIwMDAwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0ZW5hYmxlU2hvdyhldmVudDogYW55KSB7XG5cdFx0dGhpcy5zbGlkZVNob3dFbmFibGVkID0gIXRoaXMuc2xpZGVTaG93RW5hYmxlZDtcblx0XHR0aGlzLmVuYWJsZWRTaG93LmVtaXQodGhpcy5zbGlkZVNob3dFbmFibGVkKTtcblx0XHRpZiAodGhpcy5zbGlkZVNob3dFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnN0YXJ0U2xpZGVTaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdH1cblx0fVxuXHRzbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW5kZXggPT09IHRoaXMuZmF2b3JpdGVJdGVtcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuc2xpZGVTaG93SW5kZXggPSAwO1xuXHRcdH1cblx0XHRjb25zdCBpdGVtID0gdGhpcy5mYXZvcml0ZUl0ZW1zW3RoaXMuc2xpZGVTaG93SW5kZXhdO1xuXHRcdHRoaXMuZW1pdFRvZ2dsZShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdHRoaXMuc2xpZGVTaG93SW5kZXgrKztcblx0fVxuXHRhZGRUb0Zhdm9yaXRlKGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uZmF2b3JpdGUgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmZhdm9yaXRlXG5cdFx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmZhdm9yaXRlKSB7XG5cdFx0XHRcdHRoaXMucHJlbG9hZGVyLmltYWdlKHRoaXMuaWQsIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS52YWx1ZSk7XG5cdFx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtcy5wdXNoKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5mYXZvcml0ZUl0ZW1zLmluZGV4T2YodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnN0YXJ0U2xpZGVTaG93KCk7XG5cdFx0fVxuXHR9XG5cdG1vbGQoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5tb2xkZWQgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLm1vbGRlZFxuXHRcdFx0dGhpcy5zdG9wU2xpZGVTaG93KCk7XG5cdFx0XHR0aGlzLmVtaXRDaGFuZ2UodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKT0+IHRoaXMuc3RhcnRTbGlkZVNob3coKSk7XG5cdFx0fVxuXHR9XG5cdGtleWJvYXJkVHJhY2tlcigkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcblx0XHQkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0JGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXG5cdFx0aWYgKGtleSA9PT0gMzkgfHwga2V5ID09PSA0MCkgey8vcmlnaHQgb3IgZG93biBhcnJvd1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRcdGlmIChpbmRleCA8IHRoaXMuZGlzcGxheUl0ZW1zLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXggKyAxKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0XHRcdHRoaXMubmV4dCgkZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LDY2KTtcblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMzcgfHwga2V5ID09PSAzOCkgey8vbGVmdCBvciB1cCBhcnJvd1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGxldCBpbmRleCA9IHRoaXMuaGlnaGxpZ2h0SW5kZXg7XG5cdFx0XHRcdGlmIChpbmRleCA+IDApIHtcblx0XHRcdFx0XHR0aGlzLmhpZ2hsaWdodEljb24oaW5kZXggLSAxKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA+IDEpIHtcblx0XHRcdFx0XHR0aGlzLnByZXYoJGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSw2Nik7XG5cdFx0fVxuXHRcdGlmIChrZXkgPT09IDQwKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5vcGVuID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSlcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCA2Nik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChrZXkgPT09IDM4ICYmIHRoaXMuaGlnaGxpZ2h0SW5kZXggPT09IDApIHtcblx0XHRcdHRoaXMuY29uZmlnLm9wZW4gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLnNlYXJjaEJ1dHRvbikge1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hCdXR0b24ubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0a2V5dXAoZXZlbnQ6IGFueSkge1xuXHRcdGxldCBrZXkgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0aWYgKGtleSA9PT0gMTMpIHtcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xuXHRcdH1cblx0fVxuXHRwZXJmb3JtU2VhcmNoKCRldmVudDpLZXlib2FyZEV2ZW50LCBzZWFyY2hTdHJpbmc6c3RyaW5nKSB7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXHRcdGlmIChrZXkgPiAzNiAmJiBrZXkgPCA0MSkge1xuXHRcdFx0cmV0dXJuIHRoaXMua2V5Ym9hcmRUcmFja2VyKCRldmVudCk7XG5cdFx0fVxuXHRcdGlmIChzZWFyY2hTdHJpbmcgPT09ICcnKSB7XG5cdFx0XHRpZiAoa2V5ID09PSAxMykge1xuXHRcdFx0XHR0aGlzLmtleWJvYXJkVHJhY2tlcigkZXZlbnQpO1xuXHRcdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0U2VhcmNoKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSB0cnVlO1xuXG5cdFx0dGhpcy5zZWFyY2hlZERhdGEgPSBbXTtcblx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgaW5mbyA9IHRoaXMuZW50cmllc1tpXTtcblx0XHRcdGlmIChpbmZvLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZy50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuc2VhcmNoZWREYXRhLnB1c2goaW5mbyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNlYXJjaGVkRGF0YS5sZW5ndGgpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWFyY2hlZERhdGFbMF07XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuc2VhcmNoZWREYXRhO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHR9XG5cdHJlc2V0U2VhcmNoKCkge1xuXHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCAnJyk7XG5cdFx0fVxuXG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IGZhbHNlO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5lbnRyaWVzO1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZW50cmllc1swXTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0fVxuXHRuZXh0KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSsrO1xuIFx0XHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwcmV2KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UtLTtcbiBcdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGFzdCgkZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSB0aGlzLmNvbmZpZy50b3RhbFBhZ2U7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zmlyc3QoJGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZW5kZXJJY29uQ29udGFpbmVyKCkge1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gKHRoaXMuY29uZmlnLmlzU2VhcmNoID8gdGhpcy5zZWFyY2hlZERhdGEgOiB0aGlzLmVudHJpZXMpO1xuXHRcdHRoaXMuY29uZmlnLnRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGggLyB0aGlzLnNpemUpO1xuXHRcdFxuXHRcdHRoaXMuY29uZmlnLnNob3dGb290ZXIgPSAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSk7XG5cblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5jb25maWcuY3VycmVudFBhZ2UgPyAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZSA6IDA7XG5cblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIDwgMSApIHtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gdHJ1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmRpc3BsYXlJdGVtcy5zbGljZShvZmZzZXQsIG9mZnNldCArIHRoaXMuc2l6ZSk7XG5cdFx0XHR0aGlzLnByZWxvYWRlci5wcmVsb2FkKHRoaXMuaWQsIHRoaXMuZGlzcGxheUl0ZW1zKTtcblx0XHR9XG5cdH1cblx0dG9nZ2xlSWNvblNlbGVjdG9yKCkge1xuXHRcdHRoaXMuY29uZmlnLm9wZW4gPSAhdGhpcy5jb25maWcub3BlbjtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5vcGVuICYmIHRoaXMuc2VhcmNoRW5hYmxlZCkge1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDY2KTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBlbWl0Q2hhbmdlKGl0ZW06IGFueSwgY2FsbGJhY2s6IGFueSkge1xuXHRcdGNvbnN0IGRlbGF5VGltZSA9IChpdGVtLm1vbGRlZCAmJiAhdGhpcy5wcmVsb2FkZXIuY29udGFpbnModGhpcy5pZCwgaXRlbS52YWx1ZSkpID8gNzc3IDogNjY7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQoaXRlbSk7XG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdH1cblx0XHR9LCBkZWxheVRpbWUpO1xuXHR9XG5cdHByaXZhdGUgZW1pdFRvZ2dsZShpdGVtOiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcblx0XHRjb25zdCBkZWxheVRpbWUgPSAoaXRlbS5tb2xkZWQgJiYgIXRoaXMucHJlbG9hZGVyLmNvbnRhaW5zKHRoaXMuaWQsIGl0ZW0udmFsdWUpKSA/IDc3NyA6IDY2O1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5vbnRvZ2dsZS5lbWl0KGl0ZW0pO1xuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHR9XG5cdFx0fSwgZGVsYXlUaW1lKTtcblx0fVxuXHRwcml2YXRlIGRlc2VsZWN0QWxsKCkge1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcykge1xuXHRcdFx0Zm9yKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNlbGVjdEljb24oaW5kZXg6IG51bWJlcikge1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcyAmJiAhdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdLmRpc2FibGVkKSB7XG5cdFx0XHR0aGlzLmRlc2VsZWN0QWxsKCk7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gaW5kZXg7XG5cdFx0XHRmb3IgKGxldCBpOm51bWJlcj0wO2k8dGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZiAoaW5kZXggPT09IGkpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zW2ldLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdO1xuXHRcdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdFx0XHR0aGlzLmVtaXRDaGFuZ2UodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKSA9PiB0aGlzLnN0YXJ0U2xpZGVTaG93KCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRoaWdobGlnaHRJY29uKGluZGV4OiBudW1iZXIpIHtcblx0XHR0aGlzLmRlc2VsZWN0QWxsKCk7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IGluZGV4O1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcyAmJiAhdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdLmRpc2FibGVkKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0XHR0aGlzLnN0b3BTbGlkZVNob3coKTtcblx0XHRcdFx0dGhpcy5lbWl0VG9nZ2xlKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSwgKCkgPT4gdGhpcy5zdGFydFNsaWRlU2hvdygpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0YW5pbWF0aW9uKCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuZGlzcGxheUl0ZW1zICYmIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmFuaW1hdGlvbiA9ICRldmVudC50YXJnZXQudmFsdWU7XG5cdFx0fVxuXHR9XG5cdHBvcEljb25zKCRldmVudDogYW55KSB7XG5cdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGdsb2JhbEFjdGl2ZURyb3Bkb3duLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0hPXRoaXMgJiYgZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0uY29uZmlnLm9wZW4pIHtcblx0XHRcdFx0Z2xvYmFsQWN0aXZlRHJvcGRvd25baV0udG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHNlbGVjdGVkU291cmNlVXJsKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gP1xuXHRcdFx0XHRcdCgoIXRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS50eXBlIHx8IHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS50eXBlID09ICdpbWFnZScpID9cblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS52YWx1ZSA6XG5cdFx0XHRcdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0ucG9zdGVyKSA6XG5cdFx0XHRcdFx0Jyc7XG5cdH1cbn1cbiJdfQ==