<template>
  <div class="space-y-4">
    <DashboardHeading />
    <DashboardStatistic />
    <DashboardLineChart />
    <div>recently</div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "Dashboard",
  layout: "dashboard",
  middleware: "auth",
});
</script>

<style></style>
