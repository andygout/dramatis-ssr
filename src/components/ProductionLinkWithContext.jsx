import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedProductionDates, AppendedVenue, InstanceLink, PrependedSurInstance } from './index.js';

const ProductionLinkWithContext = props => {

	const { production } = props;

	return (
		<Fragment>

			{
				production.surProduction?.surProduction && (
					<PrependedSurInstance surInstance={production.surProduction.surProduction} />
				)
			}

			{
				production.surProduction && (
					<PrependedSurInstance surInstance={production.surProduction} />
				)
			}

			<InstanceLink instance={production} />

			{
				production.venue && (
					<AppendedVenue venue={production.venue} />
				)
			}

			{
				production.subVenue && (
					<AppendedVenue venue={production.subVenue} />
				)
			}

			{
				(production.startDate || production.endDate) && (
					<AppendedProductionDates
						startDate={production.startDate}
						endDate={production.endDate}
					/>
				)
			}

		</Fragment>
	);

};

export default ProductionLinkWithContext;
