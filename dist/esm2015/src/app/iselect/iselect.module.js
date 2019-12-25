import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISelect } from './components/iselect.component';
import { Preloader } from './components/preloader.service';
import { CSSImagePipe } from './components/iselect.pipe';
import { IRenderer } from './components/irenderer.component';
import { ISelectDirective } from './directives/iselect.directive';
import { IselectSanitizePipe } from './components/iselect.sanitize.pipe';
let ISelectModule = class ISelectModule {
};
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
export { ISelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvaWNvbi1zZWxlY3QvIiwic291cmNlcyI6WyJzcmMvYXBwL2lzZWxlY3QvaXNlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQWlDekUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFHLENBQUE7QUFBaEIsYUFBYTtJQS9CekIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osT0FBTztZQUNQLFNBQVM7WUFDVCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGdCQUFnQjtTQUNqQjtRQUNELE9BQU8sRUFBRTtZQUNQLE9BQU87WUFDUCxTQUFTO1lBQ1QsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixnQkFBZ0I7U0FDakI7UUFDRCxlQUFlLEVBQUU7WUFDZixTQUFTO1lBQ1QsT0FBTztTQUNSO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixTQUFTO1lBQ1QsZ0JBQWdCO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDbEMsQ0FBQztHQUVXLGFBQWEsQ0FBRztTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElTZWxlY3QgfSBmcm9tICcuL2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmVsb2FkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJlbG9hZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDU1NJbWFnZVBpcGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaXNlbGVjdC5waXBlJztcclxuaW1wb3J0IHsgSVJlbmRlcmVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2lyZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJU2VsZWN0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2lzZWxlY3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNlbGVjdFNhbml0aXplUGlwZSB9IGZyb20gJy4vY29tcG9uZW50cy9pc2VsZWN0LnNhbml0aXplLnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSVNlbGVjdCxcclxuICAgIElSZW5kZXJlcixcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElzZWxlY3RTYW5pdGl6ZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJU2VsZWN0LFxyXG4gICAgSVJlbmRlcmVyLFxyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSXNlbGVjdFNhbml0aXplUGlwZSxcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgSVJlbmRlcmVyLFxyXG4gICAgSVNlbGVjdFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJc2VsZWN0U2FuaXRpemVQaXBlLFxyXG4gICAgUHJlbG9hZGVyLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdE1vZHVsZSB7fVxyXG4iXX0=