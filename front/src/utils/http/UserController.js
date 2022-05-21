import {urlConfig} from "../config/UrlConfig";
import sha512 from "crypto-js/sha512"
import axios from "axios";
import {objToFormData} from "../utils";
import Cookies from "js-cookie";

class UserController {
    user=null;

    constructor() {
        const res = Cookies.get("currentUser");
        if (res) this.user = JSON.parse(res);
    }

    async signIn(account, password){
        const encodingPass = sha512(password).toString();
/*        const res = await needle("get",
            urlConfig.getUrlFor("/user/"+account, {password: encodingPass})
        );*/
        const res = await axios.get(urlConfig.getUrlFor("/user/"+account, {password: encodingPass}));
        if (res.status===200) {
            this.user = Object.assign({}, res.data);
            this.user.avatar = urlConfig.getAvatarUrl(this.user.account, this.user.avatar);
            Cookies.set("currentUser", JSON.stringify(this.user));
            return res.data;
        }
        else return Promise.reject("失败");
    }

    async signUp(user){
        user.password = sha512(user.password).toString();
        const res = await axios.post(urlConfig.getUrlFor("/user"),
            objToFormData(user),);
        if (res.status === 200) return res.data;
        else return Promise.reject("失败");
    }

    logOut(){
        this.user = null;
        Cookies.set("currentUser", null);
    }

    getUserInfo(){
        if (!this.user)return null;
        return Object.assign({}, this.user);
    }

    isLogin(){
        return this.user!=null;
    }

    async sendVerifyCode(account, email){
        await axios.get(urlConfig.getUrlFor("/user/code/"+account, {email}));
    }

    async giveMoney(to, much, password, gId){
        await axios.put(urlConfig.getUrlFor("/user/money/"+this.user.account,{
            from: this.user.account,
                to,
                much,
                password: this.user.password
        }), );
        await axios.put(urlConfig.getUrlFor("/order/11111",{
            account: this.user.account,
                status: 2,
                goodsId: gId
        }), );
    }
}


const userController = new UserController();

export {userController}
