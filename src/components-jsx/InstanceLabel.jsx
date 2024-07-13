import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { MODEL_TO_DISPLAY_NAME_MAP } from '../utils/constants.js';

const InstanceLabel = props => {

	const { model } = props;

	return (
		<div className="instance-label">
			{ MODEL_TO_DISPLAY_NAME_MAP[model] }
		</div>
	);

};

export default InstanceLabel;
