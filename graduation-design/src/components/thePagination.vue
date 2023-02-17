<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      <button v-if="page >= startNumAndEndNum.start">
        {{ page }}
      </button>
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  // 采用ts专有声明，无默认值
  pageNo: number;
  pageSize: number;
  total: number;
  continues: number;
}>();

const startNumAndEndNum = computed(() => {
  let start = 0,
    end = 0;
  //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】
  //不正常现象【总页数没有连续页码多】
  if (props.continues > props.total / props.pageSize) {
    start = 1;
    end = props.total / props.pageSize;
  } else {
    //正常现象【连续页码5，但是你的总页数一定是大于5的】
    //起始数字
    start = props.pageNo - Math.ceil(props.continues / 2);
    //结束数字
    end = props.pageNo + Math.ceil(props.continues / 2);
    //把出现不正常的现象【start数字出现0|负数】纠正
    if (start < 1) {
      start = 1;
      end = props.continues;
    }
    //把出现不正常的现象[end数字大于总页码]纠正
    if (end > props.total / props.pageSize) {
      end = props.total / props.pageSize;
      start = props.total / props.pageSize - props.continues + 1;
    }
  }
  console.log(end);

  return { start, end };
});
const totalPage = computed(():number => {
  return Math.ceil(props.total / props.pageSize);
});
</script>
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;

      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
