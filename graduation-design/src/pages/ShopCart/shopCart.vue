<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in store.cartList" :key="cart['id']">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart['isChecked'] == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart['imgUrl']" />
            <!-- <div class="item-msg" v-for="(name ,index) in skuNameMini" :key="index">{{ name }}</div> -->
            <div class="item-msg">{{ cart["skuName"] }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart["skuPrice"] }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler1('minus', -1, cart)"
            >
              -</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart['skuNum']"
              @change="handler1('change', $event.target!['value'] * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler1('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart["skuNum"] * cart["skuPrice"] }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{store.totalGoods}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费）：</em>
          <i class="summoney">{{store.totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted,ref } from "vue";
import { shopCarStore } from "../../store/shopCar";
import { goodsStore } from "@/store/goods";
import throttle from "lodash/throttle";
const store = shopCarStore();
const store1 = goodsStore();
onMounted(() => {
  //发送请求
  store.getCartList();
});
//更新选中状态
const updateChecked = (cart,event) => {
  //带给服务器的参数isChecked，不是布尔值，应该是0|1
      try {
        //如果修改数据成功，再次获取服务器数据（购物车）
        let isChecked = event.target.checked ? "1" : "0";
       
        store.UpdateCheckedByid(
          cart['skuId'],isChecked
        )
         store.getCartList();
      } catch (error) {
        //如果失败提示
        alert('失败');
      }
};

//购买数量变化的处理函数
const handler1 = throttle(async function (type, disNum, cart) {
  switch (type) {
    //减法
    case "minus":
      disNum = -1;
      break;
    case "add":
      disNum = 1;
      break;
    case "change":
      if (isNaN(disNum) || disNum < 1) {
        // alert('请输入一个正常数字')
        window.$message.error("请输入一个正常的数字");
        disNum = 0;
      } else {
        //属于正常情况（小数：取证），带给服务器变化的量 用户输入进来的 - 产品的起始个数
        disNum = parseInt(disNum) - cart["skuNum"];
      }
      break;
  }
  try {
    await store1.addShopCar(cart["skuId"], disNum),
      //再一次获取服务器最新的数据进行展示
      store.getCartList();
  } catch (error) {}
}, 500);

//根据Id删除购物车数据
const deleteCartById = async (cart) => {
  try {
    //如果删除成功再次发请求获取新的数据进行展示
    await store.deleteCartById(cart["skuId"]);
    store.getCartList();
  } catch (err) {
    alert("失败");
  }
};

//
/* const total=computed(()=>{
  let sum=0
  store.cartList.forEach((item)=>{
    sum += item['skuNum'] * item['skuPrice'];
  })
}) */
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
