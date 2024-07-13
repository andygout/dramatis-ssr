import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components/index.js';
const People = props => {
  const {
    documentTitle,
    pageTitle,
    people
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(InstanceLinksList, {
    instances: people
  }));
};
export default People;