import Production from '../../models/production';

export default function (req, res, next) {
	const production = new Production(req.params);

	production.edit(function (err, data) {
		if (err) return next(err);
		res.render('form', data);
	});
}
