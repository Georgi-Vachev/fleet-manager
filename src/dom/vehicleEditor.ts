import { CarData } from "../data/CarService";
import { TruckData } from "../data/TruckService";
import { DataService } from "../data/Service";
import { CarModel, TruckModel } from "../data/VehicleModels";

const newSection = document.getElementById('newSection') as HTMLFormElement;
const editSection = document.getElementById('editSection') as HTMLFormElement;
const newButton = document.getElementById('newButton') as HTMLButtonElement;
const newForm = document.getElementById('newForm') as HTMLFormElement;

const make = document.getElementsByName('make');
const model = document.getElementsByName('model');
const bodyType = document.getElementsByName('bodyType');
const numberOfSeats = document.getElementsByName('numberOfSeats');
const transmission = document.getElementsByName('transmission');
const rentalPrice = document.getElementsByName('rentalPrice');
const cargoType = document.getElementsByName('cargoType');
const capacity = document.getElementsByName('capacity');

export async function setupPage(vehicleType: string, vehicleService: DataService<CarModel | TruckModel, CarData | TruckData>) {
    newSection.style.display = 'none';
    editSection.style.display = 'none';

    // show/hide new record form on new car button click
    newButton.addEventListener('click', () => {
        if (newSection.style.display == 'none') {
            newSection.style.display = 'block';
            editSection.style.display = 'none';
        } else {
            newSection.style.display = 'none';
        }
    });

    // when edit button is clicked, populate edit form with row info (modify if new type of vehicle or another column is added)
    [...document.getElementsByClassName('edit')].forEach(button => {
        button.addEventListener('click', () => {
            editSection.style.display = 'block';
            newSection.style.display = 'none';
            const rowInfo = button.parentElement?.parentElement as HTMLElement;
            (make[1] as HTMLInputElement).value = rowInfo.children[1].textContent as string;
            (model[1] as HTMLInputElement).value = rowInfo.children[2].textContent as string;
            if (vehicleType == 'cars') {
                (bodyType[1] as HTMLSelectElement).value = rowInfo.children[3].textContent?.toLowerCase() as string;
                (numberOfSeats[1] as HTMLSelectElement).value = rowInfo.children[4].textContent?.toLowerCase() as string;
                (transmission[1] as HTMLSelectElement).value = rowInfo.children[5].textContent?.toLowerCase() as string;
                (rentalPrice[1] as HTMLInputElement).value = (rowInfo.children[6].textContent?.match(/(\d+)/) as Array<any>)[0] as string;
            } else if (vehicleType == 'trucks') {
                (cargoType[1] as HTMLSelectElement).value = rowInfo.children[3].textContent?.split(" ")[0].toLowerCase() as string;
                (capacity[1] as HTMLInputElement).value = (rowInfo.children[4].textContent?.match(/(\d+)\.?(\d+)?/) as Array<any>)[0] as string;
                (rentalPrice[1] as HTMLInputElement).value = (rowInfo.children[5].textContent?.match(/(\d+)/) as Array<any>)[0] as string;
            }
        })
    })


    document.getElementById('addVehicle')?.addEventListener('click', async (event) => {
        event.preventDefault();
        let vehicleData: CarData | TruckData = {} as CarData | TruckData;

        if (vehicleType == 'cars') {
            vehicleData = {
                make: (make[0] as HTMLInputElement).value,
                model: (model[0] as HTMLInputElement).value,
                rentalPrice: Number((rentalPrice[0] as HTMLInputElement).value),
                rentedTo: 'Georgi Vachev',
                bodyType: (bodyType[0] as HTMLSelectElement).value,
                numberOfSeats: Number((numberOfSeats[0] as HTMLSelectElement).value),
                transmission: (transmission[0] as HTMLSelectElement).value
            };
        } else if (vehicleType == 'trucks') {
            vehicleData = {
                make: (make[0] as HTMLInputElement).value,
                model: (model[0] as HTMLInputElement).value,
                rentalPrice: Number((rentalPrice[0] as HTMLInputElement).value),
                rentedTo: 'Georgi Vachev',
                cargoType: (cargoType[0] as HTMLSelectElement).value as 'box' | 'flatbed' | 'van',
                capacity: Number((capacity[0] as HTMLInputElement).value)
            };
        }
        console.log(vehicleData)
        await vehicleService.create(vehicleData);
        newForm.reset();
        console.log(await vehicleService.getAll())
    })

    const vehicles: (CarModel | TruckModel | null)[] = await vehicleService.getAll();
    vehicles.forEach(v => console.log(v))
}