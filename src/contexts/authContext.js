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

let refreshPromise = null;

const logRefresh = (message) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[auth] ${message}`);
  }
};

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("refreshToken")),
  );

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
      if (!refreshPromise) {
        logRefresh("refresh started");
        refreshPromise = api
          .post(
            "/api/v1/Auth/RefreshToken",
            {
              refreshToken: storedRefresh,
            },
            {
              skipAuth: true,
            },
          )
          .then((res) => {
            logRefresh("refresh success");
            return res.data;
          })
          .catch((err) => {
            logRefresh("refresh failed");
            throw err;
          })
          .finally(() => {
            refreshPromise = null;
          });
      } else {
        logRefresh("refresh joined existing promise");
      }

      const data = await refreshPromise;

      setAccessToken(data.token);
      tokenRef.current = data.token;
      setUser({ email: data.email, displayName: data.displayName });

      localStorage.setItem("token", data.token);
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
      const isRefreshRequest = req.url?.includes("/api/v1/Auth/RefreshToken");
      if (req.skipAuth || isRefreshRequest) {
        if (req.headers) {
          delete req.headers.Authorization;
        }
        return req;
      }

      const t = tokenRef.current;
      if (t) req.headers.Authorization = `Bearer ${t}`;
      return req;
    });

    const resId = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;
        const isRefreshRequest = originalRequest?.url?.includes(
          "/api/v1/Auth/RefreshToken",
        );

        if (
          err.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !isRefreshRequest
        ) {
          originalRequest._retry = true;

          const storedRefresh = localStorage.getItem("refreshToken");
          if (!storedRefresh) {
            await logout();
            return Promise.reject(err);
          }

          try {
            const data = await doRefresh(storedRefresh);
            originalRequest.headers = originalRequest.headers || {};
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
    localStorage.setItem("token", data.token);
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
      setAccessToken(token);
      setUser({ email, displayName });

      return response.data;
    } catch (error) {
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
    if (!storedRefresh || accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    doRefresh(storedRefresh)
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const forgotPassword = async (email) => {
    try {
      await api.post("/api/v1/Auth/ForgotPassword", { email });
      return true;
    } catch (err) {
      throw err;
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
      throw err;
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
      throw error;
    }
  };


const translateTextToSigml = async (text, avatar = "anna", speed = "1.0", format = "sigml") => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append('text', text);
    formData.append('avatar', avatar);
    formData.append('speed', speed);
    formData.append('output_format', format);

    const response = await api.post("/api/v1/Translate/text-to-sign", formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (response.data && response.data.translation) {
      return response.data.translation.sigml_content;
    }
    
    return null;
  } catch (error) {
    throw error;
  }
};


const translateAudioToSigml = async (audioFile, avatar = "anna", speed = "1.0", format = "sigml") => {
  try {
    const formData = new FormData();
    formData.append('audio_file', audioFile); 
    formData.append('avatar', avatar);
    formData.append('speed', speed);
    formData.append('output_format', format);

    const response = await api.post("/api/v1/Translate/audio-to-sign", formData, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.data && response.data.translation) {
      return response.data.translation.sigml_content;
    }
    return null;
  } catch (error) {
    console.error("Audio Translation Error:", error);
    throw new Error(error.response?.data?.detail || "فشل تحويل الصوت إلى إشارة.");
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
        translateTextToSigml,
        translateAudioToSigml,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
