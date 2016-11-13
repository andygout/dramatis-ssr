import Production from '../../models/production';

export default function (req, res, next) {
	const production = new Production();
	res.render('form', production.new());
}
