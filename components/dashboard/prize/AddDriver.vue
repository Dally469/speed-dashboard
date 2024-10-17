<template>
  <div>
    <div class="flex justify-between items-center w-full">
      <Button
        icon="pi pi-user-plus"
        class="mr-4"
        label="New Driver"
        @click="mainStore.setDriverModal(true)"
      />
    </div>

    <Dialog
      v-model:visible="driverModal"
      modal
      header="New Prize"
      :style="{ width: '30vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="flex flex-col items-start justify-center gap-2 px-2">
          <span class="font-bold text-xl whitespace-nowrap">New Driver</span>
          <small class="font-light whitespace-nowrap"
            >Create a New Driver that would be use in the program</small
          >
        </div>
      </template>
      <form
        @submit.prevent="onSubmit"
        class="w-full lg:px-4 max-sm:px-2 space-y-2"
      >
        <div class="flex flex-col gap-1">
          <small for="username">Firstname</small>
          <InputText v-model="formState.fname" class="w-full" />
          <small class="text-red-500" v-if="errors.fname">
            {{ errors.fname }}</small
          >
        </div>
        <div class="flex flex-col gap-1">
          <small for="username">Lastname</small>
          <InputText v-model="formState.lname" class="w-full" />

          <small class="text-red-500" v-if="errors.lname">
            {{ errors.lname }}</small
          >
        </div>
        <div class="flex flex-col gap-1">
          <small for="username">Phone number</small>
          <InputText v-model="formState.phone" class="w-full" />
          <small class="text-red-500" v-if="errors.phone">
            {{ errors.phone }}</small
          >
        </div>

        <div class="flex flex-col gap-1">
          <small for="username">Motor Type</small>
          <Select
            v-model="formState.motorType"
            :options="motorTypes"
            optionLabel="name"
            option-value="name"
            placeholder="Select a Category"
            checkmark
            class="w-full"
          />

          <small class="text-red-500" v-if="errors.motorType">
            {{ errors.motorType }}</small
          >
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <small for="username">Plate Number</small>
            <InputText v-model="formState.plateNumber" class="w-full" />
            <small class="text-red-500" v-if="errors.plateNumber">
              {{ errors.plateNumber }}</small
            >
          </div>
          <div class="flex flex-col gap-1">
            <small for="username">Chase Number</small>
            <InputText v-model="formState.numeroChase" class="w-full" />
            <small class="text-red-500" v-if="errors.numeroChase">
              {{ errors.numeroChase }}</small
            >
          </div>
        </div>

        <div class="pt-4 gap-4 justify-end flex">
          <Button
            severity="danger"
             outlined
            label="Cancel"
            icon="pi pi-remove"
            iconPos="right"
            @click="mainStore.setDriverModal(false)"
          />

          <Button
            type="submit"
             icon="pi pi-save"
            label="Save Driver"
            :loading="loading"
            :disabled="loading"
          />
        </div>
      </form>
    </Dialog>



     <Dialog
      v-model:visible="updateModal"
      modal
      header="New Prize"
      :style="{ width: '30vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="flex flex-col items-start justify-center gap-2 px-2">
          <span class="font-bold text-xl whitespace-nowrap">Update Passenger</span>
         
        </div>
      </template>
      <form
       
        class="w-full lg:px-4 max-sm:px-2 space-y-2"
      >
          <div class="flex flex-col gap-1">
          <small for="username">Firstname</small>
          <InputText v-model="driver.fname" class="w-full" />
          <small class="text-red-500" v-if="errors.fname">
            {{ errors.fname }}</small
          >
        </div>
        <div class="flex flex-col gap-1">
          <small for="username">Lastname</small>
          <InputText v-model="driver.lname" class="w-full" />

          <small class="text-red-500" v-if="errors.lname">
            {{ errors.lname }}</small
          >
        </div>
        <div class="flex flex-col gap-1">
          <small for="username">Phone number</small>
          <InputText v-model="driver.phone" class="w-full" />
          <small class="text-red-500" v-if="errors.phone">
            {{ errors.phone }}</small
          >
        </div>

        <div class="flex flex-col gap-1">
          <small for="username">Motor Type</small>
          <Select
            v-model="driver.motorType"
            :options="motorTypes"
            optionLabel="name"
            option-value="name"
            placeholder="Select a Category"
            checkmark
            class="w-full"
          />

        
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <small for="username">Plate Number</small>
            <InputText v-model="driver.plateNumber" class="w-full" />
          
          </div>
          <div class="flex flex-col gap-1">
            <small for="username">Chase Number</small>
            <InputText v-model="driver.numeroChase" class="w-full" />
          
          </div>

          
         
        </div>

          <div class="flex flex-col gap-1">
            <small for="username">Driver Status</small>
            <div class="grid grid-cols-4">
              <div v-for="(category, i) in driverStatus" :key="category.id" class="flex  items-center">
                  <RadioButton v-model="driver.status" :inputId="category.key" name="dynamic" :value="category.name" />
                  <label   class="ml-2">{{ category.name }}</label>
                </div>
            </div>
          
          </div>

        
      
        <div class="pt-4 gap-4 justify-end flex">
          <Button
            severity="danger"
             outlined
            label="Cancel"
            icon="pi pi-remove"
            iconPos="right"
            @click="closeUpdate()"
          />


            <Button
              icon="pi pi-save"
              label="Save Changes"
              :loading="loading"  
              :disabled="loading"
              @click="onUpdateDriver()"
          />
        </div>
      </form>
    </Dialog>

     <Dialog
      v-model:visible="deleteModal"
      modal
      :style="{ width: '30vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="flex flex-col items-start justify-center gap-2 px-2">
          <span class="font-bold text-xl whitespace-nowrap">Delete  </span>
         
        </div>
      </template>
      <form
        @submit.prevent="onSubmit"
        class="w-full lg:px-4 max-sm:px-2 space-y-2"
      >
       <small class="font-light text-xl "
            >Are you sure you want to delete this <small class="font-bold"> {{driver?.fname +' '+driver?.lname}} </small></small
          >
        <div class="pt-4 border-t-2  gap-4 justify-end flex">
          <Button
            severity="danger"
             outlined
            label="Cancel"
            icon="pi pi-remove"
            iconPos="right"
            @click="mainStore.setDeleteModal(false)"
          />

          <Button
            type="submit"
            icon="pi pi-trash"
            label="Delete"
            severity="danger"
            :loading="loading"
            :disabled="loading"
            @click="deleteUser()"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { object, string, number, date, type InferType, boolean } from "yup";

