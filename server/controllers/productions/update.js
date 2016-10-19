import Production from '../../models/production';

export default function (req, res, next) {
	const data = Object.assign({}, req.body)

	const production = new Production(data);

	production.update(function (err, data) {
		if (err) return next(err);

		if (data.production.errors) {
			req.flash('text', 'PRODUCTION ERRORS');
			req.flash('type', 'error');
			const flashMsg = { text: req.flash('text'), type: req.flash('type') };
			res.render('form', Object.assign({}, data, { flashMsg }));
		} else {
			req.flash('text', 'PRODUCTION UPDATED');
			req.flash('type', 'success');
			res.redirect(`/productions/${data.production.id}`);
		}
	});
}
