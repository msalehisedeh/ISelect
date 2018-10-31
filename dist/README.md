# Welcome to ICon Select!

Have you ever wanted to have an easy to use component that looks exactly (almost) like a select tag with the added benefit of showing icons instead of words? Have you wanted to transform a select tag into a more meaningful dropdown when it comes to have a list of images to pick? If so, then welcome to Icon Select!

**NOTE:** Starting with version 1.1.0 this library is compatible with Angular 6+.

[Live Demo](https://iselect.stackblitz.io) | [Source code](https://github.com/msalehisedeh/iselect/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/iselect/issues)

# Version 1.2.0
It was brought to my attention that some users have trouble using my components in their angular 6 environment. Since I had only updated few dependencies when moved to Angular 6, I am thinking dependencies are causing issues. So, for this release, I am updating all dependencies to what Angular 6 applications are expecting to have. Please let me know if this is fixing or not fixing any issues you are facing.

# Version 1.1.0
Updated libraries to become compatible with Angular 6+. 

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

