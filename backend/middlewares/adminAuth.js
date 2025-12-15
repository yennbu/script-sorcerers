export function authorizeUser(requiredRole) {
    return (req, res, next) => {
        const user = req.user; //hämtar { id, role }

        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'You must log in!'
            });
        }

        if (!requiredRole) {
            return next();
        }

        if (user.role === requiredRole) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: 'You do not have the required permissions!'
        });
    };
}