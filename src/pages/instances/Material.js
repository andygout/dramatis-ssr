import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, CharactersList, CommaSeparatedMaterials, CommaSeparatedProductions, Entities, InstanceFacet, InstanceLink, ListWrapper, MaterialLinkWithContext, MaterialsList, ProductionsList, WritingCredits } from '../../components/index.js';
import { capitalise } from '../../lib/strings.js';
const Material = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    pageSubtitle,
    material
  } = props;
  const renderMaterial = material => {
    const {
      format,
      year,
      writingCredits,
      surMaterial,
      subMaterials,
      characterGroups,
      originalVersionMaterial,
      subsequentVersionMaterials,
      sourcingMaterials,
      productions,
      subsequentVersionMaterialProductions,
      sourcingMaterialProductions,
      awards,
      subsequentVersionMaterialAwards,
      sourcingMaterialAwards
    } = material;
    return h(Fragment, null, format && h(InstanceFacet, {
      labelText: "Format"
    }, h(Fragment, null, capitalise(format))), year && h(InstanceFacet, {
      labelText: "Year"
    }, h(Fragment, null, year)), writingCredits?.length > 0 && h(InstanceFacet, {
      labelText: "Writers"
    }, h(WritingCredits, {
      credits: writingCredits,
      isAppendage: false
    })), surMaterial && h(InstanceFacet, {
      labelText: "Part of"
    }, h("div", {
      className: "nested-instance"
    }, h(InstanceFacet, {
      labelText: "Material"
    }, h(InstanceLink, {
      instance: surMaterial
    }), surMaterial.subtitle && h("p", null, surMaterial.subtitle)), renderMaterial(surMaterial))), subMaterials?.length > 0 && h(InstanceFacet, {
      labelText: "Comprises"
    }, subMaterials.map((subMaterial, index) => h("div", {
      key: index,
      className: "nested-instance"
    }, h(InstanceFacet, {
      labelText: "Material"
    }, h(InstanceLink, {
      instance: subMaterial
    }), subMaterial.subtitle && h("p", null, subMaterial.subtitle)), renderMaterial(subMaterial)))), characterGroups?.length > 0 && h(InstanceFacet, {
      labelText: "Characters"
    }, characterGroups.length === 1 ? h(Fragment, null, Boolean(characterGroups[0].name) && h("div", {
      className: "instance-facet-subheader"
    }, characterGroups[0].name), h(CharactersList, {
      characters: characterGroups[0].characters
    })) : h("ul", {
      className: "list list--no-bullets"
    }, characterGroups.map((characterGroup, index) => h("li", {
      key: index,
      className: "instance-facet-group"
    }, Boolean(characterGroup.name) && h("div", {
      className: "instance-facet-subheader"
    }, characterGroup.name), h(CharactersList, {
      characters: characterGroup.characters
    }))))), originalVersionMaterial && h(InstanceFacet, {
      labelText: "Original version"
    }, h(MaterialLinkWithContext, {
      material: originalVersionMaterial
    })), subsequentVersionMaterials?.length > 0 && h(InstanceFacet, {
      labelText: "Subsequent versions"
    }, h(MaterialsList, {
      materials: subsequentVersionMaterials
    })), sourcingMaterials?.length > 0 && h(InstanceFacet, {
      labelText: "Materials as source material"
    }, h(MaterialsList, {
      materials: sourcingMaterials
    })), productions?.length > 0 && h(InstanceFacet, {
      labelText: "Productions"
    }, h(ProductionsList, {
      productions: productions
    })), subsequentVersionMaterialProductions?.length > 0 && h(InstanceFacet, {
      labelText: "Productions of subsequent versions"
    }, h(ProductionsList, {
      productions: subsequentVersionMaterialProductions
    })), sourcingMaterialProductions?.length > 0 && h(InstanceFacet, {
      labelText: "Productions of materials as source material"
    }, h(ProductionsList, {
      productions: sourcingMaterialProductions
    })), awards?.length > 0 && h(InstanceFacet, {
      labelText: "Awards"
    }, awards.map((award, index) => h(Fragment, {
      key: index
    }, h(InstanceLink, {
      instance: award
    }), h(ListWrapper, null, award.ceremonies.map((ceremony, index) => h("li", {
      key: index
    }, h(InstanceLink, {
      instance: ceremony
    }), ': ', ceremony.categories.map((category, index) => h(Fragment, {
      key: index
    }, category.name, ': ', category.nominations.map((nomination, index) => h(Fragment, {
      key: index
    }, h("span", {
      className: nomination.isWinner ? 'nomination-winner-text' : ''
    }, nomination.type), nomination.entities.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(Entities, {
      entities: nomination.entities
    })), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
      productions: nomination.productions
    })), nomination.productions.length > 0 && (nomination.recipientMaterials.length > 0 || nomination.coMaterials.length > 0) && h(Fragment, null, ';'), nomination.recipientMaterials.length > 0 && h(Fragment, null, h(Fragment, null, ' (for '), h(CommaSeparatedMaterials, {
      materials: nomination.recipientMaterials
    }), h(Fragment, null, ')')), nomination.recipientMaterials.length > 0 && nomination.coMaterials.length > 0 && h(Fragment, null, ';'), nomination.coMaterials.length > 0 && h(Fragment, null, h(Fragment, null, ' (with '), h(CommaSeparatedMaterials, {
      materials: nomination.coMaterials
    }), h(Fragment, null, ')')))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))), subsequentVersionMaterialAwards?.length > 0 && h(InstanceFacet, {
      labelText: "Awards for subsequent versions"
    }, subsequentVersionMaterialAwards.map((subsequentVersionMaterialAward, index) => h(Fragment, {
      key: index
    }, h(InstanceLink, {
      instance: subsequentVersionMaterialAward
    }), h(ListWrapper, null, subsequentVersionMaterialAward.ceremonies.map((ceremony, index) => h("li", {
      key: index
    }, h(InstanceLink, {
      instance: ceremony
    }), ': ', ceremony.categories.map((category, index) => h(Fragment, {
      key: index
    }, category.name, ': ', category.nominations.map((nomination, index) => h(Fragment, {
      key: index
    }, h("span", {
      className: nomination.isWinner ? 'nomination-winner-text' : ''
    }, nomination.type), nomination.recipientSubsequentVersionMaterials.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(CommaSeparatedMaterials, {
      materials: nomination.recipientSubsequentVersionMaterials
    })), nomination.entities.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(Entities, {
      entities: nomination.entities
    })), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
      productions: nomination.productions
    })), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' (with '), h(CommaSeparatedMaterials, {
      materials: nomination.materials
    }), h(Fragment, null, ')')))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))), sourcingMaterialAwards?.length > 0 && h(InstanceFacet, {
      labelText: "Awards for materials as source material"
    }, sourcingMaterialAwards.map((sourcingMaterialAward, index) => h(Fragment, {
      key: index
    }, h(InstanceLink, {
      instance: sourcingMaterialAward
    }), h(ListWrapper, null, sourcingMaterialAward.ceremonies.map((ceremony, index) => h("li", {
      key: index
    }, h(InstanceLink, {
      instance: ceremony
    }), ': ', ceremony.categories.map((category, index) => h(Fragment, {
      key: index
    }, category.name, ': ', category.nominations.map((nomination, index) => h(Fragment, {
      key: index
    }, h("span", {
      className: nomination.isWinner ? 'nomination-winner-text' : ''
    }, nomination.type), nomination.recipientSourcingMaterials.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(CommaSeparatedMaterials, {
      materials: nomination.recipientSourcingMaterials
    })), nomination.entities.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(Entities, {
      entities: nomination.entities
    })), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
      productions: nomination.productions
    })), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' (with '), h(CommaSeparatedMaterials, {
      materials: nomination.materials
    }), h(Fragment, null, ')')))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))));
  };
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    pageSubtitle: pageSubtitle,
    model: material.model
  }, renderMaterial(material));
};
export default Material;