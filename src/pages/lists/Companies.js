import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components/index.js';
const Companies = props => {
  const {
    documentTitle,
    pageTitle,
    companies
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(InstanceLinksList, {
    instances: companies
  }));
};
export default Companies;