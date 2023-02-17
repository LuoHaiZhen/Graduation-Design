<template>
  <div class="spec-preview">
    <img :src="store.skuImageList[store.currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="store.skuImageList[store.currentIndex].imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script lang="ts" setup>
import { goodsStore } from "@/store/goods";
import { inject, ref } from "vue";
const store = goodsStore();

let mask = ref();
let big = ref();


const handler = (event) => {
  let masks = mask.value;
  let bigs = big.value;
  let left = event.offsetX - masks.offsetWidth / 2;
  let top = event.offsetY - masks.offsetHeight / 2;
  //约束范围
  if (left <= 0) left = 0;
  if (left >= masks.offsetWidth) left = masks.offsetWidth;
  if (top <= 0) top = 0;
  if (top >= masks.offsetHeight) top = masks.offsetHeight;
  //修改元素的left|top属性值
  masks.style.left = left + "px";
  masks.style.top = top + "px";
  bigs.style.left = -2 * left + "px";
  bigs.style.top = -2 * top + "px";
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
