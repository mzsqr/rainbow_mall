package pro.lingwu.rainbowmall.utils

object Status {
    const val InCart = 0
    const val NotGiveMoney = 1
    const val NotOut = 2
    const val Cancel = 3
    const val Outed = 4
    const val Got = 5
    const val GiveBack = 6
    const val BackSuccess = 7

    val Actions = listOf("加入购物车", "未付款", "未发货",
        "取消付款", "发货", "收货", "退款", "退款成功")
}