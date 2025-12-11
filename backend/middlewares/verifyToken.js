import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "a1b1c1";

export function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
