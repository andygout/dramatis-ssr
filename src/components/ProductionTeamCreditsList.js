import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedEntities, ListWrapper } from './index.js';
const ProductionTeamCreditsList = props => {
  const {
    credits
  } = props;
  return h(ListWrapper, null, credits.map((credit, index) => h("li", {
    key: index
  }, credit.name, credit.entities?.length > 0 && h(AppendedEntities, {
    entities: credit.entities
  }))));
};
export default ProductionTeamCreditsList;