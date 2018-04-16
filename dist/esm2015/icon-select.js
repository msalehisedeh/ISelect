import { Pipe, Component, ViewContainerRef, Input, Output, Renderer, HostListener, EventEmitter, ViewChild, ElementRef, Directive, ComponentFactoryResolver, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

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
    { type: Pipe, args: [{ name: 'CSSImage' },] },
];
/** @nocollapse */
CSSImagePipe.ctorParameters = () => [
    { type: DomSanitizer, },
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
        // @Input("showIconName")
        // private showIconName = false;
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
        let /** @type {?} */ key = $event.charCode || $event.keyCode || 0;
        console.log(key);
        if (key === 39 || key === 40) {
            //right or down arrow
            setTimeout(() => {
                let /** @type {?} */ index = this.highlightIndex;
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
                let /** @type {?} */ index = this.highlightIndex;
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
        let /** @type {?} */ key = $event.charCode || $event.keyCode || 0;
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
        for (let /** @type {?} */ i = 0; i < this.configData.length; i++) {
            let /** @type {?} */ info = this.configData[i];
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
        let /** @type {?} */ offset = (this.config.currentPage - 1) * this.size;
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
            for (let /** @type {?} */ i = 0; i < this.configData.length; i++) {
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
        for (let /** @type {?} */ i = 0; i < globalActiveDropdown.length; i++) {
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
            for (let /** @type {?} */ i = 0; i < this.configData.length; i++) {
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
                template: `<div class="i-select" [id]="configID">
    <div class="selected-icon">
        <div class="select-icon-block"
            [style.background]="config.selectedItem ? (config.selectedItem.value | CSSImage:true)  : ''"></div>
        <div class="fa-li fa fa-spinner fa-spin select-icon-spin3" *ngIf="config.loading"></div>
    </div>
    <a href="#" class="i-select-button"
        (click)="popIcons($event)"
        (keyup)="keyboardTracker($event)" >
    <span class="off-screen" id="{{configID}}name" [textContent]="name"></span>
    <span class="select-icon-down-dir"></span>
    </a>
</div>
<div class="i-select-popup" [style.display]="config.open ? 'block':'none'" >
    <div class="i-select-search" (click)="searchInput.focus()" *ngIf="searchEnabled">
        <input type="text" placeholder="placeholder" #searchInput
            class="icons-search-input"
            [class.focused]="config.isFocused"
            (focus)="config.isFocused=true"
            (blur)="config.isFocused=false"
            (keyup)="performSearch($event, searchInput.value)" />
        <div class="select-icon-search" #searchIcon [class]="config.isSearch ? 'select-icon-cancel' : 'select-icon-search'"></div>
    </div>
    <div class="clear-fix"></div>
    <div role="list" attr.aria-nameledby="{{configID}}name" class="select-icons-container" #iconContainer>
    <div
        role="listitem"
        class="select-box"
        *ngFor="let item of displayItems; let i = index">
        <div  [class.highlight-icon]="highlightIndex==i"
            [class.cover]="!true" [title]="showIconName ? '':'item.name'"
            [style.background]="item.value | CSSImage:true"
            (click)="selectIcon(i)"><span class="off-screen" [textContent]="item.name"></span></div>
    </div>
    </div>
    <div class="icons-select-error" *ngIf="config.hasError"><div class="select-icon-block" data-select-value="select-icon-block"></div></div>
    <div class="i-select-footer" *ngIf="config.showFooter">
    <div class="i-select-arrows">
        <div class="fa fa-angle-left"
            (click)="prev($event)"
            [class.disabled]="config.currentPage==1">
            <span class="prev" [textContent]="'previous'"></span>
        </div>
        <div class="fa fa-angle-double-left"
                (click)="first($event)"
                [class.disabled]="config.currentPage==1">
            <span class="first" [textContent]="'first'"></span>
        </div>
        <div class="i-select-pages"><span [textContent]="config.currentPage + ' / ' + config.totalPage"></span></div>
        <div class="fa fa-angle-double-right"
                (click)="last($event)"
                [class.disabled]="config.currentPage==config.totalPage">
            <span class="last" [textContent]="'last'"></span>
        </div>
        <div class="fa fa-angle-right"
                (click)="next($event)"
                [class.disabled]="config.currentPage==config.totalPage">
            <span class="next" [textContent]="'nextPage'"></span>
        </div>
    </div>
    </div>
    <div class="name" *ngIf="showIconName" [textContent]="config.selectedItem ? config.selectedItem.name : ''"></div>
</div>
`,
                styles: [`:host *{
  margin:0;
  padding:0;
  border:0;
  vertical-align:baseline; }
:host{
  display:block;
  text-align:left;
  vertical-align:middle;
  margin:2px 0; }
  :host .off-screen{
    display:block;
    text-indent:-9999px;
    width:0;
    height:0; }
  :host .select-box{
    background-color:#ccc;
    background-size:contain;
    display:inline-block;
    margin:2px;
    width:60px;
    line-height:42px;
    text-align:center;
    cursor:pointer;
    vertical-align:top;
    height:40px;
    border:1px solid #EFEFEF; }
    :host .select-box:hover, :host .select-box:focus{
      border:1px solid #888; }
    :host .select-box div{
      background-repeat:repeat;
      background-color:transparent;
      background-position:0 0;
      border:1px solid transparent;
      height:40px;
      width:60px; }
    :host .select-box .highlight-icon{
      background-repeat:repeat;
      background-color:transparent;
      background-position:0 0;
      border:2px solid red;
      height:40px;
      width:60px; }
  :host .name{
    color:#444;
    font-size:0.8em;
    text-align:center;
    text-shadow:0 1px 0 #eee; }
  :host .i-select-footer{
    line-height:12px;
    text-align:center; }
    :host .i-select-footer .i-select-arrows{
      float:right; }
      :host .i-select-footer .i-select-arrows div{
        color:#444;
        cursor:pointer;
        display:inline-block;
        height:16px; }
        :host .i-select-footer .i-select-arrows div.disabled{
          color:#ddd;
          cursor:default;
          font-weight:bold; }
        :host .i-select-footer .i-select-arrows div .next,
        :host .i-select-footer .i-select-arrows div .prev,
        :host .i-select-footer .i-select-arrows div .last,
        :host .i-select-footer .i-select-arrows div .first{
          cursor:pointer;
          width:auto;
          display:inline-block;
          height:39px;
          text-indent:-99999px;
          -webkit-box-sizing:border-box;
                  box-sizing:border-box; }
        :host .i-select-footer .i-select-arrows div .i-select-pages{
          font-size:11px; }
        :host .i-select-footer .i-select-arrows div:hover, :host .i-select-footer .i-select-arrows div:focus{
          color:#777777; }
  :host .selected-icon{
    background-color:#ccc;
    background-size:contain;
    display:block;
    width:60px;
    height:100%;
    float:left;
    position:relative;
    text-align:center; }
    :host .selected-icon div{
      cursor:default;
      color:#404040;
      height:100%;
      width:60px; }
  :host .i-select{
    height:22px;
    background-color:#fff;
    border:1px solid #ededed;
    border-radius:0 4px 4px 0; }
    :host .i-select.focused{
      border:1px dotted #444; }
  :host .i-select-category select{
    border:0;
    line-height:20px;
    padding:3px;
    width:100%;
    height:40px;
    -ms-box-sizing:border-box;
    -o-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    margin-bottom:5px;
    font-size:12px;
    display:block;
    border:1px solid #EDEDED;
    color:#404040;
    -ms-box-shadow:none;
    -o-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    outline:none; }
    :host .i-select-category select option{
      padding:10px; }
  :host .i-select-button{
    cursor:pointer;
    display:block;
    float:left;
    height:100%;
    text-align:center;
    width:20px;
    background-color:#f4f4f4;
    border-left:1px solid #e1e1e1;
    border-radius:0 4px 4px 0; }
    :host .i-select-button:focus .select-icon-up-dir{
      border-top:5px solid grey; }
    :host .i-select-button:focus .select-icon-down-dir{
      border-top:5px solid grey; }
    :host .i-select-button:hover, :host .i-select-button:focus{
      background-color:#f1f1f1 div;
        background-color-color:#999999; }
    :host .i-select-button div{
      color:#aaaaaa;
      text-shadow:0px 1px 0px #FFF; }
    :host .i-select-button .select-icon-down-dir{
      border-left:5px solid transparent;
      border-right:5px solid transparent;
      border-top:5px solid black;
      float:left;
      height:0;
      margin:10px 5px;
      width:0; }
    :host .i-select-button .select-icon-up-dir{
      border-left:5px solid transparent;
      border-right:5px solid transparent;
      border-top:5px solid black;
      float:left;
      height:0;
      margin:15px 10px;
      width:0; }
  :host .select-icons-container{
    width:100%;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    padding:5px;
    background-color:#fff;
    border:1px solid #d3d3d3; }
    :host .select-icons-container .loading{
      color:#eee;
      font-size:24px;
      margin:0 auto;
      padding:20px 0;
      text-align:center;
      width:100%; }
  :host .i-select-popup{
    position:absolute;
    z-index:10000;
    background-color:#fefefe;
    padding:5px;
    height:auto;
    width:210px;
    margin-top:-1px;
    -ms-box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);
    -o-box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);
    -webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);
    box-shadow:0 1px 1px rgba(0, 0, 0, 0.04);
    border:1px solid #E5E5E5; }
  :host .i-select-search{
    position:relative; }
    :host .i-select-search input[type="text"]{
      text-transform:uppercase;
      border:1px solid #EDEDED;
      color:#404040;
      -ms-box-shadow:none;
      -o-box-shadow:none;
      -webkit-box-shadow:none;
      box-shadow:none;
      outline:none;
      width:100%;
      margin:3px 0;
      padding:3px;
      -webkit-box-sizing:border-box;
              box-sizing:border-box; }
    :host .i-select-search div{
      color:#ddd;
      position:absolute;
      right:10px;
      top:7px; }
  :host input::-webkit-input-placeholder{
    text-transform:uppercase;
    color:#ddd; }
  :host input:-moz-placeholder{
    text-transform:uppercase;
    color:#ddd; }
  :host input::-moz-placeholder{
    text-transform:uppercase;
    color:#ddd; }
  :host input:-ms-input-placeholder{
    text-transform:uppercase;
    color:#ddd !important; }
  :host .select-icon-spin3{
    position:absolute;
    top:0;
    left:0;
    width:16px !important;
    height:16px !important;
    display:inline-block;
    margin:0 !important;
    padding:3px !important; }
  :host .icons-select-error div:before{
    color:#444; }
  :host .select-icon-search{
    cursor:default; }
  :host .select-icon-cancel{
    cursor:pointer; }
  :host .select-icon-block{
    background-color:#fed0d0;
    background-size:contain; }
  :host .current-icon,
  :host .current-icon:hover,
  :host .current-icon:focus{
    border:1px solid #444; }
  :host .fa{
    padding:3px 6px;
    margin-top:5px; }
`],
                providers: [CSSImagePipe]
            },] },
];
/** @nocollapse */
ISelect.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
];
ISelect.propDecorators = {
    "searchIcon": [{ type: ViewChild, args: ['searchIcon', { read: ViewContainerRef },] },],
    "searchInput": [{ type: ViewChild, args: ['searchInput', { read: ViewContainerRef },] },],
    "iconContainer": [{ type: ViewChild, args: ['iconContainer', { read: ViewContainerRef },] },],
    "configID": [{ type: Input, args: ["id",] },],
    "configName": [{ type: Input, args: ["name",] },],
    "searchEnabled": [{ type: Input, args: ["searchEnabled",] },],
    "size": [{ type: Input, args: ["size",] },],
    "multiselect": [{ type: Input, args: ["multiselect",] },],
    "configData": [{ type: Input, args: ["entries",] },],
    "onchange": [{ type: Output, args: ["onchange",] },],
    "onClick": [{ type: HostListener, args: ['window:click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            const /** @type {?} */ list = this.el.nativeElement.children;
            for (let /** @type {?} */ i = 0; i < list.length; i++) {
                const /** @type {?} */ option = list[i];
                if (option.nodeType === 1) {
                    this.data.push({
                        value: option.getAttribute("value"),
                        selected: option.getAttribute("selected"),
                        disabled: option.getAttribute("disabled"),
                        name: option.innerHTML
                    });
                }
            }
            let /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(ISelect);
            let /** @type {?} */ componentRef = this.viewRef.createComponent(componentFactory);
            const /** @type {?} */ domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
            this.el.nativeElement.parentNode.appendChild(domElem);
            const /** @type {?} */ instance = (/** @type {?} */ (componentRef.instance));
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
            },] },
];
/** @nocollapse */
ISelectDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
];
ISelectDirective.propDecorators = {
    "searchEnabled": [{ type: Input, args: ["searchEnabled",] },],
    "change": [{ type: Output, args: ["change",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
ISelectModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { ISelect, CSSImagePipe, ISelectDirective, ISelectModule };
//# sourceMappingURL=icon-select.js.map
