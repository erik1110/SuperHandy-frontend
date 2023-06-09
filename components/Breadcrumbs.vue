<template>
  <v-breadcrumbs bg-color="transparent" :items="breadcrumbItems" v-show="breadcrumbItems.length > 0"></v-breadcrumbs>
</template>

<script setup>
import { siteConfig } from "@/services/siteConfig";

const linkPaths = siteConfig.linkPaths;
const breadcrumbsCn = siteConfig.breadcrumbsCn;
const route = useRoute();
const home = {
  title: breadcrumbsCn.home,
  disabled: false,
  href: "/",
};
const breadcrumbItems = computed(() => {
  const now = route.path;
  if (now && now === linkPaths.home.to) {
    return [];
  }

  let href = "";
  let result = [home];
  const nowArr = now.split("/");
  nowArr.shift();
  nowArr.forEach((element) => {
    href = href + `/${element}`;

    const value = breadcrumbsCn[element];
    if (value) {
      result.push({
        title: value,
        disabled: false,
        href: href,
      });
    }
  });

  // - 不規則處理 -
  let last = result.pop();

  //1.會員
  if (last.title === "會員") {
    result.push(last);
    result.push({
      title: "我的帳號",
      disabled: false,
      href: last.href,
    });
    last = result.pop();
  }

  //2.任務詳情
  if (last.title === "任務詳情") {
    result.push({
      title: "找任務",
      disabled: false,
      href: siteConfig.linkPaths.findTasksList.to,
    });
    result.push(last);
    last = result.pop();
  }

  last.disabled = true;
  result.push(last);
  return result;
});
</script>
