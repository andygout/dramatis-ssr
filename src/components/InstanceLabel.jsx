import { h } from 'preact'; // eslint-disable-line no-unused-vars

const InstanceLabel = props => {

	const { text } = props;

	return (
		<div className="instance-label">
			{ text }
		</div>
	);

};

export default InstanceLabel;
