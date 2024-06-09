<template>
  <div
    class="sm:hidden flex flex-col items-center justify-center p-4 border-b border-gray-200"
    :class="index % 2 === 0 ? 'bg-blue-100' : 'bg-white'"
  >
    <div class="font-medium text-gray-900">{{ vehicle.brand }}</div>
    <div class="text-sm text-gray-500">{{ vehicle.model }}</div>
    <div class="text-sm text-gray-500">{{ vehicle.year }}</div>
    <div class="flex flex-col w-full items-center justify-center">
      <SelectStatusCar
        v-if="!isLoading"
        :extraClasses="`text-sm text-center text-gray-500 rounded-lg ${
          index % 2 === 0 ? 'bg-white' : 'bg-blue-100'
        }`"
        id="status"
        label=""
        v-model="status"
        @update:modelValue="updateStatus"
      />
      <LoadingSpinner :isLoading="isLoading" />
      <p v-if="errorMessages" class="text-red-500 p-4">
        {{ errorMessages }}
      </p>
    </div>
    <RouterLink :to="`car/${this.vehicle.id}`" class="flex">
      Actualizar
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-2 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </RouterLink>
  </div>

  <tr
    class="hidden sm:table-row"
    :class="index % 2 === 0 ? 'bg-blue-100' : 'bg-white'"
  >
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {{ vehicle.brand }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ vehicle.model }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ vehicle.year }}
    </td>

    <td
      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col justify-center items-center"
    >
      <div class="flex items-center h-full">
        <SelectStatusCar
          :extraClasses="`text-sm text-center text-gray-500 rounded-lg ${
            index % 2 === 0 ? 'bg-white' : 'bg-blue-100'
          }`"
          id="status"
          label=""
          v-model="status"
          @update:modelValue="updateStatus"
          v-if="!isLoading"
        />
      </div>
      <LoadingSpinner :isLoading="isLoading" />
      <p v-if="errorMessages" class="text-red-500 p-4">
        {{ errorMessages }}
      </p>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <RouterLink :to="`car/${this.vehicle.id}`" class="flex justify-center">
        Actualizar
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-2 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </RouterLink>
    </td>
  </tr>
</template>

<script>
import SelectStatusCar from "./SelectStatusCar.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { changeCarStatus } from "@/api/cars";
import { useToast } from "vue-toastification";

export default {
  components: {
    SelectStatusCar,
    LoadingSpinner,
  },
  data() {
    return {
      status: this.vehicle.status,
      errorMessages: null,
      isLoading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async updateStatus(value) {
      try {
        this.isLoading = true;
        await changeCarStatus(this.vehicle.id, value);
        this.toast.success("Estado cambiado correctamente");
        this.message = null;
      } catch (error) {
        this.toast.error("Error al cambiar el estado");
        this.status = this.vehicle.status;
        if (error.response?.status === 401) {
          this.errorMessages = "Debes iniciar sesión para cambiar el estado";
        } else if (error.response?.status === 403) {
          this.errorMessages = "No tienes permisos para cambiar el estado";
        } else if (error.response?.status === 400) {
          this.errorMessages = "Seleccione un estado válido";
        } else if (error.response?.status === 404) {
          this.errorMessages = "Vehículo no encontrado";
        } else {
          this.errorMessages = "Error al cambiar el estado";
        }
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
