import { useRouter } from "next/dist/client/router";
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { api } from "../services/api";
import base64 from "base-64";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  role: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  isAuthenticated: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    const user = localStorage.getItem("@UsersSystem:user");
    if (user) {
      setData({
        user: JSON.parse(user),
        isAuthenticated: true,
      });
      router.push("/");
    } else router.push("/signin");
  }, [router]);

  const signIn = useCallback(async ({ email, password }) => {
    console.log({ email, password });

    try {
      const response = await api.get("/users", {
        params: {
          email,
          password: base64.encode(password),
        },
      });

      if (!response.data.length) throw Error();

      // localStorage.setItem("@UsersSystem:token", token);
      localStorage.setItem("@UsersSystem:user", JSON.stringify(response.data));

      //api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        user: response.data,
        isAuthenticated: true,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      setData({
        user: {} as User,
        isAuthenticated: false,
      });
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@UsersSystem:token");
    localStorage.removeItem("@UsersSystem:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@UsersSystem:user", JSON.stringify(user));
      setData({
        ...data,
        user,
      });
    },
    [setData, data]
  );

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
