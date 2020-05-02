import React from 'react';

import { InstanceLink, AppendedPerformerOtherRoles } from '.';

export default function (props) {

	const { performers } = props;

	return (
		<React.Fragment>

			<span>&nbsp;- performed by:&nbsp;</span>

			{
				performers
					.map((performer, index) =>
						<React.Fragment key={index}>

							<React.Fragment>

								<InstanceLink instance={performer} />

								<span>&nbsp;…&nbsp;</span>

								<span className="role-text">{performer.role.name}</span>

							</React.Fragment>

							{
								performer.otherRoles.length > 0 && (
									<AppendedPerformerOtherRoles otherRoles={performer.otherRoles} />
								)
							}

						</React.Fragment>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}

		</React.Fragment>
	);

};
