import { h } from 'preact';

export default function (props) {

	const { text } = props;

	return (
		<h1 className="title-text">
			{ text }
		</h1>
	);

};
