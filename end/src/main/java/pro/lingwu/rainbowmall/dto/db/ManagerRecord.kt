package pro.lingwu.rainbowmall.dto.db

import com.fasterxml.jackson.annotation.JsonProperty


class ManagerRecord(
    account: String?,
    gid: String?,
    var time: String?,
    var detail: String?,
    var remark: String?,
    uid: String? = null
){
    var eAccount = account
    @JsonProperty("eAccount")
    get

    var gId = gid
    @JsonProperty("gId")
    get

    var uId = uid
    @JsonProperty("uId")
    get
}
