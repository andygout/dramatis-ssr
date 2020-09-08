import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, AppendedPerformerOtherRoles } from '.';

const AppendedPerformers = props => {

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

								<span className="role-text">
									{
										performer.roleName
									}
									{
										performer.qualifier && (
											<span> ({ performer.qualifier })</span>
										)
									}
								</span>

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

export default AppendedPerformers;
