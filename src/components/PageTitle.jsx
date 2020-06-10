import { h } from 'preact';

export default props => {

	const { text } = props;

	return (
		<h1 className="title-text">
			{ text }
		</h1>
	);

};
