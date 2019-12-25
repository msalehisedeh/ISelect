
import { Component, Input, HostListener, Renderer2, ElementRef} from "@angular/core";
import { CSSImagePipe} from "./iselect.pipe";

@Component({
    selector:'i-renderer',
	templateUrl: 'irenderer.component.html',
	styleUrls: ['irenderer.component.scss'],
	providers: [CSSImagePipe]
})
export class IRenderer {

	private host: HTMLElement;
	absoluteState: boolean;

	@Input() refrenceId = '';
	@Input() opacity: number;
	@Input() molded = false;
	@Input() repeat = true;
	@Input() type = 'image';
	@Input() poster: string;
	@Input() value = '';
	@Input() animation: string;
	@Input()
	set absolute(flag: boolean) {
		this.absoluteState = flag;
		if (flag) {
			this.renderer.addClass(this.host,'absolute');
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize($event: any) {
		this.renderer.setStyle(this.host, 'width',window.innerWidth + 'px')
		this.renderer.setStyle(this.host, 'height',window.innerHeight + 'px');
	}

	constructor(
		el: ElementRef,
		private renderer: Renderer2
	) {
		this.host = el.nativeElement;
		this.onResize(null);
	}
}
