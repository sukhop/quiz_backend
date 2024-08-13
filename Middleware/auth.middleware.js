const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(token) {
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if(err) {
                return res.json({err: "Invalid Token"})
            }
            req.body.userId = decoded.userID;
            next();
        });
    } else {
        console.log(token);
        res.json({msg: "Login first"});
    }
}