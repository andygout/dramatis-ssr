import { h } from 'preact';
import render from 'preact-render-to-string';

export default (PageComponent, props) => {

	return render(<PageComponent { ...props } />);

};
