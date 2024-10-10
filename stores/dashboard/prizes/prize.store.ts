import { defineStore } from "pinia";

import { httpRequest } from "~/services";

export const usePrizeStore = defineStore("prizeStore", () => {
  const loading = ref(false);
  const prizes = ref([]);
  const histories = ref([]);
  const prizeTab = ref("Histories");
  const prizeCategoryies = ref([]);
  const setPrizes = (data: any) => (prizes.value = data);
  const setLoading = (data: boolean) => (loading.value = data);
  const setPrizeCategoryies = (data: any) => (prizeCategoryies.value = data);
  const setPrizeTab = (data: string) => (prizeTab.value = data);
  const setHistories = (data: any) => (histories.value = data);
  const alert = useAlertStore();
  const mainStore = useMainStore();


  const getAllPrizes = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/v1/prizes")
      .then((res) => {
        setPrizes(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllHistoryPrizeDistribution = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/v1/prize_distributions")
      .then((res) => {
        setHistories(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllPrizeCategories = async () => {
    setLoading(true);
    await httpRequest
      .get("/api/v1/prize_categoies")
      .then((res) => {
        setPrizeCategoryies(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const AddPrize = (data: any) => {
    setLoading(true);
    httpRequest
      .post("/api/v1/save_prize", data)
      .then((res) => {
        if (res.status == 200) {
          setLoading(false);
          alert.success(res.message);
          mainStore.setPrizeModal(false);
          setLoading(false);
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    setLoading,
    getAllPrizes,
    prizes,
    AddPrize,
    setPrizes,
    getAllPrizeCategories,
    prizeCategoryies,
    setPrizeTab,
    prizeTab,
    getAllHistoryPrizeDistribution,
    histories,
    setHistories,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePrizeStore, import.meta.hot));
}
