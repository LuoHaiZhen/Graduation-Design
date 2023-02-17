<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              route.query.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money"
              >￥{{ store1.payInfo["totalFee"] }}</em
            ></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：{{ store.userInfo["loginName"] }}</li>
          <li>用户：{{ store.userInfo["name"] }}</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="submit">
          <a class="btn" @click="pay">立即支付</a>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付二维码弹窗 -->
    <Teleport to="html">
      <div @click="showModal = false" class="mark" v-show="showModal">
        <div class="content">
          <h2 class="title">请使用微信支付</h2>
          <img
            class="img"
            src="data:image/png;base64,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"
            alt=""
          />
          <div class="button">
            <n-button type="warning" @click="faceBug"> 支付遇到问题 </n-button>
            <n-button
              type="primary"
              style="margin-left: 20px"
              @click="successPay"
            >
              支付成功
            </n-button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/store/user";
import { shopCarStore } from "@/store/shopCar";
import { onMounted, ref, Teleport } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reqPayInfo, reqPayStatus } from "../../api/api";
import { NButton } from "naive-ui";
import QRCode from "qrcode";
const store = userStore();
const store1 = shopCarStore();
const route = useRoute();
const router = useRouter();
const orderId = route.query.orderId;
let showModal = ref(false);

onMounted(() => {
  store1.getPayInfo(orderId);
});

//支付遇到问题
const faceBug = () => {
  alert("请联系客服：123456789");
};

//取消支付
const successPay = () => {
  window.$message.success("支付成功");
  router.push("/paysuccess");
};

//立即支付按钮的点击事件
const pay = async () => {
  /*  router.push({
    name:'paySuccess'
  }) */
  showModal.value = true;
  const imgUrl = await QRCode.toDataURL(store1.payInfo["codeUrl"]);
  console.log(imgUrl);
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
.mark {
  position: fixed;
  _position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background-color: #ffffff;
    .img {
      width: 150px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .title {
      text-align: center;
      padding: 30px;
    }
    .button {
      position: absolute;
      top: 240px;
      left: 40px;
    }
  }
}
</style>
