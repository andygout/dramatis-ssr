import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedDepictions = props => {
  const {
    depictions
  } = props;
  return h(Fragment, null, depictions.map((depiction, index) => h(Fragment, {
    key: index
  }, depiction.displayName && h(Fragment, null, ' (as ', h("span", {
    className: "fictional-name-text"
  }, depiction.displayName), ")"), depiction.qualifier && h(Fragment, null, ` (${depiction.qualifier})`), depiction.group && h(Fragment, null, ` (${depiction.group})`))).reduce((accumulator, currentValue) => [accumulator, ' /', currentValue]));
};
export default AppendedDepictions;