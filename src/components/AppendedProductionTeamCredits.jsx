import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedCoCreditedEntities, AppendedCreditedEmployerCompany, AppendedCreditedMembers } from '.';

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
								credit.creditedMembers?.length > 0 && (
									<AppendedCreditedMembers creditedMembers={credit.creditedMembers} />
								)
							}

							{
								credit.creditedEmployerCompany && (
									<AppendedCreditedEmployerCompany
										creditedEmployerCompany={credit.creditedEmployerCompany}
									/>
								)
							}

							{
								credit.coCreditedEntities.length > 0 && (
									<AppendedCoCreditedEntities
										coCreditedEntities={credit.coCreditedEntities}
									/>
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
