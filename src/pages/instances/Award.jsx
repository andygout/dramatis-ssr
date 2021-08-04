import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../../components';

const Award = props => {

	const { documentTitle, pageTitle, award } = props;

	const { model } = award;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model} />
	);

};

export default Award;
