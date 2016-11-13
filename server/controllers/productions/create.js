import Production from '../../models/production';
import { handleModelResponse } from '../../lib/handle-model-response';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.create()
		.then(data => {
			const redirectRoute = `/productions/${data.production.id}`;
			handleModelResponse(req, res, data, redirectRoute);
		})
		.catch(err => next(err));
}
