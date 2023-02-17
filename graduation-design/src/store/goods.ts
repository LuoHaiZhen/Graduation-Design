import { defineStore, storeToRefs } from "pinia";
import {
  getSearchInfo,
  getGoodsInfo,
  reqAddOrUpdateShopCart,
} from "../api/api";
/* interface searchList
  {
    attrsList: [
      {
        attrId:number;
        attrValueList:Array<any>,
        attrName: string,
      },
    ],
    goodsList: [
      {
        attrs: string,
        category1Id: number,
        category1Name: string,
        category2Id: number,
        category2Name: string,
        category3Id: number,
        category3Name: string,
        createTime: string,
        defaultImg: string,
        hotScore: number,
        id: number,
        price: number,
        title: string,
        tmId: number,
        tmName: string,
      },
    ],
    pageNo: number,
    pageSize: number,
    total: number,
    totalPages: number,
    trademarkList: [{ tmId: number, tmName: string }],
  } */
interface attrInfo {
  [index: number]: {
    saleAttrName: string;
    saleAttrValueName: string;
  };
}

/* interface goodsData{
  searchList
  goodInfo
  currentIndex:number,
  info:
}

type searchList={
  {
    attrsList:attrsList[],
    goodsList: [
      {
        attrs: "",
        category1Id: 0,
        category1Name: "",
        category2Id: 0,
        category2Name: "",
        category3Id: 0,
        category3Name: "",
        createTime: "",
        defaultImg: "",
        hotScore: 0,
        id: 0,
        price: 0,
        title: "",
        tmId: 0,
        tmName: "",
      },
    ],
    pageNo: number,
    pageSize: number,
    total: number,
    totalPages: number,
    trademarkList: [{ tmId: number, tmName:string }],
  },
}[]
type attrsList={
        attrId: number,
        attrValueList: [],
        attrName: string,
} */
/*  searchList: [
        {
          attrsList: [
            {
              attrId: 0,
              attrValueList: [],
              attrName: "",
            },
          ],
          goodsList: [
            {
              attrs: "",
              category1Id: 0,
              category1Name: "",
              category2Id: 0,
              category2Name: "",
              category3Id: 0,
              category3Name: "",
              createTime: "",
              defaultImg: "",
              hotScore: 0,
              id: 0,
              price: 0,
              title: "",
              tmId: 0,
              tmName: "",
            },
          ],
          pageNo: 0,
          pageSize: 0,
          total: 0,
          totalPages: 0,
          trademarkList: [{ tmId: 0, tmName: "" }],
        },
      ],
      goodInfo: {
        categoryView: {
          category1Id: 2,
          category1Name: "",
          category2Id: 0,
          category2Name: "",
          category3Id: 0,
          category3Name: "",
          id: 0,
        },

        price: 0,
        skuInfo: {
          category3Id: 0,
          createTime: "",
          id: 0,
          isSale: 0,
          price: 0,
          skuAttrValueList: [],
          skuDefaultImg: "",
          skuDesc: "",
          skuImageList: [
            {
              id: 0,
              imgName: "",
              imgUrl: "",
              isDefault: "",
              skuId: 0,
              spuImgId: 0,
            },
          ],
          skuName: "",
          skuSaleAttrValueList: [
            {
              saleAttrName: "",
              saleAttrValueName: "",
            },
            {
              saleAttrName: "",
              saleAttrValueName: "",
            },
          ],
          spuId: 0,
          tmId: 0,
          weight: "",
        },
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
      currentIndex: 0,
      info: [
        {
          saleAttrName: "",
          saleAttrValueName: "",
        },
      ], */
export const goodsStore = defineStore("goods", {
  state: () => {
    return {
      searchList: [
        {
          attrsList: [
            {
              attrId: 0,
              attrValueList: [],
              attrName: "",
            },
          ],
          goodsList: [
            {
              attrs: "",
              category1Id: 0,
              category1Name: "",
              category2Id: 0,
              category2Name: "",
              category3Id: 0,
              category3Name: "",
              createTime: "",
              defaultImg: "",
              hotScore: 0,
              id: 0,
              price: 0,
              title: "",
              tmId: 0,
              tmName: "",
            },
          ],
          pageNo: 0,
          pageSize: 0,
          total: 0,
          totalPages: 0,
          trademarkList: [{ tmId: 0, tmName: "" }],
        },
      ],
      goodInfo: {
        categoryView: {
          category1Id: 2,
          category1Name: "",
          category2Id: 0,
          category2Name: "",
          category3Id: 0,
          category3Name: "",
          id: 0,
        },

        price: 0,
        skuInfo: {
          category3Id: 0,
          createTime: "",
          id: 0,
          isSale: 0,
          price: 0,
          skuAttrValueList: [],
          skuDefaultImg: "",
          skuDesc: "",
          skuImageList: [
            {
              id: 0,
              imgName: "",
              imgUrl: "",
              isDefault: "",
              skuId: 0,
              spuImgId: 0,
            },
          ],
          skuName: "",
          skuSaleAttrValueList: [
            {
              saleAttrName: "",
              saleAttrValueName: "",
            },
            {
              saleAttrName: "",
              saleAttrValueName: "",
            },
          ],
          spuId: 0,
          tmId: 0,
          weight: "",
        },
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
      currentIndex: 0,
      info: [
        {
          saleAttrName: "",
          saleAttrValueName: "",
        },
      ],
      /* goodInfo:Object
categoryView:Object
category1Id:2
category1Name:"手机"
category2Id:13
category2Name:"手机通讯"
category3Id:61
category3Name:"手机"
id:61
price:8197
skuInfo:Object
spuSaleAttrList:Array[2]
valuesSkuJson:"{"11| */
    };
  },
  getters: {
    goodsList(state) {
      return state.searchList["goodsList"];
    },
    trademarkList(state) {
      return state.searchList["trademarkList"];
    },
    attrsList(state) {
      return state.searchList["attrsList"];
    },
    total(state) {
      return state.searchList["total"];
    },

    //简化skuinfo
    skuInfo(state) {
      return state.goodInfo["skuInfo"];
    },
    categoryView(state) {
      return state.goodInfo["categoryView"];
    },
    spuSaleAttrList(state) {
      return state.goodInfo["spuSaleAttrList"];
    },
    skuImageList(state) {
      return state.goodInfo.skuInfo.skuImageList;
    },
  },
  actions: {
    //获取搜索模块数据
    async getSearchInfo(params = {}) {
      await getSearchInfo(params).then((res) => {
        this.searchList = res.data;
      });
    },
    //获取商品详情
    async getGoodsInfo(skuId) {
      await getGoodsInfo(skuId).then((res) => {
        this.goodInfo = res.data;
      });
    },
    //加入购物车
    async addShopCar(skuId, skuNum) {
      console.log("addShopCar");
      
      await reqAddOrUpdateShopCart(skuId, skuNum).then((res: any) => {
        if (res.code == 200) {
          return "ok";
        }
      });
    },
  },
});
