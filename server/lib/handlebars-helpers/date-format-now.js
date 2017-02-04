import dateFormat from 'dateformat';

export default function(format) {

	return dateFormat(new Date(), format);

};
