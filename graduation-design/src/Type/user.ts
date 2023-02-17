//用户信息
export interface userInfo {
  code: string;
  token: string; //储存token
  userInfo: { name: string; nickName: string; token: string; userId: number }; //用户信息
  addressInfo: addressInfo[];//地址信息
  orderInfo: any[];
  totalAmount: string;
  tradeNo: string;
  myOrder: {};
  orderDetailList: {};
}
//地址信息
interface addressInfo {
  consignee: string;
  fullAddress: string;
  id: number;
  isDefault: string;
  phoneNum: string;
  provinceId: number;
  regionId: number;
  userAddress: string;
  userId: number;
}

