import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedCoEntities, AppendedEmployerCompany, AppendedMembers } from './index.js';
const AppendedProductionTeamCredits = props => {
  const {
    credits
  } = props;
  return h(Fragment, null, h(Fragment, null, ' … '), credits.map((credit, index) => h(Fragment, {
    key: index
  }, h(Fragment, null, credit.name), credit.members?.length > 0 && h(AppendedMembers, {
    members: credit.members
  }), credit.employerCompany && h(AppendedEmployerCompany, {
    employerCompany: credit.employerCompany
  }), credit.coEntities?.length > 0 && h(AppendedCoEntities, {
    coEntities: credit.coEntities
  }))).reduce((accumulator, currentValue) => [accumulator, '; ', currentValue]));
};
export default AppendedProductionTeamCredits;