<template>
  <div class="flex flex-col h-svh">
    <slot />
    
  </div>
</template>

<script lang="ts" setup>
import { useCheckServiceStore} from '@/stores'
const serviceStore = useCheckServiceStore();
onMounted(async () => {
  // await serviceStore.checkServiceStatus();
});
</script>

<style>

</style>