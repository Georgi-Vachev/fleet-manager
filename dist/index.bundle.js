/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data/CarService.ts":
/*!********************************!*\
  !*** ./src/data/CarService.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarService = void 0;
const Service_1 = __webpack_require__(/*! ./Service */ "./src/data/Service.ts");
const VehicleModels_1 = __webpack_require__(/*! ./VehicleModels */ "./src/data/VehicleModels.ts");
class CarService extends Service_1.DataService {
    parseRecord(record) {
        const data = record;
        const result = new VehicleModels_1.Car(data.id, data.make, data.model, data.rentalPrice, data.rentedTo, data.bodyType, data.numberOfSeats, data.transmission);
        return result;
    }
    validate(data) {
        if (typeof data.make != 'string') {
            throw new TypeError('Incompatible record. Invalid property "make"');
        }
        if (typeof data.model != 'string') {
            throw new TypeError('Incompatible record. Invalid property "moidel"');
        }
        if (typeof data.rentalPrice != 'number') {
            throw new TypeError('Incompatible record. Invalid property "retalPrice"');
        }
        if (typeof data.rentedTo != 'string' && typeof data.model != null) {
            throw new TypeError('Incompatible record. Invalid property "rentedTo"');
        }
        if (typeof data.bodyType != 'string') {
            throw new TypeError('Incompatible record. Invalid property "bodyType"');
        }
        if (typeof data.numberOfSeats != 'number') {
            throw new TypeError('Incompatible record. Invalid property "numberOfSeats"');
        }
        if (typeof data.transmission != 'string') {
            throw new TypeError('Incompatible record. Invalid property "transmission"');
        }
    }
}
exports.CarService = CarService;


/***/ }),

/***/ "./src/data/Collection.ts":
/*!********************************!*\
  !*** ./src/data/Collection.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collection = void 0;
class Collection {
    constructor(storage, name) {
        this.storage = storage;
        this.name = name;
    }
    getAll() {
        return this.storage.getAll(this.name);
    }
    getById(id) {
        return this.storage.getById(this.name, id);
    }
    create(data) {
        return this.storage.create(this.name, data);
    }
    update(id, data) {
        return this.storage.update(this.name, id, data);
    }
    delete(id) {
        return this.storage.delete(this.name, id);
    }
}
exports.Collection = Collection;


/***/ }),

/***/ "./src/data/Service.ts":
/*!*****************************!*\
  !*** ./src/data/Service.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataService = void 0;
class DataService {
    constructor(collection) {
        this.collection = collection;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const records = (yield this.collection.getAll()).map(r => this.parseRecord(r));
            return records;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.collection.getById(id);
            return this.parseRecord(record);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate(data);
            const record = yield this.collection.create(data);
            return this.parseRecord(record);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate(data);
            const record = yield this.collection.update(id, data);
            return this.parseRecord(record);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.delete(id);
        });
    }
}
exports.DataService = DataService;


/***/ }),

/***/ "./src/data/Storage.ts":
/*!*****************************!*\
  !*** ./src/data/Storage.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStorage = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
class LocalStorage {
    getAll(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(localStorage.getItem(collectionName)) || [];
        });
    }
    getById(collectionName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(collectionName);
            const result = items.find(i => i.id == id);
            return result;
        });
    }
    create(collectionName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(collectionName);
            const record = Object.assign({}, data, { id: (0, util_1.generateId)() });
            items.push(record);
            localStorage.setItem(collectionName, JSON.stringify(items));
            return record;
        });
    }
    update(collectionName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(collectionName);
            const index = items.findIndex(i => i.id == id);
            if (index == -1) {
                throw new ReferenceError(`Vehicle ${id} not found in "${collectionName}"`);
            }
            const record = Object.assign({}, data, { id });
            items[index] = record;
            localStorage.setItem(collectionName, JSON.stringify(items));
            return record;
        });
    }
    delete(collectionName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(collectionName);
            const index = items.findIndex(i => i.id == id);
            if (index == -1) {
                throw new ReferenceError(`Vehicle ${id} not found in "${collectionName}"`);
            }
            items.splice(index, 1);
            localStorage.setItem(collectionName, JSON.stringify(items));
        });
    }
    deleteAll(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            delete localStorage[collectionName];
        });
    }
}
exports.LocalStorage = LocalStorage;


/***/ }),

