import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedCoCreditedEntities } from '.';

const AppendedCreativeCredits = props => {

	const { creativeCredits } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			{
				creativeCredits
					.map((creativeCredit, index) =>
						<Fragment key={index}>

							<Fragment>{ creativeCredit.name }</Fragment>

							{
								creativeCredit.coCreditedEntities.length > 0 && (
									<AppendedCoCreditedEntities
										coCreditedEntities={creativeCredit.coCreditedEntities}
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

export default AppendedCreativeCredits;
