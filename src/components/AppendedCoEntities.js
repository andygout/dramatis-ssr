import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { Entities } from './index.js';
const AppendedCoEntities = props => {
  const {
    coEntities
  } = props;
  return h(Fragment, null, h(Fragment, null, ' (with '), h(Entities, {
    entities: coEntities
  }), h(Fragment, null, ')'));
};
export default AppendedCoEntities;