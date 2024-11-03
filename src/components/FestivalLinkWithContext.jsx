import { Fragment } from 'preact';

import InstanceLink from './InstanceLink.jsx';
import PrependedSurInstance from './PrependedSurInstance.jsx';

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
