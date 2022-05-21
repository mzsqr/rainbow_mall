package pro.lingwu.rainbowmall.service.impl;

import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import pro.lingwu.rainbowmall.dao.ExploreMapper;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Explore;
import pro.lingwu.rainbowmall.service.ExploreService;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@Service
public class ExploreServiceImpl implements ExploreService {
    private final ExploreMapper exploreMapper;

    public ExploreServiceImpl(ExploreMapper exploreMapper) {
        this.exploreMapper = exploreMapper;
    }

    @Override
    public void addExplore(Explore explore) {
        explore.setExDate(new Timestamp(System.currentTimeMillis()));
        exploreMapper.addExploreRecord(explore);
    }

    @Override
    public PagesResult<Explore> getExplores(String nickname, String title, int start, int size) {
        var page = PageHelper.startPage(start, size);
        var res = new PagesResult<Explore>();
        res.setResult( exploreMapper.getOrdersBy(nickname, title, null));
        page.close();
        res.setTotal(exploreMapper.getTotalBy(nickname, title, null));
        return res;
    }
}
