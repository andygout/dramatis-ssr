import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { formatDate } from '../lib/format-date.js';

const AppendedDate = props => {

	const { date } = props;

	return (
		<Fragment>
			{` (${formatDate(date)})`}
		</Fragment>
	);

};

export default AppendedDate;
