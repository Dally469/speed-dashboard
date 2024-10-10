<template>
  <div
    class="flex flex-col space-y-2 p-5 rounded-lg border-2 border-border"
  >
    <i
      class="pi pi-trophy text-primary bg-green-700/20  p-2.5 rounded-lg w-14  "
      style="font-size: 2.2rem"
    ></i>
    <div class="flex items-center space-x-2">
      <h2 class="text-lg text-primary font-medium">{{ title }}</h2>
    </div>

    <div class="flex items-center space-x-2">
      <div class="text-4xl font-semibold text-gray-600">
        {{ useFormatNumbers(amount) }}
      </div>
      <Chip
        :label="`+` + rate + ` %`"
        class="text-success px-4 text-xs font-semibold" severity="success"
      />

      <div class="text-sm text-gray-400">Interest Rate</div>
    </div>

   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  content: string;
  amount: number;
  rate: number;
}>();
</script>

<style></style>
