
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
	Component,
	ComponentFactory, 
	ReflectiveInjector,
	ViewContainerRef,
	Input,
	Output,
	Renderer,
	HostListener,
	EventEmitter,
	ViewChild,
	OnInit,
	ElementRef} from "@angular/core";

export interface IconInfo {
	id?:number,
	name:string,
	value:string,
	label?:string,
	selected?:boolean,
	disabled?:boolean
}

var globalActiveDropdown:ISelect[] = [];

@Pipe({name:'CSSImage'})
export class CSSImagePipe implements PipeTransform{

  constructor(private sanitizer:DomSanitizer){}
  transform(url: string,repeat?:boolean): any { 
	  return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') "+(repeat ? "repeat":"no-repeat")+" 0 0 transparent");
  }
}

/*
* Like a regular dropdown, we want to set/get selectedIndex, select items on arrow up/down, and select item on click.
*/
@Component({
    selector:'i-select',
	templateUrl: 'iselect.component.html',
	styleUrls: ['iselect.component.scss'],
	providers: [CSSImagePipe]
})
export class ISelect implements OnInit {

	public selectedIndex:number = 1;
	
	@ViewChild('searchIcon', {read: ViewContainerRef}) private searchIcon: ViewContainerRef;
	@ViewChild('searchInput', {read: ViewContainerRef}) private searchInput: ViewContainerRef;
	@ViewChild('iconContainer', {read: ViewContainerRef}) private iconContainer: ViewContainerRef;
	
	@Input("id")
	public configID:string = "";

	@Input("name")
	public configName:string = "";

	// showIconName should be handled by css from user
	// @Input("tile")
	// private configTile:boolean=true;

	@Input("searchEnabled")
	public searchEnabled:boolean=false;

	@Input("size")
	public size:number = 3;

	@Input("multiselect")
	public multiselect = false;

	// showIconName should be handled by css from user
	@Input("showIconName")
	showIconName = false;
	
	@Input("entries")
	public configData:IconInfo[] = [];
	
	displayItems:IconInfo[] = [];
	
	@Output("onchange")
	public onchange = new EventEmitter();

	private highlightIndex=0;
	private searchedData:IconInfo[] = [];


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

	@HostListener('window:click', ['$event'])
	onClick($event:KeyboardEvent) {
		if (this.config.open) {
			this.toggleIconSelector();
		}
	}

	private el:HTMLElement;

	constructor(el: ElementRef,private renderer: Renderer) {
		this.el = el.nativeElement;
	}

	ngOnInit() {
		this.displayItems = this.configData;
	}

	keyboardTracker($event:KeyboardEvent){
		$event.stopPropagation();
		$event.preventDefault();
		let key = $event.charCode || $event.keyCode || 0;
		console.log(key)
		if(key===39 || key===40){//right or down arrow
		setTimeout(()=>{
			let index = this.highlightIndex;
			if(index<this.displayItems.length-1){
				this.highlightIcon(index+1);
			}else if(this.config.currentPage<this.config.totalPage){
				this.next($event);
			}
		},66);
		}else if(key===37 || key===38){//left or up arrow
		setTimeout(()=>{
			let index = this.highlightIndex;
			if(index>0){
				this.highlightIcon(index-1);
			}else if(this.config.currentPage>1){
				this.prev($event);
			}
		},66);
		}
		return false;
	}
	performSearch($event:KeyboardEvent, searchString:string){
		let key = $event.charCode || $event.keyCode || 0;
		if(key>36 && key<41){
			return this.keyboardTracker($event);
		}
		if (searchString === '') {
			this.resetSearch();
			return;
		}
		//this.searchIcon.removeClass('picker-icon-search');
		//this.searchIcon.addClass('picker-icon-cancel');
		this.config.isSearch = true;

		this.searchedData = [];
		for(let i:number=0;i<this.configData.length;i++){
			let info = this.configData[i];
			if (info.name.toLowerCase().indexOf(searchString.toLowerCase())>=0) {
				this.searchedData.push(info);
			}
		}
		if(this.searchedData.length){
			this.config.currentPage = 1;
			this.highlightIndex = 0;
			this.config.selectedItem = this.searchedData[0];
			this.displayItems = this.searchedData;
			this.highlightIcon(this.highlightIndex);
		}else {
			this.config.selectedItem = null;
		}
		this.renderIconContainer();
	}
	resetSearch(){
		this.renderer.setElementAttribute(this.searchInput.element.nativeElement,'value','');

		//this.searchIcon.removeClass('picker-icon-cancel');
		//this.searchIcon.addClass('picker-icon-search');

		this.config.currentPage = 1;
		this.config.isSearch = false;
		this.highlightIndex = 0;
		this.displayItems = this.configData;
		this.config.selectedItem = this.configData[0];
		this.highlightIcon(this.highlightIndex);

		this.renderIconContainer();
	}
	next($event:any){
		$event.stopPropagation();

		if (this.config.currentPage < this.config.totalPage) {
			this.config.currentPage++;
 			this.renderIconContainer();
		}
		this.highlightIndex=0;
		this.highlightIcon(this.highlightIndex);
		
		return false;
	}
	prev($event:any){
		$event.stopPropagation();

		if (this.config.currentPage > 1) {
			this.config.currentPage--;
 		    this.renderIconContainer();
		}
		this.highlightIndex=this.size-1;
		this.highlightIcon(this.highlightIndex);
		
		return false;
	}
	last($event:any){
		$event.stopPropagation();

		if (this.config.currentPage < this.config.totalPage) {
			this.config.currentPage = this.config.totalPage;
		    this.renderIconContainer();
		}
		this.highlightIndex=0;
		this.highlightIcon(this.highlightIndex);

		return false;
	}

