import { defineStore } from "pinia";
import { httpRequest } from "~/services";

export const useRequestStore = defineStore("requestStore", () => {
  const loading = ref(false);
  const requests = ref([]);
  const requestSingle = ref([]);
  const setRequests = (data: any) => (requests.value = data);
  const setLoading = (data: boolean) => (loading.value = data);
  const setRequestSingle = (data: any) => (requestSingle.value = data);
  const alert = useAlertStore();
  const mainStore = useMainStore();
  const getRequestById = async (requestID: any) => {
    setLoading(true);
    await httpRequest
      .get(`/api/requests/${requestID}`)
      .then((res: any) => {
        setRequestSingle(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllrequests = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/requests")
      .then((res: any) => {
        setRequests(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    requests,
    requestSingle,
    setRequests,
    setLoading,
    setRequestSingle,
    getAllrequests,
    getRequestById,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRequestStore, import.meta.hot));
}
