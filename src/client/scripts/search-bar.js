import Autocomplete from './autocomplete';
import debounce from './debounce';

import { MODEL_TO_DISPLAY_NAME_MAP, MODEL_TO_ROUTE_MAP } from '../../utils/constants.js';

const URL_BASE = 'http://localhost:3003';

async function performFetch (url) {

	const response = await fetch(url, { mode: 'same-origin' });

	if (response.status !== 200) throw new Error(response.statusText);

	const searchResults = response.json();

	return searchResults;

}

async function getSearchResults (searchTerm) {

	const url = `${URL_BASE}/api/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`;

	const searchResults = await performFetch(url);

	return searchResults;

}

function suggestionTemplate (option, query, highlightSuggestion, isHighlightCorrespondingToMatch) {

	const characters = highlightSuggestion(option.name, query || option.name, isHighlightCorrespondingToMatch);

	let highlightedOptionName = '';

	for (const [character, shoudHighlight] of characters) {

		if (shoudHighlight) {

			highlightedOptionName += `<span class="autocomplete__option--highlight">${character}</span>`;

		} else {

			highlightedOptionName += `${character}`;

		}

	}

	return `
		<div>
			<span">${highlightedOptionName}</span>
			${' '}
			<span class="autocomplete__option-suffix">${`(${MODEL_TO_DISPLAY_NAME_MAP[option.model]})`}</span>
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

	const autocompleteElement = document.getElementById('autocomplete');

	new Autocomplete(autocompleteElement, {
		suggestionTemplate,
		isHighlightCorrespondingToMatch: true,
		mapOptionToSuggestedValue,
		reopenOnFocusWhenValid: true,
		confirmOnBlur: false,
		onConfirm,
		showNoOptionsFound: true,
		source: debounce(customSearchResults, 1000)
	});

});
