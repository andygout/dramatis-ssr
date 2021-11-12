import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { Entities } from '.';

const AppendedCoEntities = props => {

	const { coEntities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(with&nbsp;</Fragment>

			<Entities entities={coEntities} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCoEntities;
