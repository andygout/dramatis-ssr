import { Fragment, h } from 'preact';

import { InstanceLink, AppendedPerformerOtherRoles } from '.';

export default function (props) {

	const { performers } = props;

	return (
		<Fragment>

			<span>&nbsp;- performed by:&nbsp;</span>

			{
				performers
					.map((performer, index) =>
						<Fragment key={index}>

							<Fragment>

								<InstanceLink instance={performer} />

								<span>&nbsp;…&nbsp;</span>

								<span className="role-text">{performer.roleName}</span>

							</Fragment>

							{
								performer.otherRoles.length > 0 && (
									<AppendedPerformerOtherRoles otherRoles={performer.otherRoles} />
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}

		</Fragment>
	);

};
