import { h } from 'preact';

export default function (props) {

	const { documentTitle } = props;

	return (
		<head>
			<title>{`${documentTitle} | TheatreBase`}</title>
			<link rel="stylesheet" href="/main.css" />
			<script> </script>
			{/*
				Until the above script tags have content,
				this whitespace will stop the CSS transition
				from firing on page load.
			*/}
		</head>
	);

};
