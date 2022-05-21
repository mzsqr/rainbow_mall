package pro.lingwu.rainbowmall.dao

import org.apache.ibatis.annotations.Mapper
import pro.lingwu.rainbowmall.dto.db.Stat
import pro.lingwu.rainbowmall.dto.db.UserLoginRecord

@Mapper
interface UserLoginRecordMapper {

    fun addRecord(record: UserLoginRecord)

    fun findRecord(record: UserLoginRecord): List<UserLoginRecord>

    fun getNumOfRecord(): Long

    fun getStatForLogin(): List<Stat>

}