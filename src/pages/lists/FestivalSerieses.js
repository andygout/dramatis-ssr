import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components/index.js';
const FestivalSerieses = props => {
  const {
    documentTitle,
    pageTitle,
    festivalSerieses
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(InstanceLinksList, {
    instances: festivalSerieses
  }));
};
export default FestivalSerieses;