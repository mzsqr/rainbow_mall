import axios from "axios";
import { getUrlFor} from "@/services/UrlConfig";
import {getUserInfo} from "@/services/UserController";
import {objToFormData, processGoods} from "@/services/utils";

const fetchAllGoods = async(params: {
                             pageSize: number;
                             current: number;
                           },
                           sort: any,
                           filter: any,) => {
  const account = (await getUserInfo()).account;
  const msg = await axios.get(getUrlFor("/goods", {start: params.current, size: params.pageSize, account}));
  msg.data.result.forEach((record: any)=>{
    processGoods(record, account);
  });
  return {
    data: msg.data.result,
    success: msg.status===200,
    total: msg.data.total
  }
}

const uploadPhotos = async (goods: FormData)=>{
  const {account} = await getUserInfo();
  goods.append("account", account);
  goods.append("eAccount", account);
  // @ts-ignore
  goods.set("price", Math.floor(goods.get("price")*100));
  await axios.post(getUrlFor("/goods"), goods);
}

const rmGoods = async (id?: string)=>{
  const {account} = await getUserInfo();
  await axios.delete(getUrlFor("/goods/"+id), {
    params: {
      eAccount: account
    }
  });
}

const rmPhotoOfGoods = async (gId: string, photo: any)=>{
  await axios.delete(getUrlFor("/photo/"+photo.id))
}

const addPhotoOfGoods = async (data: FormData) => {
  await axios.post(getUrlFor("/photo"), data);
}

const updateGoods = async (goods: Domain.Goods) => {
  const {account} = await getUserInfo()
  // @ts-ignore
  goods.price = (goods.price*100).toFixed(0)
  await axios.put(getUrlFor("/goods/"+goods.id), objToFormData(goods), {
    params: {
      eAccount: account
    }
  });
}

export {fetchAllGoods, uploadPhotos, rmGoods, rmPhotoOfGoods, addPhotoOfGoods, updateGoods};
