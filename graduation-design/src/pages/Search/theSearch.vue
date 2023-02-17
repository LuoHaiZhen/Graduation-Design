<template>
  <!-- 三级联动 -->
  <TypeNav></TypeNav>

  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <!-- 分类的面包屑 -->
          <li class="with-x" v-if="searchParams.categoryName">
            {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
          </li>
          <!-- 关键字的面包屑 -->
          <li class="with-x" v-if="searchParams.keyword">
            {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
          </li>
          <!-- 品牌的面包屑 -->
          <li class="with-x" v-if="searchParams.trademark">
            {{ searchParams.trademark.split(":")[1]
            }}<i @click="removeTradeMark">×</i>
          </li>
          <!--平台的售卖的属性值展示 -->
          <li
            class="with-x"
            v-for="(attrValue, index) in searchParams.props"
            :key="index"
          >
            {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
          </li>
        </ul>
      </div>

      <!--selector-->
      <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{ active: isOne }" @click="changeOrder('1')">
                <a
                  >综合<span
                    v-show="isOne"
                    class="iconfont"
                    :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                  ></span
                ></a>
              </li>
              <li :class="{ active: isTwo }" @click="changeOrder('2')">
                <a
                  >价格<span
                    v-show="isTwo"
                    class="iconfont"
                    :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                  ></span
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <!-- 商品展示区 -->
            <li
              class="yui3-u-1-5"
              v-for="good in store.searchList['goodsList']"
            >
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="`/detail/${good.id}`">
                    <img
                      :src="good.defaultImg"
                      style="width: 200px; height: 200px"
                    />
                  </router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥ </em>
                    <i>{{ good.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a
                    target="_blank"
                    href="item.html"
                    title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{ good.title }}</a
                  >
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                    @click="toDetail"
                    >加入购物车</a
                  >
                  <a href="javascript:void(0);" class="sui-btn btn-bordered"
                    >收藏</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <n-pagination
            v-model:page="searchParams.pageNo"
            :page-count="Math.ceil(store.total / searchParams.pageSize)"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 底部 -->
  <theFooter></theFooter>
</template>

<script lang="ts" setup>
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import TypeNav from "../../components/TypeNav/TypeNav.vue";
import theFooter from "../Home/Footer/theFooter.vue";
import { goodsStore } from "../../store/goods";
import { NPagination } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import { onMounted, watch, reactive, toRefs, onBeforeMount } from "vue";
const router = useRouter();
const route = useRoute(); //router
const store = goodsStore(); //pinia
//收集数据
const searchParams = reactive({
  //产品相应的id
  category1Id: "",
  category2Id: "",
  category3Id: "",
  //产品的名字
  categoryName: "",
  //搜索的关键字
  keyword: "",
  //排序:初始状态应该是综合且降序
  order: "1:desc",
  //第几页
  pageNo: 1,
  //每一页展示条数
  pageSize: 5,
  //平台属性的操作
  props: [] as Array<string>,
  //品牌
  trademark: "",
});

//监视路由
/* watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    console.log(newValue, "新的路由");
    console.log(oldValue, "旧的路由");
  }
); */
//监视pageNo的变化 变化时重新发送请求
watch(
  () => searchParams.pageNo,
  () => {
    getData();
  }
);
//在挂载前收集数据
onBeforeMount(() => {
  Object.assign(searchParams, route.query, route.params);
});
//每当组件挂载 发送请求
onMounted(() => {
  //发送请求获取数据
  getData();
});
//封装发送请求的方法
const getData = () => {
  store.getSearchInfo(searchParams);
};

//排序相关方法
const isOne = () => {
  return searchParams.order.indexOf("1") != -1;
};
const isTwo = () => {
  return searchParams.order.indexOf("2") != -1;
};
const isAsc = () => {
  return searchParams.order.indexOf("asc") != -1;
};
const isDesc = () => {
  return searchParams.order.indexOf("desc") != -1;
};
const changeOrder = (flag) => {
  //flag:用户每一次点击li标签的时候，用于区分是综合（1）还是价格（2）
  //现获取order初始状态【咱们需要通过初始状态去判断接下来做什么】
  let originOrder = searchParams.order;
  let orginsFlag = originOrder.split(":")[0];
  let originSort = originOrder.split(":")[1];
  //新的排序方式
  let newOrder = "";
  //判断的是多次点击的是不是同一个按钮
  if (flag == orginsFlag) {
    newOrder = `${orginsFlag}:${originSort == "desc" ? "asc" : "desc"}`;
  } else {
    //点击不是同一个按钮
    newOrder = `${flag}:${"desc"}`;
  }
  //需要给order重新赋值
  searchParams.order = newOrder;
  //再次发请求
  getData();
};
const trademarkInfo = (trademark) => {
  //1:整理品牌字段的参数  "ID:品牌名称"
  searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
  //再次发请求获取search模块列表数据进行展示
  getData();
};
const attrInfo = (attr, attrValue) => {
  //["属性ID:属性值:属性名"]
  console.log(attr, attrValue);
  //参数格式整理好
  let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
  //数组去重
  //if语句里面只有一行代码：可以省略大花括号
  if (searchParams.props.indexOf(props) == -1) searchParams.props.push(props);
  //再次发请求
  getData();
};

//删除分类的名字
const removeCategoryName = () => {
  //把带给服务器的参数置空了，还需要向服务器发请求
  //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
  //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
  searchParams.categoryName = "";
  searchParams.category1Id = "";
  searchParams.category2Id = "";
  searchParams.category3Id = "";
  getData();
  //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
  //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
  if (route.params) {
    router.push({ name: "search", params: route.params });
  }
};
//删除关键字
const removeKeyword = () => {
  //给服务器带的参数searchParams的keyword置空
  searchParams.keyword = "";
  //再次发请求
  getData();
  //通知兄弟组件Header清除关键字
  /*   this.$bus.$emit("clear"); */
  //进行路由的跳转
  if (route.query) {
    router.push({ name: "search", query: route.query });
  }
};
//removeAttr删除售卖的属性
const removeAttr = (index) => {
  //再次整理参数
  searchParams.props.splice(index, 1);
  //再次发请求
  getData();
};
//删除品牌的信息
const removeTradeMark = () => {
  //将品牌信息置空
  searchParams.trademark = "";
  //再次发请求
  getData();
  console.log(123);
};
//跳转
const toDetail = () => {
  router.push({
    name: "datail",
  });
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .pagination {
        display: table;
        margin: 0 auto;
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: left;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
