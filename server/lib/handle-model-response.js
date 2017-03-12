import { getAlert } from './alert';
import createAlert from './create-alert';
import getPageData from './get-page-data';
import instanceRoute from './instance-route';

export default (req, res, instance, action) => {

	createAlert(req, instance, action);

	if (instance.hasError) {

		if (['create', 'update'].includes(action)) {

			const data = { page: getPageData(instance, action), alert: getAlert(req) };

			data[instance.model.toLowerCase()] = instance;

			res.render(`${instance.model.toLowerCase()}s/form`, data);

		} else {

			res.redirect(`${instanceRoute(instance)}`);

		}

	} else {

		res.redirect(action !== 'delete' ? `${instanceRoute(instance)}` : '/');

	}

};
