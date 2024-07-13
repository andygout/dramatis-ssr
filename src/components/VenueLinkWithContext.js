import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, PrependedSurInstance } from './index.js';
const VenueLinkWithContext = props => {
  const {
    venue
  } = props;
  return h(Fragment, null, venue.surVenue && h(PrependedSurInstance, {
    surInstance: venue.surVenue
  }), h(InstanceLink, {
    instance: venue
  }));
};
export default VenueLinkWithContext;