import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { formatDate } from '../lib/format-date.js';
const AppendedDate = props => {
  const {
    date
  } = props;
  return h(Fragment, null, ` (${formatDate(date)})`);
};
export default AppendedDate;