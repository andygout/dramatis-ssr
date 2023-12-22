const API_URL_BASE = 'http://localhost:3000';

export default async apiPath => {

	const apiUrl = `${API_URL_BASE}${apiPath}`;

	try {

		const response = await fetch(apiUrl);

		if (response.status !== 200) {

			const { status, statusText } = response;

			const error = new Error(statusText);

			error.status = status;

			throw error;

		}

		const data = await response.json();

		return data;

	} catch (error) {

		// If fetch is successful but provides a non-200 response.
		if (typeof error.status === 'number') throw error;

		// If fetch is unsuccessful its error will not have a `status` attribute
		// but instead have a `code` attribute whose value is 'ECONNREFUSED',
		// making a 500 response code the most instructive for this scenario.
		const internalServerError = new Error('Internal Server Error', { cause: error });

		internalServerError.status = 500;

		throw internalServerError;

	}

};
