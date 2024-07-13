import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, ProductionsList } from '../../components/index.js';
const Season = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    season
  } = props;
  const {
    model,
    productions
  } = season;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, productions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions"
  }, h(ProductionsList, {
    productions: productions
  })));
};
export default Season;