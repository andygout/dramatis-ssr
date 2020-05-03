import { h } from 'preact';
import render from 'preact-render-to-string';

export default function (PageComponent, props) {

	return render(<PageComponent { ...props } />);

};
