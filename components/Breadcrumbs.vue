<template>
  <v-breadcrumbs bg-color="transparent" :items="breadcrumbItems" v-show="breadcrumbItems.length > 0"></v-breadcrumbs>
</template>

<script setup>
import { siteConfig } from "@/services/siteConfig";
const route = useRoute();
const home = {
  title: siteConfig.breadcrumbs.cnName.home,
  disabled: false,
  href: "/",
};

// - 取得URL路徑並解析為陣列 -
const parseUrlPathToArray = (nowPath) => {
  let pathArr = [];
  if (!nowPath) return pathArr;
  if (nowPath === '/' || nowPath === '/index') return pathArr;
  pathArr = nowPath.split("/");
  pathArr.shift();
  return pathArr;
}

// - 製作麵包屑物件 -
const makeBreadcrumbs = (urlPathArr) => {

  let breadcrumbsArr = [];
  if (!urlPathArr) return breadcrumbsArr;
  if (urlPathArr.length === 0) return breadcrumbsArr;
  breadcrumbsArr.push(home);
  let href = "";

  for (let i = 0; i < urlPathArr.length; ++i) {
    const item = urlPathArr[i];
    const cnName = siteConfig.breadcrumbs.cnName[item];
    if (!cnName) continue;

    href = href + `/${item}`;
    // - 不規則處理:href替換 -
    const irrHerfs = siteConfig.breadcrumbs.irregular.herf;
    if (irrHerfs[item]) {
      href = irrHerfs[item];
    }
    breadcrumbsArr.push({
      title: cnName,
      disabled: false,
      href: href,
    })
  }// for-end


  let lastNode = breadcrumbsArr.pop();

  // - 不規則處理:我的帳號:"首頁/會員/我的帳號" -
  if (lastNode.title === "會員") {
    breadcrumbsArr.push(lastNode);
    breadcrumbsArr.push({ //加入[我的帳號]
      title: "我的帳號",
      disabled: false,
      href: lastNode.href,
    });
    lastNode = breadcrumbsArr.pop();
  }
  // - 不規則處理:任務詳情:"首頁/找任務/任務詳情" -
  if (lastNode.title === "任務詳情") {
    breadcrumbsArr.push({ //加入[找任務]
      title: "找任務",
      disabled: false,
      href: siteConfig.linkPaths.findTasksList.to,
    });
  }

  // - 最後一個要disabled -
  lastNode.disabled = true;
  breadcrumbsArr.push(lastNode);

  return breadcrumbsArr;
};


const breadcrumbItems = computed(() => {
  const nowPath = route.path;
  const urlPathArr = parseUrlPathToArray(nowPath);
  return makeBreadcrumbs(urlPathArr);
})

</script>
