import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components/index.js';
const Awards = props => {
  const {
    documentTitle,
    pageTitle,
    awards
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(InstanceLinksList, {
    instances: awards
  }));
};
export default Awards;