import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { Entities } from './index.js';
const AppendedEntities = props => {
  const {
    entities
  } = props;
  return h(Fragment, null, h(Fragment, null, ' … '), h(Entities, {
    entities: entities
  }));
};
export default AppendedEntities;