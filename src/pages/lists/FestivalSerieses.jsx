import { App, InstanceLinksList } from '../../components/index.js';

const FestivalSerieses = props => {

	const { documentTitle, pageTitle, festivalSerieses } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={festivalSerieses} />

		</App>
	);

};

export default FestivalSerieses;
