import capitalise from './capitalise';

export default pluralisedModel => {

	const title = capitalise(pluralisedModel);

	const documentTitle = ` | ${pluralisedModel === 'productions' ? 'Home' : title}`;

	return { documentTitle, title };

};
