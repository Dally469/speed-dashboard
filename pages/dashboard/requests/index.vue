<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between space-x-3">
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate" class="flex items-center justify-center">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{
              item.label
              }}</span>
          </a>
        </template>
      </Breadcrumb>

      <DashboardPrizeAddDispatch />
    </div>

    <div class="card">
      <DataTable v-model:selection="selectedEntry" :value="filteredItems" dataKey="id" tableStyle="min-width: 50rem"
        stripedRows paginator :rows="10" :loading="loading" :globalFilter="globalFilter"
        :globalFilterFields="['originLocation','client.fname','motorBiker.fname', 'status']">
        <template #header>
          <div class="flex justify-between py-2">
            <div class="text-2xl font-semibold">List of Requests</div>
            <div class="flex gap-x-4">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="globalFilter" placeholder="Keyword Search" />
              </IconField>
              <Button severity="secondary" outlined :label="selectedMotor ? selectedMotor.title : 'Filters'"
                @click="toggle" class="min-w-40" icon="pi pi-sliders-h" />
              <Popover ref="op">
                <div class="flex flex-col gap-4">
                  <div>
                    <span class="font-medium block mb-2">Choose Type</span>
                    <ul class="list-none p-0 m-0 flex flex-col">
                      <li v-for="item in motors" :key="item.title"
                        class="flex items-center px-2 py-1 group hover:bg-card cursor-pointer rounded-border"
                        @click="selectMember(item)">
                        <div>
                          <span class="font-normal text-sm group-hover:text-primary">{{ item.title }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="p-12 flex-col flex items-center space-y-2 justify-center">
            <div><img src="/assets/images/empty_item.svg" class="m-2 h-32"></div>
            <div>No records found.</div>
          </div>
        </template>
        <template #loading>
          <div class="loader"></div>
        </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="client" header="PASSENGER">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-surface-700 text-sm dark:text-surface-0">{{ data.client.fname + " " + data.client.lname
                }}
              </span>
              <span class="text-surface-300 text-xs dark:text-surface-0">{{ data.client.phone }}
              </span>
            </div>
          </template>
        </Column>
        <Column class="w-68" field="motorBiker" header="DRIVER & VEHICLE">
          <template #body="{ data }">
            <div class="flex gap-x-4 items-center">
              <div class="flex flex-col">
                <span class="text-surface-700 text-nowrap text-sm dark:text-surface-0">{{ data.motorBiker.fname + " " +
                  data.motorBiker.lname }}
                </span>
                <span class="text-surface-300 text-xs dark:text-surface-0">{{ data.motorBiker.phone }}
                </span>
              </div>
              <div class="flex items-center space-x-2 bg-slate-100 py-1.5 px-2 rounded-lg">
                <span class="pi pi-truck text-surface-700 dark:text-surface-0 text-2xl">
                </span>
                <div class="flex flex-col">
                  <span class="text-surface-700 text-[10px] font-semibold text-nowrap dark:text-surface-0">{{
                    data.motorBiker.motorType }}
                  </span>
                  <span class="text-warn text-xs font-light">{{ data.motorBiker.plateNumber }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Column>
        <Column field="requestType" header="TYPE"></Column>
        <Column field="requestedTime" header="REQUESTED TIME">
          <template #body="{ data }">
            <div class="flex flex-col">

              <span class="text-surface-300 text-sm dark:text-surface-0">{{ data.requestedTime.substring(0, 10)}}
              </span>
            </div>
          </template>
        </Column>
        <Column field="originLocation" class="w-[500px]" header="TRIP ROUTE">
          <template #body="{ data }">
            <div class="flex flex-col space-y-2">
              <span class="text-blue-600 text-xs font-medium  flex gap-3"><i class="pi pi-map-marker"></i> {{
                data.originLocation }}
              </span>

              <span class="text-primary font-medium text-xs flex gap-3"><i class="pi pi-map-marker"></i> {{
                data.destinationLocation }}
              </span>
            </div>
          </template>
        </Column>
        <Column field="updatedAt" header="UPDATED TIME">
          <template #body="{ data }">
            <div class="flex flex-col">

              <span class="text-surface-300 text-sm dark:text-surface-0">{{ data.updatedAt.substring(0, 10) }}
              </span>
            </div>
          </template>
        </Column>


        <Column field="status" header="Status">
          <template #body="{ data }">
            <div class="rounded-full flex px-4 py-1.5 text-sm text-center items-center justify-center "
              :class="statusColor(data.status)">
              {{ data.status }}
            </div>
          </template>
        </Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <div class="flex items-center justify-center gap-x-4">


              <Button icon="pi pi-eye" severity="secondary" text></Button>
              <Button icon="pi pi-user-edit" severity="info" text @click="updateRowData(data)"></Button>
              <Button icon="pi pi-trash" severity="danger" text @click="deleteRow(data)"></Button>
            </div>

          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RequestData } from '~/types';

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

const mainStore = useMainStore();
const toast = useToast();
const selectRow = (data: any, option: any) => {
  console.log(data);
  if (option.id == 1) {
    navigateTo("/dashboard/requests/" + data.id);
  } else if (option.id == 2) {
    mainStore.setRequestModal(true);
  } else {
    toast.add({
      severity: "info",
      summary: data.customer,
      detail: data.phone + " | RB" + data.code,
      life: 3000,
    });
  }
};
const globalFilter = ref("");
const selectedEntry = ref<any>([]);

const requestStore = useRequestStore();

const requestItems = computed(() => {
  return requestStore.requests.slice().sort((a: any, b: any) => b.id - a.id);
});
const singleRequest = computed(() => {
  return requestStore.requestSingle;
});
const loading = computed(() => {
  return requestStore.loading;
});


const statusColor = (value: any) => {
  if (value === "PENDING") {
    return " text-warning bg-warning/10";
  } else if (value == "APPROVED") {
    return " text-primary bg-primary/10  ";
  } else if (value == "REJECTED") {
    return " text-error bg-error/10";
  } else {
    return " text-card bg-card/10";
  }
};

onMounted(() => {
  requestStore.getAllrequests();
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

const deleteRow = (data: any) => {
  mainStore.setDeleteModal(true)
  requestStore.setRequestSingle(data)
};
const selectMember = (member: any) => {
  selectedMotor.value = member;
  op.value.hide();
};

const updateRowData = (status: any) => {
  console.log(status);
  mainStore.setUpdateModal(true)
}

const filteredItems = computed(() => {
  if (!globalFilter.value) {
    return requestItems.value; // Return all codes if no filter is applied
  }
  const filter = globalFilter.value.toLowerCase();
  return requestItems.value.filter((item: RequestData) => {
    return (
      item.client.fname.toLowerCase().includes(filter) ||
      item.client.lname.toLowerCase().includes(filter) ||
      item.client.phone.toLowerCase().includes(filter) ||
      // item.motorBiker.fname.toLowerCase().includes(filter) ||
      // item.motorBiker.lname.toLowerCase().includes(filter) ||
      // item.originLocation.toLowerCase().includes(filter) ||
      // item.destinationLocation.toLowerCase().includes(filter) ||
      item.requestType.toLowerCase().includes(filter)
    );
  });
});
</script>

<style></style>
