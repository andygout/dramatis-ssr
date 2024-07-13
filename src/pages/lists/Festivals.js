import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLink, ListWrapper } from '../../components/index.js';
const Festivals = props => {
  const {
    documentTitle,
    pageTitle,
    festivals
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h(ListWrapper, null, festivals.map((festival, index) => h("li", {
    key: index
  }, festival.festivalSeries && h(Fragment, null, h(InstanceLink, {
    instance: festival.festivalSeries
  }), h(Fragment, null, ': ')), h(InstanceLink, {
    instance: festival
  })))));
};
export default Festivals;