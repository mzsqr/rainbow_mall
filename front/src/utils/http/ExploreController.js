import axios from "axios";
import {urlConfig} from "../config/UrlConfig";
import {userController} from "./UserController";
import {objToFormData} from "../utils";

const addAnExplore =  (gId) => {
    const user = userController.getUserInfo();
    let account = "unknown";
    if (user) account=user.account;
    const data ={
        account: account,
        gId
    };
   axios.post(urlConfig.getUrlFor("/explore"), objToFormData(data));
}
export {addAnExplore}

