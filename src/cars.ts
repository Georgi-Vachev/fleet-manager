import { setupPage } from "./dom/vehicleEditor";
import { LocalStorage } from "./data/Storage";
import { Collection } from "./data/Collection";
import { CarService } from "./data/CarService";

const storage = new LocalStorage();
const collection = new Collection(storage, 'cars');
const carService = new CarService(collection)

setupPage('cars', carService);
