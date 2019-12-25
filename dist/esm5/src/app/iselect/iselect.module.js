import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISelect } from './components/iselect.component';
import { Preloader } from './components/preloader.service';
import { CSSImagePipe } from './components/iselect.pipe';
import { IRenderer } from './components/irenderer.component';
import { ISelectDirective } from './directives/iselect.directive';
import { IselectSanitizePipe } from './components/iselect.sanitize.pipe';
var ISelectModule = /** @class */ (function () {
    function ISelectModule() {
    }
    ISelectModule = tslib_1.__decorate([
        NgModule({
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
    ], ISelectModule);
    return ISelectModule;
}());
export { ISelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvaXNlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQWlDekU7SUFBQTtJQUE0QixDQUFDO0lBQWhCLGFBQWE7UUEvQnpCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osT0FBTztnQkFDUCxTQUFTO2dCQUNULFlBQVk7Z0JBQ1osbUJBQW1CO2dCQUNuQixnQkFBZ0I7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTztnQkFDUCxTQUFTO2dCQUNULFlBQVk7Z0JBQ1osbUJBQW1CO2dCQUNuQixnQkFBZ0I7YUFDakI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsU0FBUztnQkFDVCxPQUFPO2FBQ1I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLFNBQVM7Z0JBQ1QsZ0JBQWdCO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbEMsQ0FBQztPQUVXLGFBQWEsQ0FBRztJQUFELG9CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJU2VsZWN0IH0gZnJvbSAnLi9jb21wb25lbnRzL2lzZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJlbG9hZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ1NTSW1hZ2VQaXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL2lzZWxlY3QucGlwZSc7XHJcbmltcG9ydCB7IElSZW5kZXJlciB9IGZyb20gJy4vY29tcG9uZW50cy9pcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSVNlbGVjdERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pc2VsZWN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzZWxlY3RTYW5pdGl6ZVBpcGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaXNlbGVjdC5zYW5pdGl6ZS5waXBlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIElTZWxlY3QsXHJcbiAgICBJUmVuZGVyZXIsXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJc2VsZWN0U2FuaXRpemVQaXBlLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSVNlbGVjdCxcclxuICAgIElSZW5kZXJlcixcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElzZWxlY3RTYW5pdGl6ZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIElSZW5kZXJlcixcclxuICAgIElTZWxlY3RcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSXNlbGVjdFNhbml0aXplUGlwZSxcclxuICAgIFByZWxvYWRlcixcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIElTZWxlY3RNb2R1bGUge31cclxuIl19