import { getAlert } from '../alert';
import getListPageData from '../get-list-page-data';
import getPageData from '../get-page-data';
import pluralise from '../pluralise';

const renderFormPage = (res, instance, action) => {

	res.render(`${pluralise(instance.model)}/form`, {
		instance,
		page: getPageData(instance, action),
		form: true
	});

};

const renderShowPage = (req, res, instance) => {

	res.render(`${pluralise(instance.model)}/show`, {
		instance,
		page: getPageData(instance, 'show'),
		alert: getAlert(req),
		show: true
	});

};

const renderListPage = (req, res, instances, pluralisedModel) => {

	res.render(`${pluralisedModel}/list`, {
		instances,
		page: getListPageData(pluralisedModel),
		alert: getAlert(req),
		list: true
	});

};

export {
	renderFormPage,
	renderShowPage,
	renderListPage
};
