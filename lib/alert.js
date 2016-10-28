const setAlert = (req, text, type) => {
	req.flash('text', text);
	req.flash('type', type);
}

const getAlert = req => ({ text: req.flash('text'), type: req.flash('type') })

export { setAlert, getAlert }
