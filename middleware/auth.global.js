import { siteConfig } from "@/services/siteConfig";

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path.startsWith("/account") &&
    useCookie("spToken").value.length == 0
  ) {
    return navigateTo("/");
  }

  if (
    to.path.startsWith(siteConfig.linkPaths.postTask) &&
    useCookie("spToken").value.length == 0
  ) {
    return navigateTo(siteConfig.linkPaths.login);
  }
});
