import { defineStore } from "pinia";

import { httpRequest } from "~/services";

export const useEntriesStore = defineStore("entriesStore", () => {
  const loading = ref(false);
  const entries = ref([]);

  const setEntries = (data: any) => (entries.value = data);
  const setLoading = (data: boolean) => (loading.value = data);

  const getAllEntries = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/v1/entries")
      .then((res) => {
        setEntries(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    setLoading,
    getAllEntries,
    entries,
    setEntries,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEntriesStore, import.meta.hot));
}
