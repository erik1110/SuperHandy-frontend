<template>
  <v-layout class="sp-min-h-screen">
    <Navbar />
    <div class="sp-mt-[48px] sp-w-full sp-flex sp-bg-[#F3F3F3]">
      <div class="sp-hidden md:sp-flex sp-shrink-0 sp-ml-4 sp-my-4">
        <VCard>
          <VCardText
            class="sp-flex sp-flex-col sp-p-4 sp-border-r-2 sp-border-balck sp-h-[100%]"
          >
            <NuxtLink
              class="account sp-mb-4 sp-py-2 sp-px-4 sp-flex sp-items-center"
              :class="{ active: activeRouter == 'account' }"
              to="/account"
            >
              <i class="sidebar-icon account-icon"></i>
              <span>我的帳號</span>
            </NuxtLink>
            <NuxtLink
              class="sp-mb-4 sp-py-2 sp-px-4 sp-flex sp-items-center"
              :class="{ active: activeRouter == 'task' }"
              to="/account/tasks"
            >
              <i class="sidebar-icon task-icon"></i>
              <span>任務管理</span>
            </NuxtLink>
            <NuxtLink
              class="sp-mb-4 sp-py-2 sp-px-4 sp-flex sp-items-center"
              :class="{ active: activeRouter == 'comment' }"
              to="/account/comments"
            >
              <i class="sidebar-icon comment-icon"></i>
              <span>評價查看</span>
            </NuxtLink>
            <NuxtLink
              class="sp-flex sp-py-2 sp-px-4 sp-items-center"
              :class="{ active: activeRouter == 'point' }"
              to="/account/points"
            >
              <i class="sidebar-icon point-icon"></i>
              <span>點數管理</span>
            </NuxtLink>
          </VCardText>
        </VCard>
      </div>
      <div class="sp-flex-1 sm:sp-mx-4 sp-my-4 sp-overflow-auto">
        <div class="sp-h-[100%]">
          <slot />
        </div>
      </div>
    </div>
  </v-layout>
  <Footer />
</template>

<script setup>
  const route = useRoute();
  const activeRouter = ref("account");
  const FuncCheckTabs = function (val) {
    if (val == "/account") {
      activeRouter.value = "account";
    } else if (val.startsWith("/account/tasks")) {
      activeRouter.value = "task";
    } else if (val.startsWith("/account/comments")) {
      activeRouter.value = "comment";
    } else if (val.startsWith("/account/messages")) {
      activeRouter.value = "message";
    } else if (val.startsWith("/account/points")) {
      activeRouter.value = "point";
    }
  };
  watch(
    () => route.path,
    (val) => {
      FuncCheckTabs(val);
    }
  );
  FuncCheckTabs(route.path);
</script>

<style scoped lang="scss">
  .sidebar-icon {
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    &.account-icon {
      background: url("@/assets/images/svg/account.svg") center center / contain
        no-repeat;
    }
    &.task-icon {
      background: url("@/assets/images/svg/task.svg") center center / contain
        no-repeat;
    }
    &.comment-icon {
      background: url("@/assets/images/svg/comment.svg") center center / contain
        no-repeat;
    }
    &.point-icon {
      background: url("@/assets/images/svg/point.svg") center center / contain
        no-repeat;
    }
  }
  .active {
    border-radius: 8px;
    background-color: #b7eeee;
  }
</style>
