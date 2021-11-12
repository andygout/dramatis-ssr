import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from '.';

const AppendedEmployerCompany = props => {

	const { employerCompany } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(</Fragment>

			{
				employerCompany.coMembers?.length > 0 && (
					<Fragment>

						<Fragment>with&nbsp;</Fragment>

						<CommaSeparatedInstanceLinks instances={employerCompany.coMembers} />

						<Fragment>&nbsp;</Fragment>

					</Fragment>
				)
			}

			<Fragment>for&nbsp;</Fragment>

			<InstanceLink instance={employerCompany} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedEmployerCompany;
