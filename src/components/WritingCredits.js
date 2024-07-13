import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WritingEntities } from './index.js';
import { capitalise } from '../lib/strings.js';
const WritingCredits = props => {
  const {
    credits,
    isAppendage
  } = props;
  return h(Fragment, null, credits.map((credit, index) => {
    const creditName = !isAppendage && index === 0 ? capitalise(credit.name) : credit.name;
    return h(Fragment, {
      key: index
    }, h(Fragment, null, `${creditName} `), h(WritingEntities, {
      entities: credit.entities
    }));
  }).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]));
};
export default WritingCredits;