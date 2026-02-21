function Validation(Schema) {
    return function(req, res, next) {
        const result = Schema.safeParse(req.body);
        if(!result.success) {
            return res.status(400).json({
                msg: "validation failed",
                errors: result.errors.issues
            })
        }
        req.body = result.data;
        next();
    }
}

module.exports = Validation;