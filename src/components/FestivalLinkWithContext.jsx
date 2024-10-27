import { Fragment } from 'preact';

import { InstanceLink, PrependedSurInstance } from './index.js';

const FestivalLinkWithContext = props => {

	const { festival } = props;

	return (
		<Fragment>

			{
				festival.festivalSeries && (
					<PrependedSurInstance surInstance={festival.festivalSeries} />
				)
			}

			<InstanceLink instance={festival} />

		</Fragment>
	);

};

export default FestivalLinkWithContext;
