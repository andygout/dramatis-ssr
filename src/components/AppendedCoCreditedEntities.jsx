import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedCoCreditedEntities = props => {

	const { coCreditedEntities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(with&nbsp;</Fragment>

			<CommaSeparatedInstanceLinks instances={coCreditedEntities} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCoCreditedEntities;
