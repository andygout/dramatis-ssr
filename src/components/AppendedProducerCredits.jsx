import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProducerCredits } from '.';

const AppendedProducerCredits = props => {

	const { credits } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			<ProducerCredits credits={credits} />

		</Fragment>
	);

};

export default AppendedProducerCredits;
