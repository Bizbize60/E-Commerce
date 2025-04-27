import { CartItemDto } from './CartItemDto';
import { CustomerDto } from './CustomerDto';

export interface CartDto {
	id: number;
	user: CustomerDto;
	cartItems: CartItemDto[];
}
