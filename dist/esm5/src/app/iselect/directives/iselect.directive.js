import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef, ElementRef, Input, Output, OnInit, ComponentFactoryResolver, ComponentRef, EventEmitter, EmbeddedViewRef } from '@angular/core';
import { ISelect } from '../components/iselect.component';
var ISelectDirective = /** @class */ (function () {
    function ISelectDirective(viewRef, el, componentFactoryResolver) {
        this.viewRef = viewRef;
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.data = [];
        this.searchEnabled = false;
        this.applyLayoutType = false;
        this.applyOpacity = false;
        this.applyPattern = false;
        this.applyAnimation = false;
        this.slideShowEnabled = false;
        this.applySlideShow = false;
        this.controlls = {
            firstPage: '',
            previousPage: '',
            nextPage: '',
            lastPage: ''
        };
        this.change = new EventEmitter();
        this.ontoggle = new EventEmitter();
    }
    ISelectDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.el.nativeElement.setAttribute("style", "display:none");
        setTimeout(function () {
            var list = _this.el.nativeElement.children;
            for (var i = 0; i < list.length; i++) {
                var option = list[i];
                if (option.nodeType === 1) {
                    var opacity = option.getAttribute("opacity");
                    var repeatLayout = option.getAttribute("repeat");
                    var patternLayout = option.getAttribute("pattern");
                    var animationType = option.getAttribute("animation");
                    var inFavoriteList = option.getAttribute("favorite");
                    _this.data.push({
                        value: option.getAttribute("value"),
                        selected: option.selected,
                        repeat: repeatLayout,
                        molded: patternLayout,
                        animation: animationType,
                        favorite: inFavoriteList,
                        disabled: option.getAttribute("disabled"),
                        opacity: opacity ? parseFloat(opacity) : 0,
                        name: option.innerHTML
                    });
                }
            }
            var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(ISelect);
            var componentRef = _this.viewRef.createComponent(componentFactory);
            var domElem = componentRef.hostView.rootNodes[0];
            _this.el.nativeElement.parentNode.appendChild(domElem);
            var instance = componentRef.instance;
            instance.searchEnabled = _this.searchEnabled;
            instance.id = _this.el.nativeElement.id + "-iselect";
            instance.size = _this.el.nativeElement.size;
            instance.name = _this.el.nativeElement.name;
            instance.onchange = _this.change;
            instance.ontoggle = _this.ontoggle;
            instance.template = _this.template;
            instance.applyOpacity = _this.applyOpacity;
            instance.applyLayoutType = _this.applyLayoutType;
            instance.slideShowEnabled = _this.slideShowEnabled;
            instance.applyPattern = _this.applyPattern;
            instance.controlls = _this.controlls;
            instance.applySlideShow = _this.applySlideShow;
            instance.applyAnimation = _this.applyAnimation;
            instance.entries = _this.data;
            instance.ngAfterViewInit();
        }, 66);
    };
    ISelectDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "searchEnabled", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "template", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "applyLayoutType", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "applyOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "applyPattern", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "applyAnimation", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "slideShowEnabled", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "applySlideShow", void 0);
    tslib_1.__decorate([
        Input()
    ], ISelectDirective.prototype, "controlls", void 0);
    tslib_1.__decorate([
        Output()
    ], ISelectDirective.prototype, "change", void 0);
    tslib_1.__decorate([
        Output()
    ], ISelectDirective.prototype, "ontoggle", void 0);
    ISelectDirective = tslib_1.__decorate([
        Directive({
            selector: '[i-select]'
        })
    ], ISelectDirective);
    return ISelectDirective;
}());
export { ISelectDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNULHdCQUF3QixFQUNyQixZQUFZLEVBQ1osWUFBWSxFQUNaLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSzFEO0lBdUJJLDBCQUNZLE9BQXlCLEVBQzFCLEVBQWEsRUFDbEIsd0JBQWtEO1FBRjVDLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQVc7UUFDbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQXpCaEQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVaLGtCQUFhLEdBQVMsS0FBSyxDQUFDO1FBSTVCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixjQUFTLEdBQVE7WUFDekIsU0FBUyxFQUFFLEVBQUU7WUFDYixZQUFZLEVBQUUsRUFBRTtZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVXLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBT3hDLENBQUM7SUFFSixtQ0FBUSxH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ZixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIE9uSW5pdCxcclxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QgfSBmcm9tICcuLi9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaS1zZWxlY3RdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGRhdGEgPSBbXTtcclxuXHJcblx0QElucHV0KCkgc2VhcmNoRW5hYmxlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuXHRASW5wdXQoKSB0ZW1wbGF0ZTogYW55O1xyXG5cclxuXHRASW5wdXQoKSBhcHBseUxheW91dFR5cGUgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBhcHBseU9wYWNpdHkgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBhcHBseVBhdHRlcm4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGFwcGx5QW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBzbGlkZVNob3dFbmFibGVkID0gZmFsc2U7XHJcblx0QElucHV0KCkgYXBwbHlTbGlkZVNob3cgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBjb250cm9sbHM6IGFueSA9IHtcclxuXHRcdGZpcnN0UGFnZTogJycsXHJcblx0XHRwcmV2aW91c1BhZ2U6ICcnLFxyXG5cdFx0bmV4dFBhZ2U6ICcnLFxyXG5cdFx0bGFzdFBhZ2U6ICcnXHJcblx0fTtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIG9udG9nZ2xlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5Om5vbmVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3Q6IEhUTUxDb2xsZWN0aW9uID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ub2RlVHlwZSA9PT0gMSkgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAgb3B0aW9uLmdldEF0dHJpYnV0ZShcIm9wYWNpdHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVwZWF0TGF5b3V0ID0gb3B0aW9uLmdldEF0dHJpYnV0ZShcInJlcGVhdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXR0ZXJuTGF5b3V0ID0gb3B0aW9uLmdldEF0dHJpYnV0ZShcInBhdHRlcm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uVHlwZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJhbmltYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5GYXZvcml0ZUxpc3QgPSBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZmF2b3JpdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogIG9wdGlvbi5zZWxlY3RlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiByZXBlYXRMYXlvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbGRlZDogcGF0dGVybkxheW91dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb25UeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogaW5GYXZvcml0ZUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHkgPyBwYXJzZUZsb2F0KG9wYWNpdHkpIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0aW9uLmlubmVySFRNTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoSVNlbGVjdCk7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZTpJU2VsZWN0ID0gKDxJU2VsZWN0PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNlYXJjaEVuYWJsZWQgPSB0aGlzLnNlYXJjaEVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmlkID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkK1wiLWlzZWxlY3RcIjtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2l6ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zaXplO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uYW1lID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uY2hhbmdlID0gdGhpcy5jaGFuZ2U7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9udG9nZ2xlID0gdGhpcy5vbnRvZ2dsZTtcclxuICAgICAgICAgICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5hcHBseU9wYWNpdHkgPSB0aGlzLmFwcGx5T3BhY2l0eTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuYXBwbHlMYXlvdXRUeXBlID0gdGhpcy5hcHBseUxheW91dFR5cGU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNsaWRlU2hvd0VuYWJsZWQgPSB0aGlzLnNsaWRlU2hvd0VuYWJsZWQ7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmFwcGx5UGF0dGVybiA9IHRoaXMuYXBwbHlQYXR0ZXJuO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb250cm9sbHMgPSB0aGlzLmNvbnRyb2xscztcclxuICAgICAgICAgICAgaW5zdGFuY2UuYXBwbHlTbGlkZVNob3cgPSB0aGlzLmFwcGx5U2xpZGVTaG93O1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5hcHBseUFuaW1hdGlvbiA9IHRoaXMuYXBwbHlBbmltYXRpb247XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVudHJpZXMgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm5nQWZ0ZXJWaWV3SW5pdCgpO1xyXG4gICAgICAgIH0sIDY2KVxyXG5cdH1cclxufVxyXG4iXX0=