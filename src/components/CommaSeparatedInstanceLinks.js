import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from './index.js';
const CommaSeparatedInstanceLinks = props => {
  const {
    instances
  } = props;
  return h(Fragment, null, instances.map((instance, index) => h(Fragment, {
    key: index
  }, h(InstanceLink, {
    instance: instance
  }))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]));
};
export default CommaSeparatedInstanceLinks;