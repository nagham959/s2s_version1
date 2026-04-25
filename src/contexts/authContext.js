import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const AuthContext = React.createContext(null);

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.s2sai.online";

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

  if (status === 400)
    return "البيانات غير صحيحة. راجع المدخلات وحاول مرة أخرى.";
  if (status === 401) return "غير مصرح. يرجى تسجيل الدخول مرة أخرى.";
  if (status === 503) return "السيرفر غير متاح حاليًا. حاول بعد قليل.";

  return s || fallback;
};

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tokenRef = useRef(null);
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE_URL,
      }),
    [],
  );

  const doRefresh = useCallback(
    async (storedRefresh) => {
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
    },
    [api],
  );

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("/api/v1/Auth/Logout", { refreshToken });
      }
    } catch {
      // ignore
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    setAccessToken(null);
    setUser(null);
  }, [api]);

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
      },
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [api, doRefresh, logout]);

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

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await api.post("/api/v1/Auth/google-login", {
        idToken: idToken,
      });

      const { token, refreshToken, email, displayName } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setUser({ email, displayName });

      return response.data;
    } catch (error) {
      console.error("Auth Error:", error);
      const serverMessage =
        error.response?.data?.detail || "فشل التحقق من الحساب عبر السيرفر";
      throw new Error(serverMessage);
    } finally {
      setIsLoading(false);
    }
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
      throw new Error(
        safeErrorMessage(err, "فشل إرسال طلب إعادة تعيين كلمة المرور."),
      );
    }
  };

  const resetPassword = async ({ token, newPassword, confirmPassword }) => {
    try {
      const cleanToken = token.replace(/ /g, "+");

      await api.post("/api/v1/Auth/ResetPassword", {
        Token: cleanToken,
        NewPassword: newPassword,
        ConfirmPassword: confirmPassword,
      });

      return true;
    } catch (err) {
      console.error("Server Response Error:", err.response?.data);
      throw new Error(
        safeErrorMessage(err, "فشل تغيير كلمة المرور. حاول مرة أخرى."),
      );
    }
  };

  const changePassword = async (
    currentPassword,
    newPassword,
    confirmNewPassword,
  ) => {
    try {
      const response = await api.post("/api/v1/Auth/ChangePassword", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      return response.data;
    } catch (error) {
      const message = error.response?.data?.detail || "فشل تغيير كلمة المرور.";
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoading,
        api,
        login,
        logout,
        forgotPassword,
        resetPassword,
        loginWithGoogle,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
