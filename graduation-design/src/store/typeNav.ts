import { defineStore } from "pinia";
import { getCategoryList } from "../api/api";
import { TypeNav, category } from "../Type/index";

export const typeNavStore = defineStore("main1", {
  state: () => {
    return {
      categoryList: [
        {
          categoryChild: [
            {
              categoryChild: [
                {
                  categoryId: 0,
                  categoryName: "1",
                },
              ],
              categoryId: 0,
              categoryName: "1",
            },
          ],
          categoryId: 0,
          categoryName: "1",
        },
      ],
    };
  },
  getters: {
    //数据长度超出16
    Newdata(state) {
      state.categoryList.pop(); //删掉多出的一项
      return state.categoryList
    },   
  },
  actions: {
    //获取三级分类数据
    async getCategoryList() {
      await getCategoryList().then((res) => {       
        this.categoryList = res.data;
      });
    },
  },
});
