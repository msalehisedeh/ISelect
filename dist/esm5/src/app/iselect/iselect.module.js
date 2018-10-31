/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISelect, CSSImagePipe } from './components/iselect.component';
import { ISelectDirective } from './directives/iselect.directive';
var ISelectModule = /** @class */ (function () {
    function ISelectModule() {
    }
    ISelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        ISelect,
                        CSSImagePipe,
                        ISelectDirective
                    ],
                    exports: [
                        ISelect,
                        CSSImagePipe,
                        ISelectDirective
                    ],
                    entryComponents: [
                        ISelect
                    ],
                    providers: [
                        CSSImagePipe,
                        ISelectDirective
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return ISelectModule;
}());
export { ISelectModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pY29uLXNlbGVjdC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvaXNlbGVjdC9pc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUEwRixNQUFNLGlCQUFpQixDQUFDO0FBRXZJLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUE7Ozs7O2dCQUVoRSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLE9BQU87d0JBQ1AsWUFBWTt3QkFDWixnQkFBZ0I7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxPQUFPO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNqQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsT0FBTztxQkFDUjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsWUFBWTt3QkFDWixnQkFBZ0I7cUJBQ2pCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNsQzs7d0JBNUJEOztTQThCYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSwgQ3VycmVuY3lQaXBlLCBEZWNpbWFsUGlwZSwgSnNvblBpcGUsIFNsaWNlUGlwZSwgVXBwZXJDYXNlUGlwZSwgTG93ZXJDYXNlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJU2VsZWN0LCBDU1NJbWFnZVBpcGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJU2VsZWN0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2lzZWxlY3QuZGlyZWN0aXZlJ1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSVNlbGVjdCxcclxuICAgIENTU0ltYWdlUGlwZSxcclxuICAgIElTZWxlY3REaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElTZWxlY3QsXHJcbiAgICBDU1NJbWFnZVBpcGUsXHJcbiAgICBJU2VsZWN0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIElTZWxlY3RcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ1NTSW1hZ2VQaXBlLFxyXG4gICAgSVNlbGVjdERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSVNlbGVjdE1vZHVsZSB7fVxyXG4iXX0=