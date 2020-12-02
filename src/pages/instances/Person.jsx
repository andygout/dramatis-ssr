import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, List } from '../../components';

const Person = props => {

	const { documentTitle, pageTitle, person } = props;

	const { model, playtexts, subsequentVersionPlaytexts, productions } = person;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				playtexts?.length > 0 && (
					<InstanceFacet labelText='Playtexts'>

						<List instances={playtexts} />

					</InstanceFacet>
				)
			}

			{
				subsequentVersionPlaytexts?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions of their playtexts'>

						<List instances={subsequentVersionPlaytexts} />

					</InstanceFacet>
				)
			}

			{
				productions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<List instances={productions} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Person;
