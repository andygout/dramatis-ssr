import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, List } from '../../components';

const AwardCeremony = props => {

	const { documentTitle, pageTitle, awardCeremony } = props;

	const { model, award, categories } = awardCeremony;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				award && (
					<InstanceFacet labelText='Award'>

						<InstanceLink instance={award} />

					</InstanceFacet>
				)
			}

			{
				categories?.length > 0 && (
					<InstanceFacet labelText='Categories'>

						<List instances={categories} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default AwardCeremony;
