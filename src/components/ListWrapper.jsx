import { h } from 'preact'; // eslint-disable-line no-unused-vars

const ListWrapper = props => {

	const { isNested, children } = props;

	return (
		<ul className={isNested ? 'list--nested' : 'list'}>

			{ children }

		</ul>
	);

};

export default ListWrapper;
