import render from 'preact-render-to-string';

const renderComponentToString = (PageComponent, props) => {

	return render(<PageComponent { ...props } />);

};

export default renderComponentToString;
