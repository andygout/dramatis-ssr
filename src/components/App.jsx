import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { Footer, Head, Header, InstanceLabel, Navigation, PageTitle } from '.';

const App = props => {

	const { documentTitle, pageTitle, model, children } = props;

	return (
		<html>

			<Head documentTitle={documentTitle} />

			<body>

				<div className="page-container">

					<Header />

					<Navigation />

					<main className="main-content">

						{
							model && (
								<InstanceLabel model={model} />
							)
						}

						<PageTitle text={pageTitle} />

						{ children }

					</main>

					<Footer />

				</div>

			</body>

		</html>
	);

};

export default App;
