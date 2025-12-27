import fetchFromApi from '../lib/fetch-from-api.js';

export default async (request, response, next) => {

	const { query: { searchTerm } } = request;

	if (!searchTerm) return response.send([]);

	try {

		const searchResults = await fetchFromApi(`/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`);

		return response.send(searchResults);

	} catch (error) {

		return next(error);

	}

};
