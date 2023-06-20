export default defineNuxtRouteMiddleware((to, from) => {
  if (to.matched.length == 0) {
    if (to.path == "/find-tasks") {
      return navigateTo("/find-tasks/list");
    } else {
      return navigateTo("/");
    }
  } else {
  }
});
