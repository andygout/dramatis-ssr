const Header = () => {

	return (
		<header className="header">

			<div className="header__component">

				<a href='/' className="header__home-link">Dramatis</a>

			</div>

			<span className="header__component">
				<span id="autocomplete" className="autocomplete">
					<input id="autocomplete-input" type="text" placeholder="Search Dramatis…" />
				</span>
			</span>

		</header>
	);

};

export default Header;
