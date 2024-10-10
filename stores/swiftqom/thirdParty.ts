import { defineStore } from "pinia";

import { httpRequest } from "~/services";

export const useThirdPartStore = defineStore("thirdPartStore", () => {
  const loading = ref(false);
  const balance = ref(0);
  const setBalance = (data: number) => (balance.value = data);
  const setLoading = (data: boolean) => (loading.value = data);

  const checkSMSBalance = async () => {
    setLoading(true);
    await httpRequest.get("/auth/api/v1/sms_balance").then((res) => {
      setBalance(res.balance);
    }).finally(() => {
      setLoading(false);
    });
  };
  return {
    loading,
    setLoading,
    checkSMSBalance,
    balance,
    setBalance,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThirdPartStore, import.meta.hot));
}
