<template>
  <div >11</div>
</template>

<script lang='ts' setup>
window.$dialog.warning({
	title: '警告',
	content: '你确定？',
	positiveText: '确定',
	negativeText: '不确定',
	onPositiveClick: () => {
		window.$message.success('确定')
	},
	onNegativeClick: () => {
		window.$message.error('不确定')
	}
})

</script>
<style scoped lang='less'>
</style>