import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { formatDate } from '../lib/format-date';

const AppendedProductionDates = props => {

	const { startDate, endDate } = props;

	return (
		<Fragment>&nbsp;({ formatDate(startDate) } to { formatDate(endDate) })</Fragment>
	);

};

export default AppendedProductionDates;
