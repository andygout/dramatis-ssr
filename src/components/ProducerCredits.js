import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProducerEntities } from './index.js';
import { capitalise } from '../lib/strings.js';
const ProducerCredits = props => {
  const {
    credits
  } = props;
  return h(Fragment, null, credits.map((credit, index) => {
    const creditName = index === 0 ? capitalise(credit.name) : credit.name;
    return h(Fragment, {
      key: index
    }, h(Fragment, null, `${creditName} `), h(ProducerEntities, {
      entities: credit.entities
    }));
  }).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]));
};
export default ProducerCredits;