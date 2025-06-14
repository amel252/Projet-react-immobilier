import jwt from "jsonwebtoken";
import { errorHandler } from "./errors.js";

// Fonction pour vérifier si l'utilisateur est authentifié
export const verifyToken = (req, res, next) => {
    // Récupérer le token depuis les cookies
    const token = req.cookies.access_token; // ✅ cookies, pas cookie

    // Si aucun token, accès interdit
    if (!token) return next(errorHandler(401, "Tu n'as pas le droit."));

    // Vérification du token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Interdiction"));

        // Authentification réussie, on attache l'utilisateur à la requête
        req.user = user;
        next();
    });
};
