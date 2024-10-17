<template>
  <div>
    <div class="flex justify-between items-center w-full">
      <Button
        icon="pi pi-user-plus"
        class="mr-4"
        label="New Passenger"
        @click="mainStore.setPassengerModal(true)"
      />
    </div>

    <Dialog
      v-model:visible="passengerModal"
      modal
      header="New Prize"
      :style="{ width: '30vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="flex flex-col items-start justify-center gap-2 px-2">
          <span class="font-bold text-xl whitespace-nowrap"> {{ isUpdating ? `Update Passenger` : `New Passenger` }}</span>
         
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
          <small for="username">Phone</small>
          <InputText v-model="formState.phone" class="w-full" />
          <small class="text-red-500" v-if="errors.phone">
            {{ errors.phone }}</small
          >
        </div>

        <div v-if="isUpdating" class="flex flex-col gap-1">
          <small for="username">Status</small>
                         <Select v-model="formState.status" :options="statuses" optionLabel="name" placeholder="Set Passenger Status" class="w-full " />

          
        </div>

      
        <div class="pt-4 gap-4 justify-end flex">
          <Button
            severity="danger"
             outlined
            label="Cancel"
            icon="pi pi-remove"
            iconPos="right"
            @click="close()"
          />

          <Button
            type="submit"
             icon="pi pi-save"
            label="Save Passenger"
            :loading="loading"
            :disabled="loading"
             v-if="!isUpdating"
          />

              <Button
              icon="pi pi-save"
            label="Save Changes"
            :loading="loading" v-if="isUpdating"
            :disabled="loading"
            @click="onUpdatePassenger()"
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
          <InputText v-model="passenger.fname" class="w-full" />
      
        </div>
        <div class="flex flex-col gap-1">
          <small for="username">Lastname</small>
          <InputText v-model="passenger.lname" class="w-full" />
     
        </div>
        <div class="flex flex-col gap-1">
          <small for="username">Phone</small>
          <InputText v-model="passenger.phone" class="w-full" />
         
        </div>

        <div v-if="isUpdating" class="flex flex-col gap-1">
          <small for="username">Status</small>
         <Select v-model="passenger.status" :options="statuses" optionLabel="name" optionValue="name" placeholder="Set Passenger Status" class="w-full " />

          
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
            :loading="loading" v-if="isUpdating"
            :disabled="loading"
            @click="onUpdatePassenger()"
          />
        </div>
      </form>
    </Dialog>

     <Dialog
      v-model:visible="passengerDeleteModal"
      modal
      header="New Prize"
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
       <small class="font-light text-xl  flex"
            >Are you sure you want to delete this <small class="font-bold"> {{passenger?.fname +' '+passenger?.lname}} </small></small
          >
        <div class="pt-4 gap-4 justify-end flex">
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

const store = usePassengerStore();
const mainStore = useMainStore();
const isUpdating = computed(()=> {
  return  store.updating;
});
const passenger = computed(() => {
  return store.passenger;
});
const statuses = ref([
    { name: 'ACTIVE', id: '1' },
    { name: 'INACTIVE', id: '0' }
]);
const formState = reactive({
  fname: "",
  lname: "",
  phone: "",
  status: "ACTIVE"
  
});
const errors = reactive({
  fname: null,
  lname: null,
  phone: null,
   
});

const prizeSchema = object({
  fname: string().required("First name is required"),
  lname: string().required("Last name is required"),
  phone: string().required("Phone number is required"),
   
});

const updateModal = computed(() => {
  return mainStore.updateModal;
})

const passengerModal = computed(() => {
  return mainStore.passengerModal;
});

const  passengerDeleteModal = computed(() => {
  return mainStore.deleteModal;
});

const loading = computed(() => {
  return store.loading;
});

const onSubmit = async () => {
  try {
    // Reset errors
    errors.fname = null;
    errors.lname = null;
    errors.phone = null;
  
    // Validate the form state using Yup
    await prizeSchema.validate(formState, { abortEarly: false });

    // If validation passes, call login action from the auth store
 
    await store.CreatePassenger(formState);

    
  } catch (validationError) {
    // Handle validation errors
    validationError.inner.forEach((error: any) => {
      errors[error.path] = error.message; // Set the error message for the corresponding field
    });
  }
};

function deleteUser(){
  console.log("adadasdasd")
  store.deletePassengerById(passenger.value?.id)
}

const close = () => {
  mainStore.setPassengerModal(false)
  store.setUpdating(false)
  formState.value.fname = ""
  formState.value.lname = ""
  formState.value.phone = ""
}

const closeUpdate = () => {
  mainStore.setUpdateModal(false)
  store.setUpdating(false)
   
}


 const onUpdatePassenger = async () => {
 await store.updatePassenger(passenger.value, passenger.value?.id)
 }
</script>

<style></style>
