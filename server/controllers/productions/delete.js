import Production from '../../models/production';
import { handleModelResponse } from '../../lib/handle-model-response';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.delete()
		.then(data => {
			const redirectRoute = '/';
			handleModelResponse(req, res, data, redirectRoute);
		})
		.catch(err => next(err));
}
