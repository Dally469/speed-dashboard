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
          <span class="font-bold text-xl whitespace-nowrap">New Passenger</span>
          <small class="font-light whitespace-nowrap"
            >Create a New Prize that would be won in the program</small
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
          <small for="username">Phone</small>
          <InputText v-model="formState.phone" class="w-full" />
          <small class="text-red-500" v-if="errors.phone">
            {{ errors.phone }}</small
          >
        </div>
      
        <div class="pt-4 gap-4 justify-end flex">
          <Button
            severity="danger"
             outlined
            label="Cancel"
            icon="pi pi-remove"
            iconPos="right"
            @click="mainStore.setPassengerModal(false)"
          />

          <Button
            type="submit"
             icon="pi pi-save"
            label="Save Passenger"
            :loading="loading"
            :disabled="loading"
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

const passenger = computed(() => {
  return store.passenger;
});

const formState = reactive({
  fname:   "",
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

const passengerModal = computed(() => {
  return mainStore.passengerModal;
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

 

onMounted(() => {
  // Fetch categories from the store
  // prizeStore.getAllPrizeCategories();
});

const value = ref("Histories");
const options = ref(["Histories", "Prizes"]);
</script>

<style></style>
