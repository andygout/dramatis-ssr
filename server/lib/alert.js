const setAlert = (req, alertText, alertType) => {

	req.flash('text', alertText);
	req.flash('type', alertType);

};

const getAlert = req => {

	return { text: req.flash('text'), type: req.flash('type') };

};

export { setAlert, getAlert };
