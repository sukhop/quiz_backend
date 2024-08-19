const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Extract the token

        if (token) {
            jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({ err: "Invalid Token" });
                }
                req.body.userId = decoded.userID;
                next();
            });
        } else {
            res.json({ msg: "Token missing" });
        }
    } else {
        res.json({ msg: "Login First" });
    }
};
