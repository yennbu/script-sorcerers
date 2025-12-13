export function validateAuthBody(req, res, next) {
    const { username, password } = req.body;
    if(username && password) {
        next();
    } else {
        next({
            status : 400,
            message : 'BOTH username AND password are required'
        });
    }
}

export function validateCartBody(req, res, next) {
    const { prodId, qty } = req.body;

    if (typeof prodId !== "string") {
        return next({
            status: 400,
            message: "prodId is required"
        });
    }

    if (typeof qty !== "number") {
        return next({
            status: 400,
            message: "qty must be a number"
        });
    }

    next();
}

export function validateOrderBody(req, res, next) {
    const { cartId } = req.body;
    if(cartId) {
        next();
    } else {
        next({
            status : 400,
            message : 'cartId is required'
        });
    }
}