// Import des paramètres d'authentification
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require('../models/user.model');

verifyToken = (req, res, next) => {
    let token =  req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Vous n'êtes pas connecté"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Accès refusé"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt;