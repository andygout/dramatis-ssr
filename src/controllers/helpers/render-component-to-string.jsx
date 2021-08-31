import { h } from 'preact'; // eslint-disable-line no-unused-vars
import render from 'preact-render-to-string';

const renderComponentToString = (PageComponent, props) => {

	return render(<PageComponent { ...props } />);

};

export default renderComponentToString;
