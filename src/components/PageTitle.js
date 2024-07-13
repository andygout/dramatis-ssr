import { h } from 'preact'; // eslint-disable-line no-unused-vars

const PageTitle = props => {
  const {
    text
  } = props;
  return h("h1", {
    className: "title-text"
  }, text);
};
export default PageTitle;