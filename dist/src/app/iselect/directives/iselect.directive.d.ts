import { ViewContainerRef, ElementRef, OnInit, ComponentFactoryResolver, EventEmitter } from '@angular/core';
export declare class ISelectDirective implements OnInit {
    private viewRef;
    el: ElementRef;
    private componentFactoryResolver;
    private data;
    searchEnabled: boolean;
    change: EventEmitter<{}>;
    constructor(viewRef: ViewContainerRef, el: ElementRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
}
