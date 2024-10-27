import { Footer, Head, Header, InstanceLabel, Navigation, PageSubtitle, PageTitle } from './index.js';
import { CurrentPath } from '../contexts/index.js';

const App = props => {

	const { currentPath, documentTitle, pageTitle, pageSubtitle, model, children } = props;

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

						{
							pageSubtitle && (
								<PageSubtitle text={pageSubtitle} />
							)
						}

						<CurrentPath.Provider value={currentPath}>

							{ children }

						</CurrentPath.Provider>

					</main>

					<Footer />

				</div>

			</body>

		</html>
	);

};

export default App;
