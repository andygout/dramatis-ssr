import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink } from '../../components';

const AwardCeremony = props => {

	const { documentTitle, pageTitle, awardCeremony } = props;

	const { model, award } = awardCeremony;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				award && (
					<InstanceFacet labelText='Award'>

						<InstanceLink instance={award} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default AwardCeremony;
