const dateFormat = require('dateformat');

module.exports = function(format) {

	return dateFormat(new Date(), format);

};
