import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import home from "../pages/Home/theHome.vue";
import pinia from "../store/index";

import { userStore } from "../store/user"; //个人定义的文件
const store = userStore(pinia); //最紧要的是添加参数pinia
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../pages/Login/theLogin.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/Login/theLogin.vue"),
  },
  /* 注册 */
  {
    path: "/reg",
    name: "Reg",
    component: () => import("../pages/Register/theRegister.vue"),
  },
  /* 首页 */
  {
    path: "/home",
    name: "home",
    component: home,
    children: [
      {
        path: "/search",
        name: "search",
        component: () => import("../pages/Search/theSearch.vue"),
      },
    ],
  },
  /* 搜索 */
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/Search/theSearch.vue"),
  },
  /* 详情 */
  {
    path: "/detail/:skuId",
    name: "detail",
    component: () => import("../pages/Detail/goodsDetail.vue"),
  },
  /* 加入购物车成功 */
  {
    path: "/AddCartSuccess",
    name: "AddCartSuccess",
    component: () => import("../pages/AddCartSuccess/AddCartSuccess.vue"),
  },
  /* 购物车 */
  {
    path: "/shopCart",
    name: "shopCart",
    component: () => import("../pages/ShopCart/shopCart.vue"),
  },
  {
    path: "/trade",
    name: "trade",
    component: () => import("../pages/Trade/tradePage.vue"),
  },
  {
    path: "/payPage",
    name: "payPage",
    component: () => import("../pages/Pay/payPage.vue"),
    //只有从trade才能到payPage  否则转到trade页面
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    path: "/paySuccess",
    name: "paySuccess",
    component: () => import("../pages/PaySuccess/PaySuccess.vue"),
    //只有从pay才能到paySuccess 否则转到pay页面
    beforeEnter(to, from, next) {
      if (from.path === "/payPage") {
        next();
      } else {
        next("/payPage");
      }
    },
  },
  {
    path: "/center",
    name: "center",
    component: () => import("../pages/Center/centerPage.vue"),
    children: [
      {
        path: "myOrder",
        name: "myOrder",
        component: () => import("../pages/Center/myOrder/myOrder.vue"),
      },
      //默认跳转
      {
        path: "",
        name: "qwe",
        redirect: "center/myOrder",
      },
    ],
  },
  {
    path: "/text",
    component: () => import("../pages/textPage.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  //获取仓库中的token-----可以确定用户是登录了
  let token = localStorage.getItem("TOKEN");
  let name =  localStorage.getItem("name");
  //用户登录了
  if (token) {
    //已经登录而且还想去登录------不行
    if (to.path == "/login" || to.path == "/reg") {
      next("/home");
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next();
      } else {
        //登陆了但没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.getUserInfo();
          next();
        } catch (error) {
          //token失效从新登录
          await store.LogOut();
          next("/login");
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/payPage") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next("/login?redirect=" + toPath);
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
});
export default router;
