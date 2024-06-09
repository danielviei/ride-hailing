<template>
  <div class="w-full max-w-xs mx-auto mt-20">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="registerUser"
    >
      <h1 class="text-2xl bold my-4">Registro de Usuario</h1>
      <TextField
        id="email"
        label="Correo electrónico"
        v-model="email"
        placeholder="Ingrese su correo electrónico"
      />
      <p v-if="errors?.email" class="text-red-500 p-4">
        Ingrese un correo electrónico válido
      </p>
      <TextField
        id="name"
        label="Nombre"
        v-model="name"
        placeholder="Ingrese su nombre"
      />
      <p v-if="errors?.name" class="text-red-500 p-4">El nombre es requerido</p>
      <PasswordField
        id="password"
        label="Contraseña"
        v-model="password"
        placeholder="Ingrese su contraseña"
      />
      <p v-if="errors?.password" class="text-red-500 p-4">
        La contraseña debe tener al menos 6 caracteres
      </p>
      <p class="text-red-500 p-4">{{ errorMessage }}</p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        @click="login"
      >
        Registrarse
      </button>
      <RouterLink class="block mt-4" to="/login"
        >Ya tienes cuenta?
        <span class="text-blue-500"> Inicia sesión </span>
      </RouterLink>
    </form>
  </div>
</template>

<script>
import { registerUser } from "@/api/auth";
import TextField from "../components/TextField.vue";
import PasswordField from "../components/PasswordField.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    TextField,
    PasswordField,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      errors: {},
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async registerUser() {
      try {
        await registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.toast.success("Usuario registrado correctamente");
        this.$router.push({ name: "Login" });
      } catch (error) {
        this.errorMessage = error.response?.data?.message;
        this.errors = error.response?.data;
        this.toast.error("Error al registrar usuario");
      }
    },
  },
};
</script>
