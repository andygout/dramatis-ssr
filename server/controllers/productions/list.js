import Production from '../../models/production';
import { getAlert } from '../../lib/alert';

export default function (req, res, next) {
	Production.list()
		.then(data => res.render('list', Object.assign({}, data, { alert: getAlert(req) })))
		.catch(err => next(err));
}
