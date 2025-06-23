import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errors.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};
export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Annonce non trouvée"));
        }

        if (req.user.id !== listing.userRef.toString()) {
            return next(errorHandler(403, "Tu ne peux supprimer que ta propre annonce"));
        }

        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Annonce supprimée avec succès" });

    } catch (error) {
        next(error);
    }
};

