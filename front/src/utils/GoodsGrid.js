import {Col, Row} from "react-bootstrap";
import GoodsCard from "./GoodsCard";
import EndLine from "./EndLine";


/**
 *
 * @param props{
 *     {
 *         goods: [{
 *         img: string,
 *         title: string,
 *         price: number,
 *         id: string | number
 *     }],
 *     col: number,
 *     space: string
 *     }
 * }
 * @returns {JSX.Element}
 * @constructor
 */
export default function GoodsGrid(props) {

    const res = []
    const len = props.goods.length
    for (let i = 0; i < Math.ceil(len/props.col); i++) {
        const row = []
        for (let j = 0; j < props.col; j++) {
            const index = i* props.col+j;
            if(!props.goods[index]) break;
            const goods = props.goods[index];
            row.push((
                <Col key={index}>
                    <GoodsCard img={goods.imgUrl} price={goods.price} title={goods.title} id={goods.id}/>
                </Col>
            ));
        }
        res.push((
            <Row key={i} className={props.space} sm={4}>{row}</Row>
        ));
    }
    return (
        <>
            {res}
            <EndLine />
        </>
    );
}
