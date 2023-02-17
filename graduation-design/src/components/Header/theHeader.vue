<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!store.userInfo.name">
                        <span>请</span>
                        <router-link to="/">登录 </router-link>
                        <router-link to="/reg">免费注册 </router-link>
                    </p>
                    <p v-else>
                        <a>{{ store.userInfo.name }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myOrder">我的订单</router-link>
                    <router-link to="/shopCart">我的购物车</router-link>
                    <router-link to="/center">我的尚品汇</router-link>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!--   <a class="logo" title="尚品汇" href="###" target="_blank"> -->
                <router-link class="logo" title="尚品汇" to="/home">
                    <img src="./images/logo.png" alt="" />
                    <img src="" alt="" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" placeholder="请输入🎈" />
                    <button class="sui-btn btn-xlarge btn-danger" @click="toSearch()" type="button">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { userStore } from '@/store/user'
import { reqOrderInfo } from '@/api/api'
const router = useRouter()
const store = userStore()
//跳转
const toSearch = async () => {
    await reqOrderInfo().then((res: any) => {
        console.log('res: ', res)
    })
    router.push('/search')
}
//退出登录
const logout = async () => {
    try {
        await store.LogOut()
        router.push('/home')
    } catch (error) {}
}
</script>

<style scoped lang="less">
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
