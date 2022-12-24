export type VehicleID = string;

export type VehicleModel = {
    id: VehicleID,
    make: string,
    model: string,
    rentalPrice: number,
    rentedTo: string | null;
}

export interface CarModel extends VehicleModel {
    bodyType: "sedan" | "suv" | "hatchback",
    numberOfSeats: number,
    transmission: "manual" | "automatic";
}

export interface TruckModel extends VehicleModel {
    cargoType: "box" | "flatbed" | "van",
    capacity: number
}

export class Car implements CarModel {
    constructor(
        public id: string,
        public make: string,
        public model: string,
        public rentalPrice: number,
        public rentedTo: string | null,
        public bodyType: "sedan" | "suv" | "hatchback",
        public numberOfSeats: number,
        public transmission: "manual" | "automatic"
    ) { }
}

export class Truck implements TruckModel {
    constructor(
        public id: string,
        public make: string,
        public model: string,
        public rentalPrice: number,
        public rentedTo: string | null,
        public cargoType: "box" | "flatbed" | "van",
        public capacity: number
    ) { }
}