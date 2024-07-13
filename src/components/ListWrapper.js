import { h } from 'preact'; // eslint-disable-line no-unused-vars

const ListWrapper = props => {
  const {
    children
  } = props;
  return h("ul", {
    className: "list"
  }, children);
};
export default ListWrapper;