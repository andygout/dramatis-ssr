import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormatAndYear, InstanceLink, PrependedSurInstance, WritingCredits } from './index.js';
const MaterialLinkWithContext = props => {
  const {
    material
  } = props;
  return h(Fragment, null, material.surMaterial?.surMaterial && h(PrependedSurInstance, {
    surInstance: material.surMaterial.surMaterial
  }), material.surMaterial && h(PrependedSurInstance, {
    surInstance: material.surMaterial
  }), h(InstanceLink, {
    instance: material
  }), (material.format || material.year) && h(AppendedFormatAndYear, {
    format: material.format,
    year: material.year
  }), material.writingCredits?.length > 0 && h(Fragment, null, h(Fragment, null, ' '), h(WritingCredits, {
    credits: material.writingCredits,
    isAppendage: true
  })));
};
export default MaterialLinkWithContext;