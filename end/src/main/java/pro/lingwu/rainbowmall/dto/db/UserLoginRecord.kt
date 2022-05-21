package pro.lingwu.rainbowmall.dto.db

import com.fasterxml.jackson.annotation.JsonProperty

class UserLoginRecord(
    account: String?,
    var time: String?,
    ip: String?,
    var os: String?,
    var explorer: String?,
    var where: String?,
    var role: Int?
){
    var uAccount = account
        @JsonProperty("uAccount")
        get

      var IP = ip
      @JsonProperty("IP")
      get
  }
