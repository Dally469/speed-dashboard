<template>
  <div class="flex items-center sticky z-10 ml-1 bg-white top-0 justify-between px-4   py-6">
    <Button
      icon="pi pi-bars"
      severity="secondary"
      rounded
      text
      aria-label="Bookmark"
    />

    <div class="flex items-center gap-x-6">
      <div class="flex gap-x-3">
        <Button
          icon="pi pi-search"
          severity="secondary"
          rounded
          aria-label="Bookmark"
        />
        <Button
          icon="pi pi-envelope"
          severity="secondary"
          rounded
          aria-label="Bookmark"
        />
        <OverlayBadge :value="useFormatNumbers(smsBalance)" severity="primary">
        <Button
          icon="pi pi-bell"
          severity="secondary"
          rounded
          aria-label="Bookmark"
        />
        </OverlayBadge>
      </div>
      <Button @click="toggle" severity="secondary" text class="!border-2">
        <div class="flex items-center space-x-2">
          <Avatar
            image="https://avatar.iran.liara.run/public"
            class="mr-2"
            shape="circle"
          />
          <div class="flex flex-col justify-start items-start mr-3">
            <div class="font-semibold text-sm">{{ fullname }}</div>
            <div class="font-light text-xs">{{ user.role }}</div>
          </div>

          <i class="pi pi-chevron-down pl-4"></i>
        </div>
      </Button>
      <Popover ref="op">
        <div class="flex flex-col gap-4  ">
          
          <div>
            <span class="font-light text-sm block mb-2">Account Quick Action</span>
            <div class="list-none p-0 m-0 flex flex-col gap-1">
              <nuxt-link
                v-for="(menu, i) in settingMenu"
                :key="i"
                class="flex items-center gap-2 hover:bg-slate-50 text-xs cursor-pointer py-2 px-3 rounded-lg"
                :to="menu.url"
              >
                <i
                  :class="menu.icon"
                  style="font-size: 15px"
                />
                <div>
                  <span class="font-medium">{{ menu.title }}</span>
                  
                </div>
                 
              </nuxt-link>
               <div
                 
                class="flex items-center gap-2 grouptext-sm cursor-pointer py-2 px-3 rounded-lg"
                @click="authStore.logout()"
              >
                <i
                  :class="`pi pi-sign-out text-red-500`"
                  style="font-size: 15px"
                />
                <div>
                  <span class=" text-xs group-hover:font-bold  text-red-500">Sign Out</span>
                  
                </div>
                 
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const thirdPartyStore = useThirdPartStore();
const user = computed(() => {
  return authStore.user;
});

const fullname = computed(() => {
  return user.value.firstname + " " + user.value.lastname || "User";
});

const smsBalance = computed(() => {
  return thirdPartyStore.balance;
})
const op = ref();
const settingMenu = ref([
  {
    title: "Account Profile",
    url: "/dashboard/settings/account",
    icon: "pi pi-user",
   },
  {
    title: "Change Password",
    url: "/dashboard/settings/change_password",
    icon: "pi pi-lock",
   },
   
]);

const toggle = (event: any) => {
  op.value.toggle(event);
};

onMounted(() =>{
  thirdPartyStore.checkSMSBalance()
})
</script>

<style></style>
