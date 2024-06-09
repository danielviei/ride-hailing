<template>
  <div v-if="isLoading" class="animate-pulse h-full">
    <div class="flex items-center justify-center h-full">
      <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
      <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
      <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
