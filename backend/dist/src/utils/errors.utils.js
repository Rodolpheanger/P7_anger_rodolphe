"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (err, res) => {
    const error = setError(err);
    res.status(error.code).json({ message: error.message });
};
exports.errorResponse = errorResponse;
const setError = (err) => {
    console.log("Error message in utils: ", err.message);
    if (err.message.includes("unauthorized") ||
        err.message.includes("forbidden") ||
        err.message.includes("split")) {
        return authErrors(err);
    }
    if ((err.field && err.field.includes("avatar")) ||
        (err.field && err.field.includes("image")) ||
        err.message.includes("Multer")) {
        return multerErrors(err);
    }
    if (err.message.includes("ValidationError")) {
        return validationErrors(err);
    }
    if (err.message.includes("query")) {
        return queryError();
    }
    if (err.message.includes("user")) {
        return userErrors(err);
    }
    if (err.message.includes("unlink")) {
        return internalServerError();
    }
    else {
        return { code: 500, message: "erreur inconnue" };
    }
};
const authErrors = (err) => {
    let error = { code: 0, message: "" };
    if (err.message.includes("unauthorized") || err.message.includes("split")) {
        (error.code = 401), (error.message = "Echec de l'authentification");
    }
    if (err.message.includes("forbidden")) {
        (error.code = 403), (error.message = "Requête non autorisée");
    }
    return error;
};
const multerErrors = (err) => {
    let error = { code: 0, message: "" };
    if (err.message.includes("File too large") && err.field.includes("avatar")) {
        (error.code = 400),
            (error.message =
                "Fichier trop volumineux (taille maximum autorisée: 1 Mo)");
    }
    if (err.message.includes("File too large") && err.field.includes("image")) {
        (error.code = 400),
            (error.message =
                "Fichier trop volumineux (taille maximum autorisée: 2 Mo)");
    }
    if (err.message.includes("unexpected file")) {
        (error.code = 400),
            (error.message =
                "Type de fichier non pris en charge (jpg, jpeg et png uniquement");
    }
    return error;
};
const validationErrors = (err) => {
    return { code: 400, message: err.message.split(":")[1] };
};
const queryError = () => {
    return { code: 500, message: "Erreur interne du serveur" };
};
const internalServerError = () => {
    return { code: 500, message: "Erreur interne du serveur" };
};
const userErrors = (err) => {
    let error = { code: 0, message: "" };
    if (err.message.includes("user not found")) {
        error.code = 404;
        error.message = "Utilisateur non trouvé";
    }
    return error;
};
//# sourceMappingURL=errors.utils.js.map