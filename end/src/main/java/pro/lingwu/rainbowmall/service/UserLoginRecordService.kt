package pro.lingwu.rainbowmall.service

import com.github.pagehelper.PageHelper
import eu.bitwalker.useragentutils.UserAgent
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pro.lingwu.rainbowmall.dao.UserLoginRecordMapper
import pro.lingwu.rainbowmall.dto.PagesResult
import pro.lingwu.rainbowmall.dto.db.UserLoginRecord
import java.time.LocalDateTime
import javax.servlet.http.HttpServletRequest

@Service
class UserLoginRecordService {

    @Autowired
    private lateinit var mapper: UserLoginRecordMapper

    fun addRecord(request: HttpServletRequest, role: Int, account: String){
        val userAgent = UserAgent.parseUserAgentString(request.getHeader("user-agent"))
        val where = userAgent.operatingSystem.deviceType.name
        val explorer = userAgent.browser.getName()
        val IP = request.remoteAddr
        val time = LocalDateTime.now().toString()
        val os = userAgent.operatingSystem.name
        val record = UserLoginRecord(account, time, IP, os, explorer, where, role)
        mapper.addRecord(record)
    }

    fun findRecord(record: UserLoginRecord, start: Int, size: Int): PagesResult<UserLoginRecord> {
        val page = PageHelper.startPage<Int>(start, size)
        val res = PagesResult<UserLoginRecord>()
        res.result = mapper.findRecord(record)
        page.close()
        res.total = mapper.getNumOfRecord()
        return res
    }

    fun getLoginStat() = mapper.getStatForLogin()

}