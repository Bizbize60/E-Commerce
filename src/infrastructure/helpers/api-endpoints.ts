const baseUrl = 'http://localhost:5021/api';

export default {
	Categories: {
		List: `${baseUrl}/Categories`,
	},
	Products: {
		List: `${baseUrl}/Products`,
		GetAllByCategoryId: `${baseUrl}/Products/GetAllByCategoryId`,
	},
	Carts: {
		AddProduct: `${baseUrl}/Carts/AddProduct`,
		RemoveProduct: `${baseUrl}/Carts/RemoveProduct`,
		GetCartOfCustomer: `${baseUrl}/Carts/GetCartOfCustomer`,
		UpdateCartItemQuantity: `${baseUrl}/Carts/UpdateCartItemQuantity`,
	},
};
