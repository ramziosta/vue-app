<script setup>
import DataItem from './DataItem.vue';
import {ref, reactive, onMounted} from 'vue';
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import {RouterLink} from "vue-router";
import axios from 'axios';
import Market from "./Market.vue";

defineProps({
  limit: {
    type: Number,
    default: 4
  },
  showButton: {
    type: Boolean,
    default: false
  }
});
// const receivedData = ref([]);
const state = reactive({
  receivedData: [],
  isLoading: true,
  error: null,
});

onMounted(async () => {
  try {
    const response = await axios.get('https://vue-app-backend.vercel.app/traders');
    console.log('Data fetched:', response.data);
    state.receivedData = response.data;
    console.log('Data received:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    state.error = "Failed to load data from server";
  } finally {
    state.isLoading = false;
    console.log('Data loading complete')
  }
})
</script>

<template>
  <h1 class="text-white bg-green-700 text-3xl font-bold flex justify-center py-10">ExchangeRate Api-fetched Data</h1>
  <section class="bg-blue-50 px-4 py-10">
    <h2 class="text-3xl font-bold mb-6 text-center">Current Traders Listing</h2>
    <div v-if="state.isLoading" class="flex justify-center">
      <PulseLoader color="#00ff00"/>
    </div>
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataItem v-for="item in state.receivedData.slice(0,limit || state.receivedData.length)" :key="item.id" :item="item"/>
      </div>
    </div>

  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
        to="/data"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >View All Traders
    </RouterLink
    >
  </section>
</template>

<style scoped>

</style>