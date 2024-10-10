<template>
  <div class="flex relative min-h-screen">
    <LayoutSidebar />
    <div class="flex-1">
      <LayoutHeader />
      <div class="container mx-auto px-4 py-4 ">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const serviceStore = useCheckServiceStore();
onMounted(async () => {
  // await serviceStore.checkServiceStatus();
});
</script>

<style></style>
