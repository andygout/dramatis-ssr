import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from './index.js';
const AppendedEmployerCompany = props => {
  const {
    employerCompany
  } = props;
  return h(Fragment, null, h(Fragment, null, ' ('), employerCompany.coMembers?.length > 0 && h(Fragment, null, h(Fragment, null, 'with '), h(CommaSeparatedInstanceLinks, {
    instances: employerCompany.coMembers
  }), h(Fragment, null, ' ')), h(Fragment, null, 'for '), h(InstanceLink, {
    instance: employerCompany
  }), h(Fragment, null, ')'));
};
export default AppendedEmployerCompany;