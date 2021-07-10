import { useRouter } from "next/dist/client/router";
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { api } from "../services/api";
import { IUser } from "../types/User";
import base64 from "base-64";
import { useToast } from "@chakra-ui/react";

export interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser: (user: IUser) => void;

  isAuthenticated: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: IUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    const user = localStorage.getItem("@UsersSystem:user");
    if (user) {
      setData({
        user: JSON.parse(user)[0],
        isAuthenticated: true,
      });
      router.push("/");
    } else router.push("/signin");
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
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
        isAuthenticated: true,
      });

      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Login realizado com sucesso",
        status: "success",
      });

      router.push("/");
    } catch (error) {
      toast({
        position: "top-right",
        title: "Erro ao entrar",
        description: "Usuário não encontrado",
        status: "error",
      });

      setData({
        user: {} as IUser,
        isAuthenticated: false,
      });
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@UsersSystem:token");
    localStorage.removeItem("@UsersSystem:user");

    setData({} as AuthState);
    router.push("/signin");
  }, []);

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

        isAuthenticated: data.isAuthenticated,
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
