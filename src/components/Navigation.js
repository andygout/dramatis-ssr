import { h } from 'preact'; // eslint-disable-line no-unused-vars

const Navigation = () => {
  return h("nav", {
    className: "navigation"
  }, h("ul", null, h("li", null, h("a", {
    href: "/"
  }, "Home")), h("li", null, h("a", {
    href: "/awards"
  }, "Awards")), h("li", null, h("a", {
    href: "/award-ceremonies"
  }, "Award ceremonies")), h("li", null, h("a", {
    href: "/characters"
  }, "Characters")), h("li", null, h("a", {
    href: "/companies"
  }, "Companies")), h("li", null, h("a", {
    href: "/festival-serieses"
  }, "Festival serieses")), h("li", null, h("a", {
    href: "/festivals"
  }, "Festivals")), h("li", null, h("a", {
    href: "/materials"
  }, "Materials")), h("li", null, h("a", {
    href: "/people"
  }, "People")), h("li", null, h("a", {
    href: "/productions"
  }, "Productions")), h("li", null, h("a", {
    href: "/seasons"
  }, "Seasons")), h("li", null, h("a", {
    href: "/venues"
  }, "Venues"))));
};
export default Navigation;