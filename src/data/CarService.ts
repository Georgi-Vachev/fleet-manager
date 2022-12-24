import { DataService } from "./Service";
import { VehicleModel, CarModel, Car } from "./VehicleModels";

export type CarData = {
    make: string,
    model: string,
    rentalPrice: number,
    rentedTo: string | null;
    bodyType: string,
    numberOfSeats: number,
    transmission: string;
}

export class CarService extends DataService<CarModel, CarData> {

    protected parseRecord(record: VehicleModel): CarModel {
        const data = record as any;
        const result = new Car(
            data.id,
            data.make,
            data.model,
            data.rentalPrice,
            data.rentedTo,
            data.bodyType,
            data.numberOfSeats,
            data.transmission
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
        if (typeof data.bodyType != 'string') {
            throw new TypeError('Incompatible record. Invalid property "bodyType"');
        }
        if (typeof data.numberOfSeats != 'number') {
            throw new TypeError('Incompatible record. Invalid property "numberOfSeats"');
        }
        if (typeof data.transmission != 'string') {
            throw new TypeError('Incompatible record. Invalid property "transmission"');
        }
    }
}