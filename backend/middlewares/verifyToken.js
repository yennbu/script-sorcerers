import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'a1b1c1';

export function verifyToken(req, res, next) {
    console.log("Verifying token middleware triggered");
    console.log("Cookies:", req.cookies);

    const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

    console.log("Token found:", token ? "YES" : "NO");

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);  
        console.log("Token decoded successfully:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Token verification error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}