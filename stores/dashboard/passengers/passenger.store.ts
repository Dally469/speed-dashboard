import { defineStore } from "pinia";
import { httpRequest } from "~/services";

export const usePassengerStore = defineStore("passengerStore", () => {
  const loading = ref(false);
  const passengers = ref([]);
  const passenger = ref();
  const histories = ref([]);
  const setPassengers = (data: any) => (passengers.value = data);
  const setPassenger = (data: any) => (passenger.value = data);
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
      .then((res: any) => {
        setPassengers(res.data);

      })
      .finally(() => {
        setLoading(false);
      });
  };

  const CreatePassenger = async (data: any) => {
    setLoading(true);
    await httpRequest
      .post("/api/clients", data)
      .then((res: any) => {
        alert.success(res.message);
        mainStore.setPassengerModal(false);
        getAllPassengers()
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
    CreatePassenger,
    passenger,
    setPassenger
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePassengerStore, import.meta.hot));
}
