import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProductionLinkWithContext } from './index.js';
const CommaSeparatedProductions = props => {
  const {
    productions
  } = props;
  return h(Fragment, null, productions.map((production, index) => h(Fragment, {
    key: index
  }, h(ProductionLinkWithContext, {
    production: production
  }))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]));
};
export default CommaSeparatedProductions;