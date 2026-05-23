const Header = () => {
	return (
		<header className="header">
			<div className="header__component">
				<a href="/" className="header__home-link">
					<img
						src="/assets/header-logo-icon.svg"
						alt="The Dramatis logo: the comedy and tragedy masks framed in a cell"
						className="header__home-link-icon"
					/>
					Dramatis
				</a>
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
