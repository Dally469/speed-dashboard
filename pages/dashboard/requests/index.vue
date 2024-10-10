<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between space-x-3">
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a
              :href="href"
              v-bind="props.action"
              @click="navigate"
              class="flex items-center justify-center"
            >
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span class="text-surface-700 dark:text-surface-0">{{
              item.label
            }}</span>
          </a>
        </template>
      </Breadcrumb>

      <DashboardPrizeAddDispatch />
    </div>

    <div class="card">
      <DataTable
        v-model:selection="selectedEntry"
        :value="prizesHistoryItems"
        dataKey="id"
        tableStyle="min-width: 50rem"
        stripedRows
        paginator
        :rows="10"
        :loading="loading"
        :globalFilterFields="['province', 'status']"
      >
        <template #header>
          <div class="flex justify-between py-2">
            <div class="text-2xl font-semibold">List of Requests</div>
            <div class="flex gap-x-4">
              <DatePicker
                v-model="dates"
                selectionMode="range"
                dateFormat="dd/mm/yy"
                :manualInput="false"
                placeholder="Select Date Range"
                iconDisplay="input"
                showIcon
              />
              <Button
                severity="secondary"
                outlined
                :label="selectedMotor ? selectedMotor.title : 'Filters'"
                @click="toggle"
                class="min-w-40"
                icon="pi pi-sliders-h"
              />
              <Popover ref="op">
                <div class="flex flex-col gap-4">
                  <div>
                    <span class="font-medium block mb-2">Choose Type</span>
                    <ul class="list-none p-0 m-0 flex flex-col">
                      <li
                        v-for="item in motors"
                        :key="item.title"
                        class="flex items-center px-2 py-1 group hover:bg-card cursor-pointer rounded-border"
                        @click="selectMember(item)"
                      >
                        <div>
                          <span
                            class="font-normal text-sm group-hover:text-primary"
                            >{{ item.title }}</span
                          >
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </template>
        <template #empty> No driver found. </template>
        <template #loading> <div class="loader"></div> </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="id" header="REQUEST ID"></Column>
        <Column field="client" header="PASSENGER">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0"
                >{{ data.fname + " " + data.lname }}
              </span>
              <span class="text-surface-300 text-xs dark:text-surface-0"
                >{{ data.phone }} Phone
              </span>
            </div>
          </template></Column
        >
        <Column field="motorBiker" header="DRIVER">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0"
                >{{ data.fname + " " + data.lname }}
              </span>
            </div>
          </template></Column
        >
        <Column field="requestType" header="TYPE"></Column>
        <Column field="requestedTime" header="REQUESTED TIME"></Column>
        <Column field="originLocation" header="TRIP ROUTE">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0"
                >{{ data.originLocation + " - " + data.destinationLocation }}
              </span>
            </div>
          </template></Column
        >

        <Column field="status" header="Status">
          <template #body="{ data }">
            <div
              class="rounded-full flex px-4 py-1.5 text-sm text-center items-center justify-center text-primary bg-primary/10"
            >
              {{ data.status }}
            </div>
          </template></Column
        >
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <Button
              icon="pi pi-ellipsis-v"
              severity="secondary"
              text
              rounded
              @click="toggleRowOption"
            ></Button>
            <Popover ref="rowOp">
              <div class="flex flex-col w-28 gap-2">
                <div>
                  <ul class="list-none p-0 m-0 flex flex-col">
                    <li
                      v-for="item in rowOptions"
                      :key="item.title"
                      class="flex items-center px-2 py-0.5 group hover:bg-card cursor-pointer rounded-lg"
                      @click="selectRow(data, item)"
                    >
                      <div>
                        <span class="font-normal text-sm">{{
                          item.title
                        }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Popover>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "Manage Entries",
  layout: "dashboard",
  middleware: "auth",
});

const home = ref({
  label: "Dashboard",
  route: "/dashboard",
});
const items = ref([{ label: "Pessengers Requests" }]);

const mainStore = useMainStore()
const toast = useToast();
const selectRow = (data: any, option: any) => {
  console.log(option);
  if (option.id == 1) {
    navigateTo("/dashboard/requests/" + data.id);
  } else if (option.id == 2) {
    mainStore.setPassengerModal(true);
  } else {
    toast.add({
      severity: "info",
      summary: data.customer,
      detail: data.phone + " | RB" + data.code,
      life: 3000,
    });
  }
};
const visible = ref(false);
const selectedEntry = ref<any>([]);

const prizeStore = usePrizeStore();
const prizeTab = computed(() => {
  return prizeStore.prizeTab;
});
const prizesItems = computed(() => {
  return prizeStore.prizes;
});
const prizesHistoryItems = computed(() => {
  return prizeStore.histories;
});
const loading = computed(() => {
  return prizeStore.loading;
});
const formatDate = (value: any) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatCurrency = (value: any) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

onMounted(() => {
  prizeStore.getAllPrizes();
  prizeStore.getAllHistoryPrizeDistribution();
});

const dates = ref();
const op = ref();
const rowOp = ref();
const selectedMotor = ref<MotorType>();
const motors = ref([
  { id: 1, title: "BIKE" },
  { id: 2, title: "TAXI CAB" },
  { id: 3, title: "RIFAN" },
  { id: 4, title: "TRUCK" },
]);

const rowOptions = ref([
  { id: 1, title: "View Details" },
  { id: 2, title: "Update " },
  { id: 3, title: "Delete" },
]);
export interface MotorType {
  id: number;
  title: string;
}

const toggle = (event: any) => {
  op.value.toggle(event);
};

const toggleRowOption = (event: any) => {
  rowOp.value.toggle(event);
};
const selectMember = (member: any) => {
  selectedMotor.value = member;
  op.value.hide();
};

const viewDetails = (member: any) => {
  console.log(member);
  rowOp.value.hide();
};
</script>

<style></style>
