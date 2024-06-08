<template>
  <div
    class="flex justify-between items-center border-b-4 border-blue text-center"
  >
    <h1 class="min-[330px]:pl-16 text-2xl bold w-full">Listado de Vehículos</h1>
    <RouterLink
      class="abosulute rounded-full bg-blue-700 shadow-md items-center justify-center text-white p-1 m-2 z-10 w-9 h-8"
      to="/car/create"
    >
      +
    </RouterLink>
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
