package pro.lingwu.rainbowmall.dao

import org.apache.ibatis.annotations.Mapper
import pro.lingwu.rainbowmall.dto.db.UserMangeRecord

@Mapper
interface UserManageRecordMapper {

    fun addRecord(record: UserMangeRecord)

    fun getRecords(record: UserMangeRecord): List<UserMangeRecord>

}