import { InstanceLink, ListWrapper } from './index.js';

const InstanceLinksList = props => {

	const { instances } = props;

	return (
		<ListWrapper>

			{
				instances.map((instance, index) =>
					<li key={index}>

						<InstanceLink instance={instance} />

					</li>
				)
			}

		</ListWrapper>
	);

};

export default InstanceLinksList;
