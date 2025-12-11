// middleware/authorizeUser.js

export function authorizeUser(requiredRole) {
    return (req, res, next) => {
        const user = req.user; // hämtar användare från verifyToken

        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'You must log in!'
            });
        }

        // Om ingen specificerad roll krävs → bara inloggning behövs
        if (!requiredRole) {
            return next();
        }

        // Om roll krävs → kontrollera roll
        if (user.role === requiredRole) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: 'You do not have the required permissions!'
        });
    };
}



/* //Kod för att hantera Admin-login
export function authorizeUser(requiredRole) {
    return (req, res, next) => {
        const user = global.user; // Hämta användaren från globalt scope

        if (user) {
            if (!requiredRole || user.role === requiredRole) {
                return next();
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have the required permissions!'
                });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: 'You must log in!'
            });
        }
    };
} */