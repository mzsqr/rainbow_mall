import {getUserInfo} from "@/services/UserController";
import axios from "axios";
import { getUrlFor} from "@/services/UrlConfig";
import {processGoods} from "@/services/utils";


const getOrdersForBuyer = async (params: {
                             pageSize: number;
                             current: number;
                           },
                           sort: any,
                           filter: any,) => {
  const account = (await getUserInfo()).account;
  const msg = await axios.get(getUrlFor("/buyer/order", {account, start: params.current, size: params.pageSize}));
  msg.data.result.forEach((value: any)=>{
    processGoods(value.goods, account);
  });
  return {
    data: msg.data.result,
    success: msg.status===200,
    total: msg.data.total
  };
}

const outOrder = async (order: Domain.Order) => {
  const copied = Object.assign({}, order);
  copied.status = 4;
  const id = copied.id;
  delete copied.id;
  delete copied.goods;
  delete copied.orderTime;
  await axios.put(getUrlFor("/order/"+id, copied));
}

const tipGot = async (order: Domain.Order)=>{
  await axios.post(getUrlFor("/buyer/order/tip", {
    account: order.account,
    goodsId: order.goodsId
  }));
}


const fetchTodayOrderStat = async () => {
  const res = await axios.get(getUrlFor("/order/stat-today"))
  return res.data
}

const fetchOrderStat = async ()=>{
  const res = await axios.get(getUrlFor("/order/stat"))
  return res.data
}

export {getOrdersForBuyer, outOrder, tipGot, fetchOrderStat, fetchTodayOrderStat}
