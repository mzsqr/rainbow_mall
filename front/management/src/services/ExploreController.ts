import axios from "axios";
import {getUrlFor} from "@/services/UrlConfig";
import {processGoods} from "@/services/utils";

const getExplores = async(params: {
                            pageSize: number;
                            current: number;
                          } & any,
                          sort: any,
                          filter: any,) => {
  const params1:any = {start: params.current, size: params.pageSize};
  if (params.user) params1.nickname = params.user;
  if (params.title) params1.title=params.goods;
  const msg = await axios.get(getUrlFor("/explore", params1));
  if (msg.data.result){
    msg.data.result.forEach((value: any)=>{
      processGoods(value.goods, value.account);
    });
  }
  return {
    data: msg.data.result,
    success: msg.status===200,
    total: msg.data.total
  }
}

export {getExplores}
