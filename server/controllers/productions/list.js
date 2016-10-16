import Production from '../../models/production';

export default function (req, res, next) {
	Production.list(function (err, data) {
		if (err) return next(err);
		res.render('list', data);
	});
}
