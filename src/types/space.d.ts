interface Location {
	link: string;
	region: number;
	address: string;
}

interface IBuilding {
	name: string;
	location: Location;
}

interface ISpace {
	buildingId: string;
	name: string;
	description: string;
	floor: number;
	capacity: number;
	picture: string;
	pictureId: string;
	status: string;
}

interface Params {
	page: number;
	limit: number;
	search: string;
}

export {
	IBuilding,
	ISpace,
	Params
}
