<template>
  <div class="flex flex-col items-start px-2 lg:px-14 w-full  justify-center text-center gap-y-6">
     <img src="assets/images/logo-speed.png" class="h-24"
      /> 
    <div class="px-2 max-sm:px-2   flex flex-col items-start space-y-3 py-6">
      <div class="text-3xl font-bold text-emerald-600">{{ props.title }}</div>
      <small class="text-gray-500 text-start"
        >{{  props.subtitle }}</small
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<style></style>
