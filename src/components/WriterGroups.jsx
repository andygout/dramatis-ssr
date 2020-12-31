import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WriterEntities } from '.';
import { capitalise } from '../lib/strings';

const WriterGroups = props => {

	const { writerGroups, isAppendage } = props;

	return (
		<Fragment>

			{
				writerGroups
					.map((writerGroup, index) => {

						const writerGroupName = !isAppendage && index === 0
							? capitalise(writerGroup.name)
							: writerGroup.name;

						return (
							<Fragment key={index}>

								<Fragment>{ writerGroupName }&nbsp;</Fragment>

								<WriterEntities entities={writerGroup.writers} />

							</Fragment>
						);
					})
					.reduce((prev, curr) => [prev, '; ', curr])
			}

		</Fragment>
	);

};

export default WriterGroups;
