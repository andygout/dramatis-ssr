import { MODELS } from '../utils/constants.js';

export default instance => {

	const { name } = instance;

	let title = name;

	switch (instance.model) {

		case MODELS.AWARD_CEREMONY:
			if (instance.award) title = `${instance.award.name} ${title}`;
			return title;

		case MODELS.FESTIVAL:
			if (instance.festivalSeries) title = `${instance.festivalSeries.name} ${title}`;
			return title;

		case MODELS.VENUE:
			if (instance.surVenue) title = `${instance.surVenue.name}: ${title}`;
			return title;

		default:
			return title;

	}

};
