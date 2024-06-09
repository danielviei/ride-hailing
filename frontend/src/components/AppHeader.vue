<template>
  <header class="p-4 bg-blue-500 text-white flex justify-between">
    <RouterLink to="/">
      <h1 class="text-xl">Ride Hailing</h1>
    </RouterLink>
    <div>
      <span v-if="user">{{ `Hola, ${user.name}` }}</span>
      <div v-else class="flex gap-2">
        <RouterLink to="/login">Iniciar sesión</RouterLink>
        <RouterLink class="hidden sm:block" to="/register">Registrarse</RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { ref, watch } from "vue";

export default {
  name: "AppHeader",
  setup() {
    const userStore = useUserStore();
    const user = ref(userStore.user);

    watch(
      () => userStore.user,
      (newUser) => {
        user.value = newUser;
      }
    );

    return {
      user,
    };
  },
};
</script>
