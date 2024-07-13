import { h } from 'preact'; // eslint-disable-line no-unused-vars

const Footer = () => {
  return h("footer", {
    className: "footer"
  }, h("div", {
    className: "footer__text footer__text--left"
  }, "Dramatis"), h("div", {
    className: "footer__text footer__text--right"
  }, "Placeholder text"));
};
export default Footer;