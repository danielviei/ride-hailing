<template>
  <div v-if="isAuth" class="w-full max-w-xs mx-auto mt-20">
    <h1 class="text-2xl bold">Crear nuevo vehículo</h1>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <TextField
        id="brand"
        v-model="brand"
        label="Marca"
        placeholder="Ingrese la marca"
      />
      <p v-if="errors?.brand" class="text-red-500 p-4">
        El campo marca es requerido
      </p>
      <TextField
        id="model"
        v-model="model"
        label="Modelo"
        placeholder="Ingrese el modelo"
      />
      <p v-if="errors?.model" class="text-red-500 p-4">
        El campo modelo es requerido
      </p>
      <TextField
        id="year"
        v-model="year"
        label="Año"
        type="number"
        placeholder="Ingrese el año"
      />
      <p v-if="errors?.year" class="text-red-500 p-4">
        El año debe tener 4 dígitos
      </p>
      <SelectStatusCar
        id="status"
        v-model="status"
        label="Estado"
        placeholder="Ingrese el estado"
      />
      <p v-if="errors?.status" class="text-red-500 p-4">
        Elija un estado válido
      </p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="createCar"
      >
        Crear
      </button>
    </form>
  </div>
  <div v-else>
    <h1 class="text-2xl bold">Debes iniciar sesión para crear un vehículo</h1>
  </div>
</template>

<script>
import TextField from "../components/TextField.vue";
import SelectStatusCar from "../components/SelectStatusCar.vue";
import { postCar } from "@/api/cars";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CarCreate",
  components: {
    TextField,
    SelectStatusCar,
  },
  data() {
    return {
      brand: "",
      model: "",
      year: "",
      status: "",
      isAuth: useUserStore().isAuthenticated,
      errors: {},
    };
  },
  methods: {
    async createCar() {
      try {
        await postCar({
          brand: this.brand,
          model: this.model,
          year: this.year,
          status: this.status,
        });
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
        this.errors = error.response.data;
      }
    },
  },
};
</script>
../components/forms/SelectStatusCar.vue
