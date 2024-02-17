
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer2 } from "@angular/core";

import { Preloader } from "./preloader.service";

@Pipe({name:'CSSImage'})
export class CSSImagePipe implements PipeTransform{
 
	constructor(
		private renderer: Renderer2,
		private preloader: Preloader,
		private sanitizer: DomSanitizer
	) {}

  transform(url: string, id: string, repeat?: boolean, molded?: boolean): any {
	  let style = '';
	  if (molded) {
			const img: any =this.preloader.image(id, url);
			const canvas = this.renderer.createElement('canvas');
			const ctx = canvas.getContext("2d");
			canvas.width = img.width * 2;
			canvas.height = img.height * 2;
			ctx.drawImage(img, 0, 0);
			ctx.scale(1, -1);
			ctx.translate(0, -img.height);
			ctx.drawImage(img, 0, -img.height, img.width, img.height);

			ctx.scale(-1, 1);
			ctx.translate(-img.width, 0);
			ctx.drawImage(img, -img.width, -img.height, img.width, img.height);

			ctx.scale(1, -1);
			ctx.translate(0, -img.height);
			ctx.drawImage(img, -img.width, 0, img.width, img.height);

			const dataURL = canvas.toDataURL();
			style = "url(" + dataURL + ") " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent";
	  } else {
		  style = "url(" + url + ") " + (repeat ? "repeat" : "no-repeat") + " 0 0 transparent";
	  }
	  return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
