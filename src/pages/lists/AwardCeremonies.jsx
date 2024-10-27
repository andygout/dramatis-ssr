import { Fragment } from 'preact';

import { App, InstanceLink, ListWrapper } from '../../components/index.js';

const AwardCeremonies = props => {

	const { documentTitle, pageTitle, awardCeremonies } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<ListWrapper>

				{
					awardCeremonies.map((awardCeremony, index) =>
						<li key={index}>

							{
								awardCeremony.award && (
									<Fragment>

										<InstanceLink instance={awardCeremony.award} />

										<Fragment>{': '}</Fragment>

									</Fragment>
								)
							}

							<InstanceLink instance={awardCeremony} />

						</li>
					)
				}

			</ListWrapper>

		</App>
	);

};

export default AwardCeremonies;
