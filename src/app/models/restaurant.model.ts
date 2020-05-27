import { LocationData } from './location-data';
import { Food } from './food.model';

export class Restaurant {
    uid: string;
    photo: string;
    numero: number;
    reservation: string;
    foods: Food[];
    location: LocationData;
    constructor() {
    }
}
