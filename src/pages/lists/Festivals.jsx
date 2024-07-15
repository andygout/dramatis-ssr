import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLink, ListWrapper } from '../../components/index.js';

const Festivals = props => {

	const { documentTitle, pageTitle, festivals } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<ListWrapper>

				{
					festivals.map((festival, index) =>
						<li key={index}>

							{
								festival.festivalSeries && (
									<Fragment>

										<InstanceLink instance={festival.festivalSeries} />

										<Fragment>{': '}</Fragment>

									</Fragment>
								)
							}

							<InstanceLink instance={festival} />

						</li>
					)
				}

			</ListWrapper>

		</App>
	);

};

export default Festivals;
