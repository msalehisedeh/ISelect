
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
	absoluteState!: boolean | undefined;

	@Input() refrenceId = '';
	@Input() opacity: number | undefined = 1;
	@Input() molded: boolean | undefined = false;
	@Input() repeat: boolean | undefined = true;
	@Input() type: string | undefined = 'image';
	@Input() poster!: string | undefined;
	@Input() value = '';
	@Input() animation!: string | undefined;
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
