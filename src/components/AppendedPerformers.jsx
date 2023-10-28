import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, JoinedRoles } from '.';

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

							</span>

							{
								performer.isAlternate && (
									<Fragment>{' [alt]'}</Fragment>
								)
							}

							{
								performer.otherRoles.length > 0 && (
									<Fragment>

										<Fragment>{'; also performed: '}</Fragment>

										<JoinedRoles instances={performer.otherRoles} />

									</Fragment>
								)
							}

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue])
			}

		</Fragment>
	);

};

export default AppendedPerformers;
