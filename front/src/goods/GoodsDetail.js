import {useParams} from "react-router-dom"
import {Col, Container, Placeholder, Row} from "react-bootstrap";
import ImgCarousel from "../utils/ImgCarousel";
import {useEffect, useState} from "react";
import "./GoodsDetail.css"
import BuyGoodsForm from "./BuyGoodsForm";
import RainbowPhotoSwipe from "../utils/RainbowPhotoSwipe";
import {getGoodsDetail} from "../utils/http/GoodsController";

export default function GoodsDetail(props) {

    let { goods_id } = useParams();
    const [goods, setGoods] = useState(null);
    useEffect (()=>{
        getGoodsDetail(goods_id)
            .then((res)=>{
                setGoods(res);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [goods_id]);

    const [which, setWhich] = useState(0);

    let smallIcon, detailImgs, photos, items;

    if(goods){
        smallIcon = goods.photos.map((v,i)=>{
            return (
                <img key={i} alt={"图片无法显示"} src={v.imgUrl} className={"goods-detail-img-i"}
                     style={{width: "4rem", height: "4rem"}} onClick={()=>setWhich(i)} onMouseOver={()=>setWhich(i)}/>
            );
        });

        detailImgs = goods.photos.map((v, i)=>{
            return (
                <img key={i} alt={"图片无法显示"} src={v.imgUrl} style={{maxWidth: "80%"}}/>
            );
        });

        photos = goods.photos.map(v=>{
            return {
                src: v.imgUrl,
                ...getImgSize(v.imgUrl)
            }
        });

        items = goods.photos.map((v,i)=>{
            return {
                img: v.imgUrl,
                alt: "图片无法显示",
            }
        });
    }


    let carousel = <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder>
    if (goods){
        carousel = (
            <>
                <ImgCarousel imgs={items} activeIndex={which}
                             style={{height: "25rem"}} controls={false} indicators={true}
                             onClick={handleClickCarousel}/>
                <Container className={"d-flex justify-content-center mt-3"}>
                    {smallIcon}
                </Container>
            </>
        );
    }

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    return (
      <Container>
          <Row className={"g-2"} style={{marginBottom: "5rem"}}>
              <Col>
                  {carousel}
              </Col>
              <Col>
                  {goods && <BuyGoodsForm goods={goods}/>}
              </Col>
          </Row>
          <div className={"w-100 border border-1 mb-3"} />
          <p style={{fontSize: "2rem",fontWeight: "bold"}}>商品详情</p>
          <Container>
              <Col>
                  {goods&&<p>{goods.description}</p>}
                  {detailImgs}
              </Col>
          </Container>
          {goods && <RainbowPhotoSwipe isOpen={open} items={photos} index={index} onClose={() => setOpen(false)}/>}
      </Container>
    );

    function handleClickCarousel(i) {
        setOpen(true);
        setIndex(i);
    }
}


function getImgSize(src) {
    const img = new Image();
    img.src = src;
    return{
        w: img.width,
        h: img.height
    };
}


