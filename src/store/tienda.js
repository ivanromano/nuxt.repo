import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTiendaStore = defineStore("tienda", () => {
  const arr = [];
  const resultados = ref(null);
  const pok = ref(null);
  const loading = ref(null);
  const itemsPerPage = 100;
  const currentPage = ref(1);
  const searchTerm = ref('')
  const change_imagenes = ref(1)
  const imagenesPok = computed(() => {
    if (!pok.value) return [];
    if (change_imagenes.value == 1) {
      return pok.value.map(pokemon => `${pokemon.sprites.front_default}`)
    } if (change_imagenes.value == 2) {
      return pok.value.map(pokemon => `${pokemon.sprites.other.dream_world.front_default}`)
    } if (change_imagenes.value == 3) {
      return pok.value.map(pokemon => `${pokemon.sprites.other["official-artwork"].front_default}`)
    } else {
      return pok.value.map(pokemon => `${pokemon.sprites.front_shiny}`)
    }
  })  
  
  const totalPages = computed(() => Math.ceil(pok.value.length / itemsPerPage));
  
  const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return pok.value.slice(start, end);
  });

  const pokeFetch = async () => {
    try {
      loading.value = false;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=905&offset=0`);
      const data = await response.json();
      resultados.value = data.results.map(async (item) => {
        const innerResponse = await fetch(item.url);
        const allpokemon = await innerResponse.json();
        await arr.push(allpokemon);
        pok.value = arr;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
      loading.value = true
      }, 7000);
    }
  }

  const search = () => {
    displayedItems = displayedItems.filter(item => {
      return item.name.toLowerCase().includes((searchTerm.value.toLowerCase()))
    })
    displayedItems = FilterPokemon.value
    }
  
  return {
    arr,
    resultados,
    pok,
    loading,
    pokeFetch,
    totalPages,
    displayedItems,
    currentPage,
    itemsPerPage,
    searchTerm,
    search,
    change_imagenes,
    imagenesPok
  };
});








