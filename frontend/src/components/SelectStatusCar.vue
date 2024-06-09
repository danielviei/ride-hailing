<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="extraClasses"
      placeholder="Seleccione un estado"
    >
      <option value="" disabled v-if="!modelValue">Seleccione un estado</option>
      <option value="disponible">Disponible</option>
      <option value="en servicio">En servicio</option>
      <option value="en mantenimiento">En mantenimiento</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
      default: "disponible",
    },
    extraClasses: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
