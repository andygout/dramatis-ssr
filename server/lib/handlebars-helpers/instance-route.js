export default instance => `/${instance.constructor.name.toLowerCase()}s/${instance.uuid}`;
