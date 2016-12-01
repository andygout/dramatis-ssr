exports.set = (req, pageData) => {
	req.flash('text', pageData.alertText);
	req.flash('type', pageData.alertType);
};

exports.get = req => ({ text: req.flash('text'), type: req.flash('type') });
