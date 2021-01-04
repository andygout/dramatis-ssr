import { h } from 'preact'; // eslint-disable-line no-unused-vars

const Navigation = () => {

	return (
		<nav className="navigation">

			<ul>

				<li><a href='/'>Home</a></li>

				<li><a href='/characters'>Characters</a></li>

				<li><a href='/materials'>Materials</a></li>

				<li><a href='/people'>People</a></li>

				<li><a href='/productions'>Productions</a></li>

				<li><a href='/theatres'>Theatres</a></li>

			</ul>

		</nav>
	);

};

export default Navigation;
