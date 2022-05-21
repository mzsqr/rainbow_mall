import {getPhotoUrl} from "@/services/UrlConfig";

const SHA512 = require("crypto-js/sha512")

const encSHA = (message: string | undefined)=>{
  return SHA512(message).toString();
}

const objToFormData = (obj: any) => {
  const formData = new FormData();
  for (const objKey in obj) {
    if (obj instanceof Array){
      for (const item of obj[objKey]) {
        formData.append(objKey, item);
      }
    }else
      formData.append(objKey, obj[objKey]);
  }
  return formData;
}

const processGoods = (goods: any, account: string)=>{
  goods.example = getPhotoUrl(account, goods.id, goods.example);
  goods.price/=100;
  goods.photos = goods.photos.map((photo: any)=>{
    return {
      ...photo,
      url: getPhotoUrl(account, goods.id, photo.pname)
    };
  });
}

export {encSHA, objToFormData, processGoods};
