import React from 'react';

export default function (props) {

	const { text } = props;

	return (
		<h1 className="title-text">
			{ text }
		</h1>
	);

};
