import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedMembers, InstanceLink } from './index.js';
const Entities = props => {
  const {
    entities
  } = props;
  return h(Fragment, null, entities.map((entity, index) => h(Fragment, {
    key: index
  }, h(InstanceLink, {
    instance: entity
  }), entity.members?.length > 0 && h(AppendedMembers, {
    members: entity.members
  }))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]));
};
export default Entities;