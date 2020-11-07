import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WriterGroups } from '.';

const AppendedWriterGroups = props => {

	const { writerGroups } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;</Fragment>

			<WriterGroups writerGroups={writerGroups} isAppendage={true} />

		</Fragment>
	);

};

export default AppendedWriterGroups;
