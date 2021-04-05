import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CreditedEntities } from '.';

const AppendedEntities = props => {

	const { entities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			<CreditedEntities creditedEntities={entities} />

		</Fragment>
	);

};

export default AppendedEntities;
