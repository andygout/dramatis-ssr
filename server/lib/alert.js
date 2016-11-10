const setAlert = (req, pageData) => {
	req.flash('text', pageData.alertText);
	req.flash('type', pageData.alertType);
}

const getAlert = req => ({ text: req.flash('text'), type: req.flash('type') })

export { setAlert, getAlert }
