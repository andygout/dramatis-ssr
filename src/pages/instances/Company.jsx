import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../../components';

const Company = props => {

	const { documentTitle, pageTitle, company } = props;

	const { model } = company;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model} />
	);

};

export default Company;
