<template>
  <v-card color="vicYellow" class="flex flex-wrap-reverse fixed">
    <!-- fixed-tabs -->
    <v-tabs  v-model="tab" bg-color="vicYellow" class="" active-class="true">
      <div class=" <lg:hidden px-5 xl:px-12 py-1 flex flex-wrap-reverse">
        <Icon name="logos:vector-timber" class="text-[40px] text-amber-300"/>
        <div class="text-[30px] text-amber-700 py-1 font-weight-bold "> 
          ecgres
        </div>
      </div>
  
      <nav class=" lg:ml-[10%] text-amber-700">
        <v-tab >
          <div class=" relative flex flex-wrap w-full my-auto rounded">
            <input v-model="tiendaStore.searchTerm" @input="tiendaStore.search"  type="search" class="input_normal" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
          </div>
        </v-tab>
        <v-tab value="two" class="font-weight-bold">
            cambiar imagenes <Icon class="text-[22px]" name="material-symbols:keyboard-arrow-down" />
          <v-menu activator="parent">
            <v-list>
              <v-list-item  v-for="(item, index) in items" :key="index" :value="index">
                <button @click="item.method"  >
                  <v-list-item-title  class="font-weight-bold" >
                    {{ item.title }} 
                  </v-list-item-title>
                </button>
              </v-list-item>
            </v-list>
          </v-menu>
  
        </v-tab>
      </nav>
    </v-tabs>
  </v-card>
  </template>
  
  <script setup>
  import { useTiendaStore } from '../store/tienda';

const tiendaStore = useTiendaStore()
  const tab = ref('one')
  const disable = ref(true)
  const route = useRoute()

  const items = [{ 
    title: 'Sprite',
    method: function() { tiendaStore.change_imagenes = 1 }
  },
  { 
    title: 'Dream world',
    method: function() {tiendaStore.change_imagenes = 2}
  },
  { 
    title: 'Arte Oficial',
    method: function() {tiendaStore.change_imagenes = 3}
  },
  {
    title: 'Shiny',
    method: function() {tiendaStore.change_imagenes = 4}
  },
  ]
  </script>
  
  <style lang="scss" scoped>
  </style>

