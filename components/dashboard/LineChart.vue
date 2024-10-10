<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-7 border border-border rounded-lg p-3">
      <div ref="chart" style="width: 100%; height: 400px"></div>
    </div>
    <div class="col-span-5 border border-border rounded-lg p-3">
      <div ref="productPrize" style="width: 100%; height: 100%"></div>
    </div>
  </div>

  <!-- <div id="chart-container"></div> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const { $echarts } = useNuxtApp();
const chart = ref(null);
const productPrize = ref(null);

onMounted(() => {
  const myChart = $echarts.init(chart.value);

  // Specify chart configuration and data
  const option = {
    color: ["#054a29"],
    title: {
      text: "Transaction Progress",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },

    grid: {
      left: "1%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
     xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Entries",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(27, 67, 50)",
            },
            {
              offset: 1,
              color: "rgb(216, 243, 220)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250, 101, 264, 90, 340, 168],
      },
    ],
  };
  // Use the specified chart configuration and data
  myChart.setOption(option);
});

onMounted(() => {
  const myPrizeChart = $echarts.init(productPrize.value);

  // Specify chart configuration and data
  const option = {
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "Instantly Prize",
    },
    legend: {
      top: "5%",
      left: "center",
      show: false,
    },
    series: [
      {
        name: "Distributed",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 21050, name: "Primus" },
          { value: 7050, name: "Turbo" },
          { value: 5800, name: "CocaCola" },
          { value: 4840, name: "Fanta" },
          { value: 3900, name: "Sprite" },
          { value: 14800, name: "Mutzig" }, // Example of additional items
          { value: 6500, name: "Amstel" },
          { value: 5900, name: "Heineken" },
        ],
      },
    ],
  };
  // Use the specified chart configuration and data
  myPrizeChart.setOption(option);
});
</script>
