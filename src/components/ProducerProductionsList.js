import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProducerCredits, ProductionLinkWithContext, ListWrapper } from './index.js';
const ProducerProductionsList = props => {
  const {
    productions
  } = props;
  return h(ListWrapper, null, productions.map((production, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: production
  }), production.producerCredits?.length > 0 && h(Fragment, null, h(Fragment, null, ' … '), h(ProducerCredits, {
    credits: production.producerCredits
  })))));
};
export default ProducerProductionsList;