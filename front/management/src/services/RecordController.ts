import axios from "axios";
import { getUrlFor} from "@/services/UrlConfig";

const fetchAllManageRecord = async(params: Domain.ManageRecord & {
                              pageSize: number;
                              current: number;
                            },
                            sort: any,
                            filter: any,) => {
  const myParams:any = {start: params.current, size: params.pageSize, ...params}
  const msg = await axios.get(getUrlFor("/record/manage",
    myParams));
  return {
    data: msg.data.result,
    success: msg.status===200,
    total: msg.data.total
  }
}

const fetchAllLoginRecord = async(params: Domain.UserLoginRecord & {
                                     pageSize: number;
                                     current: number;
                                   },
                                   sort: any,
                                   filter: any,) => {
  const myParams: any = {start: params.current, size: params.pageSize, ...params}
  const msg = await axios.get(getUrlFor("/record/user-login",
    myParams));
  return {
    data: msg.data.result,
    success: msg.status===200,
    total: msg.data.total
  }
}

const fetchLoginStatData = async () => {
  const res = await axios.get(getUrlFor("/record/user-login/stat"))
  return res.data
}


export {fetchAllManageRecord, fetchAllLoginRecord, fetchLoginStatData}

