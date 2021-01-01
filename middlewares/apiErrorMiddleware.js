const ApiError = require('../models/ApiError');
const logger = require('../loggers/appLogger');

const apiErrorMiddleware = (err, request, response, next) => {
    if (err instanceof ApiError) {
        logger.http(err.message);
        response.status(err.statusCode).json({
            status:'failiure',
            data:err.message
        });
        return;
    }

    logger.error(err);
    response.status(500).json({
        status:'failiure',
        data:err
    });
};
module.exports = apiErrorMiddleware;