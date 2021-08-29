import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { getRouteFromModel } from '../lib/get-route';

const InstanceLink = props => {

	const { instance: { model, uuid, name } } = props;

	const instancePath = `/${getRouteFromModel(model)}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};

export default InstanceLink;
