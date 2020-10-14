import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const AppendedTheatre = props => {

	const { theatre } = props;

	return (
		<Fragment>

			<span>&nbsp;-&nbsp;</span>

			{
				theatre.surTheatre && (
					<span><InstanceLink instance={theatre.surTheatre} />: </span>
				)
			}

			<InstanceLink instance={theatre} />

		</Fragment>
	);

};

export default AppendedTheatre;
