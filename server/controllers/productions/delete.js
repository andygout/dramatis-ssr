import Production from '../../models/production';

export default function (req, res, next) {
	const production = new Production(req.params);

	production.delete(function (err, data) {
		if (err) return next(err);
		req.flash('text', `PRODUCTION DELETED: ${data.production.title}`);
		req.flash('type', 'success');
		res.redirect('/');
	});
}
