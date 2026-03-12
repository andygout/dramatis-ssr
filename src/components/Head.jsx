const Head = (props) => {
	const { documentTitle } = props;

	return (
		<head>
			<title>{`${documentTitle} | Dramatis`}</title>

			<link rel="stylesheet" href="/stylesheets/main.css" />

			<script src="/scripts/main.js" />
		</head>
	);
};

export default Head;
