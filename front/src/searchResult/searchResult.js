import {useEffect, useState} from "react";
import {searchGoods} from "../utils/http/GoodsController";
import qs from "qs";
import RandomGoods from "../utils/RandomGoods";
import SearchGroup from "../utils/SearchGroup";

const SearchResult = (props) => {
    const [goodsList, setGoodsList] = useState([])

    const fetchSearchGoods = async (keywords) => {
       const res = await searchGoods(keywords).catch(console.log)
        setGoodsList(res)
    }

    useEffect(()=>{
        fetchSearchGoods(qs.parse(window.location.search.substring(1)))
    }, [])

    return (
        <>
            <SearchGroup />
            <RandomGoods goods={goodsList} title={`搜索结果(${goodsList.length}件商品)`} subTitle={""} color={"warning"} />
        </>

    );
}

export default SearchResult;