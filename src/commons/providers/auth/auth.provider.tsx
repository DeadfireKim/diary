"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/commons/constants/url";

type User = { _id: string; name: string };

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const syncAuthState = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    try {
      setUser(userStr ? JSON.parse(userStr) : null);
    } catch {
      setUser(null);
    }
  }, []);

  // 페이지 이동 시마다 최신 로그인 상태 동기화
  useEffect(() => {
    syncAuthState();
  }, [pathname, syncAuthState]);

  // 다른 탭에서 localStorage 변경 시 실시간 감지
  useEffect(() => {
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, [syncAuthState]);

  const login = useCallback(() => {
    router.push(routes.login.path);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    syncAuthState();
    router.push(routes.login.path);
  }, [router, syncAuthState]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
