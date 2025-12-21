const Head = props => {

	const { documentTitle } = props;

	return (
		<head>
			<title>{`${documentTitle} | Dramatis`}</title>

			{/* Ordering of stylesheet groups is important. */}
			<link rel="stylesheet" href="/stylesheets/normalize.css" />

			<link rel="stylesheet" href="/stylesheets/color-variables.css" />

			<link rel="stylesheet" href="/stylesheets/footer.css" />
			<link rel="stylesheet" href="/stylesheets/header.css" />
			<link rel="stylesheet" href="/stylesheets/instance.css" />
			<link rel="stylesheet" href="/stylesheets/list.css" />
			<link rel="stylesheet" href="/stylesheets/navigation.css" />
			<link rel="stylesheet" href="/stylesheets/page.css" />
			<link rel="stylesheet" href="/stylesheets/text.css" />

			<link rel="stylesheet" href="/stylesheets/origami.css" />

			<link rel="stylesheet" href="/stylesheets/o-autocomplete-modifiers.css" />
			<link rel="stylesheet" href="/stylesheets/o-forms-modifiers.css" />

			<script src="/scripts/main.js" />
		</head>
	);

};

export default Head;
