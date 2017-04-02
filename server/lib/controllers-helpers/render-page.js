import { getAlert } from '../alert';
import getPageData from '../get-page-data';
import pluralise from '../pluralise';

export default (req, res, instance, page, opts = {}) => {

	const getPageDataOpts = {};

	if (opts.pluralisedModel) getPageDataOpts.pluralisedModel = opts.pluralisedModel;

	const pageData = getPageData(instance, opts.action || page, getPageDataOpts);

	const renderData = {
		page: pageData,
		alert: getAlert(req)
	};

	renderData[page] = true;

	page === 'list' ? renderData.instances = instance : renderData.instance = instance;

	res.render(`models/${opts.pluralisedModel || pluralise(instance.model)}/${page}`, renderData);

};
