import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CreditedEntities } from '.';

const AppendedCreativeEntities = props => {

	const { creativeEntities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			<CreditedEntities creditedEntities={creativeEntities} />

		</Fragment>
	);

};

export default AppendedCreativeEntities;
