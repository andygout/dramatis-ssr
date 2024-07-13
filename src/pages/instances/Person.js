import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedCoEntities, AppendedDate, AppendedEmployerCompany, AppendedEntities, AppendedRoles, CommaSeparatedMaterials, CommaSeparatedProductions, CreativeProductionsList, CrewProductionsList, InstanceFacet, InstanceLink, ListWrapper, MaterialsList, ProducerProductionsList, ProductionLinkWithContext, ProductionsList } from '../../components/index.js';
const Person = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    person
  } = props;
  const {
    model,
    materials,
    subsequentVersionMaterials,
    sourcingMaterials,
    rightsGrantorMaterials,
    materialProductions,
    subsequentVersionMaterialProductions,
    sourcingMaterialProductions,
    rightsGrantorMaterialProductions,
    producerProductions,
    castMemberProductions,
    creativeProductions,
    crewProductions,
    reviewCriticProductions,
    awards,
    subsequentVersionMaterialAwards,
    sourcingMaterialAwards,
    rightsGrantorMaterialAwards
  } = person;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, materials?.length > 0 && h(InstanceFacet, {
    labelText: "Materials"
  }, h(MaterialsList, {
    materials: materials
  })), subsequentVersionMaterials?.length > 0 && h(InstanceFacet, {
    labelText: "Subsequent versions of their materials"
  }, h(MaterialsList, {
    materials: subsequentVersionMaterials
  })), sourcingMaterials?.length > 0 && h(InstanceFacet, {
    labelText: "Materials as source material writer"
  }, h(MaterialsList, {
    materials: sourcingMaterials
  })), rightsGrantorMaterials?.length > 0 && h(InstanceFacet, {
    labelText: "Materials as rights grantor"
  }, h(MaterialsList, {
    materials: rightsGrantorMaterials
  })), materialProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions of materials"
  }, h(ProductionsList, {
    productions: materialProductions
  })), subsequentVersionMaterialProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions of subsequent versions of their materials"
  }, h(ProductionsList, {
    productions: subsequentVersionMaterialProductions
  })), sourcingMaterialProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions of materials as source material writer"
  }, h(ProductionsList, {
    productions: sourcingMaterialProductions
  })), rightsGrantorMaterialProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions of materials as rights grantor"
  }, h(ProductionsList, {
    productions: rightsGrantorMaterialProductions
  })), producerProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions as producer"
  }, h(ProducerProductionsList, {
    productions: producerProductions
  })), castMemberProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions as cast member"
  }, h(ListWrapper, null, castMemberProductions.map((castMemberProduction, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: castMemberProduction
  }), castMemberProduction.roles?.length > 0 && h(AppendedRoles, {
    roles: castMemberProduction.roles
  }))))), creativeProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions as creative team member"
  }, h(CreativeProductionsList, {
    productions: creativeProductions
  })), crewProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Productions as crew member"
  }, h(CrewProductionsList, {
    productions: crewProductions
  })), reviewCriticProductions?.length > 0 && h(InstanceFacet, {
    labelText: "Reviewed productions"
  }, h(ListWrapper, null, reviewCriticProductions.map((reviewCriticProduction, index) => h("li", {
    key: index
  }, h(ProductionLinkWithContext, {
    production: reviewCriticProduction
  }), ' — reviewed for ', h(InstanceLink, {
    instance: reviewCriticProduction.review.publication
  }), reviewCriticProduction.review.date && h(AppendedDate, {
    date: reviewCriticProduction.review.date
  }), ': ', h("a", {
    href: reviewCriticProduction.review.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, 'link'))))), awards?.length > 0 && h(InstanceFacet, {
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
  }, nomination.type), nomination.employerCompany && h(AppendedEmployerCompany, {
    employerCompany: nomination.employerCompany
  }), nomination.coEntities.length > 0 && h(AppendedCoEntities, {
    coEntities: nomination.coEntities
  }), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
    productions: nomination.productions
  })), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedMaterials, {
    materials: nomination.materials
  })))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))), subsequentVersionMaterialAwards?.length > 0 && h(InstanceFacet, {
    labelText: "Awards for subsequent versions of their material"
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
  })), nomination.entities.length > 0 && h(AppendedEntities, {
    entities: nomination.entities
  }), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
    productions: nomination.productions
  })), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedMaterials, {
    materials: nomination.materials
  })))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))), sourcingMaterialAwards?.length > 0 && h(InstanceFacet, {
    labelText: "Awards for materials as source material writer"
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
  })), nomination.entities.length > 0 && h(AppendedEntities, {
    entities: nomination.entities
  }), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
    productions: nomination.productions
  })), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedMaterials, {
    materials: nomination.materials
  })))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))), rightsGrantorMaterialAwards?.length > 0 && h(InstanceFacet, {
    labelText: "Awards for materials as rights grantor"
  }, rightsGrantorMaterialAwards.map((rightsGrantorMaterialAward, index) => h(Fragment, {
    key: index
  }, h(InstanceLink, {
    instance: rightsGrantorMaterialAward
  }), h(ListWrapper, null, rightsGrantorMaterialAward.ceremonies.map((ceremony, index) => h("li", {
    key: index
  }, h(InstanceLink, {
    instance: ceremony
  }), ': ', ceremony.categories.map((category, index) => h(Fragment, {
    key: index
  }, category.name, ': ', category.nominations.map((nomination, index) => h(Fragment, {
    key: index
  }, h("span", {
    className: nomination.isWinner ? 'nomination-winner-text' : ''
  }, nomination.type), nomination.recipientRightsGrantorMaterials.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(CommaSeparatedMaterials, {
    materials: nomination.recipientRightsGrantorMaterials
  })), nomination.entities.length > 0 && h(AppendedEntities, {
    entities: nomination.entities
  }), nomination.productions.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedProductions, {
    productions: nomination.productions
  })), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedMaterials, {
    materials: nomination.materials
  })))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))));
};
export default Person;