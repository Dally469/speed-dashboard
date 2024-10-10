import { defineStore } from "pinia";
import { httpRequest } from "~/services";

export const useDriverStore = defineStore("driverStore", () => {
  const loading = ref(false);
  const drivers = ref([]);
  const histories = ref([]);
  const setDrivers = (data: any) => (drivers.value = data);
  const setLoading = (data: boolean) => (loading.value = data);
  const setHistories = (data: any) => (histories.value = data);
  const alert = useAlertStore();
  const mainStore = useMainStore();

  const getDriverHistory = async (driverId: any) => {
    setLoading(true);
    await httpRequest
      .get(`/api/motorbikers/${driverId}/requests`)
      .then((res: any) => {
        setHistories(res.data.requests);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllDrivers = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/motorbikers")
      .then((res: any) => {
        setDrivers(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    drivers,
    histories,
    setDrivers,
    setLoading,
    setHistories,
    getAllDrivers,
    getDriverHistory,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDriverStore, import.meta.hot));
}
