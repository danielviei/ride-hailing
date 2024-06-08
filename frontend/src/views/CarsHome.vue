<template>
  <div
    class="flex justify-between items-center border-b-4 border-blue text-center"
  >
    <h1 class="text-2xl bold w-full">Listado de Vehículos</h1>
  </div>
  <CarTable />
</template>

<script>
import CarTable from "../components/CarTable.vue";

export default {
  name: "CarsHome",
  components: {
    CarTable,
  },
};
</script>
