import {getPhotoUrl, getUrlFor} from "@/services/UrlConfig";
import {encSHA, objToFormData} from "@/services/utils";
import axios from "axios";
// @ts-ignore
import Cookies from 'js-cookie'

let user: any = null;

const signIn = async (account: string | undefined, password: string | undefined) => {
  const res = await axios.get(getUrlFor("/admin/"+account,
    {password: encSHA(password)}));
  user = res.data;
  user.avatar = getPhotoUrl(user.account, "avatar", user.avatar);
  Cookies.set("currentAdmin", JSON.stringify(user));
  return res;
}

const getUserInfo = async ()=>{
  if (!!user)
    return user;
  let _user = Cookies.get("currentAdmin");
  if (_user){
    user = JSON.parse(_user);
    await signIn(user.account, user.password).catch(console.log)
    return user;
  }
  return undefined;
}

const outLogin = () => {
  Cookies.set("currentAdmin", "");
  user = null;
}

const fetchTodayUserStat = async () => {
  const res = await axios.get(getUrlFor("/user/stat-today"))
  return res.data
}

const fetchUserStat = async ()=>{
  const res = await axios.get(getUrlFor("/user/stat"))
  return res.data
}

const fetchSeller = async (params: {
                             pageSize: number;
                             current: number;
                           },
                           sort: any,
                           filter: any,) => {
  const msg = await axios.get(getUrlFor("/user",{start: params.current, size: params.pageSize}));
  return {
    data: msg.data.result,
    success: msg.status===200,
    total: msg.data.total
  }
}

const updateSeller = async (user: Domain.User) => {
  user.password = encSHA(user.password)
  await axios.put(getUrlFor("/user/"+user.account), objToFormData(user))
}

const addUser = async (user: Domain.User) => {
  user.password = encSHA(user.password)
  await axios.post(getUrlFor("/admin/user"), objToFormData(user))
}

const rmUser = async (account?: string) => {
  await axios.delete(getUrlFor("/user/"+account))
}


export {signIn, getUserInfo, outLogin,fetchTodayUserStat, addUser, fetchUserStat, fetchSeller, updateSeller, rmUser}
