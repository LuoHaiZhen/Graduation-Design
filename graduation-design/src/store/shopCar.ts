import { defineStore } from "pinia";
import QRCode from 'qrcode'
import {
    reqCartList,
    reqDeleteCartById,
    reqUpdateCheckedByid,
    reqPayInfo,
} from "../api/api";

export const shopCarStore = defineStore("shopCar", {
    state: () => {
        return {
            //购物车列表数据
            cartAllList: [
                {
                    activityRuleList: "",
                    cartInfoList: [{}],
                    createTime: "",
                },
            ],
            cartInfoList: [
                {
                    cartPrice: 0,
                    couponInfoList: null,
                    createTime: "",
                    id: 0,
                    imgUrl: "",
                    isChecked: 0,
                    isOrdered: 0,
                    operateTime: "",
                    orderTime: null,
                    skuId: 0,
                    skuName: "",
                    skuPrice: 0,
                    sourceId: 0,
                    sourceType: "",
                    userId: "",
                },
            ],
            //支付信息
            payInfo: {},
            code: "",
        };
    },
    getters: {
        //购物车列表数据
        cartList(state) {
            return state.cartAllList[0].cartInfoList;
        },
        //计算出总价
        totalPrice(state) {
            let sum = 0;
            state.cartAllList[0].cartInfoList.forEach((item) => {
                sum += item["skuNum"] * item["skuPrice"];
            });
            return sum;
        },
        //计算出商品总数
        totalGoods(state) {
            let goods = 0;
            state.cartAllList[0].cartInfoList.forEach((item) => {
                goods += item["skuNum"];
            });
            return goods;
        },
    },
    actions: {
        //获取购物车列表
        async getCartList() {
            console.log("getCartList");

            await reqCartList().then((res: any) => {

                this.cartAllList = res.data;
            });
        },
        //删除某个产品
        async deleteCartById(skuId) {
            await reqDeleteCartById(skuId).then((res: any) => {
                if (res.code == 200) {
                    return "ok";
                }
            });
        },
        //通过id更新选取的状态
        async UpdateCheckedByid(skuId, isChecked) {
            console.log("isChecked");

            await reqUpdateCheckedByid(skuId, isChecked).then((res: any) => {
                if (res.code == 200) {
                    return "ok";
                }
            });
        },
        //获取支付信息
        async getPayInfo(orderId) {
            await reqPayInfo(orderId).then((res: any) => {
                if (res.code == 200) {
                    this.payInfo = res.data;
                }
            });
        },
    },
});
