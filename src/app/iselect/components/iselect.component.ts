
import {
	Component,
	ViewContainerRef,
	Input,
	Output,
	Renderer,
	HostListener,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
	AfterViewInit} from "@angular/core";

import { Preloader } from "./preloader.service";
import { IconInfo} from "./iselect.interface";

var globalActiveDropdown:ISelect[] = [];

/*
* Like a regular dropdown, we want to set/get selectedIndex, select items on arrow up/down, and select item on click.
*/
@Component({
    selector:'i-select',
	templateUrl: 'iselect.component.html',
	styleUrls: ['iselect.component.scss']
})
export class ISelect implements AfterViewInit {

	public selectedIndex:number = 1;
	displayItems:IconInfo[] = [];
	favoriteItems:IconInfo[] = [];
	highlightIndex=0;
	slideShowInterval: any;
	slideShowIndex = 0;
	searchedData:IconInfo[] = [];
	initianalized = false;

	config ={
		totalPage:1,
		currentPage:0,
		open:false,
		showFooter:false,
		hasError:false,
		isFocused:false,
		isSearch:false,
		loading:true,
		selectedItem:<IconInfo>null
	}

	@ViewChild('iconBox', {static: false}) private iconBox: ElementRef;
	// @ViewChild('searchIcon', {static: false}) private searchIcon: ElementRef;
	@ViewChild('searchInput', {static: false}) private searchInput: ElementRef;
	@ViewChild('searchButton', {static: false}) private searchButton: ElementRef;
	
	@Input() id: string = "";
	@Input() name: string = "";
	@Input() controlls: any = {
		firstPage: '',
		previousPage: '',
		nextPage: '',
		lastPage: ''
	};

	// showIconName should be handled by css from user
	// @Input("tile")
	// private configTile:boolean=true;

	@Input() searchEnabled: boolean = false;
	@Input() size: number = 3;

	// showIconName should be handled by css from user
	@Input() showIconName = false;
	@Input() template: any;
	@Input() slideShowEnabled = false;
	@Input() applyLayoutType = false;
	@Input() applyOpacity = false;
	@Input() applyPattern = false;
	@Input() applyAnimation = false;
	@Input() applySlideShow = false;
	@Input() entries: IconInfo[] = [];

	@Output() onchange = new EventEmitter();
	@Output() ontoggle = new EventEmitter();
	@Output() enabledShow = new EventEmitter();

	@HostListener('window:click', ['$event'])
	onClick($event: any) {
		let inside = false;
		let node = $event.target;
		while (node.parentNode) {
			if (node === this.host) {
				inside = true;
				break;
			}
			node = node.parentNode;
		}
		if (!inside && this.iconBox && $event.target !== this.iconBox.nativeElement  && this.config.open) {
			this.toggleIconSelector();
		}
	}

	private host: HTMLElement;

	constructor(
		el: ElementRef,
		private preloader: Preloader,
		private detector: ChangeDetectorRef,
		private renderer: Renderer
	) {
		this.host = el.nativeElement;
	}

