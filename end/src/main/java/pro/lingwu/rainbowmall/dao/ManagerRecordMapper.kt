package pro.lingwu.rainbowmall.dao

import org.apache.ibatis.annotations.Mapper
import pro.lingwu.rainbowmall.dto.db.ManagerRecord

@Mapper
interface ManagerRecordMapper {

    fun addRecord(record: ManagerRecord)

    fun findRecord(record: ManagerRecord): List<ManagerRecord>

    fun getNumOfRecord():Long

}