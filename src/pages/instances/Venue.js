import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, InstanceLinksList, ProductionsList } from '../../components/index.js';
const Venue = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    venue
  } = props;
  const {
    model,
    surVenue,
    subVenues,
    productions
  } = venue;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, surVenue && h(InstanceFacet, {
    labelText: "Part of"
  }, h(InstanceLink, {
    instance: surVenue
  })), subVenues?.length > 0 && h(InstanceFacet, {
    labelText: "Comprises"
  }, h(InstanceLinksList, {
    instances: subVenues
  })), productions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions"
  }, h(ProductionsList, {
    productions: productions
  })));
};
export default Venue;