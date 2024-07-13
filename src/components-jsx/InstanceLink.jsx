import { h } from 'preact'; // eslint-disable-line no-unused-vars
import { useContext } from 'preact/hooks';

import { CurrentPath } from '../contexts/index.js';

import { MODEL_TO_ROUTE_MAP } from '../utils/constants.js';

const InstanceLink = props => {

	const { instance: { model, uuid, name } } = props;

	const instancePath = `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`;

	const currentPath = useContext(CurrentPath);

	return (
		<a
			href={instancePath === currentPath ? null : instancePath}
			className={instancePath === currentPath ? 'active' : null}
			aria-current={instancePath === currentPath ? 'page' : null}
		>
			{ name }
		</a>
	);

};

export default InstanceLink;
