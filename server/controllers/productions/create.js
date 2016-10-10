import Production from '../../models/production';

export default function (req, res, next) {
	const production = new Production(req.body);

	production.create(function (err, id) {
		if (err) return next(err);
		res.redirect(`/productions/${id}`);
	});
}
