import ListWrapper from './ListWrapper.jsx';
import MaterialLinkWithContext from './MaterialLinkWithContext.jsx';

const MaterialsList = props => {

	const { materials } = props;

	return (
		<ListWrapper>

			{
				materials.map((material, index) =>
					<li key={index}>

						<MaterialLinkWithContext material={material} />

					</li>
				)
			}

		</ListWrapper>
	);

};

export default MaterialsList;
