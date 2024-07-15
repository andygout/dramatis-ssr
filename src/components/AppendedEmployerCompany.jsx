import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from './index.js';

const AppendedEmployerCompany = props => {

	const { employerCompany } = props;

	return (
		<Fragment>

			<Fragment>{' ('}</Fragment>

			{
				employerCompany.coMembers?.length > 0 && (
					<Fragment>

						<Fragment>{'with '}</Fragment>

						<CommaSeparatedInstanceLinks instances={employerCompany.coMembers} />

						<Fragment>{' '}</Fragment>

					</Fragment>
				)
			}

			<Fragment>{'for '}</Fragment>

			<InstanceLink instance={employerCompany} />

			<Fragment>{')'}</Fragment>

		</Fragment>
	);

};

export default AppendedEmployerCompany;
