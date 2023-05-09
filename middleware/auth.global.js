export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path.startsWith("/account") &&
    useCookie("spToken").value.length == 0
  ) {
    return navigateTo("/");
  }
});
