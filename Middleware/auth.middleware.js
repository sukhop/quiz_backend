const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({err: "Invalid Token"});
            }
            req.body.userId = decoded.userID;
            next();
        });
    } else {
        res.status(401).json({msg: "Login first"});
    }
};