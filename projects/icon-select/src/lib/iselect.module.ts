import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ISelect } from './components/iselect.component';
import { Preloader } from './components/preloader.service';
import { CSSImagePipe } from './components/iselect.pipe';
import { IRenderer } from './components/irenderer.component';
import { ISelectDirective } from './directives/iselect.directive';
import { IselectSanitizePipe } from './components/iselect.sanitize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ISelect,
    IRenderer,
    CSSImagePipe,
    IselectSanitizePipe,
    ISelectDirective
  ],
  exports: [
    ISelect,
    IRenderer,
    CSSImagePipe,
    IselectSanitizePipe,
    ISelectDirective
  ],
  entryComponents: [
    IRenderer,
    ISelect
  ],
  providers: [
    CSSImagePipe,
    IselectSanitizePipe,
    Preloader,
    ISelectDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ISelectModule {}
