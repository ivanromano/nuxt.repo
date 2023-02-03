<template>
  blog
s<!-- <main v-for="item in (TiendaStore.LatestProductsList)" :key="item.id">
  {{ item }}
  <img :src="`${item.get_thumnail}`" alt="">
</main> -->
</template>

<script setup>
// import {useTiendaStore} from "../store/tienda";

// const route = useRoute()
// const TiendaStore = useTiendaStore()

definePageMeta({
  middleware: 'auth',

})
</script>

<style lang="scss" scoped>

</style>