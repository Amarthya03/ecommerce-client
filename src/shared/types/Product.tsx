export interface Product {
	id: number;
	name: string;
	price: number;
	discount: number | undefined;
	brand: string;
	image: string;
	info: string;
	color: string;
	rating: number;
	category: string;
	sizes: string[];
}
