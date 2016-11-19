import Production from '../../models/production';
import { getAlert } from '../../lib/alert';

export default function (req, res, next) {
	const production = new Production(req.params);

	production.show()
		.then(data => res.render('show', Object.assign({}, data, { alert: getAlert(req) })))
		.catch(err => next(err));
}
