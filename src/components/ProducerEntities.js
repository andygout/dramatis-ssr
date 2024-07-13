import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from './index.js';
const ProducerEntities = props => {
  const {
    entities
  } = props;
  return h(Fragment, null, entities.map((entity, index) => h(Fragment, {
    key: index
  }, entity.members?.length > 0 && h(Fragment, null, h(CommaSeparatedInstanceLinks, {
    instances: entity.members
  }), h(Fragment, null, ' for ')), h(InstanceLink, {
    instance: entity
  }))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]));
};
export default ProducerEntities;