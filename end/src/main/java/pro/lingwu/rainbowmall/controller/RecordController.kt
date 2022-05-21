package pro.lingwu.rainbowmall.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import pro.lingwu.rainbowmall.dto.db.ManagerRecord
import pro.lingwu.rainbowmall.dto.db.UserLoginRecord
import pro.lingwu.rainbowmall.service.ManagerRecordService
import pro.lingwu.rainbowmall.service.UserLoginRecordService

@Controller
@RequestMapping("/record")
class RecordController {
    @Autowired
    private lateinit var managerService: ManagerRecordService

    @Autowired
    private lateinit var userLoginService: UserLoginRecordService

    @GetMapping("/manage")
    fun getManageRecords(start: Int, size: Int, record: ManagerRecord): ResponseEntity<*>{
        return ResponseEntity.ok(managerService.findRecord(record, start, size))
    }

    @GetMapping("/user-login")
    fun getLoginRecord(start: Int, size: Int, record: UserLoginRecord): ResponseEntity<*>{
        println(record)
        return ResponseEntity.ok(userLoginService.findRecord(record, start, size))
    }

    @GetMapping("/user-login/stat")
    fun getLoginStat() = ResponseEntity.ok(userLoginService.getLoginStat())


}