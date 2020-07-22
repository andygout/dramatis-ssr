import { h } from 'preact'; // eslint-disable-line no-unused-vars
import render from 'preact-render-to-string';

export default (PageComponent, props) => {

	return render(<PageComponent { ...props } />);

};
