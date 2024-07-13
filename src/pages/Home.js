import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../components/index.js';
const Home = props => {
  const {
    documentTitle,
    pageTitle
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h("div", null, "This is the home page"));
};
export default Home;