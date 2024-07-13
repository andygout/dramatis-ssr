import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { ListWrapper, MaterialLinkWithContext } from './index.js';
const MaterialsList = props => {
  const {
    materials
  } = props;
  return h(ListWrapper, null, materials.map((material, index) => h("li", {
    key: index
  }, h(MaterialLinkWithContext, {
    material: material
  }))));
};
export default MaterialsList;