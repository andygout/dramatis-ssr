import { errors as errorsController } from '../controllers';

export default function (error, request, response, next) {

	response.status(error.status);

	return errorsController(error, request, response, next);

}
