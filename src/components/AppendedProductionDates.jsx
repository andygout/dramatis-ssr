import { Fragment } from 'preact';

import formatDate from '../lib/format-date.js';

const AppendedProductionDates = props => {

	const { startDate, endDate } = props;

	const displayText = (() => {
		switch (true) {
			case Boolean(startDate) && Boolean(endDate):
				return `${formatDate(startDate)} to ${formatDate(endDate)}`;

			case Boolean(startDate) && !endDate:
				return `from ${formatDate(startDate)}`;

			case !startDate && Boolean(endDate):
				return `until ${formatDate(endDate)}`;
		}
	})();

	return (
		<Fragment>{` (${displayText})`}</Fragment>
	);

};

export default AppendedProductionDates;
