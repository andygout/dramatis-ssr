import { h } from 'preact'; // eslint-disable-line no-unused-vars

const Head = props => {
  const {
    documentTitle
  } = props;
  return h("head", null, h("title", null, `${documentTitle} | Dramatis`), h("link", {
    rel: "stylesheet",
    href: "/main.css"
  }), h("script", {
    src: "/main.js"
  }));
};
export default Head;