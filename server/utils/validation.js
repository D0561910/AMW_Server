const validation = (schema) => {
    return async (req, res, next) => {
        try {
            const vaild = await schema.validateAsync(req.body);
            next();
        } catch (error) {
            const {
                details
            } = error;
            const message = details.map(i => i.message).join(",");

            res.status(422).json({
                message: message
            });
        }
    };
};

export default validation;