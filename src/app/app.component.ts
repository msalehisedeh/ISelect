import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { IconInfo } from './iselect/components/iselect.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
	title = 'ISelect';

	@ViewChild('pickedoverlay', {static: false}) private pickedoverlay: ViewContainerRef;
	@ViewChild('pickedImage', {static: false}) private pickedImage: ViewContainerRef;

	pickData: IconInfo[] = [];
	overlayData: IconInfo[] = [];
	selectedImage: IconInfo = null;
	selectedPattern: IconInfo = null;

	constructor(private client: HttpClient) {
		this.pickData = [
			{
				name:"my image 1", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/300px-Hopetoun_falls.jpg"},
			{
				name:"my image 2", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Galunggung.jpg/300px-Galunggung.jpg"},
			{
				name:"my video 1", 
				type: 'video',
				opacity: 1, 
				selected: true, 
				poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nevada_Fall%2C_Yosemite_NP%2C_CA%2C_US_-_Diliff.jpg/800px-Nevada_Fall%2C_Yosemite_NP%2C_CA%2C_US_-_Diliff.jpg',
				value:"https://s3.amazonaws.com/freestock-transcoded-videos-prod/transcoded/freestock_v2680286.mp4"},
			{
				name:"my live stream 1", 
				type: 'stream',
				opacity: 1, 
				poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQcqGAkmKA9QLhFL7xWuGAMI8Qr6B6d0CfmE8eevUTSrF6t9d&s',
				value:"http://166.211.148.254/mjpg/video.mjpg"},
			{
				name:"my webGL 1", 
				type: 'webGL',
				opacity: 1, 
				poster: 'https://html5gamedevelopment.com/wp-content/uploads/files/d0/2/153/bloglarge/webgl-macaroni.png',
				value:"https://alteredqualia.com/three/examples/webgl_pasta.html"},
			{
				name:"my image 3", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Top_of_Atmosphere.jpg/250px-Top_of_Atmosphere.jpg"},
			{
				name:"my image 4", 
				opacity: 1, 
				molded: true,
				animation: 'sepia',
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Ocean_from_Leblon.jpg/220px-Ocean_from_Leblon.jpg"},
			{
				name:"my image 5", 
				opacity: 1,
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lake_mapourika_NZ.jpeg/220px-Lake_mapourika_NZ.jpeg"},
			{
				name:"my image 6", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mill_Pond_Sunset.jpg/220px-Mill_Pond_Sunset.jpg"},
			{
				name:"my image 7", 
				opacity: 1, 
				molded: true,
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/View_from_Cairo_Tower_31march2007.jpg/220px-View_from_Cairo_Tower_31march2007.jpg"},
			{
				name:"my image 8", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/View_of_loch_lomond.JPG/200px-View_of_loch_lomond.JPG"},
			{
				name:"my image 9", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chicago_Downtown_Aerial_View.jpg/220px-Chicago_Downtown_Aerial_View.jpg"},
			{
				name:"my image 10", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Biogradska_suma.jpg/220px-Biogradska_suma.jpg"},
			{
				name:"my image 11", 
				opacity: 1, 
				value:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Na_Pali_Coast_-_Kauai.jpg/220px-Na_Pali_Coast_-_Kauai.jpg"},
			{
				name:"zebra", 
				opacity: 1, 
				repeat: true,
				value:"https://raw.githubusercontent.com/msalehisedeh/resources/master/patterns/bona.png"},
			{
				name:"cox", 
				opacity: 1, 
				repeat: true,
				value:"https://raw.githubusercontent.com/msalehisedeh/resources/master/patterns/blinder.png"}
		];
    this.overlayData = [];
    this.client.get(
      'https://raw.githubusercontent.com/msalehisedeh/resources/master/patterns/patterns.json'
    ).subscribe(
      (list: string[]) => {
        if (list) {
          list.map(
            (item) => {
              this.overlayData.push({
                name: item.substring(0, item.lastIndexOf('.')), 
                opacity: 0.7, 
                animation: 'disabled',
                value: "https://raw.githubusercontent.com/msalehisedeh/resources/master/patterns/" + item
              });
            }
          );
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
	}

	updateOverlay(item: IconInfo): void {
		this.selectedPattern = item;
	}
	toggleOverlay(item: IconInfo): void {
		this.selectedPattern = item;
	}
	updateSelection(item: IconInfo): void {
		this.selectedImage = item;
	}
	toggleSelection(item: IconInfo): void {
		this.selectedImage = item;
	}
}

