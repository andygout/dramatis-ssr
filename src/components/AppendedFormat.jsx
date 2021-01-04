import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedFormat = props => {

	const { format } = props;

	return (
		<Fragment>&nbsp;({ format })</Fragment>
	);

};

export default AppendedFormat;
