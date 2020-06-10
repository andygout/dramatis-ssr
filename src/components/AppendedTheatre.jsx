import { Fragment, h } from 'preact';

import { InstanceLink } from '.';

export default props => {

	const { theatre } = props;

	return (
		<Fragment>

			<span>&nbsp;-&nbsp;</span>

			<InstanceLink instance={theatre} />

		</Fragment>
	);

};
