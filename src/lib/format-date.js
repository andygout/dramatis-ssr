const formatDate = (dateString, customOptions = {}) => {

	const date = new Date(dateString);

	const defaultOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	};

	const options = Object.assign({}, defaultOptions, customOptions);

	const dateFormatter = new Intl.DateTimeFormat('en-GB', options);

	return dateFormatter
		.formatToParts(date)
		.map(part => {
			// Strip commas from literal parts.
			if (part.type === 'literal') {
				return part.value.replace(/,/g, '');
			}

			// Converts September's short form from 'Sept' to 'Sep'.
			if (
				part.type === 'month' &&
				options.month === 'short' &&
				part.value === 'Sept'
			) {
				return 'Sep';
			}

			return part.value;
		})
		.join('');

};

export default formatDate;
