export interface Food {
    id?: string;
    name: string;
    price: number;
    imagePath: string;
    category: string;
    description: string;
    restaurant: string;
    numberOfItem?: number;
}
