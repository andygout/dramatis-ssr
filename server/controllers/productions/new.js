const query = require('../../../lib/query');

module.exports = (req, res) => {
	const content = {
		pageTitle: 'New production',
		formAction: '/productions',
		submitValue: 'Create production'
	}

	res.render('form', content);
};
