import { defineStore } from "pinia";
import {
    userLogin,
    userReg,
    getCode,
    reqUserInfo,
    reqLogout,
    reqAddressInfo,
    reqOrderInfo,
    reqMyOrderList,
} from "../api/api";
import { userInfo } from "@/Type/user";
import { getUUID } from "../utils/uuid";
export const userStore = defineStore("user", {
    state: (): userInfo => {
        return {
            code: "",
            token: "", //储存token
            userInfo: { name: "", nickName: "", token: "", userId: 0 },//用户信息
            addressInfo: [//地址信息
                {
                    consignee: "",
                    fullAddress: "",
                    id: 0,
                    isDefault: "",
                    phoneNum: "",
                    provinceId: 0,
                    regionId: 0,
                    userAddress: "",
                    userId: 0,
                },
            ],
            orderInfo: [],
            totalAmount: "",
            tradeNo: "",
            myOrder: {},
            orderDetailList: {},
        };
    },
    getters: {
        //计算orderlist中的商品件数
        totalNum(state) {
            let sum = 0;
            state.orderInfo.forEach((item) => {
                sum += item["skuNum"];
            });
            return sum;
        },
        orderDetailList(state) {
            return state.myOrder["orderDetailList"];
        },
    },
    actions: {
        //用户注册
        async userReg(phone: string, password: string, code: string) {
            await userReg({ phone, password, code }).then((res: any) => {
                if (res.code == 200) {
                    return "ok";
                } else {
                    return Promise.reject(new Error("faile"));
                }
            });
        },
        //用户登录
        async userLogin(phone, password) {
            await userLogin({ phone, password }).then((res: any) => {
                if ((res.code = 200)) {
                    //判断请求是否成功
                    localStorage.setItem("TOKEN", res.data.token); //将token存储到本地         
                    getUUID();
                    this.token = res.data.token; //存储到store
                } else {
                    return Promise.reject(new Error("faile"));
                }
            });
        },
        //获取验证码
        async getCode(phone: string) {
            await getCode(phone).then((res: any) => {
                if (res.code == 200) {
                    this.code = res.data;
                } else {
                    return Promise.reject(new Error("faile"));
                }
            });
        },
        //获取用户信息
        async getUserInfo() {
            await reqUserInfo().then((res: any) => {
                if (res.code == 200) {
                    this.userInfo = res.data;
                    localStorage.setItem("name", res.data.name)
                }
            });
        },
        //退出登录
        async LogOut() {
            await reqLogout().then((res: any) => {
                if (res.code == 200) {
                    //清除本地存储的用户信息
                    localStorage.removeItem("TOKEN");
                    //清除pinia中的相关数据
                    /* (this.userInfo = {
                      name: "",
                      nickName: "",
                      token: "",
                      userId: 0,
                    }), */
                    this.token = "";
                }
            });
        },
        //获取用户地址
        async getAddress() {
            await reqAddressInfo().then((res: any) => {
                if (res.code == 200) {
                    this.addressInfo = res.data;
                }
            });
        },
        //获取商品列表
        async getOrderInfo() {
            await reqOrderInfo().then((res: any) => {
                console.log('res: ', res);

                if (res.code == 200) {
                    console.log("123", res.data);

                    this.orderInfo = res.data.detailArrayList;
                    this.totalAmount = res.data.totalAmount;
                    this.tradeNo = res.data.tradeNo;
                }
            });
        },
        //获取个人中心数据
        async getOrderList(page, limit) {
            await reqMyOrderList(page, limit).then((res: any) => {
                this.myOrder = res.data.records;
            });
        },
    },
});
