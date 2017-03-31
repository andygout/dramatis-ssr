import renderPage from './render-page';
import { setAlert } from '../alert';
import createAlertData from '../create-alert-data';
import instanceRoute from '../instance-route';

export default (req, res, instance, action) => {

	setAlert(req, createAlertData(instance, action));

	if (instance.hasError) {

		['create', 'update'].includes(action) ?
			renderPage(req, res, instance, 'form', { action }) :
			res.redirect(`${instanceRoute(instance)}`);

	} else {

		res.redirect(action !== 'delete' ? `${instanceRoute(instance)}` : '/');

	}

};
