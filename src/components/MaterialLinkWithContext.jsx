import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormatAndYear, InstanceLink, PrependedSurInstance, WritingCredits } from '.';

const MaterialLinkWithContext = props => {

	const { material } = props;

	return (
		<Fragment>

			{
				material.surMaterial?.surMaterial && (
					<PrependedSurInstance surInstance={material.surMaterial.surMaterial} />
				)
			}

			{
				material.surMaterial && (
					<PrependedSurInstance surInstance={material.surMaterial} />
				)
			}

			<InstanceLink instance={material} />

			{
				(material.format || material.year) && (
					<AppendedFormatAndYear format={material.format} year={material.year} />
				)
			}

			{
				material.writingCredits?.length > 0 && (
					<Fragment>

						<Fragment>{' '}</Fragment>

						<WritingCredits credits={material.writingCredits} isAppendage={true} />

					</Fragment>
				)
			}

		</Fragment>
	);

};

export default MaterialLinkWithContext;
