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
              
              <Button
                severity="secondary"
                outlined
                :label="selectedMotor ? selectedMotor.title : 'Filter By Status'"
                @click="toggle"
               
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
        <!-- <Column field="id" class="w-40" header="PASSENGER ID"></Column> -->
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
        <Column class="  !text-end">
          <template #body="{ data }">
            <div class="flex items-center justify-center gap-x-4">
 

            <Button
              icon="pi pi-eye"
              severity="secondary"
              text
               @click="updateRow(data)"
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

const home = ref({
  label: "Dashboard",
  route: "/dashboard",
});
const items = ref([{ label: "Passengers" }]);
const mainStore = useMainStore();
const passengerStore = usePassengerStore();

const toast = useToast();
const selectRow = (option: any) => {

  
  console.log(option);
  if (option.id == 1) {
    // navigateTo("/dashboard/passengers/" + data.id);
  } else if (option.id == 2) {
     mainStore.setPassengerModal(true);
    passengerStore.setUpdating(true)
  } else {
     
  }
};
const visible = ref(false);
const selectedPassengers = ref<any>([]);


const passengerItems = computed(() => {
  return passengerStore.passengers.slice().sort((a: any, b: any) => b.id - a.id);
});
const loading = computed(() => {
  return passengerStore.loading;
});
 

onMounted(() => {
  passengerStore.getAllPassengers();
});

const dates = ref();
const op = ref();
const rowOp = ref();
const selectedMotor = ref<MotorType>();
const motors = ref([
  { id: 1, title: "ACTIVE" },
  { id: 2, title: "UNACTIVE" },
 
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

const updateRow = (data: any) => {
  console.log(data)
  passengerStore.setPassenger(data)
  mainStore.setUpdateModal(true);
  passengerStore.setUpdating(true)
};
const selectMember = (member: any) => {
  selectedMotor.value = member;
  op.value.hide();
};


const deleteRow = (data: any) => {
  console.log(data)
  passengerStore.setPassenger(data)
    mainStore.setDeleteModal(true);
 };
</script>

<style></style>
