package pro.lingwu.rainbowmall.service;

import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Explore;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
public interface ExploreService {

    void addExplore(Explore explore);

    PagesResult<Explore> getExplores(String nickname, String title, int start, int size);
}
