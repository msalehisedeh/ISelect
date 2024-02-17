

export interface IconInfo {
	id?: number, // auto generated
	ownerId?: string, // auto generated
	name: string, // item display name
	value: string, // item source URL
	poster?: string, // if not image, URL to image representation
	type?: string, // if undefined defaults to image
    animation?: string, // animation type to be performed on item
	opacity?: number, // item transparency
	selected?: boolean, // if item is selected
    disabled?: boolean, // if item is disabled
    repeat?: boolean, // if image type, should it be repeat position
    molded?: boolean, // if image, should it be displayed as pattern
    favorite?: boolean // if is user favorite for animation
	pattern?: string;
}