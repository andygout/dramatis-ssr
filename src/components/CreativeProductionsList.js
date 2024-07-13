import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedProductionTeamCredits, ProductionLinkWithContext, ListWrapper } from './index.js';
const CreativeProductionsList = props => {
  const {
    productions
  } = props;
  return h(ListWrapper, null, productions.map((production, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: production
  }), production.creativeCredits?.length > 0 && h(AppendedProductionTeamCredits, {
    credits: production.creativeCredits
  }))));
};
export default CreativeProductionsList;