import { Fragment } from 'preact';

const AppendedFormatAndYear = props => {

	const { format, year } = props;

	const displayText = [format, year].filter(Boolean).join(', ');

	return (
		<Fragment>{` (${displayText})`}</Fragment>
	);

};

export default AppendedFormatAndYear;
