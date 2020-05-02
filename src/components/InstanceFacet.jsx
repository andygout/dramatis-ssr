import React from 'react';

export default function (props) {

	const { labelText, children } = props;

	return (
		<div className="instance-facet-wrapper">

			<div className="instance-facet-label">
				{ labelText }
			</div>

			<div className="instance-facet">
				{ children }
			</div>

		</div>
	);

};
