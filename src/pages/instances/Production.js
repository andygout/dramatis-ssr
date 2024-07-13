import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedDate, AppendedRoles, CommaSeparatedMaterials, CommaSeparatedProductions, Entities, FestivalLinkWithContext, InstanceFacet, InstanceLink, ListWrapper, MaterialLinkWithContext, ProducerCredits, ProductionTeamCreditsList, VenueLinkWithContext } from '../../components/index.js';
import { formatDate } from '../../lib/format-date.js';
const Production = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    pageSubtitle,
    production
  } = props;
  const dateFormatOptions = {
    weekday: 'long',
    month: 'long'
  };
  const renderProduction = production => {
    const {
      material,
      startDate,
      pressDate,
      endDate,
      venue,
      season,
      festival,
      surProduction,
      subProductions,
      producerCredits,
      cast,
      creativeCredits,
      crewCredits,
      reviews,
      awards
    } = production;
    return h(Fragment, null, material && h(InstanceFacet, {
      labelText: "Material"
    }, h(MaterialLinkWithContext, {
      material: material
    })), (startDate || pressDate || endDate) && h(InstanceFacet, {
      labelText: "Dates"
    }, startDate && h("div", null, h("b", null, "Starts:"), ` ${formatDate(startDate, dateFormatOptions)}`), pressDate && h("div", null, h("b", null, "Press:"), ` ${formatDate(pressDate, dateFormatOptions)}`), endDate && h("div", null, h("b", null, "Ends:"), ` ${formatDate(endDate, dateFormatOptions)}`)), venue && h(InstanceFacet, {
      labelText: "Venue"
    }, h(VenueLinkWithContext, {
      venue: venue
    })), season && h(InstanceFacet, {
      labelText: "Season"
    }, h(InstanceLink, {
      instance: season
    })), festival && h(InstanceFacet, {
      labelText: "Festival"
    }, h(FestivalLinkWithContext, {
      festival: festival
    })), surProduction && h(InstanceFacet, {
      labelText: "Part of"
    }, h("div", {
      className: "nested-instance"
    }, h(InstanceFacet, {
      labelText: "Production"
    }, h(InstanceLink, {
      instance: surProduction
    }), surProduction.subtitle && h("p", null, surProduction.subtitle)), renderProduction(surProduction))), subProductions?.length > 0 && h(InstanceFacet, {
      labelText: "Comprises"
    }, subProductions.map((subProduction, index) => h("div", {
      key: index,
      className: "nested-instance"
    }, h(InstanceFacet, {
      labelText: "Production"
    }, h(InstanceLink, {
      instance: subProduction
    }), subProduction.subtitle && h("p", null, subProduction.subtitle)), renderProduction(subProduction)))), producerCredits?.length > 0 && h(InstanceFacet, {
      labelText: "Producers"
    }, h(ProducerCredits, {
      credits: producerCredits
    })), cast?.length > 0 && h(InstanceFacet, {
      labelText: "Cast"
    }, h(ListWrapper, null, cast.map((castMember, index) => h("li", {
      key: index
    }, h(InstanceLink, {
      instance: castMember
    }), castMember.roles?.length > 0 && h(AppendedRoles, {
      roles: castMember.roles
    }))))), creativeCredits?.length > 0 && h(InstanceFacet, {
      labelText: "Creative Team"
    }, h(ProductionTeamCreditsList, {
      credits: creativeCredits
    })), crewCredits?.length > 0 && h(InstanceFacet, {
      labelText: "Crew"
    }, h(ProductionTeamCreditsList, {
      credits: crewCredits
    })), reviews?.length > 0 && h(InstanceFacet, {
      labelText: "Reviews"
    }, h(ListWrapper, null, reviews.map((review, index) => h("li", {
      key: index
    }, h(InstanceLink, {
      instance: review.critic
    }), ', ', h(InstanceLink, {
      instance: review.publication
    }), review.date && h(AppendedDate, {
      date: review.date
    }), ': ', h("a", {
      href: review.url,
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
    }, nomination.type), nomination.entities.length > 0 && h(Fragment, null, h(Fragment, null, ': '), h(Entities, {
      entities: nomination.entities
    })), nomination.entities.length > 0 && (nomination.recipientProductions.length > 0 || nomination.coProductions.length > 0) && h(Fragment, null, ';'), nomination.recipientProductions.length > 0 && h(Fragment, null, h(Fragment, null, ' (for '), h(CommaSeparatedProductions, {
      productions: nomination.recipientProductions
    }), h(Fragment, null, ')')), nomination.recipientProductions.length > 0 && nomination.coProductions.length > 0 && h(Fragment, null, ';'), nomination.coProductions.length > 0 && h(Fragment, null, h(Fragment, null, ' (with '), h(CommaSeparatedProductions, {
      productions: nomination.coProductions
    }), h(Fragment, null, ')')), nomination.coProductions.length > 0 && nomination.materials.length > 0 && h(Fragment, null, ';'), nomination.materials.length > 0 && h(Fragment, null, h(Fragment, null, ' for '), h(CommaSeparatedMaterials, {
      materials: nomination.materials
    })))).reduce((accumulator, currentValue) => [accumulator, ', ', currentValue]))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]))))))));
  };
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    pageSubtitle: pageSubtitle,
    model: production.model
  }, renderProduction(production));
};
export default Production;