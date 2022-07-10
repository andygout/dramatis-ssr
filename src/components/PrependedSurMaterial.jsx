import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const PrependedSurMaterial = props => {

	const { surMaterial } = props;

	return (
		<Fragment>

			<InstanceLink instance={surMaterial} />

			<Fragment>{': '}</Fragment>

		</Fragment>
	);

};

export default PrependedSurMaterial;
