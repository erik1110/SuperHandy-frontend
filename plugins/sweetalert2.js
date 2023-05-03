export default defineNuxtPlugin(() => {
  const alert = useAlert();
  return {
    provide: {
      useAlert: { ...alert },
    },
  };
});
