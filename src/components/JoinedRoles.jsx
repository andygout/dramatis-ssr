import { Fragment } from 'preact';

import AppendedQualifier from './AppendedQualifier.jsx';
import InstanceLink from './InstanceLink.jsx';

const JoinedRoles = props => {

	const { instances } = props;

	return (
		<Fragment>

			{
				instances
					.map((instance, index) =>
						<Fragment key={index}>

							<span className="fictional-name-text">

								{
									instance.uuid
										? <InstanceLink instance={instance} />
										: instance.name
								}

								{
									instance.qualifier && (
										<AppendedQualifier qualifier={instance.qualifier} />
									)
								}

							</span>

							{
								instance.isAlternate && (
									<Fragment>{' [alt]'}</Fragment>
								)
							}

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue])
			}

		</Fragment>
	);

};

export default JoinedRoles;
