import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { ListWrapper, ProductionLinkWithContext } from './index.js';
const ProductionsList = props => {
  const {
    productions
  } = props;
  return h(ListWrapper, null, productions.map((production, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: production
  }))));
};
export default ProductionsList;