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
        if (!inside && $event.target !== this.iconBox.element.nativeElement && this.config.open) {
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
            this.detector.detectChanges();
            this.preloader.contains(this.id, this.config.selectedItem.value);
            if (!this.startSlideShow()) {
                setTimeout(function () {
                    _this.ontoggle.emit(_this.config.selectedItem);
                }, 66);
            }
        }
    };
    ISelect.prototype.repeat = function (event) {
        this.config.selectedItem.repeat = !this.config.selectedItem.repeat;
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
    };
    ISelect.prototype.mold = function (event) {
        var _this = this;
        this.config.selectedItem.molded = !this.config.selectedItem.molded;
        this.stopSlideShow();
        this.emitChange(this.config.selectedItem, function () { return _this.startSlideShow(); });
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
        this.renderer.setElementAttribute(this.searchInput.element.nativeElement, 'value', '');
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
                _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'focus', []);
                _this.renderer.invokeElementMethod(_this.searchInput.element.nativeElement, 'select', []);
            }, 20);
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
        this.deselectAll();
        this.highlightIndex = index;
        if (this.displayItems && !this.displayItems[index].disabled) {
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
        return (!this.config.selectedItem.type || this.config.selectedItem.type == 'image') ?
            this.config.selectedItem.value : this.config.selectedItem.poster;
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
        ViewChild('iconContainer', { static: false })
    ], ISelect.prototype, "iconContainer", void 0);
    tslib_1.__decorate([
        ViewChild('searchIcon', { static: false })
    ], ISelect.prototype, "searchIcon", void 0);
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
            styles: ["@charset \"UTF-8\";:host *{margin:0;padding:0;border:0;vertical-align:baseline}:host{display:table;text-align:left;vertical-align:middle;margin:2px 0;width:150px;position:relative}:host .off-screen{display:block;text-indent:-9999px;width:0;height:0}:host .select-box{background-color:#ccc;background-size:contain;display:inline-block;margin:2px;width:60px;line-height:42px;text-align:center;cursor:pointer;vertical-align:top;height:40px;border:1px solid #efefef}:host .select-box:focus,:host .select-box:hover{border:1px solid #888}:host .select-box .disabled{opacity:.7}:host .select-box div{background-repeat:repeat;background-color:transparent;background-position:0 0;border:1px solid transparent;height:40px;width:60px}:host .select-box div.streaming{background-size:contain!important}:host .select-box div iframe{border:0;width:100%}:host .select-box div video{border:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host .select-box .highlight-icon{background-repeat:repeat;background-color:transparent;background-position:0 0;border:2px solid red;height:40px;width:60px}:host .name{color:#444;font-size:.8em;text-align:center;text-shadow:0 1px 0 #eee}:host .i-select-footer{line-height:12px;text-align:center;margin-top:5px}:host .i-select-footer .i-select-arrows{float:right}:host .i-select-footer .i-select-arrows div{color:#444;cursor:pointer;display:inline-block;height:16px}:host .i-select-footer .i-select-arrows div.disabled{color:#ddd;cursor:default;font-weight:700}:host .i-select-footer .i-select-arrows div.angle-left:before{content:\"\u2039\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-left:before{content:\"\u00AB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-double-right:before{content:\"\u00BB\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div.angle-right:before{content:\"\u203A\";width:12px;height:12px;font-weight:700;font-size:1.2rem;display:inline-block}:host .i-select-footer .i-select-arrows div .first,:host .i-select-footer .i-select-arrows div .last,:host .i-select-footer .i-select-arrows div .next,:host .i-select-footer .i-select-arrows div .prev{cursor:pointer;width:auto;display:inline-block;height:39px;text-indent:-99999px;box-sizing:border-box}:host .i-select-footer .i-select-arrows div .i-select-pages{font-size:11px}:host .i-select-footer .i-select-arrows div:focus,:host .i-select-footer .i-select-arrows div:hover{color:#777}:host .selected-icon{background-color:#ccc;background-size:contain;display:block;width:calc(100% - 20px);height:100%;float:left;position:relative;text-align:center}:host .selected-icon div{cursor:default;color:#404040;height:100%;width:100%}:host .i-select{height:22px;background-color:#fff;border:1px solid #ededed;border-radius:0 4px 4px 0;position:relative}:host .i-select.focused{border:1px dotted #444}:host .i-select-category select{border:1px solid #ededed;line-height:20px;padding:3px;width:100%;height:40px;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;margin-bottom:5px;font-size:12px;display:block;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0}:host .i-select-category select option{padding:10px}:host .i-select-button{cursor:pointer;display:block;height:100%;text-align:center;width:20px;background-color:#f4f4f4;border-left:1px solid #e1e1e1;border-radius:0 2px 2px 0;position:absolute;right:-1px}:host .i-select-button.focus .select-icon-up-dir,:host .i-select-button:focus .select-icon-up-dir{border-top:5px solid grey}:host .i-select-button.focus .select-icon-down-dir,:host .i-select-button:focus .select-icon-down-dir{border-top:5px solid grey}:host .i-select-button:focus,:host .i-select-button:hover{background-color:#f1f1f1 div;background-color-color:#999}:host .i-select-button div{color:#aaa;text-shadow:0 1px 0 #fff}:host .i-select-button .select-icon-down-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:10px 5px;width:0}:host .i-select-button .select-icon-up-dir{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;float:left;height:0;margin:15px 10px;width:0}:host .select-icons-container{width:100%;box-sizing:border-box;padding:5px;background-color:#fff;border:1px solid #d3d3d3}:host .select-icons-container .loading{color:#eee;font-size:24px;margin:0 auto;padding:20px 0;text-align:center;width:100%}:host .i-select-popup{position:absolute;z-index:10000;background-color:#fefefe;padding:5px;height:auto;width:210px;margin-top:-1px;-ms-box-shadow:0 1px 1px rgba(0,0,0,.04);-o-box-shadow:0 1px 1px rgba(0,0,0,.04);box-shadow:0 1px 1px rgba(0,0,0,.04);border:1px solid #e5e5e5}:host .i-select-search{position:relative}:host .i-select-search.layout{border:1px solid #ddd;padding:2px;margin:2px 0}:host .i-select-search.layout label{color:#000;font-size:.8rem}:host .i-select-search.opacity{border:1px solid #ddd;padding:2px;margin:2px 0}:host .i-select-search input[type=text]{text-transform:uppercase;border:1px solid #ededed;color:#404040;-ms-box-shadow:none;-o-box-shadow:none;box-shadow:none;outline:0;width:100%;margin:3px 0;padding:3px;box-sizing:border-box}:host .i-select-search div{color:#ddd;position:absolute;right:10px;top:7px}:host input::-webkit-input-placeholder{text-transform:uppercase;color:#ddd}:host input:-moz-placeholder{text-transform:uppercase;color:#ddd}:host input::-moz-placeholder{text-transform:uppercase;color:#ddd}:host input:-ms-input-placeholder{text-transform:uppercase;color:#ddd!important}:host .select-icon-spin3{border-radius:50%;width:.8em!important;height:.8em!important;-webkit-animation:1.8s ease-in-out -.16s infinite load7;animation:1.8s ease-in-out -.16s infinite load7;color:#fff!important;position:absolute;top:-35px;left:.2rem;transform:translateZ(0)}:host .select-icon-spin3:after,:host .select-icon-spin3:before{color:#fff;border-radius:50%;width:.8em;height:.8em;-webkit-animation:1.8s ease-in-out infinite load7;animation:1.8s ease-in-out infinite load7;content:\"\";position:absolute;top:0}:host .select-icon-spin3:before{left:1.2rem;-webkit-animation-delay:-.32s;animation-delay:-.32s}:host .select-icon-spin3:after{left:2.4em}@-webkit-keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}@keyframes load7{0%,100%,80%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}:host .icons-select-error div:before{color:#444}:host .select-icon-search{cursor:default}:host .select-icon-cancel{cursor:pointer}:host .select-icon-block{background-color:#fed0d0;background-size:contain;background-position:center center!important}:host .current-icon,:host .current-icon:focus,:host .current-icon:hover{border:1px solid #444}:host .fa{padding:3px 6px;margin-top:5px}:host .slide-counter{color:#000;font-size:.8rem}:host .range{width:80%}:host .range:hover{opacity:1}:host .range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:#444;background-image:linear-gradient(#444,#ddd,#444);cursor:pointer;border-radius:5px;border:2px solid #000;width:22px;height:12px}:host .range::-moz-range-thumb{background:#444;background-image:linear-gradient(#444,#ddd,#444);border-radius:5px;border:2px solid #000;cursor:pointer;width:22px;height:10px}"]
        })
    ], ISelect);
    return ISelect;
}());
export { ISelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2hELElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDO0FBRXhDOztFQUVFO0FBTUY7SUErRUMsaUJBQ0MsRUFBYyxFQUNOLFNBQW9CLEVBQ3BCLFFBQTJCLEVBQzNCLFFBQWtCO1FBRmxCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFDM0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWpGcEIsa0JBQWEsR0FBVSxDQUFDLENBQUM7UUFDaEMsaUJBQVksR0FBYyxFQUFFLENBQUM7UUFDN0Isa0JBQWEsR0FBYyxFQUFFLENBQUM7UUFDOUIsbUJBQWMsR0FBQyxDQUFDLENBQUM7UUFFakIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsaUJBQVksR0FBYyxFQUFFLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsV0FBTSxHQUFFO1lBQ1AsU0FBUyxFQUFDLENBQUM7WUFDWCxXQUFXLEVBQUMsQ0FBQztZQUNiLElBQUksRUFBQyxLQUFLO1lBQ1YsVUFBVSxFQUFDLEtBQUs7WUFDaEIsUUFBUSxFQUFDLEtBQUs7WUFDZCxTQUFTLEVBQUMsS0FBSztZQUNmLFFBQVEsRUFBQyxLQUFLO1lBQ2QsT0FBTyxFQUFDLElBQUk7WUFDWixZQUFZLEVBQVcsSUFBSTtTQUMzQixDQUFBO1FBUVEsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGNBQVMsR0FBUTtZQUN6QixTQUFTLEVBQUUsRUFBRTtZQUNiLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsa0RBQWtEO1FBQ2xELGlCQUFpQjtRQUNqQixtQ0FBbUM7UUFFMUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUUxQixrREFBa0Q7UUFDekMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFFeEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBMkIxQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQXpCRCx5QkFBTyxHQUFQLFVBQVEsTUFBVztRQUNsQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxNQUFNO2FBQ047WUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDekYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDMUI7SUFDRixDQUFDO0lBYUQsaUNBQWUsR0FBZjtRQUFBLGlCQWdDQztRQS9CQSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNqRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6QzthQUNEO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0Isb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDM0IsVUFBVSxDQUFDO29CQUNWLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzlDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNQO1NBQ0Q7SUFDRixDQUFDO0lBQ0Qsd0JBQU0sR0FBTixVQUFPLEtBQVU7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3BFLENBQUM7SUFDTywrQkFBYSxHQUFyQjtRQUNDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0YsQ0FBQztJQUNPLGdDQUFjLEdBQXRCO1FBQ0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkUsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNELDRCQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNyQjtJQUNGLENBQUM7SUFDRCwyQkFBUyxHQUFUO1FBQ0MsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCwrQkFBYSxHQUFiLFVBQWMsS0FBVTtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUE7UUFDdEUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO1NBQ2pEO2FBQU07WUFDTixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0Qsc0JBQUksR0FBSixVQUFLLEtBQVU7UUFBZixpQkFJQztRQUhBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQTtRQUNsRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxjQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELGlDQUFlLEdBQWYsVUFBZ0IsTUFBcUI7UUFBckMsaUJBcUNDO1FBcENBLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUVqRCxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFDLHFCQUFxQjtZQUNuRCxVQUFVLENBQUM7Z0JBQ1YsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQztnQkFDaEMsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN6QyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7cUJBQU0sSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtvQkFDM0QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbEI7WUFDRixDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFLEVBQUMsa0JBQWtCO1lBQ3ZELFVBQVUsQ0FBQztnQkFDVixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNoQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO3FCQUFNLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO29CQUN2QyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNsQjtZQUNGLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsVUFBVSxDQUFDO29CQUNWLEtBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDUDtTQUNEO2FBQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssQ0FBQyxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEY7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRCx1QkFBSyxHQUFMLFVBQU0sS0FBVTtRQUNmLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtJQUNGLENBQUM7SUFDRCwrQkFBYSxHQUFiLFVBQWMsTUFBb0IsRUFBRSxZQUFtQjtRQUN0RCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksWUFBWSxLQUFLLEVBQUUsRUFBRTtZQUN4QixJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFCLE9BQU87YUFDUDtZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixPQUFPO1NBQ1A7UUFDRCxvREFBb0Q7UUFDcEQsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7U0FDRDtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3hDO2FBQUs7WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCw2QkFBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZGLG9EQUFvRDtRQUNwRCxpREFBaUQ7UUFFakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCxzQkFBSSxHQUFKLFVBQUssTUFBVztRQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNELHNCQUFJLEdBQUosVUFBSyxNQUFXO1FBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEMsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0Qsc0JBQUksR0FBSixVQUFLLE1BQVc7UUFDZixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEMsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsdUJBQUssR0FBTCxVQUFNLE1BQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV4QyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRCxxQ0FBbUIsR0FBbkI7UUFDQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXJELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDNUI7YUFBSztZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25EO0lBQ0YsQ0FBQztJQUNELG9DQUFrQixHQUFsQjtRQUFBLGlCQVNDO1FBUkEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0MsVUFBVSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pGLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNQO0lBQ0YsQ0FBQztJQUNPLDRCQUFVLEdBQWxCLFVBQW1CLElBQVMsRUFBRSxRQUFhO1FBQTNDLGlCQVFDO1FBUEEsSUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUYsVUFBVSxDQUFDO1lBQ1YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxRQUFRLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLENBQUM7YUFDWDtRQUNGLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDTyw0QkFBVSxHQUFsQixVQUFtQixJQUFTLEVBQUUsUUFBYTtRQUEzQyxpQkFRQztRQVBBLElBQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVGLFVBQVUsQ0FBQztZQUNWLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUksUUFBUSxFQUFFO2dCQUNiLFFBQVEsRUFBRSxDQUFDO2FBQ1g7UUFDRixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDZixDQUFDO0lBQ08sNkJBQVcsR0FBbkI7UUFDQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsS0FBSSxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQzthQUN2QjtTQUNEO0lBQ0YsQ0FBQztJQUNELDRCQUFVLEdBQVYsVUFBVyxLQUFhO1FBQXhCLGlCQWtCQztRQWpCQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUQsS0FBSyxJQUFJLENBQUMsR0FBUSxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDckM7YUFDRDtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO2dCQUM3QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO2FBQ3ZFO1NBQ0Q7SUFDRixDQUFDO0lBQ0QsK0JBQWEsR0FBYixVQUFjLEtBQWE7UUFBM0IsaUJBV0M7UUFWQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO2dCQUM3QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO2FBQ3ZFO1NBQ0Q7SUFDRixDQUFDO0lBQ0QsMkJBQVMsR0FBVCxVQUFVLE1BQVc7UUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCwwQkFBUSxHQUFSLFVBQVMsTUFBVztRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdELElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0M7U0FDRDtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNELG1DQUFpQixHQUFqQjtRQUNDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUNwRSxDQUFDOztnQkF6VUksVUFBVTtnQkFDSyxTQUFTO2dCQUNWLGlCQUFpQjtnQkFDakIsUUFBUTs7SUE1RFk7UUFBdEMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzs0Q0FBbUM7SUFDNUI7UUFBNUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztrREFBeUM7SUFDM0M7UUFBekMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzsrQ0FBc0M7SUFDcEM7UUFBMUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztnREFBdUM7SUFDckM7UUFBM0MsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztpREFBd0M7SUFFMUU7UUFBUixLQUFLLEVBQUU7dUNBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO3lDQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs4Q0FLTjtJQU1PO1FBQVIsS0FBSyxFQUFFO2tEQUFnQztJQUMvQjtRQUFSLEtBQUssRUFBRTt5Q0FBa0I7SUFHakI7UUFBUixLQUFLLEVBQUU7aURBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzZDQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7cURBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO29EQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTtpREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7aURBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO21EQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTttREFBd0I7SUFDdkI7UUFBUixLQUFLLEVBQUU7NENBQTBCO0lBRXhCO1FBQVQsTUFBTSxFQUFFOzZDQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs2Q0FBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7Z0RBQWtDO0lBRzNDO1FBREMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzBDQWV4QztJQTNFVyxPQUFPO1FBTG5CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBQyxVQUFVO1lBQ3RCLG1zUkFBcUM7O1NBRXJDLENBQUM7T0FDVyxPQUFPLENBMFpuQjtJQUFELGNBQUM7Q0FBQSxBQTFaRCxJQTBaQztTQTFaWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyLFxuXHRIb3N0TGlzdGVuZXIsXG5cdEV2ZW50RW1pdHRlcixcblx0Vmlld0NoaWxkLFxuXHRFbGVtZW50UmVmLFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0QWZ0ZXJWaWV3SW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgUHJlbG9hZGVyIH0gZnJvbSBcIi4vcHJlbG9hZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEljb25JbmZvfSBmcm9tIFwiLi9pc2VsZWN0LmludGVyZmFjZVwiO1xuXG52YXIgZ2xvYmFsQWN0aXZlRHJvcGRvd246SVNlbGVjdFtdID0gW107XG5cbi8qXG4qIExpa2UgYSByZWd1bGFyIGRyb3Bkb3duLCB3ZSB3YW50IHRvIHNldC9nZXQgc2VsZWN0ZWRJbmRleCwgc2VsZWN0IGl0ZW1zIG9uIGFycm93IHVwL2Rvd24sIGFuZCBzZWxlY3QgaXRlbSBvbiBjbGljay5cbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjonaS1zZWxlY3QnLFxuXHR0ZW1wbGF0ZVVybDogJ2lzZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnaXNlbGVjdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIElTZWxlY3QgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHRwdWJsaWMgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSAxO1xuXHRkaXNwbGF5SXRlbXM6SWNvbkluZm9bXSA9IFtdO1xuXHRmYXZvcml0ZUl0ZW1zOkljb25JbmZvW10gPSBbXTtcblx0aGlnaGxpZ2h0SW5kZXg9MDtcblx0c2xpZGVTaG93SW50ZXJ2YWw6IGFueTtcblx0c2xpZGVTaG93SW5kZXggPSAwO1xuXHRzZWFyY2hlZERhdGE6SWNvbkluZm9bXSA9IFtdO1xuXHRpbml0aWFuYWxpemVkID0gZmFsc2U7XG5cblx0Y29uZmlnID17XG5cdFx0dG90YWxQYWdlOjEsXG5cdFx0Y3VycmVudFBhZ2U6MCxcblx0XHRvcGVuOmZhbHNlLFxuXHRcdHNob3dGb290ZXI6ZmFsc2UsXG5cdFx0aGFzRXJyb3I6ZmFsc2UsXG5cdFx0aXNGb2N1c2VkOmZhbHNlLFxuXHRcdGlzU2VhcmNoOmZhbHNlLFxuXHRcdGxvYWRpbmc6dHJ1ZSxcblx0XHRzZWxlY3RlZEl0ZW06PEljb25JbmZvPm51bGxcblx0fVxuXG5cdEBWaWV3Q2hpbGQoJ2ljb25Cb3gnLCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgaWNvbkJveDogVmlld0NvbnRhaW5lclJlZjtcblx0QFZpZXdDaGlsZCgnaWNvbkNvbnRhaW5lcicsIHtzdGF0aWM6IGZhbHNlfSkgcHJpdmF0ZSBpY29uQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hJY29uJywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaEljb246IFZpZXdDb250YWluZXJSZWY7XG5cdEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jywge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIHNlYXJjaElucHV0OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRAVmlld0NoaWxkKCdzZWFyY2hCdXR0b24nLCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgc2VhcmNoQnV0dG9uOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QElucHV0KCkgaWQ6IHN0cmluZyA9IFwiXCI7XG5cdEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IFwiXCI7XG5cdEBJbnB1dCgpIGNvbnRyb2xsczogYW55ID0ge1xuXHRcdGZpcnN0UGFnZTogJycsXG5cdFx0cHJldmlvdXNQYWdlOiAnJyxcblx0XHRuZXh0UGFnZTogJycsXG5cdFx0bGFzdFBhZ2U6ICcnXG5cdH07XG5cblx0Ly8gc2hvd0ljb25OYW1lIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGNzcyBmcm9tIHVzZXJcblx0Ly8gQElucHV0KFwidGlsZVwiKVxuXHQvLyBwcml2YXRlIGNvbmZpZ1RpbGU6Ym9vbGVhbj10cnVlO1xuXG5cdEBJbnB1dCgpIHNlYXJjaEVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0QElucHV0KCkgc2l6ZTogbnVtYmVyID0gMztcblxuXHQvLyBzaG93SWNvbk5hbWUgc2hvdWxkIGJlIGhhbmRsZWQgYnkgY3NzIGZyb20gdXNlclxuXHRASW5wdXQoKSBzaG93SWNvbk5hbWUgPSBmYWxzZTtcblx0QElucHV0KCkgdGVtcGxhdGU6IGFueTtcblx0QElucHV0KCkgc2xpZGVTaG93RW5hYmxlZCA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseUxheW91dFR5cGUgPSBmYWxzZTtcblx0QElucHV0KCkgYXBwbHlPcGFjaXR5ID0gZmFsc2U7XG5cdEBJbnB1dCgpIGFwcGx5UGF0dGVybiA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseUFuaW1hdGlvbiA9IGZhbHNlO1xuXHRASW5wdXQoKSBhcHBseVNsaWRlU2hvdyA9IGZhbHNlO1xuXHRASW5wdXQoKSBlbnRyaWVzOiBJY29uSW5mb1tdID0gW107XG5cblx0QE91dHB1dCgpIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRAT3V0cHV0KCkgb250b2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBlbmFibGVkU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6Y2xpY2snLCBbJyRldmVudCddKVxuXHRvbkNsaWNrKCRldmVudDogYW55KSB7XG5cdFx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXHRcdGxldCBub2RlID0gJGV2ZW50LnRhcmdldDtcblx0XHR3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0XHRpZiAobm9kZSA9PT0gdGhpcy5ob3N0KSB7XG5cdFx0XHRcdGluc2lkZSA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKCFpbnNpZGUgJiYgJGV2ZW50LnRhcmdldCAhPT0gdGhpcy5pY29uQm94LmVsZW1lbnQubmF0aXZlRWxlbWVudCAgJiYgdGhpcy5jb25maWcub3Blbikge1xuXHRcdFx0dGhpcy50b2dnbGVJY29uU2VsZWN0b3IoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhvc3Q6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGVsOiBFbGVtZW50UmVmLFxuXHRcdHByaXZhdGUgcHJlbG9hZGVyOiBQcmVsb2FkZXIsXG5cdFx0cHJpdmF0ZSBkZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXJcblx0KSB7XG5cdFx0dGhpcy5ob3N0ID0gZWwubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRpZiAoIXRoaXMuaW5pdGlhbmFsaXplZCkge1xuXHRcdFx0dGhpcy5pbml0aWFuYWxpemVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5lbnRyaWVzO1xuXHRcdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLmVudHJpZXNbaV0uaWQgPSBpO1xuXHRcdFx0XHR0aGlzLmVudHJpZXNbaV0ub3duZXJJZCA9IHRoaXMuaWQ7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5yZXBlYXQgPSB0aGlzLmVudHJpZXNbaV0ucmVwZWF0ID8gdGhpcy5lbnRyaWVzW2ldLnJlcGVhdCA6IGZhbHNlO1xuXHRcdFx0XHRpZiAodGhpcy5lbnRyaWVzW2ldLnNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5lbnRyaWVzW2ldLmZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW1zLnB1c2godGhpcy5lbnRyaWVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zZWxlY3RlZEluZGV4IC8gKHRoaXMuc2l6ZS0xKSk7XG5cdFx0XHR0aGlzLmhpZ2hsaWdodEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ID4gMCA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCAtICgodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZSkgOiAwO1xuXHRcdFx0dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCk7XG5cdFx0XHRnbG9iYWxBY3RpdmVEcm9wZG93bi5wdXNoKHRoaXMpO1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnRvdGFsUGFnZSA+IDEpIHtcblx0XHRcdFx0dGhpcy5jb25maWcubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbdGhpcy5oaWdobGlnaHRJbmRleF07XG5cdFx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0XHRcdHRoaXMucHJlbG9hZGVyLmNvbnRhaW5zKHRoaXMuaWQsIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS52YWx1ZSk7XG5cdFx0XHRpZiAoIXRoaXMuc3RhcnRTbGlkZVNob3coKSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLm9udG9nZ2xlLmVtaXQodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKTtcblx0XHRcdFx0fSwgNjYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXBlYXQoZXZlbnQ6IGFueSkge1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5yZXBlYXQgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnJlcGVhdDtcblx0fVxuXHRwcml2YXRlIHN0b3BTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW50ZXJ2YWwpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zbGlkZVNob3dJbnRlcnZhbCk7XG5cdFx0XHR0aGlzLnNsaWRlU2hvd0ludGVydmFsID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbmRleCA9IDA7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgc3RhcnRTbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93RW5hYmxlZCAmJiB0aGlzLmZhdm9yaXRlSXRlbXMubGVuZ3RoID4gMSAmJiAhdGhpcy5zbGlkZVNob3dJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5wcmVsb2FkZXIucHJlbG9hZCh0aGlzLmlkLCB0aGlzLmZhdm9yaXRlSXRlbXMpO1xuXHRcdFx0dGhpcy5zbGlkZVNob3dJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2xpZGVTaG93LmJpbmQodGhpcyksIDIwMDAwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0ZW5hYmxlU2hvdyhldmVudDogYW55KSB7XG5cdFx0dGhpcy5zbGlkZVNob3dFbmFibGVkID0gIXRoaXMuc2xpZGVTaG93RW5hYmxlZDtcblx0XHR0aGlzLmVuYWJsZWRTaG93LmVtaXQodGhpcy5zbGlkZVNob3dFbmFibGVkKTtcblx0XHRpZiAodGhpcy5zbGlkZVNob3dFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnN0YXJ0U2xpZGVTaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdH1cblx0fVxuXHRzbGlkZVNob3coKSB7XG5cdFx0aWYgKHRoaXMuc2xpZGVTaG93SW5kZXggPT09IHRoaXMuZmF2b3JpdGVJdGVtcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuc2xpZGVTaG93SW5kZXggPSAwO1xuXHRcdH1cblx0XHRjb25zdCBpdGVtID0gdGhpcy5mYXZvcml0ZUl0ZW1zW3RoaXMuc2xpZGVTaG93SW5kZXhdO1xuXHRcdHRoaXMuZW1pdFRvZ2dsZShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdHRoaXMuc2xpZGVTaG93SW5kZXgrKztcblx0fVxuXHRhZGRUb0Zhdm9yaXRlKGV2ZW50OiBhbnkpIHtcblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0uZmF2b3JpdGUgPSAhdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmZhdm9yaXRlXG5cdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5mYXZvcml0ZSkge1xuXHRcdFx0dGhpcy5wcmVsb2FkZXIuaW1hZ2UodGhpcy5pZCwgdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnZhbHVlKTtcblx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtcy5wdXNoKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLmZhdm9yaXRlSXRlbXMuaW5kZXhPZih0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0pO1xuXHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuc3RhcnRTbGlkZVNob3coKTtcblx0fVxuXHRtb2xkKGV2ZW50OiBhbnkpIHtcblx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0ubW9sZGVkID0gIXRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS5tb2xkZWRcblx0XHR0aGlzLnN0b3BTbGlkZVNob3coKTtcblx0XHR0aGlzLmVtaXRDaGFuZ2UodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKT0+IHRoaXMuc3RhcnRTbGlkZVNob3coKSk7XG5cdH1cblx0a2V5Ym9hcmRUcmFja2VyKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXHRcdCRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHQkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQga2V5ID0gJGV2ZW50LmNoYXJDb2RlIHx8ICRldmVudC5rZXlDb2RlIHx8IDA7XG5cblx0XHRpZiAoa2V5ID09PSAzOSB8fCBrZXkgPT09IDQwKSB7Ly9yaWdodCBvciBkb3duIGFycm93XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdFx0aWYgKGluZGV4IDwgdGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCArIDEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHRcdFx0dGhpcy5uZXh0KCRldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sNjYpO1xuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAzNyB8fCBrZXkgPT09IDM4KSB7Ly9sZWZ0IG9yIHVwIGFycm93XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0bGV0IGluZGV4ID0gdGhpcy5oaWdobGlnaHRJbmRleDtcblx0XHRcdFx0aWYgKGluZGV4ID4gMCkge1xuXHRcdFx0XHRcdHRoaXMuaGlnaGxpZ2h0SWNvbihpbmRleCAtIDEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0XHRcdHRoaXMucHJldigkZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LDY2KTtcblx0XHR9XG5cdFx0aWYgKGtleSA9PT0gNDApIHtcblx0XHRcdHRoaXMuY29uZmlnLm9wZW4gPSB0cnVlO1xuXHRcdFx0aWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoSW5wdXQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZm9jdXMnLCBbXSlcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHRcdH0sIDIyKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMzggJiYgdGhpcy5oaWdobGlnaHRJbmRleCA9PT0gMCkge1xuXHRcdFx0dGhpcy5jb25maWcub3BlbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuc2VhcmNoQnV0dG9uLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0a2V5dXAoZXZlbnQ6IGFueSkge1xuXHRcdGxldCBrZXkgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlIHx8IDA7XG5cdFx0aWYgKGtleSA9PT0gMTMpIHtcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xuXHRcdH1cblx0fVxuXHRwZXJmb3JtU2VhcmNoKCRldmVudDpLZXlib2FyZEV2ZW50LCBzZWFyY2hTdHJpbmc6c3RyaW5nKSB7XG5cdFx0bGV0IGtleSA9ICRldmVudC5jaGFyQ29kZSB8fCAkZXZlbnQua2V5Q29kZSB8fCAwO1xuXHRcdGlmIChrZXkgPiAzNiAmJiBrZXkgPCA0MSkge1xuXHRcdFx0cmV0dXJuIHRoaXMua2V5Ym9hcmRUcmFja2VyKCRldmVudCk7XG5cdFx0fVxuXHRcdGlmIChzZWFyY2hTdHJpbmcgPT09ICcnKSB7XG5cdFx0XHRpZiAoa2V5ID09PSAxMykge1xuXHRcdFx0XHR0aGlzLmtleWJvYXJkVHJhY2tlcigkZXZlbnQpO1xuXHRcdFx0XHR0aGlzLnRvZ2dsZUljb25TZWxlY3RvcigpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0U2VhcmNoKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vdGhpcy5zZWFyY2hJY29uLnJlbW92ZUNsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblx0XHQvL3RoaXMuc2VhcmNoSWNvbi5hZGRDbGFzcygncGlja2VyLWljb24tY2FuY2VsJyk7XG5cdFx0dGhpcy5jb25maWcuaXNTZWFyY2ggPSB0cnVlO1xuXG5cdFx0dGhpcy5zZWFyY2hlZERhdGEgPSBbXTtcblx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgaW5mbyA9IHRoaXMuZW50cmllc1tpXTtcblx0XHRcdGlmIChpbmZvLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZy50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuc2VhcmNoZWREYXRhLnB1c2goaW5mbyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNlYXJjaGVkRGF0YS5sZW5ndGgpIHtcblx0XHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWFyY2hlZERhdGFbMF07XG5cdFx0XHR0aGlzLmRpc3BsYXlJdGVtcyA9IHRoaXMuc2VhcmNoZWREYXRhO1xuXHRcdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHR9XG5cdHJlc2V0U2VhcmNoKCkge1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgJycpO1xuXG5cdFx0Ly90aGlzLnNlYXJjaEljb24ucmVtb3ZlQ2xhc3MoJ3BpY2tlci1pY29uLWNhbmNlbCcpO1xuXHRcdC8vdGhpcy5zZWFyY2hJY29uLmFkZENsYXNzKCdwaWNrZXItaWNvbi1zZWFyY2gnKTtcblxuXHRcdHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID0gMTtcblx0XHR0aGlzLmNvbmZpZy5pc1NlYXJjaCA9IGZhbHNlO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SW5kZXggPSAwO1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gdGhpcy5lbnRyaWVzO1xuXHRcdHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSA9IHRoaXMuZW50cmllc1swXTtcblx0XHR0aGlzLmhpZ2hsaWdodEljb24odGhpcy5oaWdobGlnaHRJbmRleCk7XG5cblx0XHR0aGlzLnJlbmRlckljb25Db250YWluZXIoKTtcblx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblx0fVxuXHRuZXh0KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlIDwgdGhpcy5jb25maWcudG90YWxQYWdlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSsrO1xuIFx0XHRcdHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwcmV2KCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmN1cnJlbnRQYWdlID4gMSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UtLTtcbiBcdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGFzdCgkZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA8IHRoaXMuY29uZmlnLnRvdGFsUGFnZSkge1xuXHRcdFx0dGhpcy5jb25maWcuY3VycmVudFBhZ2UgPSB0aGlzLmNvbmZpZy50b3RhbFBhZ2U7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PTA7XG5cdFx0dGhpcy5oaWdobGlnaHRJY29uKHRoaXMuaGlnaGxpZ2h0SW5kZXgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zmlyc3QoJGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgPiAxKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5jdXJyZW50UGFnZSA9IDE7XG5cdFx0ICAgIHRoaXMucmVuZGVySWNvbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodEluZGV4PXRoaXMuc2l6ZS0xO1xuXHRcdHRoaXMuaGlnaGxpZ2h0SWNvbih0aGlzLmhpZ2hsaWdodEluZGV4KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZW5kZXJJY29uQ29udGFpbmVyKCkge1xuXHRcdHRoaXMuZGlzcGxheUl0ZW1zID0gKHRoaXMuY29uZmlnLmlzU2VhcmNoID8gdGhpcy5zZWFyY2hlZERhdGEgOiB0aGlzLmVudHJpZXMpO1xuXHRcdHRoaXMuY29uZmlnLnRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLmRpc3BsYXlJdGVtcy5sZW5ndGggLyB0aGlzLnNpemUpO1xuXHRcdFxuXHRcdHRoaXMuY29uZmlnLnNob3dGb290ZXIgPSAodGhpcy5jb25maWcudG90YWxQYWdlID4gMSk7XG5cblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5jb25maWcuY3VycmVudFBhZ2UgPyAodGhpcy5jb25maWcuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc2l6ZSA6IDA7XG5cblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoIDwgMSApIHtcblx0XHRcdHRoaXMuY29uZmlnLmhhc0Vycm9yID0gdHJ1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5oYXNFcnJvciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kaXNwbGF5SXRlbXMgPSB0aGlzLmRpc3BsYXlJdGVtcy5zbGljZShvZmZzZXQsIG9mZnNldCArIHRoaXMuc2l6ZSk7XG5cdFx0XHR0aGlzLnByZWxvYWRlci5wcmVsb2FkKHRoaXMuaWQsIHRoaXMuZGlzcGxheUl0ZW1zKTtcblx0XHR9XG5cdH1cblx0dG9nZ2xlSWNvblNlbGVjdG9yKCkge1xuXHRcdHRoaXMuY29uZmlnLm9wZW4gPSAhdGhpcy5jb25maWcub3BlbjtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5vcGVuICYmIHRoaXMuc2VhcmNoRW5hYmxlZCkge1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnNlYXJjaElucHV0LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgW10pO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5zZWFyY2hJbnB1dC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3QnLCBbXSk7XG5cdFx0XHR9LCAyMCk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgZW1pdENoYW5nZShpdGVtOiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcblx0XHRjb25zdCBkZWxheVRpbWUgPSAoaXRlbS5tb2xkZWQgJiYgIXRoaXMucHJlbG9hZGVyLmNvbnRhaW5zKHRoaXMuaWQsIGl0ZW0udmFsdWUpKSA/IDc3NyA6IDY2O1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KGl0ZW0pO1xuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHR9XG5cdFx0fSwgZGVsYXlUaW1lKTtcblx0fVxuXHRwcml2YXRlIGVtaXRUb2dnbGUoaXRlbTogYW55LCBjYWxsYmFjazogYW55KSB7XG5cdFx0Y29uc3QgZGVsYXlUaW1lID0gKGl0ZW0ubW9sZGVkICYmICF0aGlzLnByZWxvYWRlci5jb250YWlucyh0aGlzLmlkLCBpdGVtLnZhbHVlKSkgPyA3NzcgOiA2Njtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMub250b2dnbGUuZW1pdChpdGVtKTtcblx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0fVxuXHRcdH0sIGRlbGF5VGltZSk7XG5cdH1cblx0cHJpdmF0ZSBkZXNlbGVjdEFsbCgpIHtcblx0XHRpZiAodGhpcy5kaXNwbGF5SXRlbXMpIHtcblx0XHRcdGZvcihsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRzZWxlY3RJY29uKGluZGV4OiBudW1iZXIpIHtcblx0XHR0aGlzLmRlc2VsZWN0QWxsKCk7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IGluZGV4O1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcyAmJiAhdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdLmRpc2FibGVkKSB7XG5cdFx0XHRmb3IgKGxldCBpOm51bWJlcj0wO2k8dGhpcy5kaXNwbGF5SXRlbXMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdHRoaXMuZW50cmllc1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZiAoaW5kZXggPT09IGkpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheUl0ZW1zW2ldLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdO1xuXHRcdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0XHRpZiAodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHRcdHRoaXMuc3RvcFNsaWRlU2hvdygpO1xuXHRcdFx0XHR0aGlzLmVtaXRDaGFuZ2UodGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLCAoKSA9PiB0aGlzLnN0YXJ0U2xpZGVTaG93KCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRoaWdobGlnaHRJY29uKGluZGV4OiBudW1iZXIpIHtcblx0XHR0aGlzLmRlc2VsZWN0QWxsKCk7XG5cdFx0dGhpcy5oaWdobGlnaHRJbmRleCA9IGluZGV4O1xuXHRcdGlmICh0aGlzLmRpc3BsYXlJdGVtcyAmJiAhdGhpcy5kaXNwbGF5SXRlbXNbaW5kZXhdLmRpc2FibGVkKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmRpc3BsYXlJdGVtc1t0aGlzLmhpZ2hsaWdodEluZGV4XTtcblx0XHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0XHR0aGlzLnN0b3BTbGlkZVNob3coKTtcblx0XHRcdFx0dGhpcy5lbWl0VG9nZ2xlKHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSwgKCkgPT4gdGhpcy5zdGFydFNsaWRlU2hvdygpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0YW5pbWF0aW9uKCRldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuZGlzcGxheUl0ZW1zICYmIHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbSkge1xuXHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLmFuaW1hdGlvbiA9ICRldmVudC50YXJnZXQudmFsdWU7XG5cdFx0fVxuXHR9XG5cdHBvcEljb25zKCRldmVudDogYW55KSB7XG5cdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGdsb2JhbEFjdGl2ZURyb3Bkb3duLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0hPXRoaXMgJiYgZ2xvYmFsQWN0aXZlRHJvcGRvd25baV0uY29uZmlnLm9wZW4pIHtcblx0XHRcdFx0Z2xvYmFsQWN0aXZlRHJvcGRvd25baV0udG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlSWNvblNlbGVjdG9yKCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHNlbGVjdGVkU291cmNlVXJsKCkge1xuXHRcdHJldHVybiAoIXRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS50eXBlIHx8IHRoaXMuY29uZmlnLnNlbGVjdGVkSXRlbS50eXBlID09ICdpbWFnZScpID9cblx0XHRcdFx0dGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnZhbHVlIDogdGhpcy5jb25maWcuc2VsZWN0ZWRJdGVtLnBvc3Rlcjtcblx0fVxufVxuIl19