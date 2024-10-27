import { App } from '../components/index.js';

const Home = props => {

	const { documentTitle, pageTitle } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<div>This is the home page</div>

		</App>
	);

};

export default Home;
