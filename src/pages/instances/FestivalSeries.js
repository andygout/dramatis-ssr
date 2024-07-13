import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLinksList } from '../../components/index.js';
const FestivalSeries = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    festivalSeries
  } = props;
  const {
    model,
    festivals
  } = festivalSeries;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, festivals?.length > 0 && h(InstanceFacet, {
    labelText: "Comprises"
  }, h(InstanceLinksList, {
    instances: festivals
  })));
};
export default FestivalSeries;