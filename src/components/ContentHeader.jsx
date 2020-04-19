import React from 'react';

export default function (props) {

	const { text } = props;

	return (
		<div className="content-header">
			{text}
		</div>
	);

};
