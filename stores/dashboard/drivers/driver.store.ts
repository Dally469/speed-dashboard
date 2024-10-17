import { defineStore } from "pinia";
import { httpRequest } from "~/services";
import type { DriverData } from "~/types";

export const useDriverStore = defineStore("driverStore", () => {
  const loading = ref(false);
  const drivers = ref<DriverData[]>([]);
  const driver = ref<DriverData>();
  const histories = ref([]);
  const setDrivers = (data: any) => (drivers.value = data);
  const setLoading = (data: boolean) => (loading.value = data);
  const setHistories = (data: any) => (histories.value = data);
  const setDriver = (data: any) => (driver.value = data);
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

  const createDriver = async (data: any) => {
    setLoading(true);
    await httpRequest
      .post("/api/motorbikers", data)
      .then((res: any) => {
        alert.success(res.message);
        mainStore.setDriverModal(false);
        getAllDrivers();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteDriverById = async (id: any) => {
    setLoading(true);
    await httpRequest
      .delete(`/api/motorbikers/${id}`)
      .then((res: any) => {
        alert.success(res.message);
        getAllDrivers();
        mainStore.setDeleteModal(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateDriver = async (data: any, id: any) => {
    setLoading(true);
    await httpRequest
      .put(`/api/motorbikers/${id}`, data)
      .then((res: any) => {
        console.log(data);
        alert.success(res.message);
        getAllDrivers();
        mainStore.setUpdateModal(false);
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
    setDriver,driver,
    createDriver,
    deleteDriverById,
    updateDriver,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDriverStore, import.meta.hot));
}
