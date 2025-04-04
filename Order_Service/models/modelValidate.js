const Joi = require('joi');

const orderSchemaValid = (req, res, next) => {
    const orderSchema = Joi.object({
        product: Joi.string().required().messages({
            "string.empty": "Product is required",
        }),
        amount: Joi.number().required().messages({
            "number.base": "Amount must be a number",
            "any.required": "Amount is required",
        }),
        status: Joi.string()
            .valid("Pending", "Paid", "Cancelled")
            .required()
            .messages({
                "any.only": "Status must be one of 'Pending', 'Completed', or 'Cancelled'",
                "string.empty": "Status is required",
            }),
    });

    // Validate the request body
    const { error } = orderSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

module.exports = orderSchemaValid;