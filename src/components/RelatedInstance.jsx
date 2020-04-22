import React from 'react';

import { InstanceLink, JoinedRoles, List } from '.';

export default function (props) {

	const { labelText, instance, join } = props;

	return (
		<div className="content-wrapper">

			<div className="content-label">
				{ labelText }
			</div>

			<div className="content">
				{
					Array.isArray(instance)
						? join
							? <JoinedRoles instances={instance} />
							: <List instances={instance} />
						: <InstanceLink instance={instance} />
				}
			</div>

		</div>
	);

};
