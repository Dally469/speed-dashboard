<template>
  <div class="grid grid-cols-4 gap-4">
    <DashboardCard v-for="card in dataStats" :title="card.title" :amount="card.amount" :rate="card.rate_percentage" :content="card.content" />
  </div>
</template>

<script lang="ts" setup>
const dataStats = ref([
  {
    "id": 1,
    "title": "Total Amount",
    "amount": 50000,
    "rate_percentage": 15,
    "content": "Total number of users registered in Kigali province."
  },
  {
    "id": 2,
    "title": "Daily Transactions",
    "amount": 1200,
    "rate_percentage": 8,
    "content": "Number of daily entries recorded in the Eastern Province."
  },
  {
    "id": 3,
    "title": "Total Drivers",
    "amount": 800000,
    "rate_percentage": 12,
    "content": "Total prize distributed across the Northern Province."
  },
  {
    "id": 4,
    "title": "Total Passengers",
    "amount": 75000,
    "rate_percentage": 9,
    "content": "Total prize distributed for this week in the Southern Province."
  }
]
)
</script>

<style>

</style>