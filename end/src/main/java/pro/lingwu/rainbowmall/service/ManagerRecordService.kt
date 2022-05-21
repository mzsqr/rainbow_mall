package pro.lingwu.rainbowmall.service

import com.github.pagehelper.PageHelper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pro.lingwu.rainbowmall.dao.ManagerRecordMapper
import pro.lingwu.rainbowmall.dto.PagesResult
import pro.lingwu.rainbowmall.dto.db.ManagerRecord

@Service
class ManagerRecordService {

    @Autowired
    private lateinit var mapper: ManagerRecordMapper

    fun addRecord(record: ManagerRecord) = mapper.addRecord(record)

    fun findRecord(record: ManagerRecord, start: Int, size: Int): PagesResult<ManagerRecord> {
        val page = PageHelper.startPage<Int>(start, size)
        val res = PagesResult<ManagerRecord>()
        res.result = mapper.findRecord(record)
        page.close()
        res.total = mapper.getNumOfRecord()
        return res
    }

}