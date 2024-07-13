import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedProductionDates, AppendedVenue, InstanceLink, PrependedSurInstance } from './index.js';
const ProductionLinkWithContext = props => {
  const {
    production
  } = props;
  return h(Fragment, null, production.surProduction?.surProduction && h(PrependedSurInstance, {
    surInstance: production.surProduction.surProduction
  }), production.surProduction && h(PrependedSurInstance, {
    surInstance: production.surProduction
  }), h(InstanceLink, {
    instance: production
  }), production.venue && h(AppendedVenue, {
    venue: production.venue
  }), production.subVenue && h(AppendedVenue, {
    venue: production.subVenue
  }), (production.startDate || production.endDate) && h(AppendedProductionDates, {
    startDate: production.startDate,
    endDate: production.endDate
  }));
};
export default ProductionLinkWithContext;