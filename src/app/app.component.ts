import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { IconInfo } from './iselect/components/iselect.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
	title = 'ISelect';

	@ViewChild('pickedoverlay', {read: ViewContainerRef}) private pickedoverlay: ViewContainerRef;
	@ViewChild('pickedImage', {read: ViewContainerRef}) private pickedImage: ViewContainerRef;

	private iconpickeData:IconInfo[] = [];
	private iconpickeOverlay:IconInfo[] = [];
	private selectedImage:IconInfo = null;
	private selectedPattern:IconInfo = null;

	constructor(){
		this.iconpickeData = [
			{name:"my image 1",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/300px-Hopetoun_falls.jpg"},
			{name:"my image 2",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Galunggung.jpg/300px-Galunggung.jpg"},
			{name:"my image 3",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Top_of_Atmosphere.jpg/250px-Top_of_Atmosphere.jpg"},
			{name:"my image 4",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Ocean_from_Leblon.jpg/220px-Ocean_from_Leblon.jpg"},
			{name:"my image 5",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lake_mapourika_NZ.jpeg/220px-Lake_mapourika_NZ.jpeg"},
			{name:"my image 6",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mill_Pond_Sunset.jpg/220px-Mill_Pond_Sunset.jpg"},
			{name:"my image 7",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/View_from_Cairo_Tower_31march2007.jpg/220px-View_from_Cairo_Tower_31march2007.jpg"},
			{name:"my image 8",value:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Hawaii_Creek.jpg/220px-Hawaii_Creek.jpg"},
			{name:"my image 9",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/View_of_loch_lomond.JPG/200px-View_of_loch_lomond.JPG"},
			{name:"my image 10",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chicago_Downtown_Aerial_View.jpg/220px-Chicago_Downtown_Aerial_View.jpg"},
			{name:"my image 11",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Biogradska_suma.jpg/220px-Biogradska_suma.jpg"},
			{name:"my image 12",value:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Na_Pali_Coast_-_Kauai.jpg/220px-Na_Pali_Coast_-_Kauai.jpg"}
		];

		this.iconpickeOverlay= [
			{name:"sand paper",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/sand-paper.png"},
			{name:"zebra",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/zebra.png"},
			{name:"f2",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/f2.png"},
			{name:"cox",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/cox.png"},
			{name:"mill",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/mill.png"},
			{name:"tiz",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/tiz.png"},
			{name:"puff",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/puff.png"},
			{name:"board",value:"https://www.petsblock.com/resources/styles/petsblock/images/mesh/board.png"}
		]
	}

	updateOverlay(item:IconInfo){
		this.selectedPattern = item;
	}

	updateSelection(item:IconInfo){
		this.selectedImage = item;
	}
}
