import Production from '../../models/production';

export default function (req, res, next) {
	Production.list(function (err, data) {
		if (err) return next(err);
		const flashMsg = req.flash('info');
		res.render('list', Object.assign({}, data, { flashMsg }));
	});
}
