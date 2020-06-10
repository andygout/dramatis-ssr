import { h } from 'preact';

import { Footer, Head, Header, InstanceLabel, Navigation, PageTitle } from '.';

export default props => {

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
								<InstanceLabel text={model} />
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
