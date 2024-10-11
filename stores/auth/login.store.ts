import { defineStore } from "pinia";
import { httpRequest } from "~/services";
import type { AccountData, EmailType, Login, PasswordType } from "~/types";

export const useAuthStore = defineStore("authStore", () => {
  const user = useCookie<AccountData>("user", {
    maxAge: 60 * 60,
    sameSite: "strict",
    httpOnly: false,
  });
  const loading = ref(false);
  const isAvailable = ref(true);
  const token = useCookie("token", {
    maxAge: 60 * 60,
    sameSite: "strict",
    httpOnly: false,
  });
  const error = ref();
  const setError = (data: any) => (error.value = data);
  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: any) => (user.value = data);
  const setLoading = (value: boolean) => (loading.value = value);
  const setIsAvailable = (value: boolean) => (isAvailable.value = value);
  const alert = useAlertStore();

  const login = (credentials: Login) => {
    setLoading(true);
    httpRequest
      .post("/api/admins/login", credentials)
      .then((res) => {
        if (res.success == true) {
          setToken(res.message); //Add the token later
          setUser(res.data);
          setLoading(false);
          navigateTo(`/dashboard`, { replace: true });
        } else {
          alert.error(res.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setToken();
        setUser();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setUser();
    setToken();
    navigateTo(`/auth/login`, { replace: true });
  };

  const checkToken = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/admins/1")//Add logger ID
      .then((res) => {
        setUser(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setPassword = async (data: PasswordType) => {
    setLoading(true);
    await httpRequest
      .post("/auth/api/v1/set_password", data)
      .then((res) => {
        if (res.status == 200) {
          setLoading(false);
          alert.success(res.message);
          navigateTo("/auth/login");
        } else {
          alert.error(res.message);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const requestResetPassword = async (data: EmailType) => {
    setLoading(true);
    await httpRequest
      .post("/auth/api/v1/forgot_password", data)
      .then((res) => {
        if (res.status == 200) {
          setLoading(false);
          navigateTo(`/auth/set-password`, { replace: true });
        } else {
          alert.error(res.message);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    user,
    loading,
    isAvailable,
    token,
    error,
    setError,
    setToken,
    setUser,
    setLoading,
    setIsAvailable,
    login,
    logout,
    checkToken,
    setPassword,
    requestResetPassword,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
