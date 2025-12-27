import fetchFromApi from '../lib/fetch-from-api.js';

export default async (request, response, next) => {

	const { query: { searchTerm } } = request;

	try {

		const searchResults = await fetchFromApi(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);

		return response.send(searchResults);

	} catch (error) {

		return next(error);

	}

};
