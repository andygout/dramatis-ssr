import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, List } from '../../components';

const Award = props => {

	const { documentTitle, pageTitle, award } = props;

	const { model, awardCeremonies } = award;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				awardCeremonies?.length > 0 && (
					<InstanceFacet labelText='Ceremonies'>

						<List instances={awardCeremonies} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Award;
