import Production from '../../models/production';

export default function (req, res, next) {
	const production = new Production();

	production.new(function (data) {
		res.render('form', data);
	});
}
