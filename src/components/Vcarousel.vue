<template>
<div class=" my-[20px] mx-5 h-[200%]">
  <v-carousel cycle height="400" interval='10000'  >
    <v-carousel-item v-for="(item) in data" :key="data.id" :src="item.imagenes" cover > 
    </v-carousel-item>
  </v-carousel>
</div>
</template>

<script setup>
const supabase = useSupabaseClient()

const {data} = await useAsyncData(async () => {
  const {data} = await supabase.from('carrusel').select('*')
  return data
  console.log(data);
})
</script>

<style lang="scss" scoped>

</style>