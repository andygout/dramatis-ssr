import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CreditedEntities } from '.';

const AppendedCoCreditedEntities = props => {

	const { coCreditedEntities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(with&nbsp;</Fragment>

			<CreditedEntities creditedEntities={coCreditedEntities} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCoCreditedEntities;
