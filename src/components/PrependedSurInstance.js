import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from './index.js';
const PrependedSurInstance = props => {
  const {
    surInstance
  } = props;
  return h(Fragment, null, h(InstanceLink, {
    instance: surInstance
  }), h(Fragment, null, ': '));
};
export default PrependedSurInstance;