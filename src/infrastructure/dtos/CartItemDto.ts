import { ProductDto } from './ProductDto';

export interface CartItemDto {
	cartId: number;
	productId: number;
	quantity: number;
	product: ProductDto;
}
