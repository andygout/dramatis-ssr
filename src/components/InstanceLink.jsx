import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { MODEL_TO_ROUTE_MAP } from '../utils/constants';

const InstanceLink = props => {

	const { instance: { model, uuid, name } } = props;

	const instancePath = `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};

export default InstanceLink;
