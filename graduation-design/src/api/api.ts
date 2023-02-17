import { requests } from "./ajax";
import mockRequests from './mock'

//登录注册相关
//登录
export const userLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });
//注册
export const userReg = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });
//获取验证码
export const getCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });
//获取用户信息
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });
//退出登录
export const reqLogout = () =>
  requests({ url: "/user/passport/logout", method: "get" });
//获取用户地址
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
//获取商品列表
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

//主页相关
//获取三级分类
export const getCategoryList = () =>
  requests.get(`/product/getBaseCategoryList`);
//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");
//获取floor
export const reqFloorList = () => mockRequests.get("/floor");

//商品相关
//搜索商品
export const getSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });
//获取商品详情
export const getGoodsInfo = (skuId) => requests.get(`/item/${skuId}`); //将产品添加到购物车中（获取更新某一个产品的个数）

//购物车
//加入购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
//获取购物车列表
export const reqCartList = () =>
  requests({ url: "/cart/cartList ", method: "get" });
//删除某个产品
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
//修改产品选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
//提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

//获取支付信息
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });
//获取支付状态
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });
//获取个人中心数据
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
