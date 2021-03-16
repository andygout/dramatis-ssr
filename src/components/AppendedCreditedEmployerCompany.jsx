import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from '.';

const AppendedCreditedEmployerCompany = props => {

	const { creditedEmployerCompany } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(</Fragment>

			{
				creditedEmployerCompany.coCreditedMembers?.length > 0 && (
					<Fragment>

						<Fragment>with&nbsp;</Fragment>

						<CommaSeparatedInstanceLinks instances={creditedEmployerCompany.coCreditedMembers} />

						<Fragment>&nbsp;</Fragment>

					</Fragment>
				)
			}

			<Fragment>for&nbsp;</Fragment>

			<InstanceLink instance={creditedEmployerCompany} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCreditedEmployerCompany;
