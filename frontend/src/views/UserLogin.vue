<template>
  <div class="w-full max-w-xs mx-auto mt-20">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <TextField
        id="email"
        label="Correo electrónico"
        v-model="email"
        placeholder="Ingrese su correo electrónico"
      />
      <PasswordField
        id="password"
        label="Contraseña"
        v-model="password"
        placeholder="Ingrese su contraseña"
      />

      <p v-if="errorMessage" class="text-red-500 p-4 mt-2">{{ errorMessage }}</p>

      <LoadingSpinner :isLoading="isLoading" />
      <div v-if="!isLoading" class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="login"
        >
          Iniciar sesión
        </button>
      </div>
      <RouterLink class="block mt-4" to="/register">
        No tienes cuenta?
        <span class="text-blue-500"> Regístrate </span>
      </RouterLink>
    </form>
  </div>
</template>

<script>
import TextField from "../components/TextField.vue";
import PasswordField from "../components/PasswordField.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { login } from "@/api/auth";
import { useToast } from "vue-toastification";

export default {
  name: "UserLogin",
  components: {
    TextField,
    PasswordField,
    LoadingSpinner,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    login() {
      this.isLoading = true;
      login(this.email, this.password)
        .then(() => {
          this.toast.success("Inicio de sesión exitoso");
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.toast.error("Error al iniciar sesión");
          if (!error.response) {
            return;
          }
          this.errorMessage = error.response.data.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
