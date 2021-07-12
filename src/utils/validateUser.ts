import { api } from "../services/api";
import { IUser } from "../types/User";
import { removeDocumentMask } from "./format";

export const validateUser = async (user: Omit<IUser, "id">) => {
  const [checkIfEmailAlreadyExists, checkIfDocumentAlreadyExists] =
    await Promise.all([
      api.get("/users", {
        params: {
          email: user.email,
        },
      }),
      api.get("/users", {
        params: {
          document: removeDocumentMask(user.document),
        },
      }),
    ]);

  if (checkIfEmailAlreadyExists.data.length) {
    return {
      success: false,
      message: "E-mail já utilizado! Tente novamente",
    };
  }

  if (checkIfDocumentAlreadyExists.data.length) {
    return {
      success: false,
      message: "CPF já utilizado! Tente novamente",
    };
  }

  return {
    success: true,
  };
};
