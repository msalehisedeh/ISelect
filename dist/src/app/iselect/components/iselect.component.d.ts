import { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer, EventEmitter, OnInit, ElementRef } from "@angular/core";
export interface IconInfo {
    id?: number;
    name: string;
    value: string;
    label?: string;
    selected?: boolean;
    disabled?: boolean;
}
export declare class CSSImagePipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(url: string, repeat?: boolean): any;
}
export declare class ISelect implements OnInit {
    private renderer;
    selectedIndex: number;
    private searchIcon;
    private searchInput;
    private iconContainer;
    configID: string;
    configName: string;
    searchEnabled: boolean;
    size: number;
    multiselect: boolean;
    showIconName: boolean;
    configData: IconInfo[];
    displayItems: IconInfo[];
    onchange: EventEmitter<{}>;
    highlightIndex: number;
    searchedData: IconInfo[];
    config: {
        totalPage: number;
        currentPage: number;
        open: boolean;
        showFooter: boolean;
        hasError: boolean;
        isFocused: boolean;
        isSearch: boolean;
        loading: boolean;
        selectedItem: IconInfo;
    };
    onClick($event: KeyboardEvent): void;
    private el;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    keyboardTracker($event: KeyboardEvent): boolean;
    performSearch($event: KeyboardEvent, searchString: string): boolean;
    resetSearch(): void;
    next($event: any): boolean;
    prev($event: any): boolean;
    last($event: any): boolean;
    first($event: any): boolean;
    renderIconContainer(): void;
    toggleIconSelector(): void;
    private findSelectedIndex();
    selectIcon(index: number): void;
    highlightIcon(index: number): void;
    popIcons($event: any): boolean;
    ngOnChanges(changes: any): void;
}
