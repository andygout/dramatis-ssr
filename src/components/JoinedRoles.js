import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedQualifier, InstanceLink } from './index.js';
const JoinedRoles = props => {
  const {
    instances
  } = props;
  return h(Fragment, null, instances.map((instance, index) => h(Fragment, {
    key: index
  }, h("span", {
    className: "fictional-name-text"
  }, instance.uuid ? h(InstanceLink, {
    instance: instance
  }) : instance.name, instance.qualifier && h(AppendedQualifier, {
    qualifier: instance.qualifier
  })), instance.isAlternate && h(Fragment, null, ' [alt]'))).reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue]));
};
export default JoinedRoles;