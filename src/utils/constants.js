const IRREGULAR_PLURAL_NOUNS_MAP = {
	company: 'companies',
	person: 'people'
};

const IRREGULAR_SINGULAR_NOUNS_MAP = {
	companies: 'company',
	people: 'person'
};

const MODEL_TO_ROUTE_MAP = {
	awardCeremony: 'awards/ceremonies'
};

const ROUTE_TO_MODEL_MAP = {
	'awards/ceremonies': 'awardCeremony'
};

const ROUTE_TO_PLURALISED_MODEL_MAP = {
	'awards/ceremonies': 'awardCeremonies'
};

export {
	IRREGULAR_PLURAL_NOUNS_MAP,
	IRREGULAR_SINGULAR_NOUNS_MAP,
	MODEL_TO_ROUTE_MAP,
	ROUTE_TO_MODEL_MAP,
	ROUTE_TO_PLURALISED_MODEL_MAP
};
