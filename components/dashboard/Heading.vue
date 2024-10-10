<template>
  <div class="flex items-center justify-between">
    <div>
      <div class="font-light text-lg text-gray-700">Welcome,  </div>
      <div class="font-semibold text-2xl text-gray-700">{{ fullname }}</div>
    </div>
 
    <div class="flex space-x-4">
      <DatePicker v-model="dates" selectionMode="range" dateFormat="dd/mm/yy" :manualInput="false" placeholder="01-01-2020 02-02-2021" />
      <Button
        severity="secondary"
        outlined
        :label="selectedMember ? selectedMember.title : 'Filter Province'"
        @click="toggle"
        class="min-w-48"
        icon="pi pi-sliders-h"
      />

      <Popover ref="op">
        <div class="flex flex-col gap-4">
          <div>
            <span class="font-medium block mb-2">Rwanda Province</span>
            <ul class="list-none p-0 m-0 flex flex-col">
              <li
                v-for="item in province"
                :key="item.title"
                class="flex items-center px-2 py-1 group hover:bg-card cursor-pointer rounded-border"
                @click="selectMember(item)"
              >
                <div>
                  <span class="font-normal text-sm group-hover:text-primary">{{
                    item.title
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dates = ref();
const op = ref();
const selectedMember = ref<ProvinceType>();
const province = ref([
  { id: 1, title: "Kigali City" },
  { id: 2, title: "Northern Province" },
  { id: 3, title: "Eastern Province" },
  { id: 4, title: "Southern Province" },
  { id: 5, title: "Western Province" },
]);
export interface ProvinceType {
  id: number;
  title: string;
}
const toggle = (event: any) => {
  op.value.toggle(event);
};
const selectMember = (member: any) => {
  selectedMember.value = member;
  op.value.hide();
};

const authStore = useAuthStore();
const user = computed(() => {
  return authStore.user;
});

const fullname = computed(() => {
  return user.value.firstname + " " + user.value.lastname || "User";
});
</script>

<style></style>
