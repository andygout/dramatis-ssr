import { h } from 'preact';

export default function (props) {

	const { text } = props;

	return (
		<div className="instance-label">
			{ text }
		</div>
	);

};
