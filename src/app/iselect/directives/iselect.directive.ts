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
    private data = [];

	@Input("searchEnabled")
	public searchEnabled:boolean=false;

    @Output("change")
    change = new EventEmitter();

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
                const option = list[i];
                if (option.nodeType === 1) {    
                    this.data.push({
                        value: option.getAttribute("value"),
                        selected: option.getAttribute("selected"),
                        disabled: option.getAttribute("disabled"),
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
            instance.configID = this.el.nativeElement.id+"-iselect";
            instance.size = this.el.nativeElement.size;
            instance.configName = this.el.nativeElement.name;
            instance.onchange.subscribe(this.change);
            instance.configData = this.data;
            instance.ngOnInit();
            instance.ngOnChanges(undefined);
        }, 66)
	}
}
