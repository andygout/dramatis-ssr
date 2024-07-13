import { h } from 'preact'; // eslint-disable-line no-unused-vars

const InstanceFacet = props => {
  const {
    labelText,
    children
  } = props;
  return h("div", {
    className: "instance-facet-wrapper"
  }, h("div", {
    className: "instance-facet-label"
  }, labelText), h("div", {
    className: "instance-facet-content"
  }, children));
};
export default InstanceFacet;