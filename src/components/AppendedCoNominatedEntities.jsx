import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { NominatedEntities } from '.';

const AppendedCoNominatedEntities = props => {

	const { coNominatedEntities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(with&nbsp;</Fragment>

			<NominatedEntities nominatedEntities={coNominatedEntities} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCoNominatedEntities;
