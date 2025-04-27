import React from 'react';

const Spinner = (props: { color?: 'primary' | 'secondary' | 'success' | 'danger' }) => {
	const color = props.color != null ? props.color : 'primary';

	return (
		<div className={'spinner-border text-' + color} role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	);
};

export default React.memo(Spinner);
