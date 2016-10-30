import Production from '../../models/production';
import { setAlert, getAlert } from '../../lib/alert';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.create(function (err, data) {
		if (err) return next(err);

		if (data.production.errors) {
			setAlert(req, 'PRODUCTION ERRORS', 'error');
			res.render('form', Object.assign({}, data, { alert: getAlert(req) }));
		} else {
			setAlert(req, `PRODUCTION CREATED: ${production.title}`, 'success');
			res.redirect(`/productions/${data.production.id}`);
		}
	});
}
