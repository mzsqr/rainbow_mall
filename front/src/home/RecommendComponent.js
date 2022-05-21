import {Container} from "react-bootstrap";
import SearchGroup from "../utils/SearchGroup";
import SortsCard from "./SortsCard";
import img from "../slide.png";
import ImgCarousel from "../utils/ImgCarousel";
import LogInfoCard from "./LogInfoCard";
import RandomGoods from "../utils/RandomGoods";
import {getSomeGoods} from "../utils/http/GoodsController";
import {useEffect, useState} from "react";

const ads1 = [

    {
        link: "#",
        img,
        alt: "图片无法显示",
        mainTitle: "广告位",
        subTitle: "广告位招租，请联系：1396119095@qq.com"
    },
    {
        link: "#",
        img,
        alt: "图片无法显示",
        mainTitle: "广告位",
        subTitle: "广告位招租，请联系：1396119095@qq.com"
    },
    {
        link: "#",
        img,
        alt: "图片无法显示",
        mainTitle: "广告位",
        subTitle: "广告位招租，请联系：1396119095@qq.com"
    },
    {
        link: "#",
        img,
        alt: "图片无法显示",
        mainTitle: "广告位",
        subTitle: "广告位招租，请联系：1396119095@qq.com"
    },
]

export default function RecommendComponent(props) {

    const [goods, setGoods] = useState([]);
    const size = 600

    const fetchSomeGoods = async () => {
      getSomeGoods({start: 1, size})
          .then(res=>{
              const tmp = goods.slice(0)
              tmp.push(...res)
              setGoods(tmp)
          })
          .catch(console.log)
    }

    useEffect(()=>{
        fetchSomeGoods()
    }, []);

    return (
      <>
          <SearchGroup />
          <Container className={"d-flex mb-5"}>
              <Container style={{width: "20%"}}>
                  <SortsCard />
              </Container>
              <Container style={{width: "50%"}}>
                  <ImgCarousel imgs={ads1} />
                  <br />
                  <ImgCarousel imgs={ads1} />
              </Container>
              <Container style={{width: "35%"}}>
                  <LogInfoCard {...props}/>
              </Container>
          </Container>
          <RandomGoods goods={goods} title={"猜你喜欢"} subTitle={"个性推荐"} color={"warning"} />
      </>
    );
}
