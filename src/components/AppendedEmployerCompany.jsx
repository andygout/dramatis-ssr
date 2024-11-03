import { Fragment } from 'preact';

import CommaSeparatedInstanceLinks from './CommaSeparatedInstanceLinks.jsx';
import InstanceLink from './InstanceLink.jsx';

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
