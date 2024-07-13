import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLinksList } from '../../components/index.js';
const Award = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    award
  } = props;
  const {
    model,
    ceremonies
  } = award;
  return h(App, {
    currentPath: currentPath,
    documentTitle: documentTitle,
    pageTitle: pageTitle,
    model: model
  }, ceremonies?.length > 0 && h(InstanceFacet, {
    labelText: "Ceremonies"
  }, h(InstanceLinksList, {
    instances: ceremonies
  })));
};
export default Award;