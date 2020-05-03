import { Fragment, h } from 'preact';

import { InstanceLink } from '.';

export default function (props) {

	const { theatre } = props;

	return (
		<Fragment>

			<span>&nbsp;-&nbsp;</span>

			<InstanceLink instance={theatre} />

		</Fragment>
	);

};
