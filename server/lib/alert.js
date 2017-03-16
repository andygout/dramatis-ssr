const setAlert = (req, alertData) => {

	req.flash('text', alertData.text);
	req.flash('type', alertData.type);

};

const getAlert = req => ({ text: req.flash('text'), type: req.flash('type') });

export { setAlert, getAlert };
