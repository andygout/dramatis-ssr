import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from './index.js';
const AppendedMembers = props => {
  const {
    members
  } = props;
  return h(Fragment, null, h(Fragment, null, ' ('), h(CommaSeparatedInstanceLinks, {
    instances: members
  }), h(Fragment, null, ')'));
};
export default AppendedMembers;