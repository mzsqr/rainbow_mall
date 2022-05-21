import {getQueryString} from "../utils";

class UrlConfig {
    // baseURL="http://localhost:8080/api/mall";
    // photoURL="http://localhost/PUBLIC/mall/photos"
    baseURL="https://lingwu.pro/api/mall";
    photoURL="https://lingwu.pro/PUBLIC/mall/photos";

    getUrlFor(path, params){
        return this.baseURL + path + "?" + getQueryString(params);
    }

    getAvatarUrl(account, name){
        return this.photoURL+"/"+account+"/avatar/"+name;
    }

    getPhotoUrl(account, dir, name){
        return this.photoURL+"/"+account+"/"+dir+"/"+name;
    }

}

const urlConfig = new UrlConfig();

export {urlConfig};