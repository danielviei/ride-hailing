<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="type"
      :placeholder="placeholder"
    />
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
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      default: "Enter text",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    updateValue(newValue) {
      let value = newValue;
      if (this.type === "number") {
        value = Number(value);
      }
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
