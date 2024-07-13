import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedQualifier = props => {
  const {
    qualifier
  } = props;
  return h(Fragment, null, ` (${qualifier})`);
};
export default AppendedQualifier;