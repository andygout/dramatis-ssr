const AWARD = 'AWARD';
const AWARDS = 'AWARDS';
const AWARD_CEREMONY = 'AWARD_CEREMONY';
const AWARD_CEREMONIES = 'AWARD_CEREMONIES';
const CHARACTER = 'CHARACTER';
const CHARACTERS = 'CHARACTERS';
const COMPANY = 'COMPANY';
const COMPANIES = 'COMPANIES';
const FESTIVAL = 'FESTIVAL';
const FESTIVALS = 'FESTIVALS';
const FESTIVAL_SERIES = 'FESTIVAL_SERIES';
const FESTIVAL_SERIESES = 'FESTIVAL_SERIESES';
const LOCALE = 'LOCALE';
const LOCALES = 'LOCALES';
const MATERIAL = 'MATERIAL';
const MATERIALS = 'MATERIALS';
const PERSON = 'PERSON';
const PEOPLE = 'PEOPLE';
const PLACE = 'PLACE';
const PLACES = 'PLACES';
const PRODUCTION = 'PRODUCTION';
const PRODUCTIONS = 'PRODUCTIONS';
const SEASON = 'SEASON';
const SEASONS = 'SEASONS';
const TIME = 'TIME';
const TIMES = 'TIMES';
const VENUE = 'VENUE';
const VENUES = 'VENUES';

const MODELS = {
	[AWARD]: AWARD,
	[AWARD_CEREMONY]: AWARD_CEREMONY,
	[CHARACTER]: CHARACTER,
	[COMPANY]: COMPANY,
	[FESTIVAL]: FESTIVAL,
	[FESTIVAL_SERIES]: FESTIVAL_SERIES,
	[LOCALE]: LOCALE,
	[MATERIAL]: MATERIAL,
	[PERSON]: PERSON,
	[PLACE]: PLACE,
	[PRODUCTION]: PRODUCTION,
	[SEASON]: SEASON,
	[TIME]: TIME,
	[VENUE]: VENUE
};

const MODEL_TO_DISPLAY_NAME_MAP = {
	[AWARD]: 'award',
	[AWARD_CEREMONY]: 'award ceremony',
	[CHARACTER]: 'character',
	[COMPANY]: 'company',
	[FESTIVAL]: 'festival',
	[FESTIVAL_SERIES]: 'festival series',
	[LOCALE]: 'locale',
	[MATERIAL]: 'material',
	[PERSON]: 'person',
	[PLACE]: 'place',
	[PRODUCTION]: 'production',
	[SEASON]: 'season',
	[TIME]: 'time',
	[VENUE]: 'venue'
};

const MODEL_TO_PAGE_COMPONENT_MAP = {
	[AWARD]: 'Award',
	[AWARD_CEREMONY]: 'AwardCeremony',
	[CHARACTER]: 'Character',
	[COMPANY]: 'Company',
	[FESTIVAL]: 'Festival',
	[FESTIVAL_SERIES]: 'FestivalSeries',
	[LOCALE]: 'Locale',
	[MATERIAL]: 'Material',
	[PERSON]: 'Person',
	[PLACE]: 'Place',
	[PRODUCTION]: 'Production',
	[SEASON]: 'Season',
	[TIME]: 'Time',
	[VENUE]: 'Venue'
};

const MODEL_TO_PROP_NAME_MAP = {
	[AWARD]: 'award',
	[AWARD_CEREMONY]: 'awardCeremony',
	[CHARACTER]: 'character',
	[COMPANY]: 'company',
	[FESTIVAL]: 'festival',
	[FESTIVAL_SERIES]: 'festivalSeries',
	[LOCALE]: 'locale',
	[MATERIAL]: 'material',
	[PERSON]: 'person',
	[PLACE]: 'place',
	[PRODUCTION]: 'production',
	[SEASON]: 'season',
	[TIME]: 'time',
	[VENUE]: 'venue'
};

