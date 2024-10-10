import { defineStore } from "pinia";
import { httpRequest } from "~/services";
import type { MenuData } from "~/types/layout/sidebar.type";

export const useSidebarStore = defineStore("sidebarStore", () => {
  const menus = ref<MenuData[]>();
  const activeLink = ref();

  const loading = ref(false);
  const setLoading = (data: boolean) => (loading.value = data);
  const setMenus = (data: MenuData[]) => (menus.value = data);
  const setActiveLink = (data?: string) => (activeLink.value = data);

  const getSystemMenus = async () => {
    setLoading(true);
    await httpRequest
      .get(`/api/v1/menus`)
      .then((res: any) => {
        setMenus(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    menus,
    activeLink,
    loading,
    setLoading,
    setMenus,
    setActiveLink,
    getSystemMenus,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot));
}
