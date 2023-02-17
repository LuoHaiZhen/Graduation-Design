<template>
  <div>
    <button @click="get()">text</button>
   
    <button @click="Storechange()">$patch对象</button>
    <button @click="Storechange1()">$patch对象</button>
    <NButton @click="Storechange2()">Actions</NButton>
    <NButton @click="Storechange3()">Actions</NButton>
  </div>
</template>

<script lang="ts" setup>

import { typeNavStore } from "../store/typeNav";
import { NButton } from "naive-ui";
import { useMessage } from "naive-ui";
import {userStore} from '../store/user'
import {onMounted} from 'vue'
import { homeStore } from "@/store/home";

const store1 = typeNavStore();

const store2=homeStore()
const user=userStore()
const get = () => {

  /* const data= store.getTypeNav()
 getTypeNav().then((res)=>{
  const data:any=res
  if(data.code==200){
    console.log(data.data);
    
  }
 }) */
 /* user.get(); */
};
onMounted(()=>{
  store2.getBannerList()
})


const Storechange = () => {
 
};

const Storechange1 = () => {
 
};
const Storechange2 = () => {
 
};
const Storechange3 = () => {
  window.$message.info("确定");
};

</script>
<style scoped lang="less"></style>
