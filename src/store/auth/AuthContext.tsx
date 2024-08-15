import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  setUser: (user: string) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const name = localStorage.getItem("name") || sessionStorage.getItem("name");
      const adminStatus = localStorage.getItem("isAdmin") === 'true' || sessionStorage.getItem("isAdmin") === 'true';
      
      if (token) {
        setIsAuthenticated(true);
        setIsAdmin(adminStatus);
        setUser(name || '');
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser('');
      }
    } catch (error: any) {
      console.error("Error al verificar el estado de autenticación", error.message);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser('');
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [router]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  const logout = () => {
    try {
      setLoading(true);
      setUser('');
      setIsAuthenticated(false);
      setIsAdmin(false);
      sessionStorage.clear();
      localStorage.clear();
      router.push("/login");
    } catch (error: any) {
      console.error("Error al cerrar sesión", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        loading,
        logout,
        setIsAuthenticated,
        setIsAdmin,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
