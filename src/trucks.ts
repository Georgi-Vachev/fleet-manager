import { setupPage } from "./dom/vehicleEditor";
import { TruckService } from "./data/TruckService";
import { Collection } from "./data/Collection";
import { LocalStorage } from "./data/Storage";

const storage = new LocalStorage();
const collection = new Collection(storage, 'trucks');
const truckService = new TruckService(collection)

setupPage('trucks', truckService);