import axios from "axios";
import {urlConfig} from "../config/UrlConfig";
import qs from "qs";

const getSomeGoods = async (params) => {
  const msg = await axios.get(urlConfig.getUrlFor("/client/goods", params));
  msg.data.forEach(value=>{
    value.price/=100;
  });
  return msg.data.map(value=>{
    return {
      ...value,
      imgUrl: urlConfig.getPhotoUrl(value.account, value.id, value.example)
    }
  });
}

const getGoodsDetail = async (id) => {
  const msg = await axios.get(urlConfig.getUrlFor("/goods/"+id));
  msg.data.photos = msg.data.photos.map(value => {
    return {
      ...value,
      imgUrl: urlConfig.getPhotoUrl(msg.data.account, msg.data.id, value.pname)
    }
  });
  msg.data.price = msg.data.price/100;
  return {
    ...msg.data,
    imgUrl: urlConfig.getPhotoUrl(msg.data.account, msg.data.id, msg.data.example),
  }
}

const getGoodsDetailLink = (id) => {
  return `/goods/${id}`;
}

const searchGoods = async (keywords) => {
  const msg = await axios.get(urlConfig.getUrlFor("/client/search", keywords))
  msg.data.forEach(value=>{
    value.price/=100;
  });
  return msg.data.map(value=>{
    return {
      ...value,
      imgUrl: urlConfig.getPhotoUrl(value.account, value.id, value.example)
    }
  });
}

export {getSomeGoods, getGoodsDetail, getGoodsDetailLink, searchGoods}