/***/ "./src/data/VehicleModels.ts":
/*!***********************************!*\
  !*** ./src/data/VehicleModels.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Truck = exports.Car = void 0;
class Car {
    constructor(id, make, model, rentalPrice, rentedTo, bodyType, numberOfSeats, transmission) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.rentalPrice = rentalPrice;
        this.rentedTo = rentedTo;
        this.bodyType = bodyType;
        this.numberOfSeats = numberOfSeats;
        this.transmission = transmission;
    }
}
exports.Car = Car;
class Truck {
    constructor(id, make, model, rentalPrice, rentedTo, cargoType, capacity) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.rentalPrice = rentalPrice;
        this.rentedTo = rentedTo;
        this.cargoType = cargoType;
        this.capacity = capacity;
    }
}
exports.Truck = Truck;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const CarService_1 = __webpack_require__(/*! ./data/CarService */ "./src/data/CarService.ts");
const Collection_1 = __webpack_require__(/*! ./data/Collection */ "./src/data/Collection.ts");
const Storage_1 = __webpack_require__(/*! ./data/Storage */ "./src/data/Storage.ts");
console.log('dashboard');
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = new Storage_1.LocalStorage();
        const collection = new Collection_1.Collection(storage, 'cars');
        const carService = new CarService_1.CarService(collection);
        console.log(yield carService.getAll());
        const carData = {
            make: 'VW',
            model: 'Golf',
            rentalPrice: 120,
            rentedTo: 'Georgi Vachev',
            bodyType: "hatchback",
            numberOfSeats: 4,
            transmission: 'manual'
        };
        const car = yield carService.create(carData);
        console.log(car);
        console.log(yield carService.getAll());
    });
}
start();


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateId = void 0;
function generateId() {
    return '0000-0000'.replace(/0/g, () => (Math.random() * 16 | 0).toString(16));
}
exports.generateId = generateId;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixtQkFBTyxDQUFDLG1EQUFtQjtBQUNoRCxxQkFBcUIsbUJBQU8sQ0FBQyxtREFBbUI7QUFDaEQsa0JBQWtCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkNhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7VUNObEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvLi9zcmMvZGF0YS9DYXJTZXJ2aWNlLnRzIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvLi9zcmMvZGF0YS9Db2xsZWN0aW9uLnRzIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvLi9zcmMvZGF0YS9TZXJ2aWNlLnRzIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvLi9zcmMvZGF0YS9TdG9yYWdlLnRzIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvLi9zcmMvZGF0YS9WZWhpY2xlTW9kZWxzLnRzIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZmxlZXQtbWFuYWdlci8uL3NyYy91dGlsLnRzIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmxlZXQtbWFuYWdlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2ZsZWV0LW1hbmFnZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ2FyU2VydmljZSA9IHZvaWQgMDtcclxuY29uc3QgU2VydmljZV8xID0gcmVxdWlyZShcIi4vU2VydmljZVwiKTtcclxuY29uc3QgVmVoaWNsZU1vZGVsc18xID0gcmVxdWlyZShcIi4vVmVoaWNsZU1vZGVsc1wiKTtcclxuY2xhc3MgQ2FyU2VydmljZSBleHRlbmRzIFNlcnZpY2VfMS5EYXRhU2VydmljZSB7XHJcbiAgICBwYXJzZVJlY29yZChyZWNvcmQpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVjb3JkO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBWZWhpY2xlTW9kZWxzXzEuQ2FyKGRhdGEuaWQsIGRhdGEubWFrZSwgZGF0YS5tb2RlbCwgZGF0YS5yZW50YWxQcmljZSwgZGF0YS5yZW50ZWRUbywgZGF0YS5ib2R5VHlwZSwgZGF0YS5udW1iZXJPZlNlYXRzLCBkYXRhLnRyYW5zbWlzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEubWFrZSAhPSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjb3JkLiBJbnZhbGlkIHByb3BlcnR5IFwibWFrZVwiJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5tb2RlbCAhPSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjb3JkLiBJbnZhbGlkIHByb3BlcnR5IFwibW9pZGVsXCInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnJlbnRhbFByaWNlICE9ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNvcmQuIEludmFsaWQgcHJvcGVydHkgXCJyZXRhbFByaWNlXCInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnJlbnRlZFRvICE9ICdzdHJpbmcnICYmIHR5cGVvZiBkYXRhLm1vZGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY29yZC4gSW52YWxpZCBwcm9wZXJ0eSBcInJlbnRlZFRvXCInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmJvZHlUeXBlICE9ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNvcmQuIEludmFsaWQgcHJvcGVydHkgXCJib2R5VHlwZVwiJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5udW1iZXJPZlNlYXRzICE9ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNvcmQuIEludmFsaWQgcHJvcGVydHkgXCJudW1iZXJPZlNlYXRzXCInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnRyYW5zbWlzc2lvbiAhPSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjb3JkLiBJbnZhbGlkIHByb3BlcnR5IFwidHJhbnNtaXNzaW9uXCInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DYXJTZXJ2aWNlID0gQ2FyU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Db2xsZWN0aW9uID0gdm9pZCAwO1xyXG5jbGFzcyBDb2xsZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbiAgICBnZXRBbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRBbGwodGhpcy5uYW1lKTtcclxuICAgIH1cclxuICAgIGdldEJ5SWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEJ5SWQodGhpcy5uYW1lLCBpZCk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGUoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuY3JlYXRlKHRoaXMubmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnVwZGF0ZSh0aGlzLm5hbWUsIGlkLCBkYXRhKTtcclxuICAgIH1cclxuICAgIGRlbGV0ZShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZGVsZXRlKHRoaXMubmFtZSwgaWQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EYXRhU2VydmljZSA9IHZvaWQgMDtcclxuY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29sbGVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICBnZXRBbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjb3JkcyA9ICh5aWVsZCB0aGlzLmNvbGxlY3Rpb24uZ2V0QWxsKCkpLm1hcChyID0+IHRoaXMucGFyc2VSZWNvcmQocikpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldEJ5SWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSB5aWVsZCB0aGlzLmNvbGxlY3Rpb24uZ2V0QnlJZChpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmVjb3JkKHJlY29yZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGUoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHlpZWxkIHRoaXMuY29sbGVjdGlvbi5jcmVhdGUoZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmVjb3JkKHJlY29yZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSB5aWVsZCB0aGlzLmNvbGxlY3Rpb24udXBkYXRlKGlkLCBkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRlbGV0ZShpZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZGVsZXRlKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRhdGFTZXJ2aWNlID0gRGF0YVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Mb2NhbFN0b3JhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xyXG5jbGFzcyBMb2NhbFN0b3JhZ2Uge1xyXG4gICAgZ2V0QWxsKGNvbGxlY3Rpb25OYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oY29sbGVjdGlvbk5hbWUpKSB8fCBbXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldEJ5SWQoY29sbGVjdGlvbk5hbWUsIGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB5aWVsZCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGl0ZW1zLmZpbmQoaSA9PiBpLmlkID09IGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNyZWF0ZShjb2xsZWN0aW9uTmFtZSwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0geWllbGQgdGhpcy5nZXRBbGwoY29sbGVjdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IGlkOiAoMCwgdXRpbF8xLmdlbmVyYXRlSWQpKCkgfSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2gocmVjb3JkKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY29sbGVjdGlvbk5hbWUsIEpTT04uc3RyaW5naWZ5KGl0ZW1zKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoY29sbGVjdGlvbk5hbWUsIGlkLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB5aWVsZCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBWZWhpY2xlICR7aWR9IG5vdCBmb3VuZCBpbiBcIiR7Y29sbGVjdGlvbk5hbWV9XCJgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IGlkIH0pO1xyXG4gICAgICAgICAgICBpdGVtc1tpbmRleF0gPSByZWNvcmQ7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGNvbGxlY3Rpb25OYW1lLCBKU09OLnN0cmluZ2lmeShpdGVtcykpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlKGNvbGxlY3Rpb25OYW1lLCBpZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0geWllbGQgdGhpcy5nZXRBbGwoY29sbGVjdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW1zLmZpbmRJbmRleChpID0+IGkuaWQgPT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgVmVoaWNsZSAke2lkfSBub3QgZm91bmQgaW4gXCIke2NvbGxlY3Rpb25OYW1lfVwiYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY29sbGVjdGlvbk5hbWUsIEpTT04uc3RyaW5naWZ5KGl0ZW1zKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkZWxldGVBbGwoY29sbGVjdGlvbk5hbWUpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBkZWxldGUgbG9jYWxTdG9yYWdlW2NvbGxlY3Rpb25OYW1lXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkxvY2FsU3RvcmFnZSA9IExvY2FsU3RvcmFnZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5UcnVjayA9IGV4cG9ydHMuQ2FyID0gdm9pZCAwO1xyXG5jbGFzcyBDYXIge1xyXG4gICAgY29uc3RydWN0b3IoaWQsIG1ha2UsIG1vZGVsLCByZW50YWxQcmljZSwgcmVudGVkVG8sIGJvZHlUeXBlLCBudW1iZXJPZlNlYXRzLCB0cmFuc21pc3Npb24pIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5tYWtlID0gbWFrZTtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5yZW50YWxQcmljZSA9IHJlbnRhbFByaWNlO1xyXG4gICAgICAgIHRoaXMucmVudGVkVG8gPSByZW50ZWRUbztcclxuICAgICAgICB0aGlzLmJvZHlUeXBlID0gYm9keVR5cGU7XHJcbiAgICAgICAgdGhpcy5udW1iZXJPZlNlYXRzID0gbnVtYmVyT2ZTZWF0cztcclxuICAgICAgICB0aGlzLnRyYW5zbWlzc2lvbiA9IHRyYW5zbWlzc2lvbjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNhciA9IENhcjtcclxuY2xhc3MgVHJ1Y2sge1xyXG4gICAgY29uc3RydWN0b3IoaWQsIG1ha2UsIG1vZGVsLCByZW50YWxQcmljZSwgcmVudGVkVG8sIGNhcmdvVHlwZSwgY2FwYWNpdHkpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5tYWtlID0gbWFrZTtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5yZW50YWxQcmljZSA9IHJlbnRhbFByaWNlO1xyXG4gICAgICAgIHRoaXMucmVudGVkVG8gPSByZW50ZWRUbztcclxuICAgICAgICB0aGlzLmNhcmdvVHlwZSA9IGNhcmdvVHlwZTtcclxuICAgICAgICB0aGlzLmNhcGFjaXR5ID0gY2FwYWNpdHk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UcnVjayA9IFRydWNrO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhclNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2RhdGEvQ2FyU2VydmljZVwiKTtcclxuY29uc3QgQ29sbGVjdGlvbl8xID0gcmVxdWlyZShcIi4vZGF0YS9Db2xsZWN0aW9uXCIpO1xyXG5jb25zdCBTdG9yYWdlXzEgPSByZXF1aXJlKFwiLi9kYXRhL1N0b3JhZ2VcIik7XHJcbmNvbnNvbGUubG9nKCdkYXNoYm9hcmQnKTtcclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZV8xLkxvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb24oc3RvcmFnZSwgJ2NhcnMnKTtcclxuICAgICAgICBjb25zdCBjYXJTZXJ2aWNlID0gbmV3IENhclNlcnZpY2VfMS5DYXJTZXJ2aWNlKGNvbGxlY3Rpb24pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHlpZWxkIGNhclNlcnZpY2UuZ2V0QWxsKCkpO1xyXG4gICAgICAgIGNvbnN0IGNhckRhdGEgPSB7XHJcbiAgICAgICAgICAgIG1ha2U6ICdWVycsXHJcbiAgICAgICAgICAgIG1vZGVsOiAnR29sZicsXHJcbiAgICAgICAgICAgIHJlbnRhbFByaWNlOiAxMjAsXHJcbiAgICAgICAgICAgIHJlbnRlZFRvOiAnR2VvcmdpIFZhY2hldicsXHJcbiAgICAgICAgICAgIGJvZHlUeXBlOiBcImhhdGNoYmFja1wiLFxyXG4gICAgICAgICAgICBudW1iZXJPZlNlYXRzOiA0LFxyXG4gICAgICAgICAgICB0cmFuc21pc3Npb246ICdtYW51YWwnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjYXIgPSB5aWVsZCBjYXJTZXJ2aWNlLmNyZWF0ZShjYXJEYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjYXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHlpZWxkIGNhclNlcnZpY2UuZ2V0QWxsKCkpO1xyXG4gICAgfSk7XHJcbn1cclxuc3RhcnQoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZW5lcmF0ZUlkID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBnZW5lcmF0ZUlkKCkge1xyXG4gICAgcmV0dXJuICcwMDAwLTAwMDAnLnJlcGxhY2UoLzAvZywgKCkgPT4gKE1hdGgucmFuZG9tKCkgKiAxNiB8IDApLnRvU3RyaW5nKDE2KSk7XHJcbn1cclxuZXhwb3J0cy5nZW5lcmF0ZUlkID0gZ2VuZXJhdGVJZDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9