import { setAlert, getAlert } from './alert';

const handleModelResponse = (req, res, data, redirectRoute) => {
	setAlert(req, data.page);

	data.production.errors ?
		res.render('form', Object.assign({}, data, { alert: getAlert(req) })) :
		res.redirect(redirectRoute);
}

export { handleModelResponse }
