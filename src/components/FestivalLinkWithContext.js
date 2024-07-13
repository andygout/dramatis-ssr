import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, PrependedSurInstance } from './index.js';
const FestivalLinkWithContext = props => {
  const {
    festival
  } = props;
  return h(Fragment, null, festival.festivalSeries && h(PrependedSurInstance, {
    surInstance: festival.festivalSeries
  }), h(InstanceLink, {
    instance: festival
  }));
};
export default FestivalLinkWithContext;