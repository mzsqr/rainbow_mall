// const baseUrl = "http://localhost:8080/api/mall";
// const photoBaseUrl = "http://localhost/PUBLIC/mall/photos";
const baseUrl = "https://lingwu.pro/api/mall";
const photoBaseUrl = "http://lingwu.pro/PUBLIC/mall/photos";

const getUrlFor = (path: string, params?: any) => {
  // 处理qs
  const qs = new URLSearchParams();
  if (params){
    for (const paramsKey in params) {
      qs.append(paramsKey, params[paramsKey]);
    }
  }
  let qsStr = "";
  if (qs.toString()!=="")qsStr="?"+qs.toString();
  return baseUrl+path+qsStr;
}

const getPhotoUrl = (account: string, dir: string, name: string)=>{
  return `${photoBaseUrl}/${account}/${dir}/${name}`
}

export {getUrlFor, getPhotoUrl}
