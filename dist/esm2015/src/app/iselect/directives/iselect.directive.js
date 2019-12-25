import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef, ElementRef, Input, Output, OnInit, ComponentFactoryResolver, ComponentRef, EventEmitter, EmbeddedViewRef } from '@angular/core';
import { ISelect } from '../components/iselect.component';
let ISelectDirective = class ISelectDirective {
    constructor(viewRef, el, componentFactoryResolver) {
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
    ngOnInit() {
        this.el.nativeElement.setAttribute("style", "display:none");
        setTimeout(() => {
            const list = this.el.nativeElement.children;
            for (let i = 0; i < list.length; i++) {
                const option = list[i];
                if (option.nodeType === 1) {
                    const opacity = option.getAttribute("opacity");
                    const repeatLayout = option.getAttribute("repeat");
                    const patternLayout = option.getAttribute("pattern");
                    const animationType = option.getAttribute("animation");
                    const inFavoriteList = option.getAttribute("favorite");
                    this.data.push({
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
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ISelect);
            let componentRef = this.viewRef.createComponent(componentFactory);
            const domElem = componentRef.hostView.rootNodes[0];
            this.el.nativeElement.parentNode.appendChild(domElem);
            const instance = componentRef.instance;
            instance.searchEnabled = this.searchEnabled;
            instance.id = this.el.nativeElement.id + "-iselect";
            instance.size = this.el.nativeElement.size;
            instance.name = this.el.nativeElement.name;
            instance.onchange = this.change;
            instance.ontoggle = this.ontoggle;
            instance.template = this.template;
            instance.applyOpacity = this.applyOpacity;
            instance.applyLayoutType = this.applyLayoutType;
            instance.slideShowEnabled = this.slideShowEnabled;
            instance.applyPattern = this.applyPattern;
            instance.controlls = this.controlls;
            instance.applySlideShow = this.applySlideShow;
            instance.applyAnimation = this.applyAnimation;
            instance.entries = this.data;
            instance.ngAfterViewInit();
        }, 66);
    }
};
ISelectDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: ComponentFactoryResolver }
];
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
export { ISelectDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNULHdCQUF3QixFQUNyQixZQUFZLEVBQ1osWUFBWSxFQUNaLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSzFELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBdUJ6QixZQUNZLE9BQXlCLEVBQzFCLEVBQWEsRUFDbEIsd0JBQWtEO1FBRjVDLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQVc7UUFDbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQXpCaEQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVaLGtCQUFhLEdBQVMsS0FBSyxDQUFDO1FBSTVCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixjQUFTLEdBQVE7WUFDekIsU0FBUyxFQUFFLEVBQUU7WUFDYixZQUFZLEVBQUUsRUFBRTtZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVXLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFB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ZixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIE9uSW5pdCxcclxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QgfSBmcm9tICcuLi9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaS1zZWxlY3RdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGRhdGEgPSBbXTtcclxuXHJcblx0QElucHV0KCkgc2VhcmNoRW5hYmxlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuXHRASW5wdXQoKSB0ZW1wbGF0ZTogYW55O1xyXG5cclxuXHRASW5wdXQoKSBhcHBseUxheW91dFR5cGUgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBhcHBseU9wYWNpdHkgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBhcHBseVBhdHRlcm4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGFwcGx5QW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBzbGlkZVNob3dFbmFibGVkID0gZmFsc2U7XHJcblx0QElucHV0KCkgYXBwbHlTbGlkZVNob3cgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBjb250cm9sbHM6IGFueSA9IHtcclxuXHRcdGZpcnN0UGFnZTogJycsXHJcblx0XHRwcmV2aW91c1BhZ2U6ICcnLFxyXG5cdFx0bmV4dFBhZ2U6ICcnLFxyXG5cdFx0bGFzdFBhZ2U6ICcnXHJcblx0fTtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIG9udG9nZ2xlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5Om5vbmVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3Q6IEhUTUxDb2xsZWN0aW9uID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ub2RlVHlwZSA9PT0gMSkgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAgb3B0aW9uLmdldEF0dHJpYnV0ZShcIm9wYWNpdHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVwZWF0TGF5b3V0ID0gb3B0aW9uLmdldEF0dHJpYnV0ZShcInJlcGVhdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXR0ZXJuTGF5b3V0ID0gb3B0aW9uLmdldEF0dHJpYnV0ZShcInBhdHRlcm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uVHlwZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJhbmltYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5GYXZvcml0ZUxpc3QgPSBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZmF2b3JpdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogIG9wdGlvbi5zZWxlY3RlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiByZXBlYXRMYXlvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbGRlZDogcGF0dGVybkxheW91dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb25UeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogaW5GYXZvcml0ZUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHkgPyBwYXJzZUZsb2F0KG9wYWNpdHkpIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0aW9uLmlubmVySFRNTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoSVNlbGVjdCk7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZTpJU2VsZWN0ID0gKDxJU2VsZWN0PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNlYXJjaEVuYWJsZWQgPSB0aGlzLnNlYXJjaEVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmlkID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkK1wiLWlzZWxlY3RcIjtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2l6ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zaXplO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uYW1lID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uY2hhbmdlID0gdGhpcy5jaGFuZ2U7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9udG9nZ2xlID0gdGhpcy5vbnRvZ2dsZTtcclxuICAgICAgICAgICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5hcHBseU9wYWNpdHkgPSB0aGlzLmFwcGx5T3BhY2l0eTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuYXBwbHlMYXlvdXRUeXBlID0gdGhpcy5hcHBseUxheW91dFR5cGU7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNsaWRlU2hvd0VuYWJsZWQgPSB0aGlzLnNsaWRlU2hvd0VuYWJsZWQ7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmFwcGx5UGF0dGVybiA9IHRoaXMuYXBwbHlQYXR0ZXJuO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb250cm9sbHMgPSB0aGlzLmNvbnRyb2xscztcclxuICAgICAgICAgICAgaW5zdGFuY2UuYXBwbHlTbGlkZVNob3cgPSB0aGlzLmFwcGx5U2xpZGVTaG93O1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5hcHBseUFuaW1hdGlvbiA9IHRoaXMuYXBwbHlBbmltYXRpb247XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVudHJpZXMgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm5nQWZ0ZXJWaWV3SW5pdCgpO1xyXG4gICAgICAgIH0sIDY2KVxyXG5cdH1cclxufVxyXG4iXX0=