import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, MaterialsList } from '../../components/index.js';
const Materials = props => {
  const {
    documentTitle,
    pageTitle,
    materials
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(MaterialsList, {
    materials: materials
  }));
};
export default Materials;