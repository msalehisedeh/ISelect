# Welcome to ISelect!

Have you ever wanted to have an easy to use component that looks exactly (almost) like a select tag with the added benefit of showing icons instead of words? Have you wanted to transform a select tag into a more meaningful dropdown when it comes to have a list of images to pick? If so, then welcome to ISelect!

[Live Demo](https://iselect.stackblitz.io) | [Source code](https://github.com/msalehisedeh/iselect)

# Version 0.0.1

```javascript
MODULE:
    ISelectModule

EXPORTS
	ISelect,
    ISelectDirective
	
DEPENDENCIES: 
    "font-awesome": "^4.7.0"
```

Sample usage
```javascript
    <i-select 
      id="backgroundPicker" 
      name="selectedBackground" 
      [size]="6" 
      [multiselect]="false" 
      [entries]="iconpickeData"
      [searchEnabled]="true" 
      (onchange)="updateSelection($event)">
    </i-select>
  
    <select i-select 
        id="overlayPicker1" size="6" name="selectedOverlay"
        [searchEnabled]="false" 
        (change)="updateOverlay($event)" >
      <option *ngFor="let x of iconpickeOverlay" [value]="x.value" [textContent]="x.name"></option>
    </select>
```


