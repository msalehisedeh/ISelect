/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, Output, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { ISelect } from '../components/iselect.component';
var ISelectDirective = /** @class */ (function () {
    function ISelectDirective(viewRef, el, componentFactoryResolver) {
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
    ISelectDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.el.nativeElement.setAttribute("style", "display:none");
        setTimeout(function () {
            /** @type {?} */
            var list = _this.el.nativeElement.children;
            for (var i = 0; i < list.length; i++) {
                /** @type {?} */
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
            /** @type {?} */
            var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(ISelect);
            /** @type {?} */
            var componentRef = _this.viewRef.createComponent(componentFactory);
            /** @type {?} */
            var domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
            _this.el.nativeElement.parentNode.appendChild(domElem);
            /** @type {?} */
            var instance = (/** @type {?} */ (componentRef.instance));
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
    ISelectDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[i-select]'
                },] }
    ];
    /** @nocollapse */
    ISelectDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
    ISelectDirective.propDecorators = {
        searchEnabled: [{ type: Input, args: ["searchEnabled",] }],
        change: [{ type: Output, args: ["change",] }]
    };
    return ISelectDirective;
}());
export { ISelectDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBRVQsd0JBQXdCLEVBRXJCLFlBQVksRUFFZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBY3RELDBCQUNZLFNBQ0QsSUFDTDtRQUZNLFlBQU8sR0FBUCxPQUFPO1FBQ1IsT0FBRSxHQUFGLEVBQUU7UUFDUCw2QkFBd0IsR0FBeEIsd0JBQXdCO29CQVhmLEVBQUU7NkJBR1MsS0FBSztzQkFHdEIsSUFBSSxZQUFZLEVBQUU7S0FPMUI7Ozs7SUFFSixtQ0FBUTs7O0lBQVI7UUFBQSxpQkE2QkM7UUE1Qk0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBQTtRQUMxRCxVQUFVLENBQUM7O1lBQ1AsSUFBTSxJQUFJLEdBQW1CLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUM1RCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Z0JBQ2xDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7d0JBQ25DLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzt3QkFDekMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN6QyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7cUJBQ3pCLENBQUMsQ0FBQTtpQkFDTDthQUNKOztZQUNELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUN0RixJQUFJLFlBQVksR0FBc0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7WUFDckYsSUFBTSxPQUFPLHFCQUFHLG1CQUFDLFlBQVksQ0FBQyxRQUFtQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsRUFBQztZQUNoRyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUN0RCxJQUFNLFFBQVEsR0FBVyxtQkFBVSxZQUFZLENBQUMsUUFBUSxFQUFDLENBQUM7WUFDMUQsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQztZQUN4RCxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMzQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25DLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDWjs7Z0JBaERELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtpQkFDekI7Ozs7Z0JBZkcsZ0JBQWdCO2dCQUNoQixVQUFVO2dCQUliLHdCQUF3Qjs7O2dDQWN2QixLQUFLLFNBQUMsZUFBZTt5QkFHbEIsTUFBTSxTQUFDLFFBQVE7OzJCQXhCcEI7O1NBa0JhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEVtYmVkZGVkVmlld1JlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSVNlbGVjdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tpLXNlbGVjdF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJU2VsZWN0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgZGF0YSA9IFtdO1xyXG5cclxuXHRASW5wdXQoXCJzZWFyY2hFbmFibGVkXCIpXHJcblx0cHVibGljIHNlYXJjaEVuYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBAT3V0cHV0KFwiY2hhbmdlXCIpXHJcbiAgICBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHB1YmxpYyBlbDpFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICBcclxuXHRuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImRpc3BsYXk6bm9uZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgY29uc3QgbGlzdDogSFRNTENvbGxlY3Rpb24gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ub2RlVHlwZSA9PT0gMSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwidmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbi5pbm5lckhUTUxcclxuICAgICAgICAgICAgICAgICAgICB9KSAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KElTZWxlY3QpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZiA8IGFueSA+ICkucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2U6SVNlbGVjdCA9ICg8SVNlbGVjdD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zZWFyY2hFbmFibGVkID0gdGhpcy5zZWFyY2hFbmFibGVkO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdJRCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCtcIi1pc2VsZWN0XCI7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNpemUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2l6ZTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uZmlnTmFtZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5vbmNoYW5nZS5zdWJzY3JpYmUodGhpcy5jaGFuZ2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25maWdEYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZ09uQ2hhbmdlcyh1bmRlZmluZWQpO1xyXG4gICAgICAgIH0sIDY2KVxyXG5cdH1cclxufVxyXG4iXX0=