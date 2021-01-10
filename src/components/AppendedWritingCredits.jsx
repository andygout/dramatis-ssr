import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WritingCredits } from '.';

const AppendedWritingCredits = props => {

	const { writingCredits } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;</Fragment>

			<WritingCredits writingCredits={writingCredits} isAppendage={true} />

		</Fragment>
	);

};

export default AppendedWritingCredits;
