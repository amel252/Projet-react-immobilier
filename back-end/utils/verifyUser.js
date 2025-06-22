import jwt from "jsonwebtoken";
import { errorHandler } from "./errors.js";

// function pour verification c'est un vrai utilisateur
export const verifyToken = (req, res, next) => {
    // on récupére le token
    const token = req.cookies.access_token;
    // si ce n'es pas le  bon token
    if (!token) return next(errorHandler(401, "Accés refusé , tu n'as pas le droit"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // si y a une erreur on passe un msg d'erreur
        if (err) return next(errorHandler(403, "Interdiction "));
        // si ya pas d'erreur
        req.user = user;
        next();
    });
};
