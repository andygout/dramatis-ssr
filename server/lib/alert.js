const setAlert = (req, alertData) => {

	req.flash('text', alertData.text);
	req.flash('type', alertData.type);

};

const getAlert = req => {

	const alertData = req.flash();

	return Object.keys(alertData).length ?
		{ text: alertData.text, type: alertData.type } :
		null;
};

export { setAlert, getAlert };
