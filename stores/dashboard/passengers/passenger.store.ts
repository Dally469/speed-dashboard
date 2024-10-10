import { defineStore } from 'pinia'
import { httpRequest } from '~/services';

export const usePassengerStore = defineStore("passengerStore", () => {
  const loading = ref(false);
  const passengers = ref([]);
  const histories = ref([]);
  const setPassengers = (data: any) => (passengers.value = data);
  const setLoading = (data: boolean) => (loading.value = data);
  const setHistories = (data: any) => (histories.value = data);
  const alert = useAlertStore();
  const mainStore = useMainStore();
  const getPassengerHistory = async (passengerId: any) => {
    setLoading(true);
    await httpRequest
      .get(`/api/requests/client/${passengerId}`)
      .then((res: any) => {
        setHistories(res.data.requests);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllPassengers = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/clients")
      .then((res:any) => {
        setPassengers(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    passengers,
    histories,
    setPassengers,
    setLoading,
    setHistories,
    getAllPassengers,
    getPassengerHistory,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePassengerStore, import.meta.hot));
}
