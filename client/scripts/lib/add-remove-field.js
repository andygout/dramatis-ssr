const addField = event => {

	const fieldInput = event.target;

	fieldInput.removeEventListener('input', addField, false);

	const newFieldInputName = fieldInput.name.replace(/(.+\[)(\d+)(\].+)$/, (...matches) =>
		matches[1] + (parseInt(matches[2]) + 1) + matches[3]);

	const field = fieldInput.parentNode;

	const newField = field.cloneNode(true);

	newField.getElementsByTagName('label')[0].setAttribute('for', newFieldInputName);

	const newFieldInput = newField.getElementsByTagName('input')[0];
	newFieldInput.setAttribute('name', newFieldInputName);
	newFieldInput.value = '';
	newFieldInput.addEventListener('input', addField, false);

	fieldInput.classList.remove('field__input--last-in-array');

	const fieldRemoverButton = document.createElement('a');
	fieldRemoverButton.href = '';
	fieldRemoverButton.classList.add('field__remover-button');
	fieldRemoverButton.innerHTML = 'X';
	fieldRemoverButton.addEventListener('click', removeField, false);

	field.appendChild(fieldRemoverButton);

	field.parentNode.appendChild(newField);

};

const removeField = event => {

	event.preventDefault();

	const fieldRemoverButton = event.target;

	const field = fieldRemoverButton.parentNode;

	field.parentNode.removeChild(field);

};

exports.init = () => {

	const lastInArrayFieldInputs = [...document.getElementsByClassName('field__input--last-in-array')];

	lastInArrayFieldInputs.forEach(fieldInput => fieldInput.addEventListener('input', addField, false));

	const fieldRemoverButtons = [...document.getElementsByClassName('field__remover-button')];

	fieldRemoverButtons.forEach(button => button.addEventListener('click', removeField, false));

};
