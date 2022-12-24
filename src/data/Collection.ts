import { Storage } from "./Storage";
import { VehicleID, VehicleModel } from "./VehicleModels";


export class Collection {
    constructor(
        private storage: Storage,
        private name: string
    ) { }

    getAll(): Promise<(VehicleModel | null)[]> {
        return this.storage.getAll(this.name);
    }

    getById(id: VehicleID): Promise<VehicleModel | null | undefined> {
        return this.storage.getById(this.name, id);
    }

    create(data: any): Promise<VehicleModel> {
        return this.storage.create(this.name, data);
    }

    update(id: VehicleID, data: any): Promise<VehicleModel> {
        return this.storage.update(this.name, id, data);
    }

    delete(id: VehicleID): Promise<void> {
        return this.storage.delete(this.name, id);
    }

    deleteAll(): Promise<void> {
        return this.storage.deleteAll(this.name);
    }
}