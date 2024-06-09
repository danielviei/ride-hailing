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
        :extraClasses="`text-sm text-center text-gray-500 rounded-lg ${
          index % 2 === 0 ? 'bg-white' : 'bg-blue-100'
        }`"
        id="status"
        label=""
        v-model="status"
        @update:modelValue="updateStatus"
      />
      <p v-if="errorMessages" class="text-red-500 p-4">
        {{ errorMessages }}
      </p>
    </div>
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
        />
      </div>
      <p v-if="errorMessages" class="text-red-500 p-4">
        {{ errorMessages }}
      </p>
    </td>
  </tr>
</template>

<script>
import SelectStatusCar from "./SelectStatusCar.vue";
import { changeCarStatus } from "@/api/cars";

export default {
  components: {
    SelectStatusCar,
  },
  data() {
    return {
      status: this.vehicle.status,
      errorMessages: null,
    };
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
        await changeCarStatus(this.vehicle.id, value);
        this.message = null;
      } catch (error) {
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
      }
    },
  },
};
</script>
