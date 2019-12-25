import { ViewContainerRef, ElementRef, OnInit, ComponentFactoryResolver, EventEmitter } from '@angular/core';
export declare class ISelectDirective implements OnInit {
    private viewRef;
    el: ElementRef;
    private componentFactoryResolver;
    private data;
    searchEnabled: boolean;
    template: any;
    applyLayoutType: boolean;
    applyOpacity: boolean;
    applyPattern: boolean;
    applyAnimation: boolean;
    slideShowEnabled: boolean;
    applySlideShow: boolean;
    controlls: any;
    change: EventEmitter<any>;
    ontoggle: EventEmitter<any>;
    constructor(viewRef: ViewContainerRef, el: ElementRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
}
