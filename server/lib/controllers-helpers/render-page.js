import { getAlert } from '../alert';
import getListPageData from '../get-list-page-data';
import getPageData from '../get-page-data';
import pluralise from '../pluralise';

export default (req, res, instance, page, opts = {}) => {

	const isListPage = (page === 'list');

	const pageData = isListPage ? getListPageData(opts.pluralisedModel) : getPageData(instance, opts.action || page);

	const renderData = {
		page: pageData,
		alert: getAlert(req)
	};

	renderData[page] = true;

	isListPage ? renderData.instances = instance : renderData.instance = instance;

	res.render(`models/${opts.pluralisedModel || pluralise(instance.model)}/${page}`, renderData);

};
