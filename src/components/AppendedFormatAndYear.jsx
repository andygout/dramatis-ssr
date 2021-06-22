import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedFormatAndYear = props => {

	const { format, year } = props;

	const displayText = [format, year].filter(Boolean).join(', ');

	return (
		<Fragment>&nbsp;({ displayText })</Fragment>
	);

};

export default AppendedFormatAndYear;
