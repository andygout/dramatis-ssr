const listedNamingProps = {
	'production': 'title'
};

export default model => listedNamingProps[model] || 'name';
