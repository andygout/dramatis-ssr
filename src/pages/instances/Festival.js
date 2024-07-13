import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, ProductionsList } from '../../components/index.js';
const Festival = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    festival
  } = props;
  const {
    model,
    festivalSeries,
    productions
  } = festival;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, festivalSeries && h(InstanceFacet, {
    labelText: "Festival series"
  }, h(InstanceLink, {
    instance: festivalSeries
  })), productions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions"
  }, h(ProductionsList, {
    productions: productions
  })));
};
export default Festival;