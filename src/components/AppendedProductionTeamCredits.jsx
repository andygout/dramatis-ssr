import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedCoEntities, AppendedEmployerCompany, AppendedMembers } from '.';

const AppendedProductionTeamCredits = props => {

	const { credits } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			{
				credits
					.map((credit, index) =>
						<Fragment key={index}>

							<Fragment>{ credit.name }</Fragment>

							{
								credit.members?.length > 0 && (
									<AppendedMembers members={credit.members} />
								)
							}

							{
								credit.employerCompany && (
									<AppendedEmployerCompany employerCompany={credit.employerCompany} />
								)
							}

							{
								credit.coEntities.length > 0 && (
									<AppendedCoEntities coEntities={credit.coEntities} />
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, '; ', curr])
			}

		</Fragment>
	);

};

export default AppendedProductionTeamCredits;
