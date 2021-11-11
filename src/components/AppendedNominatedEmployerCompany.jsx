import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from '.';

const AppendedNominatedEmployerCompany = props => {

	const { nominatedEmployerCompany } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(</Fragment>

			{
				nominatedEmployerCompany.coNominatedMembers?.length > 0 && (
					<Fragment>

						<Fragment>with&nbsp;</Fragment>

						<CommaSeparatedInstanceLinks instances={nominatedEmployerCompany.coNominatedMembers} />

						<Fragment>&nbsp;</Fragment>

					</Fragment>
				)
			}

			<Fragment>for&nbsp;</Fragment>

			<InstanceLink instance={nominatedEmployerCompany} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedNominatedEmployerCompany;
