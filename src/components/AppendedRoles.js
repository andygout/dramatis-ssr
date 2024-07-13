import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { JoinedRoles } from './index.js';
const AppendedRoles = props => {
  const {
    roles
  } = props;
  return h(Fragment, null, h(Fragment, null, ' … '), h(JoinedRoles, {
    instances: roles
  }));
};
export default AppendedRoles;