import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, AppendedPerformerOtherRoles } from '.';

const AppendedPerformers = props => {

	const { performers } = props;

	return (
		<Fragment>

			<Fragment>{' - performed by: '}</Fragment>

			{
				performers
					.map((performer, index) =>
						<Fragment key={index}>

							<InstanceLink instance={performer} />

							<Fragment>{' … '}</Fragment>

							<span className="fictional-name-text">

								{
									performer.roleName
								}

								{
									performer.qualifier && (
										<Fragment>{` (${performer.qualifier})`}</Fragment>
									)
								}

								{
									performer.isAlternate && (
										<Fragment>{' (alt)'}</Fragment>
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
