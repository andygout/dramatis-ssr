import { h } from 'preact'; // eslint-disable-line no-unused-vars

const ListWrapper = props => {

	const { children } = props;

	return (
		<ul className="list">

			{ children }

		</ul>
	);

};

export default ListWrapper;
