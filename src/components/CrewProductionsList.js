import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedProductionTeamCredits, ProductionLinkWithContext, ListWrapper } from './index.js';
const CrewProductionsList = props => {
  const {
    productions
  } = props;
  return h(ListWrapper, null, productions.map((production, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: production
  }), production.crewCredits?.length > 0 && h(AppendedProductionTeamCredits, {
    credits: production.crewCredits
  }))));
};
export default CrewProductionsList;