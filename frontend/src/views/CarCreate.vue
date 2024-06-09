<template>
  <div v-if="isAuth" class="w-full max-w-xs mx-auto mt-20">
    <div v-if="isLoading" class="animate-pulse h-[90vh]">
      <div class="flex items-center justify-center h-full">
        <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-2xl bold">
        {{ isCreate ? "Crear nuevo vehículo" : "Actualizar vehículo" }}
      </h1>
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
        <div class="flex items-center justify-center w-full gap-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="createCar"
          >
            {{ isCreate ? "Crear" : "Actualizar" }}
          </button>
          <button
            class="flex bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="deleteCar"
          >
            Eliminar
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <h1 class="text-2xl bold">Debes iniciar sesión para crear un vehículo</h1>
  </div>
</template>

<script>
import TextField from "../components/TextField.vue";
import SelectStatusCar from "../components/SelectStatusCar.vue";
import { postCar, updateCar, getCarById, deleteCar } from "@/api/cars";
import { useUserStore } from "@/stores/userStore";
import { useToast } from "vue-toastification";

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
      isCreate: this.$route.params.id === "create",
      isLoading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  async mounted() {
    if (!this.isCreate) {
      try {
        this.isLoading = true;
        const car = await getCarById(this.$route.params.id);
        this.brand = car.brand;
        this.model = car.model;
        this.year = car.year;
        this.status = car.status;
      } catch (error) {
        this.toast.error("Error al obtener el vehículo");
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  methods: {
    async createCar() {
      try {
        if (this.isCreate) {
          await postCar({
            brand: this.brand,
            model: this.model,
            year: this.year,
            status: this.status,
          });
        } else {
          await updateCar(this.$route.params.id, {
            brand: this.brand,
            model: this.model,
            year: this.year,
            status: this.status,
          });
        }
        this.toast.success(
          `Vehículo ${this.isCreate ? "creado" : "actualizado"} correctamente`
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.toast.error(
          `Error al ${this.isCreate ? "crear" : "actualizar"} el vehículo`
        );
        console.error(error);
        this.errors = error.response.data;
      }
    },
    async deleteCar() {
      try {
        await deleteCar(this.$route.params.id);
        this.toast.success("Vehículo eliminado correctamente");
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.toast.error("Error al eliminar el vehículo");
        console.error(error);
      }
    },
  },
};
</script>
../components/forms/SelectStatusCar.vue
