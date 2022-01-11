import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WritingCredits } from '.';

const AppendedWritingCredits = props => {

	const { credits } = props;

	return (
		<Fragment>

			<Fragment>{' '}</Fragment>

			<WritingCredits credits={credits} isAppendage={true} />

		</Fragment>
	);

};

export default AppendedWritingCredits;
