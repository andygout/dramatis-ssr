import { h } from 'preact'; // eslint-disable-line no-unused-vars
import render from 'preact-render-to-string';

export default (PageComponent, props) => { // eslint-disable-line react/display-name

	return render(<PageComponent { ...props } />);

};
