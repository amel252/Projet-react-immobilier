import { errorHandler } from "../utils/errors.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test = (req, res) => {
    res.json({
        message: "Api  de test fonctionne",
    });
};
// methode de mise a jour de nos données :
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(
            errorHandler(
                401,
                "tu peux seulement mettre à jour ton propre compte !"
            )
        );
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
// méthode de suppression d'un compte :
export const deleteUser = async (req, res, next) => {
    // on compare l'utilisateur en bd avec l'utilisateur passé en parametre
    if (req.user.id !== req.params.id) {
        return next(
            errorHandler(
                401,
                "Tu ne peux seulement supprimer ton propre compte"
            )
        );
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("L'utilisateur supprimé");
    } catch (error) {
        next(error);
    }
};
