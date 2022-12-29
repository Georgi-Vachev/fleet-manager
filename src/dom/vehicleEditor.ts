import { CarData } from "../data/CarService";
import { TruckData } from "../data/TruckService";
import { DataService } from "../data/Service";
import { CarModel, TruckModel } from "../data/VehicleModels";

const newSection = document.getElementById('newSection') as HTMLFormElement;
const editSection = document.getElementById('editSection') as HTMLFormElement;
const newButton = document.getElementById('newButton') as HTMLButtonElement;

const newForm = document.getElementById('newForm') as HTMLFormElement;
const tableBody = document.getElementsByTagName('tbody')[0];

const make = document.getElementsByName('make');
const model = document.getElementsByName('model');
const bodyType = document.getElementsByName('bodyType');
const numberOfSeats = document.getElementsByName('numberOfSeats');
const transmission = document.getElementsByName('transmission');
const rentalPrice = document.getElementsByName('rentalPrice');
const cargoType = document.getElementsByName('cargoType');
const capacity = document.getElementsByName('capacity');
const saveButton = document.getElementById('saveVehicle');

let vehicleId: string = '';
let vehicleType: string = '';
let vehicleService: DataService<CarModel | TruckModel, CarData | TruckData>;

export async function setupPage(setVehicleType: string, setVehicleService: DataService<CarModel | TruckModel, CarData | TruckData>) {
    newSection.style.display = 'none';
    editSection.style.display = 'none';
    vehicleType = setVehicleType;
    vehicleService = setVehicleService;

    await populateTable();

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

    addNewVehicle();

    (saveButton as HTMLButtonElement).addEventListener('click', async (event) => {
        event.preventDefault();
        let vehicleData: CarData | TruckData = {} as CarData | TruckData;
        if (vehicleType == 'cars') {
            vehicleData = {
                make: (make[1] as HTMLInputElement).value,
                model: (model[1] as HTMLInputElement).value,
                rentalPrice: Number((rentalPrice[1] as HTMLInputElement).value),
                rentedTo: '',
                bodyType: (bodyType[1] as HTMLSelectElement).value,
                numberOfSeats: Number((numberOfSeats[1] as HTMLSelectElement).value),
                transmission: (transmission[1] as HTMLSelectElement).value
            };
        } else if (vehicleType == 'trucks') {
            vehicleData = {
                make: (make[1] as HTMLInputElement).value,
                model: (model[1] as HTMLInputElement).value,
                rentalPrice: Number((rentalPrice[1] as HTMLInputElement).value),
                rentedTo: '',
                cargoType: (cargoType[1] as HTMLSelectElement).value as 'box' | 'flatbed' | 'van',
                capacity: Number((capacity[1] as HTMLInputElement).value)
            };
        }
        await vehicleService.update(vehicleId, vehicleData);
        tableBody.textContent = "";
        await populateTable();
    })

}

function addNewVehicle() {
    document.getElementById('addVehicle')?.addEventListener('click', async (event) => {
        event.preventDefault();
        let vehicleData: CarData | TruckData = {} as CarData | TruckData;
        if (vehicleType == 'cars') {
            vehicleData = {
                make: (make[0] as HTMLInputElement).value,
                model: (model[0] as HTMLInputElement).value,
                rentalPrice: Number((rentalPrice[0] as HTMLInputElement).value),
                rentedTo: '',
                bodyType: (bodyType[0] as HTMLSelectElement).value,
                numberOfSeats: Number((numberOfSeats[0] as HTMLSelectElement).value),
                transmission: (transmission[0] as HTMLSelectElement).value
            };
        } else if (vehicleType == 'trucks') {
            vehicleData = {
                make: (make[0] as HTMLInputElement).value,
                model: (model[0] as HTMLInputElement).value,
                rentalPrice: Number((rentalPrice[0] as HTMLInputElement).value),
                rentedTo: '',
                cargoType: (cargoType[0] as HTMLSelectElement).value as 'box' | 'flatbed' | 'van',
                capacity: Number((capacity[0] as HTMLInputElement).value)
            };
        }
        await vehicleService.create(vehicleData);
        newForm.reset();
        tableBody.textContent = "";
        await populateTable();
    })
}

async function populateTable() {
    const vehicles: (CarModel | TruckModel | null)[] = await vehicleService.getAll();
    vehicles.forEach(vehicle => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        tdId.textContent = vehicle?.id as string;
        tr.appendChild(tdId);
        const tdMake = document.createElement('td')
        tdMake.textContent = vehicle?.make as string;
        tr.appendChild(tdMake);
        const tdModel = document.createElement('td')
        tdModel.textContent = vehicle?.model as string;
        tr.appendChild(tdModel);

        if (vehicleType == 'cars') {
            const tdBodyType = document.createElement('td')
            tdBodyType.textContent = (vehicle as CarModel).bodyType[0].toUpperCase() + (vehicle as CarModel).bodyType.slice(1) as string;
            tr.appendChild(tdBodyType);
            const tdSeats = document.createElement('td')
            tdSeats.textContent = (vehicle as CarModel).numberOfSeats as unknown as string;
            tr.appendChild(tdSeats);
            const tdTransmission = document.createElement('td')
            tdTransmission.textContent = (vehicle as CarModel).transmission[0].toUpperCase() + (vehicle as CarModel).transmission.slice(1) as string;
            tr.appendChild(tdTransmission);
        } else if (vehicleType == 'trucks') {
            const tdCargo = document.createElement('td')
            if ((vehicle as TruckModel).cargoType == 'box') {
                tdCargo.textContent = 'Box truck';
            } else {
                tdCargo.textContent = (vehicle as TruckModel).cargoType[0].toUpperCase() + (vehicle as TruckModel).cargoType.slice(1) as string;
            }
            tr.appendChild(tdCargo);
            const tdSeats = document.createElement('td')
            tdSeats.textContent = `${(vehicle as TruckModel).capacity} tons` as unknown as string;
            tr.appendChild(tdSeats);
        }
        const tdRentalPrice = document.createElement('td')
        tdRentalPrice.textContent = `$${(vehicle as TruckModel).rentalPrice}/day` as unknown as string;
        tr.appendChild(tdRentalPrice);
        const tdBtn = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.classList.add('action', 'edit');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            editSection.style.display = 'block';
            newSection.style.display = 'none';
            const rowInfo = editBtn.parentElement?.parentElement as HTMLElement;
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
            vehicleId = rowInfo.children[0].textContent as string;
        })
        const delBtn = document.createElement('button');
        delBtn.classList.add('action', 'delete');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', async () => {
            const rowInfo = delBtn.parentElement?.parentElement as HTMLElement;
            await vehicleService.delete(rowInfo.children[0].textContent as string);
            tableBody.textContent = "";
            await populateTable();
        })
        tdBtn.appendChild(editBtn);
        tdBtn.appendChild(delBtn);
        tr.appendChild(tdBtn);
        tableBody.appendChild(tr);
    })
}



