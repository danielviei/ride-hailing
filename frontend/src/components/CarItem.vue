<template>
  <div
    class="sm:hidden block p-4 border-b border-gray-200"
    :class="index % 2 === 0 ? 'bg-blue-100' : 'bg-white'"
  >
    <div class="font-medium text-gray-900">{{ vehicle.brand }}</div>
    <div class="text-sm text-gray-500">{{ vehicle.model }}</div>
    <div class="text-sm text-gray-500">{{ vehicle.year }}</div>
    <div class="text-sm text-gray-500">{{ vehicle.status }}</div>
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
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ vehicle.status }}
    </td>
  </tr>
</template>

<script>
export default {
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
};
</script>
