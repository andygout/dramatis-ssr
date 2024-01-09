import { h } from 'preact'; // eslint-disable-line no-unused-vars

const PageSubtitle = props => {

	const { text } = props;

	return (
		<h2 className="subtitle-text">
			{ text }
		</h2>
	);

};

export default PageSubtitle;
