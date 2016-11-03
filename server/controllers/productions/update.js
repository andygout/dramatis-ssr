import Production from '../../models/production';
import { setAlert, getAlert } from '../../lib/alert';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.update(function (err, data) {
		if (err) return next(err);

		setAlert(req, data.page);

		data.production.errors ?
			res.render('form', Object.assign({}, data, { alert: getAlert(req) })) :
			res.redirect(`/productions/${data.production.id}`);
	});
}
