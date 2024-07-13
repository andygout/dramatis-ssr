import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { VenueLinkWithContext } from './index.js';
const AppendedVenue = props => {
  const {
    venue
  } = props;
  return h(Fragment, null, h(Fragment, null, ' — '), h(VenueLinkWithContext, {
    venue: venue
  }));
};
export default AppendedVenue;