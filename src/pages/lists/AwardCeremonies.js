import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLink, ListWrapper } from '../../components/index.js';
const AwardCeremonies = props => {
  const {
    documentTitle,
    pageTitle,
    awardCeremonies
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(ListWrapper, null, awardCeremonies.map((awardCeremony, index) => h("li", {
    key: index
  }, awardCeremony.award && h(Fragment, null, h(InstanceLink, {
    instance: awardCeremony.award
  }), h(Fragment, null, ': ')), h(InstanceLink, {
    instance: awardCeremony
  })))));
};
export default AwardCeremonies;