import { Fragment } from 'preact';

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
