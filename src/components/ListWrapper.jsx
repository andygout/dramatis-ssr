const ListWrapper = props => {

	const { children } = props;

	return (
		<ul className="list">

			{ children }

		</ul>
	);

};

export default ListWrapper;
