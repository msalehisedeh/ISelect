/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, Output, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { ISelect } from '../components/iselect.component';
export class ISelectDirective {
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
if (false) {
    /** @type {?} */
    ISelectDirective.prototype.data;
    /** @type {?} */
    ISelectDirective.prototype.searchEnabled;
    /** @type {?} */
    ISelectDirective.prototype.change;
    /** @type {?} */
    ISelectDirective.prototype.viewRef;
    /** @type {?} */
    ISelectDirective.prototype.el;
    /** @type {?} */
    ISelectDirective.prototype.componentFactoryResolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pY29uLXNlbGVjdC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvaXNlbGVjdC9kaXJlY3RpdmVzL2lzZWxlY3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFVCx3QkFBd0IsRUFFckIsWUFBWSxFQUVmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUsxRCxNQUFNOzs7Ozs7SUFTRixZQUNZLFNBQ0QsSUFDTDtRQUZNLFlBQU8sR0FBUCxPQUFPO1FBQ1IsT0FBRSxHQUFGLEVBQUU7UUFDUCw2QkFBd0IsR0FBeEIsd0JBQXdCO29CQVhmLEVBQUU7NkJBR1MsS0FBSztzQkFHdEIsSUFBSSxZQUFZLEVBQUU7S0FPMUI7Ozs7SUFFSixRQUFRO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBQTtRQUMxRCxVQUFVLENBQUMsR0FBRSxFQUFFOztZQUNYLE1BQU0sSUFBSSxHQUFtQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDNUQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7O2dCQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ1gsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO3dCQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7d0JBQ3pDLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzt3QkFDekMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3FCQUN6QixDQUFDLENBQUE7aUJBQ0w7YUFDSjs7WUFDRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFDdEYsSUFBSSxZQUFZLEdBQXNCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O1lBQ3JGLE1BQU0sT0FBTyxxQkFBRyxtQkFBQyxZQUFZLENBQUMsUUFBbUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWdCLEVBQUM7WUFDaEcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFDdEQsTUFBTSxRQUFRLEdBQVcsbUJBQVUsWUFBWSxDQUFDLFFBQVEsRUFBQyxDQUFDO1lBQzFELFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM1QyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUM7WUFDeEQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDM0MsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0tBQ1o7OztZQWhERCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7YUFDekI7Ozs7WUFmRyxnQkFBZ0I7WUFDaEIsVUFBVTtZQUliLHdCQUF3Qjs7OzRCQWN2QixLQUFLLFNBQUMsZUFBZTtxQkFHbEIsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIE9uSW5pdCxcclxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QgfSBmcm9tICcuLi9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaS1zZWxlY3RdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGRhdGEgPSBbXTtcclxuXHJcblx0QElucHV0KFwic2VhcmNoRW5hYmxlZFwiKVxyXG5cdHB1YmxpYyBzZWFyY2hFbmFibGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgQE91dHB1dChcImNoYW5nZVwiKVxyXG4gICAgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5Om5vbmVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3Q6IEhUTUxDb2xsZWN0aW9uID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gbGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ubm9kZVR5cGUgPT09IDEpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogb3B0aW9uLmdldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogb3B0aW9uLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvcHRpb24uaW5uZXJIVE1MXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShJU2VsZWN0KTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLnZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWYgPCBhbnkgPiApLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlOklTZWxlY3QgPSAoPElTZWxlY3Q+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2VhcmNoRW5hYmxlZCA9IHRoaXMuc2VhcmNoRW5hYmxlZDtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnSUQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQrXCItaXNlbGVjdFwiO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zaXplID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNpemU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbmZpZ05hbWUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQubmFtZTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub25jaGFuZ2Uuc3Vic2NyaWJlKHRoaXMuY2hhbmdlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnRGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgaW5zdGFuY2UubmdPbkluaXQoKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UubmdPbkNoYW5nZXModW5kZWZpbmVkKTtcclxuICAgICAgICB9LCA2NilcclxuXHR9XHJcbn1cclxuIl19