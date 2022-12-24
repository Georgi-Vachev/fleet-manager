import { generateId } from "../util";
import { VehicleID, VehicleModel } from "./VehicleModels";


export interface Storage {
    getAll(collectionName: string): Promise<(VehicleModel | null)[]>;
    getById(collectionName: string, id: VehicleID): Promise<VehicleModel | null | undefined>;
    create(collectionName: string, data: any): Promise<VehicleModel>;
    update(collectionName: string, id: VehicleID, data: any): Promise<VehicleModel>;
    delete(collectionName: string, id: VehicleID): Promise<void>;
    deleteAll(collectionName: string): Promise<void>;
}

export class LocalStorage implements Storage {
    async getAll(collectionName: string): Promise<VehicleModel[]> {
        return JSON.parse(localStorage.getItem(collectionName) as string) || [];
    }

    async getById(collectionName: string, id: string): Promise<VehicleModel | null | undefined> {
        const items = await this.getAll(collectionName);
        const result = items.find(i => i.id == id);
        return result;
    }

    async create(collectionName: string, data: any): Promise<VehicleModel> {
        const items = await this.getAll(collectionName);
        const record = Object.assign({}, data, { id: generateId() });
        items.push(record);
        localStorage.setItem(collectionName, JSON.stringify(items));

        return record;
    }

    async update(collectionName: string, id: string, data: any): Promise<VehicleModel> {
        const items = await this.getAll(collectionName);
        const index = items.findIndex(i => i.id == id);
        if (index == -1) {
            throw new ReferenceError(`Vehicle ${id} not found in "${collectionName}"`);
        }
        const record = Object.assign({}, data, { id });
        items[index] = record;
        localStorage.setItem(collectionName, JSON.stringify(items));

        return record;
    }

    async delete(collectionName: string, id: string): Promise<void> {
        const items = await this.getAll(collectionName);
        const index = items.findIndex(i => i.id == id);
        if (index == -1) {
            throw new ReferenceError(`Vehicle ${id} not found in "${collectionName}"`);
        }
        items.splice(index, 1);
        localStorage.setItem(collectionName, JSON.stringify(items));
    }

    async deleteAll(collectionName: string): Promise<void> {
        delete localStorage[collectionName];
    }
}