import Production from '../../models/production';
import { handleModelResponse } from '../../lib/handle-model-response';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.delete(function (err, data) {
		const redirectRoute = '/';
		handleModelResponse(req, res, err, data, redirectRoute);
	});
}
