import React from 'react';

import { InstanceLink } from '.';

export default function (props) {

	const { instances } = props;

	return (
		<span className="role-text">
			{
				instances
					.map((instance, index) =>
						<span key={index}>
							{
								instance.uuid
									? <InstanceLink instance={instance} />
									: instance.name || instance
							}
						</span>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}
		</span>
	);

};
