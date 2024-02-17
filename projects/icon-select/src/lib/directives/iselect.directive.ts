import {
    Directive,
    ViewContainerRef,
    ElementRef,
    Input,
    Output,
    OnInit,
	ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    EmbeddedViewRef
} from '@angular/core';

import { ISelect } from '../components/iselect.component';

@Directive({
    selector: '[i-select]'
})
export class ISelectDirective implements OnInit {
    private data: any[] = [];

	@Input() searchEnabled:boolean=false;

	@Input() template: any;

	@Input() applyLayoutType = false;
	@Input() applyOpacity = false;
	@Input() applyPattern = false;
    @Input() applyAnimation = false;
    @Input() slideShowEnabled = false;
	@Input() applySlideShow = false;
	@Input() controlls: any = {
		firstPage: '',
		previousPage: '',
		nextPage: '',
		lastPage: ''
	};

    @Output() change = new EventEmitter();
    @Output() ontoggle = new EventEmitter();

    constructor(
        private viewRef: ViewContainerRef,
        public el:ElementRef,
		private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }
    
	ngOnInit() {
        this.el.nativeElement.setAttribute("style","display:none")
        setTimeout(()=>{
            const list: HTMLCollection = this.el.nativeElement.children;
            for(let i = 0; i < list.length; i++) {
                const option: any = list[i];
                if (option.nodeType === 1) {   
                    const opacity =  option.getAttribute("opacity");
                    const repeatLayout = option.getAttribute("repeat");
                    const patternLayout = option.getAttribute("pattern");
                    const animationType = option.getAttribute("animation");
                    const inFavoriteList = option.getAttribute("favorite");
                    this.data.push({
                        value: option.getAttribute("value"),
                        selected:  option.selected,
                        repeat: repeatLayout,
                        molded: patternLayout,
                        animation: animationType,
                        favorite: inFavoriteList,
                        disabled: option.getAttribute("disabled"),
                        opacity: opacity ? parseFloat(opacity) : 0,
                        name: option.innerHTML
                    })    
                }
            }
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ISelect);
            let componentRef: ComponentRef<any> = this.viewRef.createComponent(componentFactory);
            const domElem = (componentRef.hostView as EmbeddedViewRef < any > ).rootNodes[0] as HTMLElement;
            this.el.nativeElement.parentNode.appendChild(domElem);
            const instance:ISelect = (<ISelect>componentRef.instance);
            instance.searchEnabled = this.searchEnabled;
            instance.id = this.el.nativeElement.id+"-iselect";
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
        }, 66)
	}
}
