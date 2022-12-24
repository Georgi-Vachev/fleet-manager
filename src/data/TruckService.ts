import { DataService } from "./Service";
import { VehicleModel, TruckModel, Truck } from "./VehicleModels";

export type TruckData = {
    make: string,
    model: string,
    rentalPrice: number,
    rentedTo: string | null;
    cargoType: "box" | "flatbed" | "van",
    capacity: number
}

export class TruckService extends DataService<TruckModel, TruckData> {

    protected parseRecord(record: VehicleModel): TruckModel {
        const data = record as any;
        const result = new Truck(
            data.id,
            data.make,
            data.model,
            data.rentalPrice,
            data.rentedTo,
            data.cargoType,
            data.capacity
        );

        return result;
    }

    protected validate(data: any): void {
        if (typeof data.make != 'string') {
            throw new TypeError('Incompatible record. Invalid property "make"');
        }
        if (typeof data.model != 'string') {
            throw new TypeError('Incompatible record. Invalid property "moidel"');
        }
        if (typeof data.rentalPrice != 'number') {
            throw new TypeError('Incompatible record. Invalid property "retalPrice"');
        }
        if (typeof data.rentedTo != 'string' && typeof data.model != null) {
            throw new TypeError('Incompatible record. Invalid property "rentedTo"');
        }
        if (typeof data.cargoType != 'string') {
            throw new TypeError('Incompatible record. Invalid property "cargoType"');
        }
        if (typeof data.capacity != 'number') {
            throw new TypeError('Incompatible record. Invalid property "capacity"');
        }
    }
}