import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WritingEntities } from '.';
import { capitalise } from '../lib/strings';

const WritingCredits = props => {

	const { writingCredits, isAppendage } = props;

	return (
		<Fragment>

			{
				writingCredits
					.map((writingCredit, index) => {

						const writingCreditName = !isAppendage && index === 0
							? capitalise(writingCredit.name)
							: writingCredit.name;

						return (
							<Fragment key={index}>

								<Fragment>{ writingCreditName }&nbsp;</Fragment>

								<WritingEntities writingEntities={writingCredit.writingEntities} />

							</Fragment>
						);
					})
					.reduce((prev, curr) => [prev, '; ', curr])
			}

		</Fragment>
	);

};

export default WritingCredits;
