import React from 'react';
import { renderToString } from 'react-dom/server';

export default function (PageComponent, props) {

	return renderToString(<PageComponent { ...props } />);

};
