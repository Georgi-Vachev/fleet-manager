import { Collection } from "./data/Collection";
import { LocalStorage } from "./data/Storage";
import { CarModel } from "./data/VehicleModels";
import { TruckModel } from "./data/VehicleModels";

const vehicleId: string = new URLSearchParams(window.location.search).get('id') as string;
const vehicleType: string = new URLSearchParams(window.location.search).get('type') as string;
const detailsSection = document.getElementsByClassName('details')[0];
const rentalSection = document.getElementsByClassName('rental')[0];
const endContractBtn = document.getElementById('endContract');
const changeRenterBtn = document.getElementById('changeRenter');

const storage = new LocalStorage();
const collection = new Collection(storage, vehicleType)

async function getVehicleInfo() {
    const vehicleInfo: CarModel | TruckModel = await collection.getById(vehicleId) as CarModel | TruckModel;
    if (vehicleType == 'cars') {
        fillCarInfo(vehicleInfo as CarModel);
    } else if (vehicleType == 'trucks') {
        fillTruckInfo(vehicleInfo as TruckModel);
    }

    endContractBtn?.addEventListener('click', async () => {
        vehicleInfo.rentedTo = '';
        await collection.update(vehicleId, vehicleInfo)
        rentalSection.childNodes[3].childNodes[1].textContent = 'N/A';
        (document.getElementById('endContract') as HTMLButtonElement).style.display = 'none';
    })

    changeRenterBtn?.addEventListener('click', async (e) => {
        e.preventDefault();

        const inputName = document.getElementsByName('name')[0] as HTMLInputElement;
        vehicleInfo.rentedTo = inputName.value;
        if (inputName.value) {
            inputName.value = '';
            await collection.update(vehicleId, vehicleInfo)
            rentalSection.childNodes[3].childNodes[1].textContent = vehicleInfo.rentedTo;
            (document.getElementById('endContract') as HTMLButtonElement).style.display = 'inline-block';
        }
    })
}

async function fillCarInfo(car: CarModel) {
    (document.getElementById('vehicleName') as HTMLHeadElement).textContent = `${car?.make} ${car?.model}`
    detailsSection.childNodes[1].childNodes[1].textContent = car?.id as string;
    detailsSection.childNodes[3].childNodes[1].textContent = car.bodyType as string;
    detailsSection.childNodes[5].childNodes[1].textContent = car.numberOfSeats as unknown as string;
    detailsSection.childNodes[7].childNodes[1].textContent = car.transmission[0].toUpperCase() + car.transmission.slice(1);
    detailsSection.childNodes[9].childNodes[1].textContent = `$${car.rentalPrice}/day` as unknown as string;
    rentalSection.childNodes[1].childNodes[1].textContent = car.rentedTo ? 'Rented' : 'Available';
    if (car.rentedTo) {
        rentalSection.childNodes[3].childNodes[1].textContent = car.rentedTo;
        (document.getElementById('endContract') as HTMLButtonElement).style.display = 'inline-block';
    } else {
        rentalSection.childNodes[3].childNodes[1].textContent = 'N/A';
        (document.getElementById('endContract') as HTMLButtonElement).style.display = 'none';
    }

}

async function fillTruckInfo(truck: TruckModel) {

    (document.getElementById('vehicleName') as HTMLHeadElement).textContent = `${truck?.make} ${truck?.model}`
    detailsSection.childNodes[1].childNodes[1].textContent = truck?.id as string;
    detailsSection.childNodes[5].childNodes[0].remove()
    detailsSection.childNodes[5].remove()
    detailsSection.childNodes[3].childNodes[0].textContent = 'Cargo Type';
    detailsSection.childNodes[3].childNodes[1].textContent = truck.cargoType[0].toUpperCase() + truck.cargoType.slice(1) as string;
    detailsSection.childNodes[6].childNodes[0].textContent = 'Capacity';
    detailsSection.childNodes[6].childNodes[1].textContent = truck.capacity + ' tons' as unknown as string;
    detailsSection.childNodes[8].childNodes[1].textContent = `$${truck.rentalPrice}/day` as unknown as string;
    rentalSection.childNodes[1].childNodes[1].textContent = truck.rentedTo ? 'Rented' : 'Available';

    if (truck.rentedTo != '') {
        rentalSection.childNodes[3].childNodes[1].textContent = truck.rentedTo;
        (document.getElementById('endContract') as HTMLButtonElement).hidden = false;
    } else {
        rentalSection.childNodes[3].childNodes[1].textContent = 'N/A';
        (document.getElementById('endContract') as HTMLButtonElement).hidden = true;
    }

}



getVehicleInfo();