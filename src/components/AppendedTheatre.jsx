import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const AppendedTheatre = props => {

	const { theatre } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;-&nbsp;</Fragment>

			{
				theatre.surTheatre && (
					<Fragment><InstanceLink instance={theatre.surTheatre} />:&nbsp;</Fragment>
				)
			}

			<InstanceLink instance={theatre} />

		</Fragment>
	);

};

export default AppendedTheatre;
