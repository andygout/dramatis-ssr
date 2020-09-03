export default differentiator => {

	if (!differentiator) return '';

	const differentiatorDisplayValue = isNaN(differentiator) ? differentiator : `#${differentiator}`;

	return ` (${differentiatorDisplayValue})`;

};
