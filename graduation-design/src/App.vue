<template>
  <div>
    <n-message-provider>
      <n-dialog-provider>
        <MessageVue />
      </n-dialog-provider>
    </n-message-provider>
    <Header></Header>

    <router-view></router-view>

    <!--  <TheHome></TheHome> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header/theHeader.vue";
import MessageVue from "./pages/Message.vue";
import { NMessageProvider, NDialogProvider } from "naive-ui";
export default defineComponent({
  name: "App",
  components: {
    Header,
    MessageVue,
    NMessageProvider,
    NDialogProvider,
  },
});
</script>

<style></style>
