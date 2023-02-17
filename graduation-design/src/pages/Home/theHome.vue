<template>
  <div>
    <!-- <TheHeader></TheHeader> -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TheRank></TheRank>
    <TheLike></TheLike>
    <TodayRecommented></TodayRecommented>
    <TheFloor></TheFloor>
    <TheBrank></TheBrank>
    <TheFooter></TheFooter>
  </div>
</template>

<script lang="ts" setup>
/* import { defineComponent } from "vue"; */
/* import TheHeader from "./Header/theHeader.vue"; */
import TheFooter from "./Footer/theFooter.vue";
import ListContainer from "./ListContainer/ListContainer.vue";
import TypeNav from "../../components/TypeNav/TypeNav.vue";
import TodayRecommented from "./TodayRecommented/TodayRecommented.vue";
import TheRank from "./theRank/theRank.vue";
import TheLike from './theLike/theLike.vue'
import TheFloor from './theFloor/theFloor.vue'
import TheBrank from './theBrank/theBrank.vue'
import { userStore } from "@/store/user";
import { onMounted } from "vue";
const store=userStore()
onMounted(()=>{
  store.getUserInfo()
})
</script>

<style lang="less"></style>
