import oAutocomplete from '@financial-times/o-autocomplete';
import { debounce } from '@financial-times/o-utils';

import { MODEL_TO_DISPLAY_NAME_MAP, MODEL_TO_ROUTE_MAP } from '../../utils/constants.js';

const URL_BASE = 'http://localhost:3003';

async function performFetch (url) {

	const response = await fetch(url, { mode: 'same-origin' });

	if (response.status !== 200) throw new Error(response.statusText);

	const searchResults = response.json();

	return searchResults;

}

async function getSearchResults (searchTerm) {

	const url = `${URL_BASE}/api/search?searchTerm=${searchTerm}`;

	const searchResults = await performFetch(url);

	return searchResults;

}

function suggestionTemplate (option, query, highlightSuggestion, isHighlightCorrespondingToMatch) {

	const characters = highlightSuggestion(option.name, query || option.name, isHighlightCorrespondingToMatch);

	let highlightedOptionName = '';

	for (const [character, shoudHighlight] of characters) {

		if (shoudHighlight) {

			highlightedOptionName += `<span class="o-autocomplete__option--highlight">${character}</span>`;

		} else {

			highlightedOptionName += `${character}`;

		}

	}

	return `
		<div>
			<span">${highlightedOptionName}</span>
			${' '}
			<span class="o-autocomplete__option-suffix">${`(${MODEL_TO_DISPLAY_NAME_MAP[option.model]})`}</span>
		</div>
	`;

}

function mapOptionToSuggestedValue (option) {

	const { name } = option;

	const suggestedValue = name;

	return suggestedValue;

}

function onConfirm (selectedOption) {

	const { model, uuid } = selectedOption;

	const instancePath = `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`;

	location.href = instancePath;

}

async function customSearchResults (searchTerm, populateOptions) {

	if (searchTerm === '') {

		populateOptions([]);

		return;

	}

	const searchResults = await getSearchResults(searchTerm);

	populateOptions(searchResults);

}

document.addEventListener('DOMContentLoaded', function () {

	const oAutocompleteElement = document.getElementById('autocomplete');

	new oAutocomplete(oAutocompleteElement, { // eslint-disable-line new-cap
		suggestionTemplate,
		isHighlightCorrespondingToMatch: true,
		mapOptionToSuggestedValue,
		onConfirm,
		source: debounce(customSearchResults, 1000)
	});

});
