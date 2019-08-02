import React from 'react';
import './Slider.css';

const Slider = ({ref, onChange}) => (
	<input
		ref={ref}
		type="range"
		min="4"
		max="64"
		step="4"
		onChange={onChange}
	/>
);

export default Slider;