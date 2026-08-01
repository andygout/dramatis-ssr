import { Fragment } from 'preact';

import InstanceLink from './InstanceLink.jsx';

const AppendedSettings = (props) => {
	const { settings } = props;

	return (
		<Fragment>
			<Fragment>{' — '}</Fragment>

			{settings
				.map((setting, index) => (
					<Fragment key={index}>
						{[
							setting.time && (
								<Fragment>
									{'time: '}
									<InstanceLink instance={setting.time} />
								</Fragment>
							),
							setting.place && (
								<Fragment>
									{'place: '}
									<InstanceLink instance={setting.place} />
								</Fragment>
							),
							setting.locale && (
								<Fragment>
									{'locale: '}
									<InstanceLink instance={setting.locale} />
								</Fragment>
							)
						]
							.filter(Boolean)
							.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])}
					</Fragment>
				))
				.reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue])}
		</Fragment>
	);
};

export default AppendedSettings;
