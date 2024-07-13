import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { MaterialLinkWithContext } from './index.js';
const CommaSeparatedMaterials = props => {
  const {
    materials
  } = props;
  return h(Fragment, null, materials.map((material, index) => h(Fragment, {
    key: index
  }, h(MaterialLinkWithContext, {
    material: material
  }))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]));
};
export default CommaSeparatedMaterials;