import { getAlert, setAlert } from './alert';

export default function (req, res, data) {

	const page = data.page;

	setAlert(req, page);

	data[page.modelName].hasError ?
		(page.action === 'create' || page.action === 'update') ?
			res.render(`${page.modelRoute}/form`, Object.assign(data, { alert: getAlert(req) })) :
			res.redirect(page.instanceRoute)
		:
		res.redirect(page.action !== 'delete' ? page.instanceRoute : '/');

};
