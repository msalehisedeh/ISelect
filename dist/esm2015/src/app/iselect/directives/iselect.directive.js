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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBRVQsd0JBQXdCLEVBRXJCLFlBQVksRUFFZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFLMUQsTUFBTTs7Ozs7O0lBU0YsWUFDWSxTQUNELElBQ0w7UUFGTSxZQUFPLEdBQVAsT0FBTztRQUNSLE9BQUUsR0FBRixFQUFFO1FBQ1AsNkJBQXdCLEdBQXhCLHdCQUF3QjtvQkFYZixFQUFFOzZCQUdTLEtBQUs7c0JBR3RCLElBQUksWUFBWSxFQUFFO0tBTzFCOzs7O0lBRUosUUFBUTtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsY0FBYyxDQUFDLENBQUE7UUFDMUQsVUFBVSxDQUFDLEdBQUUsRUFBRTs7WUFDWCxNQUFNLElBQUksR0FBbUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQzVELEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztnQkFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzt3QkFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN6QyxRQUFRLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7d0JBQ3pDLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztxQkFDekIsQ0FBQyxDQUFBO2lCQUNMO2FBQ0o7O1lBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7O1lBQ3RGLElBQUksWUFBWSxHQUFzQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztZQUNyRixNQUFNLE9BQU8scUJBQUcsbUJBQUMsWUFBWSxDQUFDLFFBQW1DLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixFQUFDO1lBQ2hHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O1lBQ3RELE1BQU0sUUFBUSxHQUFXLG1CQUFVLFlBQVksQ0FBQyxRQUFRLEVBQUMsQ0FBQztZQUMxRCxRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDNUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUMsVUFBVSxDQUFDO1lBQ3hELFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzNDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkMsRUFBRSxFQUFFLENBQUMsQ0FBQTtLQUNaOzs7WUFoREQsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2FBQ3pCOzs7O1lBZkcsZ0JBQWdCO1lBQ2hCLFVBQVU7WUFJYix3QkFBd0I7Ozs0QkFjdkIsS0FBSyxTQUFDLGVBQWU7cUJBR2xCLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBPbkluaXQsXHJcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJU2VsZWN0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9pc2VsZWN0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2ktc2VsZWN0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIElTZWxlY3REaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBkYXRhID0gW107XHJcblxyXG5cdEBJbnB1dChcInNlYXJjaEVuYWJsZWRcIilcclxuXHRwdWJsaWMgc2VhcmNoRW5hYmxlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIEBPdXRwdXQoXCJjaGFuZ2VcIilcclxuICAgIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHVibGljIGVsOkVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbiAgICApIHtcclxuICAgIH1cclxuICAgIFxyXG5cdG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwiZGlzcGxheTpub25lXCIpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0OiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLm5vZGVUeXBlID09PSAxKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0aW9uLmlubmVySFRNTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoSVNlbGVjdCk7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZTpJU2VsZWN0ID0gKDxJU2VsZWN0PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNlYXJjaEVuYWJsZWQgPSB0aGlzLnNlYXJjaEVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbmZpZ0lEID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkK1wiLWlzZWxlY3RcIjtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2l6ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zaXplO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdOYW1lID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uY2hhbmdlLnN1YnNjcmliZSh0aGlzLmNoYW5nZSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbmZpZ0RhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm5nT25Jbml0KCk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm5nT25DaGFuZ2VzKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSwgNjYpXHJcblx0fVxyXG59XHJcbiJdfQ==