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
            :options="categories"
            optionLabel="name"
            option-value="id"
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
  </div>
</template>

<script lang="ts" setup>
import { object, string, number, date, type InferType, boolean } from "yup";

const prizeStore = usePrizeStore();
const mainStore = useMainStore();
const formState = reactive({
  fname: "",
  lname: "",
  motorType: "",
  phone: "",
  plateNumber: "",
  numeroChase: "",
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

const driverModal = computed(() => {
  return mainStore.driverModal;
});
const loading = computed(() => {
  return prizeStore.loading;
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
    await prizeStore.AddPrize(formState);
  } catch (validationError) {
    // Handle validation errors
    validationError.inner.forEach((error: any) => {
      errors[error.path] = error.message; // Set the error message for the corresponding field
    });
  }
};

const categories = computed(() => {
  return prizeStore.prizeCategoryies;
});
</script>

<style></style>
