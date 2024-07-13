import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedDepictions, AppendedPerformers, InstanceFacet, ListWrapper, MaterialLinkWithContext, ProductionLinkWithContext } from '../../components/index.js';
const Character = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    character
  } = props;
  const {
    model,
    variantNamedDepictions,
    materials,
    variantNamedPortrayals,
    productions
  } = character;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, variantNamedDepictions?.length > 0 && h(InstanceFacet, {
    labelText: "Variant-named depictions"
  }, h("span", {
    className: "fictional-name-text"
  }, variantNamedDepictions.join(' / '))), materials?.length > 0 && h(InstanceFacet, {
    labelText: "Materials"
  }, h(ListWrapper, null, materials.map((material, index) => h("li", {
    key: index
  }, h(MaterialLinkWithContext, {
    material: material
  }), material.depictions?.length > 0 && h(AppendedDepictions, {
    depictions: material.depictions
  }))))), variantNamedPortrayals?.length > 0 && h(InstanceFacet, {
    labelText: "Variant-named portrayals"
  }, h("span", {
    className: "fictional-name-text"
  }, variantNamedPortrayals.join(' / '))), productions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions"
  }, h(ListWrapper, null, productions.map((production, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: production
  }), production.performers?.length > 0 && h(AppendedPerformers, {
    performers: production.performers
  }))))));
};
export default Character;