const MODEL_TO_ROUTE_MAP = {
	[AWARD]: 'awards',
	[AWARD_CEREMONY]: 'award-ceremonies',
	[CHARACTER]: 'characters',
	[COMPANY]: 'companies',
	[FESTIVAL]: 'festivals',
	[FESTIVAL_SERIES]: 'festival-serieses',
	[LOCALE]: 'locales',
	[MATERIAL]: 'materials',
	[PERSON]: 'people',
	[PLACE]: 'places',
	[PRODUCTION]: 'productions',
	[SEASON]: 'seasons',
	[TIME]: 'times',
	[VENUE]: 'venues'
};

const PLURALISED_MODELS = {
	[AWARDS]: AWARDS,
	[AWARD_CEREMONIES]: AWARD_CEREMONIES,
	[CHARACTERS]: CHARACTERS,
	[COMPANIES]: COMPANIES,
	[FESTIVALS]: FESTIVALS,
	[FESTIVAL_SERIESES]: FESTIVAL_SERIESES,
	[LOCALES]: LOCALES,
	[MATERIALS]: MATERIALS,
	[PEOPLE]: PEOPLE,
	[PLACES]: PLACES,
	[PRODUCTIONS]: PRODUCTIONS,
	[SEASONS]: SEASONS,
	[TIMES]: TIMES,
	[VENUES]: VENUES
};

const PLURALISED_MODEL_TO_PAGE_COMPONENT_MAP = {
	[AWARDS]: 'Awards',
	[AWARD_CEREMONIES]: 'AwardCeremonies',
	[CHARACTERS]: 'Characters',
	[COMPANIES]: 'Companies',
	[FESTIVALS]: 'Festivals',
	[FESTIVAL_SERIESES]: 'FestivalSerieses',
	[LOCALES]: 'Locales',
	[MATERIALS]: 'Materials',
	[PEOPLE]: 'People',
	[PLACES]: 'Places',
	[PRODUCTIONS]: 'Productions',
	[SEASONS]: 'Seasons',
	[TIMES]: 'Times',
	[VENUES]: 'Venues'
};

const PLURALISED_MODEL_TO_PROP_NAME_MAP = {
	[AWARDS]: 'awards',
	[AWARD_CEREMONIES]: 'awardCeremonies',
	[CHARACTERS]: 'characters',
	[COMPANIES]: 'companies',
	[FESTIVALS]: 'festivals',
	[FESTIVAL_SERIESES]: 'festivalSerieses',
	[LOCALES]: 'locales',
	[MATERIALS]: 'materials',
	[PEOPLE]: 'people',
	[PLACES]: 'places',
	[PRODUCTIONS]: 'productions',
	[SEASONS]: 'seasons',
	[TIMES]: 'times',
	[VENUES]: 'venues'
};

const PLURALISED_MODEL_TO_TITLE_MAP = {
	[AWARDS]: 'Awards',
	[AWARD_CEREMONIES]: 'Award ceremonies',
	[CHARACTERS]: 'Characters',
	[COMPANIES]: 'Companies',
	[FESTIVALS]: 'Festivals',
	[FESTIVAL_SERIESES]: 'Festival serieses',
	[LOCALES]: 'Locales',
	[MATERIALS]: 'Materials',
	[PEOPLE]: 'People',
	[PLACES]: 'Places',
	[PRODUCTIONS]: 'Productions',
	[SEASONS]: 'Seasons',
	[TIMES]: 'Times',
	[VENUES]: 'Venues'
};

export {
	MODELS,
	MODEL_TO_DISPLAY_NAME_MAP,
	MODEL_TO_PAGE_COMPONENT_MAP,
	MODEL_TO_PROP_NAME_MAP,
	MODEL_TO_ROUTE_MAP,
	PLURALISED_MODELS,
	PLURALISED_MODEL_TO_PAGE_COMPONENT_MAP,
	PLURALISED_MODEL_TO_PROP_NAME_MAP,
	PLURALISED_MODEL_TO_TITLE_MAP
};
