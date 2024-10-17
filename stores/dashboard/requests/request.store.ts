import { defineStore } from "pinia";
import { httpRequest } from "~/services";
import type { RequestData } from "~/types";

export const useRequestStore = defineStore("requestStore", () => {
  const loading = ref(false);
  const requests = ref([]);
  const request = ref([]);
  const requestSingle = ref<RequestData>();
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


  const deleteReqestById = async (id: any) => {
    setLoading(true);
    await httpRequest
      .delete(`/api/requests/${id}`)
      .then((res: any) => {
        alert.success(res.message);
        getAllrequests();
        mainStore.setDeleteModal(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRequestStatus = async (data: any, id: any) => {
    setLoading(true);
    await httpRequest
      .put(`/api/requests/${id}`, data)
      .then((res: any) => {
        console.log(data);
        alert.success(res.message);
        getAllrequests();
        mainStore.setUpdateModal(false);
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
    request,
    deleteReqestById,
    updateRequestStatus,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRequestStore, import.meta.hot));
}
