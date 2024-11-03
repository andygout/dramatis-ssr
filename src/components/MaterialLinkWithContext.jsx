import { Fragment } from 'preact';

import AppendedFormatAndYear from './AppendedFormatAndYear.jsx';
import InstanceLink from './InstanceLink.jsx';
import PrependedSurInstance from './PrependedSurInstance.jsx';
import WritingCredits from './WritingCredits.jsx';

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
