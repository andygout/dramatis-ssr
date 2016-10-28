import Production from '../../models/production';
import { getAlert } from '../../../lib/alert';

export default function (req, res, next) {
	Production.list(function (err, data) {
		if (err) return next(err);
		res.render('list', Object.assign({}, data, { alert: getAlert(req) }));
	});
}
