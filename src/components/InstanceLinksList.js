import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, ListWrapper } from './index.js';
const InstanceLinksList = props => {
  const {
    instances
  } = props;
  return h(ListWrapper, null, instances.map((instance, index) => h("li", {
    key: index
  }, h(InstanceLink, {
    instance: instance
  }))));
};
export default InstanceLinksList;