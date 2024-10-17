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

      <DashboardPrizeAddDriver />
    </div>

    <div class="card">
      <DataTable
        v-model:selection="selectedEntry"
        :value="driverItems"
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
            <div class="text-2xl font-semibold">List of Drivers</div>
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
        <!-- <Column field="id" header="DRIVER ID"></Column> -->
        <Column field="fname" header="DRIVER">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0"
                >{{ data.fname + " " + data.lname }}
              </span>
            </div>
          </template></Column
        >
        <Column field="phone" header="PHONE NUMBER"></Column>

        <Column field="motorType" header="MOTOR TYPE">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0">{{
                data.motorType
              }}</span>
            </div></template
          ></Column
        >
        <Column field="plateNumber" header="PLATE NUMBER">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0">{{
                data.plateNumber
              }}</span>
            </div></template
          ></Column
        >

        <Column field="numeroChase" header="NUMERO CHASE ">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 dark:text-surface-0">{{
                data.numeroChase
              }}</span>
            </div></template
          ></Column
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
             <div class="flex items-center justify-center gap-x-4">
 

            <Button
              icon="pi pi-eye"
              severity="secondary"
              text
               @click="viewRow(data)"
            ></Button>
             <Button
              icon="pi pi-user-edit"
              severity="info"
               text
               @click="updateRow(data)"
            ></Button>
            <Button
              icon="pi pi-trash"
              severity="danger"
               text
               @click="deleteRow(data)"
            ></Button>
            </div>
          
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

const mainStore = useMainStore();
const home = ref({
  label: "Dashboard",
  route: "/dashboard",
});
const items = ref([{ label: "Drivers" }]);

const selectedEntry = ref<any>([]);

const driverStore = useDriverStore();
 
const driverItems = computed(() => {
  return driverStore.drivers;
});
 
const loading = computed(() => {
  return driverStore.loading;
});
 
onMounted(() => {
  driverStore.getAllDrivers();
 });

const dates = ref();
const op = ref();
const selectedMotor = ref<MotorType>();
const motors = ref([
  { id: 1, title: "BIKE" },
  { id: 2, title: "TAXI CAB" },
  { id: 3, title: "RIFAN" },
  { id: 4, title: "TRUCK" },
]);
export interface MotorType {
  id: number;
  title: string;
}

const toggle = (event: any) => {
  op.value.toggle(event);
};
const selectMember = (member: any) => {
  selectedMotor.value = member;
  op.value.hide();
};
 
const viewRow = (data: any) => {
  driverStore.setDriver(data)
  mainStore.setDriverModal(true)
};
const updateRow = (data: any) => {
  driverStore.setDriver(data)
  mainStore.setUpdateModal(true)
};
const deleteRow = (data: any) => {
  driverStore.setDriver(data)
  mainStore.setDeleteModal(true)
};
</script>

<style></style>
