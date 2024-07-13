import { h } from 'preact'; // eslint-disable-line no-unused-vars

const PageSubtitle = props => {
  const {
    text
  } = props;
  return h("h2", {
    className: "subtitle-text"
  }, text);
};
export default PageSubtitle;