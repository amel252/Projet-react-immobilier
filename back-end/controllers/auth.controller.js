import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import jwt from "jsonwebtoken";

// une fonction pour recuperer les données ecrites , hasher le password ,
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("Inscription reussie");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    // les données de l'utilisateur lors de la connexion
    const { email, password } = req.body;
    try {
        // Recup des données de  l'utilisateur a partir de son email a partir de la BDD
        const validUser = await User.findOne({ email });
        // si l'utilisateur n'existe pas
        if (!validUser) {
            return next(errorHandler(401, "Utilisateur n'existe pas "));
        }
        // s'il existe je comparer les mdp existants depuis le form et le mdp hashé
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword)
            return next(errorHandler(404, "Faux mot de passe "));

        // creation de token pour la connexion
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // envoi des données  lors de la connexion
        const { password: pass, ...rest } = validUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};
// avec ca l'utilisateur s'enregistre sur firebase
export const google = async (req, res, next) => {
    try {
        const { email, name, photo } = req.body;

        if (!email) {
            return next(errorHandler(400, "Email manquant"));
        }

        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            // ✅ Sécurité : fallback si `name` est undefined
            const usernameBase = name
                ? name.split(" ").join("").toLowerCase()
                : "utilisateur";

            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: usernameBase + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                avatar: photo,
            });
            // pour sauvegarder l'utilisateur
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

// export const google = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (user) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             const { password: pass, ...rest } = user._doc;
//             res.cookie("access_token", token, { httpOnly: true })
//                 .status(200)
//                 .json(rest);
//         } else {
//             const generatedPassword =
//                 Math.random().toString(36).slice(-8) +
//                 Math.random().toString(36).slice(-8);
//             const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//             const newUser = new User({
//                 username:
//                     req.body.name.split(" ").join("").toLowerCase() +
//                     Math.random().toString(36).slice(-4),
//                 email: req.body.email,
//                 password: hashedPassword,
//                 avatar: req.body.photo,
//             });
//             await newUser.save();
//             const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//             const { password: pass, ...rest } = newUser._doc;
//             res.cookie("access_token", token, { httpOnly: true })
//                 .status(200)
//                 .json(rest);
//         }
//     } catch (error) {
//         next(error);
//     }
// };
