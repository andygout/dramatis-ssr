import Production from '../../models/production';
import { setAlert } from '../../../lib/alert';

export default function (req, res, next) {
	const production = new Production(req.params);

	production.delete(function (err, data) {
		if (err) return next(err);
		setAlert(req, `PRODUCTION DELETED: ${data.production.title}`, 'success');
		res.redirect('/');
	});
}
