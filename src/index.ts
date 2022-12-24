import { CarService } from "./data/CarService";
import { Collection } from "./data/Collection";
import { LocalStorage } from "./data/Storage";

async function start() {
    const storage = new LocalStorage();
    const collection = new Collection(storage, 'cars');
    const carService = new CarService(collection);

    // const carData = {
    //     make: 'VW',
    //     model: 'Golf',
    //     rentalPrice: 120,
    //     rentedTo: 'Georgi Vachev',
    //     bodyType: "hatchback",
    //     numberOfSeats: 4,
    //     transmission: 'manual'
    // };

    await carService.deleteAll();
    console.log(await carService.getAll());
}

start();