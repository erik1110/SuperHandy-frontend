export default defineNuxtRouteMiddleware((to, from) => {
  if (to.matched.length == 0) {
    return navigateTo("/");
  } else {
  }
});