const driverStore = useDriverStore();
const mainStore = useMainStore();
const formState = reactive({
  fname: "",
  lname: "",
  motorType: "",
  phone: "",
  plateNumber: "",
  numeroChase: "",
  status:"ACTIVE"
});
const errors = reactive({
  fname: null,
  lname: null,
  phone: null,
  motorType: null,
  plateNumber: null,
  numeroChase: null,
});

const prizeSchema = object({
  fname: string().required("fname is required"),
  lname: string().required("lname is required"),
  phone: string().required("phone is required"),
  motorType: string().required("Value  is required"),
  plateNumber: string().required("Value  is required"),
  numeroChase: string(),
});

const driver = computed(() =>{
  return driverStore.driver;
})

const driverModal = computed(() => {
  return mainStore.driverModal;
});
const loading = computed(() => {
  return driverStore.loading;
});

const updateModal = computed(() => {
  return mainStore.updateModal;
});

const deleteModal = computed(() => {
  return mainStore.deleteModal;
});
const onSubmit = async () => {
  try {
    // Reset errors
    errors.fname = null;
    errors.lname = null;
    errors.phone = null;
    errors.motorType = null;
    errors.plateNumber = null;
    errors.numeroChase = null;

    // Validate the form state using Yup
    await prizeSchema.validate(formState, { abortEarly: false });

    // If validation passes, call login action from the auth store
    await driverStore.createDriver(formState);
  } catch (validationError) {
    // Handle validation errors
    validationError.inner.forEach((error: any) => {
      errors[error.path] = error.message; // Set the error message for the corresponding field
    });
  }
};

function deleteUser() {
  driverStore.deleteDriverById(driver.value?.id);
 }

 const closeUpdate = () => {
  mainStore.setUpdateModal(false);
 }
 const onUpdateDriver = async () => {
 await driverStore.updateDriver(driver.value, driver.value?.id)
 }
 const motorTypes = ref([
   { id: 1, name: "Motorcycle" },
   { id: 2, name: "Car" },
   { id: 3, name: "Truck" },
   { id: 4, name: "Bus" },
   { id: 5, name: "Bicycle" },
 ])

  const driverStatus = ref([
   { id: 1, name: "ACTIVE" },
   { id: 2, name: "INACTIVE" },
   { id: 3, name: "ONLINE" },
   { id: 4, name: "OFFLINE" },
 ])
 
 

</script>

<style></style>
