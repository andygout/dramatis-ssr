import { renderFormPage } from './render-templates';
import { setAlert, getAlert } from '../alert';
import createAlertData from '../create-alert-data';
import getPageData from '../get-page-data';
import instanceRoute from '../instance-route';
import pluralise from '../pluralise';

export default (req, res, instance, action) => {

	setAlert(req, createAlertData(instance, action));

	if (instance.hasError) {

		['create', 'update'].includes(action) ?
			renderFormPage(req, res, instance, action) :
			res.redirect(`${instanceRoute(instance)}`);

	} else {

		res.redirect(action !== 'delete' ? `${instanceRoute(instance)}` : '/');

	}

};
