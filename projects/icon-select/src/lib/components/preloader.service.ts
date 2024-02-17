
import { Injectable } from '@angular/core';

@Injectable() 
export class Preloader {
	private images: any = {};

	preload(selectId: any, list: any[]) {
		this.images[selectId] = {};
		list.map(
			(item) => {
				const img = (!item.type || item.type === 'image') ? item.value : item.poster;
				this.image(selectId, img);
			}
		);
	}
	contains(selectId: any, url: string): boolean {
		const loader = this.images[selectId];
		const image = loader ? loader[url] : undefined;
		return image !== undefined && image.width;
	}
	image(selectId: any, url: string): any {
		let loader = this.images[selectId];
		if (!loader) {
			loader = {};
			this.images[selectId] = loader;
		}
		let image = loader[url];
		if (!image) {
			image = new Image();
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = url;
			loader[url] = image;
		}
		return image;
	}
}
