<template>
  <n-carousel draggable autoplay>
    <img
      class="carousel-img"
      v-for="item in store.bannerList"
      :key="item.id"
      :src="item.imgUrl"
    />
  </n-carousel>
</template>
<script lang="ts" setup>
import { homeStore } from "@/store/home";
import { onMounted } from "vue";
import { NCarousel } from "naive-ui";
const store = homeStore();

onMounted(() => {
  store.getBannerList();
});
</script>
<style scoped>
.carousel-img {
  width: 100%;
  height: 100%;
  position: relative;

  /*  object-fit: cover; */
}
</style>
