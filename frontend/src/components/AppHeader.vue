<template>
  <header class="p-4 bg-blue-500 text-white flex justify-between">
    <RouterLink to="/">
      <h1 class="text-xl">Ride Hailing</h1>
    </RouterLink>
    <div>
      <div v-if="user" class="flex gap-2 items-center">
        <span>{{ `Hola, ${user.name}` }}</span>
        <button title="Cerrar sesión" @click="userStore.logout">
          <svg
            class="h-6 w-6 ml-2"
            viewBox="0 0 15 15"
            fill="none"
            stroke="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
            />
          </svg>
        </button>
      </div>
      <div v-else class="flex gap-2">
        <RouterLink to="/login">Iniciar sesión</RouterLink>
        <RouterLink class="hidden sm:block" to="/register"
          >Registrarse</RouterLink
        >
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
      userStore,
    };
  },
};
</script>
