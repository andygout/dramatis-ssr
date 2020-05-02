import React from 'react';

import { InstanceLink } from '.';
import isObjectWithKeys from '../lib/is-object-with-keys';

export default function (props) {

	const { instances } = props;

	return (
		<span className="role-text">
			{
				instances
					.map((instance, index) =>
						<span key={index}>
							{
								isObjectWithKeys(instance) && instance.uuid
									? <InstanceLink instance={instance} />
									: isObjectWithKeys(instance)
										? instance.name
										: instance
							}
						</span>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}
		</span>
	);

};
