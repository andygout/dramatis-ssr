import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, AppendedPerformerOtherRoles } from '.';

const AppendedPerformers = props => {

	const { performers } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;- performed by:&nbsp;</Fragment>

			{
				performers
					.map((performer, index) =>
						<Fragment key={index}>

							<InstanceLink instance={performer} />

							<Fragment>&nbsp;…&nbsp;</Fragment>

							<span className="role-text">

								{
									performer.roleName
								}

								{
									performer.qualifier && (
										<Fragment>&nbsp;({ performer.qualifier })</Fragment>
									)
								}

							</span>

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

export default AppendedPerformers;
