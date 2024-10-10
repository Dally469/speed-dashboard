import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", () => {
  const saved = ref(false);
  const prizeModal = ref(false);
  const driverModal = ref(false);
  const requestModal = ref(false);
  const passengerModal = ref(false);
  const memberModal = ref(false);
  const deleted = ref(false);
  const activeMenu = useCookie("ACTIVE_MENU", { maxAge: 60 * 60 });
  const customStep = ref(1);
  const customType = ref("");
  const activeSubMenu = useCookie("ACTIVE_SUBMENU_URL", { maxAge: 60 * 60 });
  const showSidebar = ref(false);
  const setShowSidebar = (data: boolean) => (showSidebar.value = data);
  const setMemberModal = (data: boolean) => (memberModal.value = data);
  const setSaved = (data: boolean) => (saved.value = data);
  const setDeleted = (data: boolean) => (deleted.value = data);
  const setActiveMenu = (data: string) => (activeMenu.value = data);
  const setActiveSubMenu = (data: string) => (activeSubMenu.value = data);
  const setCustomStep = (data: any) => (customStep.value = data);
  const setCustomType = (data: any) => (customType.value = data);
  const setPrizeModal = (data: boolean) => (prizeModal.value = data);
  const setPassengerModal = (data: boolean) => (passengerModal.value = data);
  const setDriverModal = (data: boolean) => (driverModal.value = data);
  const setRequestModal = (data: boolean) => (requestModal.value = data);

  return {
    saved,
    deleted,
    activeMenu,
    activeSubMenu,
    memberModal,
    showSidebar,
    customStep,
    customType,
    setCustomType,
    setActiveMenu,
    setActiveSubMenu,
    setShowSidebar,
    setCustomStep,
    setSaved,
    setDeleted,
    setMemberModal,
    setPrizeModal,
    prizeModal,
    driverModal,
    passengerModal,
    setDriverModal,
    setPassengerModal,
    requestModal,
    setRequestModal,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
