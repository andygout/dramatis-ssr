import { h } from 'preact';

export default props => {

	const { text } = props;

	return (
		<div className="instance-label">
			{ text }
		</div>
	);

};