	ngAfterViewInit() {
		if (!this.initianalized) {
			this.initianalized = true;
			this.displayItems = this.entries;
			for (let i: number = 0; i < this.entries.length; i++) {
				this.entries[i].id = i;
				this.entries[i].ownerId = this.id;
				this.entries[i].repeat = this.entries[i].repeat ? this.entries[i].repeat : false;
				if (this.entries[i].selected) {
					this.selectedIndex = i;
				}
				if (this.entries[i].favorite) {
					this.favoriteItems.push(this.entries[i]);
				}
			}
			this.config.currentPage = Math.ceil(this.selectedIndex / (this.size-1));
			this.highlightIndex = this.selectedIndex > 0 ?
							this.selectedIndex - ((this.config.currentPage - 1) * this.size) : 0;
			this.renderIconContainer();
			globalActiveDropdown.push(this);
			if (this.config.totalPage > 1) {
				this.config.loading = false;
			}
			this.config.selectedItem = this.displayItems[this.highlightIndex];
			if (this.config.selectedItem) {
				this.preloader.contains(this.id, this.config.selectedItem.value);
				if (!this.startSlideShow()) {
					setTimeout(() => {
						this.ontoggle.emit(this.config.selectedItem);
					}, 66);
				}
			}
			this.detector.detectChanges();
		}
	}
	repeat(event: any) {
		if (this.config.selectedItem) {
			this.config.selectedItem.repeat = !this.config.selectedItem.repeat;
		}
	}
	private stopSlideShow() {
		if (this.slideShowInterval) {
			clearInterval(this.slideShowInterval);
			this.slideShowInterval = undefined;
			this.slideShowIndex = 0;
		}
	}
	private startSlideShow() {
		if (this.slideShowEnabled && this.favoriteItems.length > 1 && !this.slideShowInterval) {
			this.preloader.preload(this.id, this.favoriteItems);
			this.slideShowInterval = setInterval(this.slideShow.bind(this), 20000);
			return true;
		}
		return false;
	}
	enableShow(event: any) {
		this.slideShowEnabled = !this.slideShowEnabled;
		this.enabledShow.emit(this.slideShowEnabled);
		if (this.slideShowEnabled) {
			this.startSlideShow();
		} else {
			this.stopSlideShow();
		}
	}
	slideShow() {
		if (this.slideShowIndex === this.favoriteItems.length) {
			this.slideShowIndex = 0;
		}
		const item = this.favoriteItems[this.slideShowIndex];
		this.emitToggle(item, undefined);
		this.slideShowIndex++;
	}
	addToFavorite(event: any) {
		if (this.config.selectedItem) {
			this.config.selectedItem.favorite = !this.config.selectedItem.favorite
			if (this.config.selectedItem.favorite) {
				this.preloader.image(this.id, this.config.selectedItem.value);
				this.favoriteItems.push(this.config.selectedItem)
			} else {
				const index = this.favoriteItems.indexOf(this.config.selectedItem);
				this.favoriteItems.splice(index, 1);
			}
			this.startSlideShow();
		}
	}
	mold(event: any) {
		if (this.config.selectedItem) {
			this.config.selectedItem.molded = !this.config.selectedItem.molded
			this.stopSlideShow();
			this.emitChange(this.config.selectedItem, ()=> this.startSlideShow());
		}
	}
	keyboardTracker($event: KeyboardEvent) {
		$event.stopPropagation();
		$event.preventDefault();
		let key = $event.charCode || $event.keyCode || 0;

		if (key === 39 || key === 40) {//right or down arrow
			setTimeout(() => {
				let index = this.highlightIndex;
				if (index < this.displayItems.length - 1) {
					this.highlightIcon(index + 1);
				} else if (this.config.currentPage < this.config.totalPage) {
					this.next($event);
				}
			},66);
		} else if (key === 37 || key === 38) {//left or up arrow
			setTimeout(() => {
				let index = this.highlightIndex;
				if (index > 0) {
					this.highlightIcon(index - 1);
				} else if (this.config.currentPage > 1) {
					this.prev($event);
				}
			},66);
		}
		if (key === 40) {
			this.config.open = true;
			if (this.searchInput) {
				setTimeout(() => {
					if (this.searchInput) {
						this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus', [])
						this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'select', []);
					}
				}, 66);
			}
		} else if (key === 38 && this.highlightIndex === 0) {
			this.config.open = false;
			if (this.searchButton) {
				this.renderer.invokeElementMethod(this.searchButton.nativeElement, 'focus', []);
			}
		}
		return false;
	}
	keyup(event: any) {
		let key = event.charCode || event.keyCode || 0;
		if (key === 13) {
			event.target.click();
		}
	}
	performSearch($event:KeyboardEvent, searchString:string) {
		let key = $event.charCode || $event.keyCode || 0;
		if (key > 36 && key < 41) {
			return this.keyboardTracker($event);
		}
		if (searchString === '') {
			if (key === 13) {
				this.keyboardTracker($event);
				this.toggleIconSelector();
				return;
			}
			this.resetSearch();
			return;
		}
		//this.searchIcon.removeClass('picker-icon-search');
		//this.searchIcon.addClass('picker-icon-cancel');
		this.config.isSearch = true;

		this.searchedData = [];
		for (let i: number = 0; i < this.entries.length; i++) {
			let info = this.entries[i];
			if (info.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
				this.searchedData.push(info);
			}
		}
		if (this.searchedData.length) {
			this.config.currentPage = 1;
			this.highlightIndex = 0;
			this.config.selectedItem = this.searchedData[0];
			this.displayItems = this.searchedData;
			this.highlightIcon(this.highlightIndex);
		}else {
			this.config.selectedItem = null;
		}
		this.renderIconContainer();
		this.detector.detectChanges();
	}
	resetSearch() {
		if (this.searchInput) {
			this.renderer.setElementAttribute(this.searchInput.nativeElement, 'value', '');
		}

		//this.searchIcon.removeClass('picker-icon-cancel');
		//this.searchIcon.addClass('picker-icon-search');

		this.config.currentPage = 1;
		this.config.isSearch = false;
		this.highlightIndex = 0;
		this.displayItems = this.entries;
		this.config.selectedItem = this.entries[0];
		this.highlightIcon(this.highlightIndex);

		this.renderIconContainer();
		this.detector.detectChanges();
	}
	next($event: any) {
		if (this.config.currentPage < this.config.totalPage) {
			this.config.currentPage++;
 			this.renderIconContainer();
		}
		this.highlightIndex=0;
		this.highlightIcon(this.highlightIndex);
		
		return false;
	}
	prev($event: any) {
		if (this.config.currentPage > 1) {
			this.config.currentPage--;
 		    this.renderIconContainer();
		}
		this.highlightIndex=this.size-1;
		this.highlightIcon(this.highlightIndex);
		
		return false;
	}
	last($event: any) {
		if (this.config.currentPage < this.config.totalPage) {
			this.config.currentPage = this.config.totalPage;
		    this.renderIconContainer();
		}
		this.highlightIndex=0;
		this.highlightIcon(this.highlightIndex);

		return false;
	}

	first($event: any) {
		if (this.config.currentPage > 1) {
			this.config.currentPage = 1;
		    this.renderIconContainer();
		}
		this.highlightIndex=this.size-1;
		this.highlightIcon(this.highlightIndex);

		return false;
	}
	renderIconContainer() {
		this.displayItems = (this.config.isSearch ? this.searchedData : this.entries);
		this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
		
		this.config.showFooter = (this.config.totalPage > 1);

		let offset = this.config.currentPage ? (this.config.currentPage - 1) * this.size : 0;

		if (this.displayItems.length < 1 ) {
			this.config.hasError = true;
		}else {
			this.config.hasError = false;
			this.displayItems = this.displayItems.slice(offset, offset + this.size);
			this.preloader.preload(this.id, this.displayItems);
		}
	}
	toggleIconSelector() {
		this.config.open = !this.config.open;

		if (this.config.open && this.searchEnabled) {
			setTimeout(() => {
				if (this.searchInput) {
					this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus', []);
					this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'select', []);
				}
			}, 66);
		}
	}
	private emitChange(item: any, callback: any) {
		const delayTime = (item.molded && !this.preloader.contains(this.id, item.value)) ? 777 : 66;
		setTimeout(() => {
			this.onchange.emit(item);
			if (callback) {
				callback();
			}
		}, delayTime);
	}
	private emitToggle(item: any, callback: any) {
		const delayTime = (item.molded && !this.preloader.contains(this.id, item.value)) ? 777 : 66;
		setTimeout(() => {
			this.ontoggle.emit(item);
			if (callback) {
				callback();
			}
		}, delayTime);
	}
	private deselectAll() {
		if (this.displayItems) {
			for(let i: number = 0; i < this.entries.length; i++) {
				this.selectedIndex = i;
			}
		}
	}
	selectIcon(index: number) {
		if (this.displayItems && !this.displayItems[index].disabled) {
			this.deselectAll();
			this.highlightIndex = index;
			for (let i:number=0;i<this.displayItems.length;i++){
				this.entries[i].selected = false;
				if (index === i) {
					this.selectedIndex = i;
					this.displayItems[i].selected = true;
				}
			}
			this.config.selectedItem = this.displayItems[index];
			this.detector.detectChanges();
			if (this.config.selectedItem) {
				this.stopSlideShow();
				this.emitChange(this.config.selectedItem, () => this.startSlideShow());
			}
		}
	}
	highlightIcon(index: number) {
		this.deselectAll();
		this.highlightIndex = index;
		if (this.displayItems && !this.displayItems[index].disabled) {
			this.config.selectedItem = this.displayItems[this.highlightIndex];
			this.detector.detectChanges();
			if (this.config.selectedItem) {
				this.stopSlideShow();
				this.emitToggle(this.config.selectedItem, () => this.startSlideShow());
			}
		}
	}
	animation($event: any) {
		if (this.displayItems && this.config.selectedItem) {
			this.config.selectedItem.animation = $event.target.value;
		}
	}
	popIcons($event: any) {
		for (let i: number = 0; i < globalActiveDropdown.length; i++) {
			if (globalActiveDropdown[i]!=this && globalActiveDropdown[i].config.open) {
				globalActiveDropdown[i].toggleIconSelector();
			}
		}
		this.toggleIconSelector();
		return false;
	}
	selectedSourceUrl() {
		return this.config.selectedItem ?
					((!this.config.selectedItem.type || this.config.selectedItem.type == 'image') ?
						this.config.selectedItem.value :
						this.config.selectedItem.poster) :
					'';
	}
}
