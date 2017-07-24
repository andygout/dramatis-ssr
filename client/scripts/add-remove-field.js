const baseFieldInputNameRegex = /(.+\[\d+\]).+$/;

const addField = event => {

	const fieldInput = event.target;

	fieldInput.removeEventListener('input', addField, false);

	const field = fieldInput.parentNode;

	const fieldset = field.parentNode;

	const baseFieldInputName = fieldInput.name.match(baseFieldInputNameRegex)[1];

	const fieldInputs = [...fieldset.querySelectorAll(`input[name^="${baseFieldInputName}"]`)];

	const lastFieldNextElementSibling = fieldInputs[fieldInputs.length - 1].parentNode.nextElementSibling;

	const newBaseFieldInputName = fieldInput.name.replace(/(.+\[)(\d+)\].+$/, (...matches) =>
		matches[1] + (parseInt(matches[2]) + 1) + ']');

	const newFieldInputNames = [];

	fieldInputs.forEach(fieldInput => {

		const fieldInputName = fieldInput.name;

		const newFieldInputName =
			newBaseFieldInputName + fieldInputName.replace(baseFieldInputName, '').replace(/\[\d+\]/g, '[0]');

		if (!newFieldInputNames.find(existingNewFieldInputName => existingNewFieldInputName === newFieldInputName)) {

			const newField = fieldInput.parentNode.cloneNode(true);

			const newFieldInput = newField.getElementsByTagName('input')[0];
			newFieldInput.setAttribute('name', newFieldInputName);
			newFieldInput.value = '';
			const requiresInputListener = newFieldInput.classList.contains('field__input--duplicable')
			if (requiresInputListener) newFieldInput.addEventListener('input', addField, false);

			newField.getElementsByTagName('label')[0].setAttribute('for', newFieldInputName);

			const newFieldRemoverButton = newField.getElementsByTagName('a')[0];
			if (newFieldRemoverButton) newField.removeChild(newFieldRemoverButton);

			newFieldInputNames.push(newFieldInput.name);

			lastFieldNextElementSibling ?
				field.parentNode.insertBefore(newField, lastFieldNextElementSibling) :
				field.parentNode.appendChild(newField);

		}

	});

	fieldInput.classList.remove('field__input--duplicable');

	const fieldRemoverButton = document.createElement('a');
	fieldRemoverButton.href = '';
	fieldRemoverButton.classList.add('field__remover-button');
	fieldRemoverButton.innerHTML = 'X';
	fieldRemoverButton.addEventListener('click', removeField, false);

	field.appendChild(fieldRemoverButton);

};

const removeField = event => {

	event.preventDefault();

	const fieldRemoverButton = event.target;

	const field = fieldRemoverButton.parentNode;

	const fieldInputName = field.getElementsByTagName('input')[0].name;

	const baseFieldInputName = fieldInputName.match(baseFieldInputNameRegex)[1];

	const fieldset = field.parentNode;

	[...fieldset.querySelectorAll(`input[name^="${baseFieldInputName}"]`)].forEach(fieldInput =>
		fieldset.removeChild(fieldInput.parentNode));

};

const init = () => {

	const duplicableFieldInputs = [...document.getElementsByClassName('field__input--duplicable')];

	duplicableFieldInputs.forEach(fieldInput => fieldInput.addEventListener('input', addField, false));

	const fieldRemoverButtons = [...document.getElementsByClassName('field__remover-button')];

	fieldRemoverButtons.forEach(button => button.addEventListener('click', removeField, false));

};

export { init };
