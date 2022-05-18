import { Request, Response } from "express";
import { serviceSignup, serviceSignin } from "./sign.services";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceSignup(req);
    result ? signin(req, res) : res.status(400).json({ message: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: any = await serviceSignin(req);
    result === "NoUser"
      ? res.status(404).json({ message: "Utilisateur non trouvé" })
      : result === "WrongPassword"
      ? res.status(401).json({ error: "Mot de passe incorrect !" })
      : /*(res.cookie("jwt", result.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        }),*/
        res.status(200).json({
          message: "Connexion réussie",
          userUid: result.userUid,
          userIsAdmin: result.userIsAdmin,
          token: result.token,
        });
    /*);*/
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
