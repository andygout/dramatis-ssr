import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, JoinedRoles } from './index.js';
const AppendedPerformers = props => {
  const {
    performers
  } = props;
  return h(Fragment, null, h(Fragment, null, ' — performed by: '), performers.map((performer, index) => h(Fragment, {
    key: index
  }, h(InstanceLink, {
    instance: performer
  }), h(Fragment, null, ' … '), h("span", {
    className: "fictional-name-text"
  }, performer.roleName, performer.qualifier && h(Fragment, null, ` (${performer.qualifier})`)), performer.isAlternate && h(Fragment, null, ' [alt]'), performer.otherRoles.length > 0 && h(Fragment, null, h(Fragment, null, '; also performed: '), h(JoinedRoles, {
    instances: performer.otherRoles
  })))).reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue]));
};
export default AppendedPerformers;