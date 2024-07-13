import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, CommaSeparatedMaterials, CommaSeparatedProductions, Entities, InstanceFacet, InstanceLink, ListWrapper } from '../../components/index.js';
const AwardCeremony = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    awardCeremony
  } = props;
  const {
    model,
    award,
    categories
  } = awardCeremony;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, award && h(InstanceFacet, {
    labelText: "Award"
  }, h(InstanceLink, {
    instance: award
  })), categories?.length > 0 && h(InstanceFacet, {
    labelText: "Categories"
  }, categories.map((category, index) => h(Fragment, {
    key: index
  }, category.name, h(ListWrapper, null, category.nominations.map((nomination, index) => h("li", {
    key: index
  }, h("span", {
    className: nomination.isWinner ? 'nomination-winner-text' : ''
  }, `${nomination.type}: `), nomination.entities.length > 0 && h(Entities, {
    entities: nomination.entities
  }), nomination.entities.length > 0 && (nomination.productions.length > 0 || nomination.materials.length > 0) && h(Fragment, null, ' for '), nomination.productions.length > 0 && h(CommaSeparatedProductions, {
    productions: nomination.productions
  }), nomination.productions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, '; '), nomination.materials.length > 0 && h(CommaSeparatedMaterials, {
    materials: nomination.materials
  }))))))));
};
export default AwardCeremony;