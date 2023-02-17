<template>
<div>

</div></template>

<script lang="ts">
  import { useMessage,useDialog } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$message = useMessage()
      window.$dialog = useDialog();
    }
  })
</script>