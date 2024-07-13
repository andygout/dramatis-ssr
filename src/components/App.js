import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { Footer, Head, Header, InstanceLabel, Navigation, PageSubtitle, PageTitle } from './index.js';
import { CurrentPath } from '../contexts/index.js';
const App = props => {
  const {
    currentPath,
    documentTitle,
    pageTitle,
    pageSubtitle,
    model,
    children
  } = props;
  return h("html", null, h(Head, {
    documentTitle: documentTitle
  }), h("body", null, h("div", {
    className: "page-container"
  }, h(Header, null), h(Navigation, null), h("main", {
    className: "main-content"
  }, model && h(InstanceLabel, {
    model: model
  }), h(PageTitle, {
    text: pageTitle
  }), pageSubtitle && h(PageSubtitle, {
    text: pageSubtitle
  }), h(CurrentPath.Provider, {
    value: currentPath
  }, children)), h(Footer, null))));
};
export default App;