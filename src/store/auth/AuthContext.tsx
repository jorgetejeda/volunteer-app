import HttpImplementation from "@/core-libraries/http/http.implementation";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { User, UserCredentials } from "@/core/types/user";
import {
  ReactChild,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (data: UserCredentials) => {
    try {
      setLoading(true);
      const http = new HttpImplementation();
      const user = await http.post<User, UserCredentials>(
        ServicesInstanceEnum.API_AUTH,
        "/login",
        data,
      );
      setUser(user);
      setIsAuthenticated(true);
      user.userRoles.forEach((role) => {
        if (role.role.title === "Admin") {
          setIsAdmin(true);
        }
      });
      sessionStorage.setItem("token", user.token);
    } catch (error) {
      console.error("Error logging in", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setLoading(true);
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
