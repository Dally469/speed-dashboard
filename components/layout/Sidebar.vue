<script lang="ts" setup>
import { useMainStore, useSidebarStore } from "~/stores";

const sidebarStore = useSidebarStore();
const mainStore = useMainStore();
const sDrawer = ref(true);
const openSubmenu = ref(false);
const search = ref("");
const route = useRoute().params;
const showSidebar = computed(() => {
  return mainStore.showSidebar;
});

const selectedMenu = computed(() => {
  return mainStore.activeMenu;
});

const menus = computed(() => {
  return sidebarStore.menus;
});

const selectedSubmenu = computed(() => {
  return mainStore.activeSubMenu;
});
function activeLink(title: any, submenu: boolean) {
  if (submenu) {
    openSubmenu.value = true;
  }
  mainStore.setActiveMenu(title);
}

function activeSubLink(title: any) {
  mainStore.setActiveSubMenu(title);
  mainStore.setShowSidebar(false);
}

onMounted(() => {
  sidebarStore.getSystemMenus();
});

const MENUS = ref([
  { header: "Main Menu", isHead: true },
  {
    icon: "pi pi-desktop",
    title: "Dashboard",
    url: "/dashboard",

    expanded: false,
  },
  {
    icon: "pi pi-users",
    title: "Passengers",
    url: "/dashboard/passengers",
  },
  {
    icon: "pi pi-car",
    title: "Requests",
    url: "/dashboard/requests",
    expanded: false,
  },
  {
    icon: "pi pi-users",
    title: "Drivers",
    url: "/dashboard/drivers",

    expanded: false,
  },

  { header: "Reports", isHead: true },

  {
    icon: "pi pi-user",
    title: "Taxi Report",
    url: "/dashboard/reports",

    expanded: true,
    submenu: [
      {
        icon: "hugeicons:message-add-01",
        title: "Ride Report",
        url: "/dashboard/reports/ride",
      },
      {
        icon: "hugeicons:message-add-01",
        title: "Courier Report",
        url: "/dashboard/reports/courier",
      },
    ],
  },
  { header: "Payments", isHead: true },
  {
    icon: "pi pi-arrow-right-arrow-left",
    title: "Transactions",
    url: "/dashboard/transactions",
    expanded: false,
  },
  {
    icon: "pi pi-money-bill",
    title: "Payment Details",
    url: "/dashboard/transactions",
    expanded: false,
  },
]);
</script>

<style></style>

<template>
  <div
    :class="{ 'relative translate-x-0': showSidebar }"
    class="h-lvh self-start lg:sticky top-0 absolute inset-y-0 bg-black left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:-translate-x-0 flex min-h-full w-full max-w-72 flex-col dark:bg-gray-950 bg-clip-border p-4 text-gray-700 shadow-lg shadow-blue-gray-900/5"
  >
    <div class="flex items-center gap-4 py-4 rounded-lg mb-2">
      <img src="/assets/images/logo-speed.png" class="rounded-lg h-20" />
    </div>

    <nav class="flex min-w-[240px] flex-col py-2 text-base font-semibold">
      <ScrollPanel style="height: 600px">
        <div
          v-for="(item, i) in MENUS"
          :key="i"
          @click="activeLink(item.title, item.expanded)"
          class="relative block w-full my-1"
        >
          <!-- menu -->
          <div
            v-if="item.isHead"
            class="uppercase text-xs px-2 py-2 text-slate-400/40 font-bold"
          >
            {{ item.header }}
          </div>
          <nuxt-link
            v-else
            :to="!item.expanded ? item.url : '#'"
            :class="item.title == selectedMenu ? 'bg-primary/15   ' : ' '"
            class="flex items-center w-full p-0 font-medium transition-all rounded-lg text-white hover:bg-primary/15 hover:text-primary duration-300"
          >
            <div class="flex items-center justify-between w-full p-2.5">
              <i
                v-bind:class="item.icon"
                :class="item.title == selectedMenu ? `text-primary` : `` + ``"
                class="mr-2"
                style="font-size: 1.2rem"
              ></i>

              <p
                class="block mr-auto text-sm leading-relaxed"
                :class="item.title == selectedMenu ? 'text-primary ' : ' '"
              >
                {{ item.title }}
              </p>
              <span
                class="pi pi-chevron-down ml-4"
                :class="
                  openSubmenu && item.title == selectedMenu
                    ? 'rotate-180 text-primary'
                    : ''
                "
                v-if="item.expanded"
              >
              </span>
            </div>
          </nuxt-link>
          <!-- submenu -->
          <div
            v-if="item.expanded && openSubmenu && item.title == selectedMenu"
            class="overflow-hidden"
          >
            <div
              class="block w-full py-1 text-sm antialiased font-light leading-normal text-gray-200"
            >
              <nav
                class="flex min-w-[240px] flex-col gap-1 p-0 text-base font-medium text-blue-gray-700"
              >
                <nuxt-link
                  v-for="(sub, i) in item.submenu"
                  :key="i"
                  @click="activeSubLink(sub.title)"
                  :to="sub.url"
                  class="flex items-center w-full p-2.5 group hover:bg-primary/10 duration-300 text-sm transition-all rounded-lg outline-none hover:text-primary"
                >
                  <div
                    class="grid h-2 w-2 group-hover:bg-primary transition-all duration-300 rounded-full mx-3 place-items-center"
                  ></div>
                  {{ sub.title }}
                </nuxt-link>
              </nav>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </nav>
  </div>
</template>
