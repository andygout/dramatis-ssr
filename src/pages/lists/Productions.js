import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, ProductionsList } from '../../components/index.js';
const Productions = props => {
  const {
    documentTitle,
    pageTitle,
    productions
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(ProductionsList, {
    productions: productions
  }));
};
export default Productions;