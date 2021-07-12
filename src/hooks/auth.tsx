import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { IUser } from "../types/User";
import base64 from "base-64";
import { toast } from "react-toastify";

export interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser: (user: IUser) => void;
}

interface AuthState {
  user: IUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    const user = localStorage.getItem("@UsersSystem:user");
    if (user) {
      setData({
        user: JSON.parse(user)[0],
      });
      router.push("/");
    } else router.push("/signin");
    return () => {};
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.get("/users", {
        params: {
          email,
          password: base64.encode(password),
        },
      });

      if (!response.data.length) throw Error();

      localStorage.setItem("@UsersSystem:user", JSON.stringify(response.data));

      setData({
        user: response.data[0],
      });

      toast.success("Login realizado com sucesso");

      router.push("/");
    } catch (error) {
      toast.error("Usuário não encontrado");

      setData({
        user: {} as IUser,
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("@UsersSystem:token");
    localStorage.removeItem("@UsersSystem:user");

    setData({} as AuthState);
    router.push("/signin");
  };

  const updateUser = (user: IUser) => {
    localStorage.setItem("@UsersSystem:user", JSON.stringify(user));
    setData({
      ...data,
      user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
export { AuthProvider, useAuth };
