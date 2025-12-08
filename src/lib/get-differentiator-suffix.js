const getDifferentiatorSuffix = differentiator => {

	if (!differentiator) return '';

	const differentiatorDisplayValue = isNaN(differentiator) ? differentiator : `#${differentiator}`;

	return ` (${differentiatorDisplayValue})`;

};

export default getDifferentiatorSuffix;
