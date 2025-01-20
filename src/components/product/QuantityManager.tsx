import React, { useState } from 'react';

const QuantityManager: React.FC<{
	setFunc: React.Dispatch<React.SetStateAction<number>>;
	quantity: number;
}> = (props) => {
	const [quantity, setQuantity] = useState(props.quantity);

	const insreaseCount = () => {
		const value = quantity + 1;
		setQuantity(value);
		props.setFunc(value);
	};

	const decreaseCount = () => {
		const value = quantity == 1 ? 1 : quantity - 1;
		setQuantity(value);
		props.setFunc(value);
	};

	return (
		<div className='input-group w-auto'>
			<button className='btn btn-outline-secondary' onClick={decreaseCount}>
				-
			</button>
			<span className='input-group-text text-center px-2 border border-secondary'>{quantity} Adet </span>
			<button className='btn btn-outline-secondary' onClick={insreaseCount}>
				+
			</button>
		</div>
	);
};

export default React.memo(QuantityManager);
