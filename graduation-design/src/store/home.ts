import { defineStore } from "pinia";
import { reqFloorList, reqGetBannerList } from "@/api/api";

type bannerListData = { id: string; imgUrl: string }[];

type floorListData = { id: string; imgUrl: string }[];

type homeState = {
    bannerList: bannerListData;
    floorList: floorListData;
};
export const homeStore = defineStore("home", {
    state: (): homeState => {
        return {
            bannerList: [
                {
                    id: "",
                    imgUrl: "",
                },
            ],
            floorList: [
                {
                    id: "",
                    imgUrl: "",
                },
            ],
        };
    },
    getters: {},
    actions: {
        async getBannerList() {
            await reqGetBannerList().then((res: any) => {
                this.bannerList = res.data;
            });
        },
        async getFloorList() {
            await reqFloorList().then((res: any) => {
                if (res.code == 200) {
                    this.floorList = res.data;
                }
            });
        },
    },
});
