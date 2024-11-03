import InstanceLink from './InstanceLink.jsx';
import ListWrapper from './ListWrapper.jsx';

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
