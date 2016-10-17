import Production from '../../models/production';

export default function (req, res, next) {
	const data = Object.assign({}, req.body)

	const production = new Production(data);

	production.update(function (err, id) {
		if (err) return next(err);
		req.flash('info', 'PRODUCTION UPDATED');
		res.redirect(`/productions/${id}`);
	});
}
