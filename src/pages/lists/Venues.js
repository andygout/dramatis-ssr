import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLink, ListWrapper } from '../../components/index.js';
const Venues = props => {
  const {
    documentTitle,
    pageTitle,
    venues
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(ListWrapper, null, venues.map((venue, index) => h("li", {
    key: index
  }, h(InstanceLink, {
    instance: venue
  }), venue.subVenues?.length > 0 && h(Fragment, null, h(Fragment, null, ': '), venue.subVenues.map((subVenue, index) => h(InstanceLink, {
    key: index,
    instance: subVenue
  })).reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue]))))));
};
export default Venues;