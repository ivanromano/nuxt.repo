<template>
<main v-if="!tiendaStore.loading">
  <v-progress-circular indeterminate color="purple" :size="70" :width="7"></v-progress-circular>
</main>

<main v-if="tiendaStore.loading">
  <Vpaginacion/>

  <ul class="grid grid-cols-2 lg:mx-4 lg:grid-cols-4 gap-3">
    <li v-for="pokemon in FilterPokemon" :key="pokemon.name" >
      <div class="bg-yellow-300 bg-opacity-50 rounded-lg shadow-md p-4">
        <div class="lg:flex">
          <img :src="`${tiendaStore.imagenesPok[pokemon.id - 1]}`" alt="Imagen del Pokémon" class="w-32 h-32 bg-white rounded-full">
          <h2 class="text-lg font-weight-bold text-gray-900">{{ pokemon.name }}</h2>
        
        </div>
        <div class="col-span-1">
          <div class="my-2">
            <v-btn   :color="`${pokemon.types[0]?.type.name} `" variant="outlined" rounded="">
              {{ pokemon.types[0]?.type.name }}
            </v-btn>
            <v-btn v-if="pokemon.types[1]?.type.name" variant="outlined" rounded="" :color="`${pokemon.types[1]?.type.name}`"  >
              {{ pokemon.types[1]?.type.name }}
            </v-btn>
          
          </div>
          <div  class="mb-4">
            <p class="text-gray-700 font-medium">Número de Pokédex: <span class="text-gray-900"> {{ pokemon.id }} </span></p>
          </div>
        </div>
        <Vcharts :stats="pokemon.stats"  />
      </div>

    </li>
  </ul>
  <Vpaginacion/>

</main>

</template>

<script setup>
import { useTiendaStore } from '../store/tienda';

const tiendaStore = useTiendaStore()
const btn_show = ref(true)
// const searchTerm = ref('bu')

const FilterPokemon = computed(() => { 
  return tiendaStore.displayedItems.filter(item => {
    return item.name.toLowerCase().includes((tiendaStore.searchTerm))
  })
})

const emitSearchTerm = () => {
  console.log('aaa');
}

const search = () => {
  tiendaStore.displayedItems = tiendaStore.displayedItems.filter(item => {
    return item.name.toLowerCase().includes((tiendaStore.searchTerm))
  })
  tiendaStore.displayedItems = FilterPokemon.value
}

onMounted(async() => {
  await tiendaStore.pokeFetch()
  await FilterPokemon()
	})

useHead({
    title: 'home',
})


</script>

<style scoped>
  .v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
</style>



