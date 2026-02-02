import axios from "axios";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = React.createContext(null);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://s2s-1d5c94958ff6.herokuapp.com";


const safeErrorMessage = (err, fallback = "حدث خطأ، حاول مرة أخرى.") => {
  const status = err?.response?.status;
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.title ||
    err?.message ||
    fallback;

  const s = String(msg || "");

  if (/<!doctype|<html|<body|<pre/i.test(s)) {
    return "حدث خطأ في الاتصال بالخادم. حاول مرة أخرى.";
  }


  if (status === 400) return "البيانات غير صحيحة. راجع المدخلات وحاول مرة أخرى.";
  if (status === 401) return "غير مصرح. يرجى تسجيل الدخول مرة أخرى.";
  if (status === 503) return "السيرفر غير متاح حاليًا. حاول بعد قليل.";

  return s || fallback;
};

  export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  
  const tokenRef = useRef(null);
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  const doRefresh = async (storedRefresh) => {
    const res = await api.post("/api/v1/Auth/RefreshToken", {
      refreshToken: storedRefresh,
    });
    const data = res.data;

    setAccessToken(data.token);
    setUser({ email: data.email, displayName: data.displayName });

    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data;
  };

  useEffect(() => {
    const reqId = api.interceptors.request.use((req) => {
      const t = tokenRef.current;
      if (t) req.headers.Authorization = `Bearer ${t}`;
      return req;
    });

    const resId = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;

          const storedRefresh = localStorage.getItem("refreshToken");
          if (!storedRefresh) {
            await logout();
            return Promise.reject(err);
          }

          try {
            const data = await doRefresh(storedRefresh);
            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            return api(originalRequest);
          } catch (e) {
            await logout();
            return Promise.reject(e);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
    
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/v1/Auth/Login", { email, password });
    const data = res.data;

    setAccessToken(data.token);
    setUser({ email: data.email, displayName: data.displayName });

    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("/api/v1/Auth/Logout", { refreshToken });
      }
    } catch {
      // ignore
    }
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setUser(null);
  };

  // Auto-refresh لو عندك refreshToken محفوظ وداخل الصفحة لأول مرة
  useEffect(() => {
    const storedRefresh = localStorage.getItem("refreshToken");
    if (!storedRefresh || accessToken) return;

    doRefresh(storedRefresh).catch(() => {
      localStorage.removeItem("refreshToken");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   const forgotPassword = async (email) => {
    try {
      await api.post("/api/v1/Auth/ForgotPassword", { email });
      return true;
    } catch (err) {
      throw new Error(safeErrorMessage(err, "فشل إرسال طلب إعادة تعيين كلمة المرور."));
    }
  };

  const resetPassword = async ({ token, newPassword, confirmPassword }) => {
    try {
      await api.post("/api/v1/Auth/ResetPassword", {
        token,
        newPassword,
        confirmPassword,
      });
      return true;
    } catch (err) {
      throw new Error(safeErrorMessage(err, "فشل تغيير كلمة المرور. حاول مرة أخرى."));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        api,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);