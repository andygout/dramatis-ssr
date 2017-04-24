import * as scripts from './scripts';
import './stylesheets/index.scss';

window.onload = () => {

	if (document.querySelector('[data-view="form"]')) scripts.addRemoveField.init();

};
