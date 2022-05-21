
export {getUserInfo, isLogin, login};

let user = null;

function login(account, password) {
    user =  {
        nickName: "昵称",
        account,
        avatar: null
    };

    return user;
}

function getUserInfo() {
    /*if(user == null) user={
        nickName: "昵称",
        account: "123456",
        avatar: null
    };*/

    return user;
}

function isLogin() {
    return user !== null;
}
