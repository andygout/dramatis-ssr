const listedNamingProps = {
	'production': 'title'
};

export default instance => instance[listedNamingProps[instance.model] || 'name'];
