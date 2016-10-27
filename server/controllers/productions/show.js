import Production from '../../models/production';

export default function (req, res, next) {
	const production = new Production(req.params);

	production.show(function (err, data) {
		if (err) return next(err);
		const flashMsg = { text: req.flash('text'), type: req.flash('type') };
		res.render('show', Object.assign({}, data, { flashMsg }));
	});
}
