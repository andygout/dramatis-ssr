export default function (instance) {

	return `/${instance.constructor.name.toLowerCase()}s/${instance.id}`;

};
