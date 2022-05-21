import axios from "axios";
import {urlConfig} from "../config/UrlConfig";
import {objToFormData} from "../utils";
import {userController} from "./UserController";
import qs from 'qs'

const addToCart = async (order) => {
  await axios.post(urlConfig.getUrlFor("/order"), objToFormData(order));
}

const getOrderNum = async ()=>{
  const msg = await axios.get(urlConfig.getUrlFor("/order-num",
      {account: userController.getUserInfo().account}));
  return msg.data;

}

const getOrderNumOuted = async ()=>{
  const msg = await axios.get(urlConfig.getUrlFor("/buyer/order/outed-num",
      {account: userController.getUserInfo().account}));
  return msg.data;
}

const getOrderNumNotOuted = async ()=>{
  const msg = await axios.get(urlConfig.getUrlFor("/buyer/order/not-out-num",
      {account: userController.getUserInfo().account}));
  return msg.data;
}

const getCartItems = async ()=>{
  const msg = await axios.get(urlConfig.getUrlFor("/order", {
    account: userController.getUserInfo().account,
    start: 0,
    size: 100
  }));
  msg.data.result.forEach(value=>{
    value.goods.example = urlConfig.getPhotoUrl(
        value.goods.account,
        value.goods.id,
        value.goods.example
    );
    value.goods.price=value.goods.price/100;
  });
  return msg.data.result;
}

const getCartItemsOuted = async ()=>{
  const msg = await axios.get(urlConfig.getUrlFor("/buyer/order/outed", {
    account: userController.getUserInfo().account,
  }));
  msg.data.forEach(value=>{
    value.goods.example = urlConfig.getPhotoUrl(
        value.goods.account,
        value.goods.id,
        value.goods.example
    );
    value.goods.price=value.goods.price/100;
  });
  return msg.data;
}

const getCartItemsNotOut = async ()=>{
  const msg = await axios.get(urlConfig.getUrlFor("/buyer/order/not-out", {
    account: userController.getUserInfo().account,
  }));
  console.log(msg)
  msg.data.forEach(value=>{
    value.goods.example = urlConfig.getPhotoUrl(
        value.goods.account,
        value.goods.id,
        value.goods.example
    );
    value.goods.price=value.goods.price/100;
  });
  return msg.data;
}

const rmOrder = async (id) => {
  await axios.delete(urlConfig.getUrlFor("/order/"+id));
}

const updateOrder = async (order) => {
  const noGoodsData = Object.assign({}, order)
  delete noGoodsData.goods
  delete noGoodsData.orderTime
  const data = objToFormData(noGoodsData)
  await axios.put(urlConfig.getUrlFor("/order/"+order.id), data)
}

const rmOrderWithEle = async (ev)=>{
  ev.preventDefault();
  await rmOrder(ev.target.data.id);
  /*showToast({
    title: "提示",
    tips: "删除成功",
    msg: "商品删除成功"
  });*/
}

const buyGoods = async (goodsList) => {
  console.log(JSON.stringify(goodsList))
  await axios.put(urlConfig.getUrlFor("/order/buy/"+userController.getUserInfo().account),
      JSON.stringify(goodsList), {headers: {'Content-Type': 'application/json'}})
}


export {addToCart, getOrderNum, rmOrder,
  getCartItems, rmOrderWithEle, updateOrder,
  buyGoods, getCartItemsOuted, getCartItemsNotOut,
    getOrderNumOuted, getOrderNumNotOuted
}