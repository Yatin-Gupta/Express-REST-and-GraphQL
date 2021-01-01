const joi = require('joi');
const employeeValidator = joi.object({
    name:joi.string().not().empty(),
    age:joi.number().integer().min(17).max(70),
    salary:joi.number().min(1000),
    organization:joi.string().not().empty(),
    dateofbirth:joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/),
    email:joi.string().email({
        minDomainSegments:2,
        tlds:{
            allow:['com', 'net']
        }
    })
});

module.exports =  employeeValidator;
