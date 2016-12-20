const Theatre = require('../../models/theatre');

module.exports = function (req, res, next) {
	const theatre = new Theatre();
	res.render('form', theatre.new());
};
