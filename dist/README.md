# Welcome to ICon Select!

Have you ever wanted to have an easy to use component that looks exactly (almost) like a select tag with the added benefit of showing icons instead of words? Have you wanted to transform a select tag into a more meaningful dropdown when it comes to have a list of images to pick? If so, then welcome to Icon Select!

[Live Demo](https://iselect.stackblitz.io) | [Source code](https://github.com/msalehisedeh/iselect) | [Comments/Requests](https://github.com/msalehisedeh/iselect/issues)

# Version 1.0.0
Compiled with AOT option and resolved issues.

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

## So... How it can be done?

Run `npm install iselect` in your application. and do either of the following:

Sample usage through using i-select component or i-select directive.
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

It is that simple..!!

Sample view of the component at work!
![alt text](https://raw.githubusercontent.com/msalehisedeh/iselect/master/sample.png "What you would see when a comparison is performed")

