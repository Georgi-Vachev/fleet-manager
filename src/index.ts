import { CarService } from "./data/CarService";
import { TruckService } from "./data/TruckService";
import { Collection } from "./data/Collection";
import { LocalStorage } from "./data/Storage";
import { CarModel } from "./data/VehicleModels";
import { TruckModel } from "./data/VehicleModels";

const storage = new LocalStorage();

const carCollection = new Collection(storage, 'cars');
const truckCollection = new Collection(storage, 'trucks');

const carService = new CarService(carCollection);
const truckService = new TruckService(truckCollection);

let vehiclesShown = 'all';
let onlyAvailable = false;

const tableBody = document.getElementsByTagName('tbody')[0];
const vehicleType = document.getElementsByName('type')[0] as HTMLSelectElement;
const filterBtn = document.getElementById('filterBtn');
const checkAvailableOnly = document.getElementsByName('availableOnly')[0] as HTMLInputElement;

vehicleType.addEventListener('change', () => {
    vehiclesShown = vehicleType.value;
});

async function populateTable() {

    if (vehiclesShown == 'all' || vehiclesShown == 'cars') {
        const cars = await carService.getAll();
        cars.forEach(car => {
            if (onlyAvailable && car?.rentedTo) {

            } else {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td')
                tdId.textContent = car?.id as string;
                tr.appendChild(tdId);
                const tdType = document.createElement('td');
                tdType.textContent = 'Car';
                tr.appendChild(tdType);
                const tdMake = document.createElement('td');
                tdMake.textContent = car?.make as string;
                tr.appendChild(tdMake);
                const tdModel = document.createElement('td');
                tdModel.textContent = car?.model as string;
                tr.appendChild(tdModel);
                const tdRentalPrice = document.createElement('td')
                tdRentalPrice.textContent = `$${(car as CarModel).rentalPrice}/day` as unknown as string;
                tr.appendChild(tdRentalPrice);
                const tdRented = document.createElement('td');
                tdRented.textContent = car?.rentedTo ? 'Rented' : 'Available';
                tr.appendChild(tdRented);
                const tdDetails = document.createElement('td');
                const detailsLink = document.createElement('a');
                detailsLink.textContent = 'Show Details';
                detailsLink.className = 'details-link';
                detailsLink.href = `/details.html?id=${car?.id}&type=cars`;
                tdDetails.appendChild(detailsLink);
                tr.appendChild(tdDetails);
                tableBody.appendChild(tr);
            }
        })
    }

    if (vehiclesShown == 'all' || vehiclesShown == 'trucks') {
        const trucks = await truckService.getAll();
        trucks.forEach(truck => {
            if (onlyAvailable && truck?.rentedTo) {

            } else {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td')
                tdId.textContent = truck?.id as string;
                tr.appendChild(tdId);
                const tdType = document.createElement('td');
                tdType.textContent = 'Truck';
                tr.appendChild(tdType);
                const tdMake = document.createElement('td');
                tdMake.textContent = truck?.make as string;
                tr.appendChild(tdMake);
                const tdModel = document.createElement('td');
                tdModel.textContent = truck?.model as string;
                tr.appendChild(tdModel);
                const tdRentalPrice = document.createElement('td')
                tdRentalPrice.textContent = `$${(truck as TruckModel).rentalPrice}/day` as unknown as string;
                tr.appendChild(tdRentalPrice);
                const tdRented = document.createElement('td');
                tdRented.textContent = truck?.rentedTo ? 'Rented' : 'Available';
                tr.appendChild(tdRented);
                const tdDetails = document.createElement('td');
                const detailsLink = document.createElement('a');
                detailsLink.textContent = 'Show Details';
                detailsLink.className = 'details-link';
                detailsLink.href = `/details.html?id=${truck?.id}&type=trucks`;
                tdDetails.appendChild(detailsLink);
                tr.appendChild(tdDetails);
                tableBody.appendChild(tr);
            }
        })
    }

}

filterBtn?.addEventListener('click', (e) => {
    onlyAvailable = checkAvailableOnly.checked;
    e.preventDefault();
    tableBody.textContent = '';
    populateTable();
})

populateTable();