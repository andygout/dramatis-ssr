import Production from '../../models/production';
import { setAlert } from '../../lib/alert';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.delete(function (err, data) {
		if (err) return next(err);

		setAlert(req, data.page);

		res.redirect('/');
	});
}