	first($event:any){
		$event.stopPropagation();

		if (this.config.currentPage > 1) {
			this.config.currentPage = 1;
		    this.renderIconContainer();
		}
		this.highlightIndex=this.size-1;
		this.highlightIcon(this.highlightIndex);

		return false;
	}
	renderIconContainer(){
		this.displayItems = (this.config.isSearch ? this.searchedData : this.configData);
		this.config.totalPage = Math.ceil(this.displayItems.length / this.size);
		
		this.config.showFooter = (this.config.totalPage > 1);

		let offset = (this.config.currentPage - 1) * this.size;

		if(this.displayItems.length<1 ){
			this.config.hasError = true;
		}else {
			this.config.hasError = false;
			this.displayItems = this.displayItems.slice(offset, offset + this.size);
		}
	}
	toggleIconSelector(){
		this.config.open = !this.config.open;

		if (this.config.open && this.searchEnabled) {
			setTimeout(()=>{
				this.renderer.invokeElementMethod(this.searchInput.element.nativeElement, 'focus', []);
				this.renderer.invokeElementMethod(this.searchInput.element.nativeElement, 'select', []);
			}, 20);
		}
	}
	private findSelectedIndex(){
		if(this.config.selectedItem){
		for(let i:number=0;i<this.configData.length;i++){
			if(this.configData[i].id==this.config.selectedItem.id){
				this.selectedIndex = i;
			}
		}
		}
	}
	selectIcon(index:number){
		if(this.displayItems){
			this.config.selectedItem = this.displayItems[index];
			this.findSelectedIndex();
			this.onchange.emit(this.config.selectedItem);
		}
	}
	highlightIcon(index:number){
		this.highlightIndex = index;
		if(this.displayItems){
			this.config.selectedItem = this.displayItems[this.highlightIndex];
			this.findSelectedIndex();
			this.onchange.emit(this.config.selectedItem);
		}
	}
	popIcons($event:any){
		$event.stopPropagation();
		for(let i:number=0;i<globalActiveDropdown.length;i++){
			if(globalActiveDropdown[i]!=this && globalActiveDropdown[i].config.open){
				globalActiveDropdown[i].toggleIconSelector();
			}
		}
		this.toggleIconSelector();
		return false;
	}

	ngOnChanges(changes:any) {
		setTimeout(()=>{
		for(let i:number=0;i<this.configData.length;i++){this.configData[i].id= i}
	
		this.config.currentPage = Math.ceil(this.selectedIndex/(this.size-1));
		this.highlightIndex=this.selectedIndex-((this.config.currentPage-1)*this.size);
		this.renderIconContainer();

		globalActiveDropdown.push(this);
		if(this.config.totalPage>1){
			this.config.loading = false;
		}
		this.config.selectedItem = this.displayItems[this.highlightIndex];
		this.onchange.emit(this.config.selectedItem);
		},10);
	}

}
