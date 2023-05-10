import { siteConfig } from "@/services/siteConfig";

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path.startsWith(siteConfig.linkPaths.account.to) &&
    //useCookie("spToken").value.length == 0 : (useCookie("spToken").value) maybe undefined
    !useCookie("spToken").value
  ) {
    return navigateTo(siteConfig.linkPaths.home.to);
  }

  if (
    to.path.startsWith(siteConfig.linkPaths.postTask.to) &&
    !useCookie("spToken").value
  ) {
    return navigateTo(siteConfig.linkPaths.login.to);
  }
});
