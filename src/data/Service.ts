import { Collection } from "./Collection";
import { VehicleModel, VehicleID } from "./VehicleModels";


export interface Service<T, TData> {
    getAll(): Promise<(T | null)[]>;
    getById(id: VehicleID): Promise<T>;
    create(data: TData): Promise<T>;
    update(id: VehicleID, data: TData): Promise<T>;
    delete(id: VehicleID): Promise<void>;
    deleteAll(): Promise<void>;
}


export abstract class DataService<T, TData> implements Service<T, TData> {
    constructor(
        private collection: Collection
    ) { }

    async getAll(): Promise<(T | null)[]> {
        const records = (await this.collection.getAll()).map(r => this.parseRecord(r));
        return records;
    }

    async getById(id: string): Promise<T> {
        const record = await this.collection.getById(id);
        return this.parseRecord(record);
    }

    async create(data: TData): Promise<T> {
        this.validate(data);
        const record = await this.collection.create(data);
        return this.parseRecord(record);
    }

    async update(id: string, data: TData): Promise<T> {
        this.validate(data);
        const record = await this.collection.update(id, data);
        return this.parseRecord(record);
    }

    async delete(id: string): Promise<void> {
        return this.collection.delete(id);
    }

    async deleteAll(): Promise<void> {
        return this.collection.deleteAll();
    }

    protected abstract parseRecord(record: VehicleModel | null | undefined): T
    protected abstract validate(data: any): void
}

