<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div v-if="isLoading" class="h-[90vh]">
          <LoadingSpinner class="h-full" :isLoading="isLoading" />
        </div>
        <div
          v-if="!isLoading"
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <div v-if="!vehicles.length && !isLoading">
            <div class="px-4 py-3 bg-white sm:px-6">
              <p class="text-center text-gray-500">
                No hay vehículos registrados
              </p>
            </div>
          </div>
          <table v-else class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sm:table-header-group hidden">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Marca
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Modelo
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Año
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <CarItem
                v-for="(vehicle, index) in vehicles"
                :key="vehicle.id"
                :vehicle="vehicle"
                :index="index"
              />
            </tbody>
          </table>
          <div v-if="vehicles.length" class="px-4 py-3 bg-white sm:px-6">
            <div class="flex items-center justify-center gap-2">
              <button
                :disabled="!previous"
                @click="changePage(previous)"
                class="mr-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              <div class="flex justify-center space-x-2">
                <button
                  v-if="$route.query.page !== '1' && $route.query.page !== '2'"
                  @click="changePage(1)"
                  class="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  1
                </button>
                <button
                  v-if="previous"
                  :disabled="!previous"
                  @click="changePage(previous)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ parseInt($route.query.page) - 1 }}
                </button>
                <button
                  disabled
                  class="bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ $route.query.page || 1 }}
                </button>
                <button
                  v-if="next && totalPages !== next"
                  :disabled="!next"
                  @click="changePage(next)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ parseInt($route.query.page) + 1 }}
                </button>
                <button
                  v-if="next && totalPages > parseInt($route.query.page) + 2"
                  @click="changePage(parseInt($route.query.page) + 2)"
                  class="hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ parseInt($route.query.page) + 2 }}
                </button>
                <button
                  v-if="next && totalPages > parseInt($route.query.page) + 3"
                  @click="changePage(parseInt($route.query.page) + 3)"
                  class="hidden lg:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ parseInt($route.query.page) + 3 }}
                </button>
                <button
                  v-if="totalPages !== parseInt($route.query.page)"
                  @click="changePage(totalPages)"
                  class="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ totalPages }}
                </button>
              </div>
              <button
                :disabled="!next"
                @click="changePage(next)"
                class="ml-4 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCars } from "@/api/cars";
import CarItem from "./CarItem.vue";
import { useToast } from "vue-toastification";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  components: {
    CarItem,
    LoadingSpinner,
  },
  data() {
    return {
      vehicles: [],
      next: null,
      previous: null,
      total: 0,
      totalPages: 0,
      isLoading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  async mounted() {
    try {
      const page = this.$route.query.page || 1;
      await this.changePage(page);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async changePage(page) {
      try {
        this.isLoading = true;
        const data = await getCars(page);
        this.vehicles = data.results;
        this.next = data.next;
        this.previous = data.previous;
        this.total = data.total;
        this.totalPages = Math.ceil(this.total / 10);

        this.$router.push({ query: { page } });
      } catch (error) {
        this.toast.error("Error al cargar los vehículos");
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
