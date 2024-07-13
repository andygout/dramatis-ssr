import { h } from 'preact'; // eslint-disable-line no-unused-vars

const Header = () => {
  return h("header", {
    className: "header"
  }, h("a", {
    href: "/",
    className: "header__component header__home-link"
  }, "Dramatis"), h("span", {
    className: "header__component o-forms-input o-forms-input--text"
  }, h("span", {
    id: "autocomplete",
    className: "o-autocomplete"
  }, h("input", {
    id: "autocomplete-input",
    type: "text",
    placeholder: "Search Dramatis\u2026"
  }))));
};
export default Header;