import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../components/index.js';
const ErrorPage = props => {
  const {
    documentTitle,
    pageTitle
  } = props;
  return h(App, {
    documentTitle: documentTitle,
    pageTitle: pageTitle
  }, h("div", null, "This is the error page"));
};
export default ErrorPage;