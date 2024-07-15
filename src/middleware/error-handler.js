import { errors as errorsController } from '../controllers/index.js';

export default (error, request, response, next) => {

	response.status(error.status);

	return errorsController(error, request, response, next);

};
