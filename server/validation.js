const Joi = require('@hapi/joi');

const registrationValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        userType: Joi.string().required()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        userType: Joi.string().required()
    });
    return schema.validate(data);
}

const createShipmentValidation = data => {
    const schema = Joi.object({
        senderName: Joi.string().min(2).max(50).required(),
        receiverName: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(2).max(2000).required(),
        from: Joi.string().min(2).max(50).required(),
        to: Joi.string().min(2).max(50).required(),
        lastLocation: Joi.string().min(2).max(50).required(),
      });
    return schema.validate(data);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.createShipmentValidation = createShipmentValidation;