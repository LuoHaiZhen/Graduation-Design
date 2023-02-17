<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
       v-for="(slide, index) in store.skuImageList"
        :key="slide.id">
        <img :src="slide.imgUrl" :class="{active:store.currentIndex==index}"
        @click="changeCurrentIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script lang="ts" setup>
import Swiper from 'swiper'

import {  ref,watch,nextTick } from "vue";
import { goodsStore } from "@/store/goods";
const store = goodsStore();

const changeCurrentIndex = (index) => {
  store.currentIndex = index;
};
let cur=ref(null)
watch(()=>store.skuImageList,()=>{
  nextTick(()=>{new Swiper(cur.value, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //显示几个图片设置
          slidesPerView: 3,
          //每一次切换图片个数
          slidesPerGroup:1
        });})
  
})
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
