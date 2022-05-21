package pro.lingwu.rainbowmall.data

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import pro.lingwu.rainbowmall.dao.*
import pro.lingwu.rainbowmall.dto.db.Goods
import pro.lingwu.rainbowmall.dto.db.ManagerRecord
import pro.lingwu.rainbowmall.dto.db.Photo
import pro.lingwu.rainbowmall.dto.db.User
import pro.lingwu.rainbowmall.utils.FileUtils
import java.sql.Date
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

@Component
class DataGenerator(
    val cartMapper: CartMapper,
    val exploreMapper: ExploreMapper,
    val goodsMapper: GoodsMapper,
    val managerRecordMapper: ManagerRecordMapper,
    val orderMapper: OrderMapper,
    val photoMapper: PhotoMapper,
    val userLoginRecordMapper: UserLoginRecordMapper,
    val userManageRecordMapper: UserManageRecordMapper,
    val userMapper: UserMapper,
    val fileUtils: FileUtils
) : CommandLineRunner {

    val logger: Logger = LoggerFactory.getLogger(DataGenerator::class.java)
    private val sellers = mutableListOf<User>()

    // 生成用户数据-普通用户
    fun generateUserData() {
        for (i in 1..10000) {
            try {
                val start = (Math.random() * 10).toInt()
                val len = (Math.random() * 5 + 10).toInt()
                val user = User(
                    UUID.randomUUID().toString()
                        .replace("-", "")
                        .substring(start..(start + len)),
                    // 1234567890p
                    "f036a7200c6dadcfe3f9adbc25d5a8dc96e31a41186ea2c0ff45b5a65faaea2e241fe37a227eefd2d85909a6867aadedbf7a32986f03672f7860b31ff6b77870",
                    "nickname",
                    null,
                    "123456789@email.com",
                    0,
                    Date.valueOf(
                        LocalDate.of(
                            (2001..2019).random(),
                            (1..12).random(),
                            (1..28).random()
                        )
                    ),
                    null,
                    null,
                    0
                )
                val filename = fileUtils.storePhoto("/" + user.account + "/avatar", null)
                user.avatar = filename
                userMapper.addUser(user)
            } catch (e: java.lang.Exception) {
                e.printStackTrace()
            }
        }

        logger.info("----------CREATE Normal User Data Successfully----------")
    }

    // 生成用户数据-销售者和管理员
    fun generateSellerData() {
        val admin = User(
            "1396119095118421",
            // yxpbsqq7
            "f7fa8954ad1817d70f506c3b2f70f69b70c6d05b672713e1883eff70e5d050e65958bcc58556cf81de72299704eefa7bc34a953f2e391a95c8ebf4f39ae0faf4",
            "lingwu",
            "19924685920",
            "1396119095@qq.com",
            2,
            Date.valueOf(LocalDate.of(2000, 10, 2)),
            null,
            null,
            0
        )
        admin.avatar = fileUtils.storePhoto("/" + admin.account + "/avatar", null)
        userMapper.addUser(admin)
        sellers.add(admin)
        for (i in 1..1000) {
            try {
                val user = User(
                    UUID.randomUUID().toString()
                        .replace("-", "")
                        .substring(0..14),
                    "f036a7200c6dadcfe3f9adbc25d5a8dc96e31a41186ea2c0ff45b5a65faaea2e241fe37a227eefd2d85909a6867aadedbf7a32986f03672f7860b31ff6b77870",
                    "nickname", null,
                    "123456789@email.com", 1,
                    Date.valueOf(
                        LocalDate.of(
                            (2001..2019).random(),
                            (1..12).random(),
                            (1..28).random()
                        )
                    ), null, null, 0
                )
                val filename = fileUtils.storePhoto("/" + user.account + "/avatar", null)
                user.avatar = filename
                userMapper.addUser(user)
                sellers.add(user)
            } catch (e: java.lang.Exception) {
                e.printStackTrace()
            }
        }

        logger.info("----------CREATE Seller User And Admin Data Successfully----------")
    }

    // 生成商品数据
    fun generateGoodsData() {
        val categories = listOf(
            "女装", "内衣", "家居", "女鞋",
            "男鞋", "箱包", "母婴", "童装", "玩具",
            "男装", "运动户外", "美妆", "彩妆", "个护",
            "手机", "数码", "企业", "大家电",
            "生活电器", "零食", "生鲜", "茶酒",
            "厨具", "收纳", "清洁", "家纺", "家饰",
            "图书", "音像", "文具", "医药保健",
            "进口", "汽车", "二手车", "用品", "房产",
            "装修家居", "建材", "手表", "眼镜", "珠宝饰品"
        )


        for (j in 1..30000) {
            try {
                val id = UUID.randomUUID().toString().replace("-", "")
                val account = sellers.random().account
                val goods = Goods(
                    id, (99..9999).random(), (444..5555).random(), account,
                    "这是一件非常神奇的商品，至于到底是什么，我也不知道",
                    "神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品，神奇的商品！",
                    null,
                    Date.valueOf(
                        LocalDate.of(
                            (2001..2019).random(),
                            (1..12).random(),
                            (1..28).random()
                        )
                    ), null, 0, "${categories.random()};${categories.random()};${categories.random()};"
                )

                val photos = mutableListOf<Photo>()
                for (i in 0..(2..5).random()) {
                    val photo = Photo()
                    photo.gId = id
                    photo.pname = fileUtils.storeGoodsPhotoTest("/" + goods.account + "/" + goods.id)
                    photos.add(photo)
                }
                goods.example = photos[0].pname
                goodsMapper.addGoods(goods)
                for (item in photos) photoMapper.addPhoto(item)
                val record = ManagerRecord(account, id, LocalDateTime.now().toString(), "添加商品", null)
                managerRecordMapper.addRecord(record)
            } catch (e: java.lang.Exception) {
                e.printStackTrace()
            }
        }


        logger.info("----------CREATE Goods Data Successfully----------")

    }

    override fun run(vararg args: String?) {

        /*// 生成用户数据
        generateSellerData()
        generateUserData()

        // 生成商品数据
        generateGoodsData()*/

    }

}