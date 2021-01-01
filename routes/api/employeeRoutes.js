const express = require('express');
const ApiError = require('../../models/ApiError');
const EmployeeModel = require('../../models/EmployeeModel');
const employeeValidator = require('../../validators/employeeValidator');

const router = express.Router();

router.get("/emps", (request, response, next) => {
    EmployeeModel.find({}, (err, docs) => {
        if (err) {
            next(new ApiError(400, err));
            return;
        }

        response.status(200).json({
            status:'success',
            data:docs
        });
    });
});

router.put("/emps/:email", (request, response, next) => {
    const requestBody = request.body;
    const requestForEmail = request.params.email;
    if ('email' in requestBody && requestBody.email !== requestForEmail) {
        next(new ApiError(400, "Email cannot be changed."));
        return;
    }

    const employeeValidationResult = employeeValidator.validate(requestBody);
    if (employeeValidationResult.error) {
        next(new ApiError(400, employeeValidationResult.error.details.map((detail) => detail.message)));
        return;
    }

    EmployeeModel.findOneAndUpdate({email:requestForEmail}, {$set:requestBody, useFindAndModify:false}, (err, doc) => {
        if (err || doc === null) {
            doc === null?next(new ApiError(400, 'Unable to find record')):next(new ApiError(400, err));
            return;
        }
        response.status(200).json({
            status:"success",
            data:doc
        });
    });
});

router.post("/emps", (request, response, next) => {
    const requestBody = request.body;
    const employeeValidationResult = employeeValidator.required().validate(requestBody);
    if (employeeValidationResult.error) { 
        next(new ApiError(400, employeeValidationResult.error.details.map((detail) => detail.message)));
        return;
    }
    EmployeeModel.find({email:requestBody.email}, (err, docs) => {
        if (err) {
            next(new ApiError(400, err));
            return;
        }
        if (docs.length === 0) {
            const newEmployee = new EmployeeModel(requestBody);
            newEmployee.save().then((doc) => {
                response.status(201).json({
                    status:"success",
                    data:doc
                });
            }).catch((err) => {
                // However if promise is rejected, then it will automatically goes to express error handler
                // But as then err will not be instance of ApiError, so it will return 500 error as logic written in
                // apiErrorMiddleware
                next(new ApiError(400, err));
            });
        }
        else {
            next(new ApiError(400, "Employee with this email already exists."));
        }
    });
});

router.delete("/emps/:email", (request, response, next) => {
    const requestForEmail = request.params.email;
    EmployeeModel.findOneAndDelete({email:requestForEmail}, {useFindAndModify:false}, (err, doc) => {
        if (err || doc === null) {
            doc === null?next(new ApiError(400, 'Unable to find record')):next(new ApiError(400, err));
            return;
        }

        response.status(200).json({
            status:"success",
            data:doc
        });
    });
});

module.exports = router;