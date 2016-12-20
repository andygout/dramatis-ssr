const Theatre = require('../../models/theatre');

module.exports = function (req, res, next) {
	const theatre = new Theatre(req.params);

	return theatre.edit()
		.then(data => res.render('form', data))
		.catch(err => next(err));
};
