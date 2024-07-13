import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormatAndYear, InstanceLink, PrependedSurInstance, WritingCredits } from './index.js';
const WritingEntities = props => {
  const {
    entities
  } = props;
  return h(Fragment, null, entities.map((entity, index) => h(Fragment, {
    key: index
  }, entity.surMaterial?.surMaterial && h(PrependedSurInstance, {
    surInstance: entity.surMaterial.surMaterial
  }), entity.surMaterial && h(PrependedSurInstance, {
    surInstance: entity.surMaterial
  }), h(InstanceLink, {
    instance: entity
  }), (entity.format || entity.year) && h(AppendedFormatAndYear, {
    format: entity.format,
    year: entity.year
  }), entity.writingCredits?.length > 0 && h(Fragment, null, h(Fragment, null, ' '), h(WritingCredits, {
    credits: entity.writingCredits,
    isAppendage: true
  })))).reduce((accumulator, currentValue, currentIndex) => {
    let separator = ', ';
    if (entities.length === 2) {
      separator = ' and ';
    } else {
      const isFinalIteration = currentIndex === entities.length - 1;
      if (isFinalIteration) separator = ', and ';
    }
    return [accumulator, separator, currentValue];
  }));
};
export default WritingEntities;