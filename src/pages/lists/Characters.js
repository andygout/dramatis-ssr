import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components/index.js';
const Characters = props => {
  const {
    documentTitle,
    pageTitle,
    characters
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(InstanceLinksList, {
    instances: characters
  }));
};
export default Characters;