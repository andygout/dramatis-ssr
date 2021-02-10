import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, List } from '../../components';

const Company = props => {

	const { documentTitle, pageTitle, company } = props;

	const { model, materials, subsequentVersionMaterials, sourcingMaterials, rightsGrantorMaterials } = company;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				materials?.length > 0 && (
					<InstanceFacet labelText='Materials'>

						<List instances={materials} />

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterials?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions of their materials'>

						<List instances={subsequentVersionMaterials} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as source material writer'>

						<List instances={sourcingMaterials} />

					</InstanceFacet>
				)
			}

			{
				rightsGrantorMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as rights grantor'>

						<List instances={rightsGrantorMaterials} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Company;
