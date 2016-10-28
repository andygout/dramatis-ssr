import Production from '../../models/production';

export default function (req, res, next) {
	Production.list(function (err, data) {
		if (err) return next(err);
		const alert = { text: req.flash('text'), type: req.flash('type') };
		res.render('list', Object.assign({}, data, { alert }));
	});
}
