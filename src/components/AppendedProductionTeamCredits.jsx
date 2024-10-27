import { Fragment } from 'preact';

import { AppendedCoEntities, AppendedEmployerCompany, AppendedMembers } from './index.js';

const AppendedProductionTeamCredits = props => {

	const { credits } = props;

	return (
		<Fragment>

			<Fragment>{' … '}</Fragment>

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
								credit.coEntities?.length > 0 && (
									<AppendedCoEntities coEntities={credit.coEntities} />
								)
							}

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, '; ', currentValue])
			}

		</Fragment>
	);

};

export default AppendedProductionTeamCredits;
