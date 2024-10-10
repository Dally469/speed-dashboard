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

      <DashboardPrizeAddPassenger />
    </div>

    <div class="card">
      <DataTable
        v-model:selection="selectedPassengers"
        :value="passengerItems"
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
            <div class="text-2xl font-semibold">List of Passengers</div>
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
        <Column field="id" class="w-40" header="PASSENGER ID"></Column>
        <Column field="fname" header="FIRST NAME">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0"
                >{{ data.fname  }}
              </span>
            </div>
          </template></Column
        >
         <Column field="lname" header="LAST NAME">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0"
                >{{  data.lname }}
              </span>
            </div>
          </template></Column
        >
        <Column field="phone" header="PHONE NUMBER"></Column>
        <Column field="location" header="CURRENT ADDRESS">
         <template #body="{ data }">
          <div>None </div>
          </template></Column>

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
const items = ref([{ label: "Passengers" }]);
const mainStore = useMainStore();
const toast = useToast();
const selectRow = (data: any, option: any) => {
  console.log(option);
  if (option.id == 1) {
    navigateTo("/dashboard/passengers/" + data.id);
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
const selectedPassengers = ref<any>([]);

const passengerStore = usePassengerStore();

const passengerItems = computed(() => {
  return passengerStore.passengers;
});
const loading = computed(() => {
  return passengerStore.loading;
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
  passengerStore.getAllPassengers();
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
