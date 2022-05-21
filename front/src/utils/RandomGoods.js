import {Badge, Container} from "react-bootstrap";
import GoodsGrid from "./GoodsGrid";

/**
 *
 * @param props{{
 *     title: string,
 *     subTitle: string,
 *     color: string,
 *     goods: [{
 *         img: string,
 *         title: string,
 *         price: number,
 *         id: number
 *     }]
 * }

 * }
 * @returns {JSX.Element}
 * @constructor
 */
export default function RandomGoods(props) {


    return (
        <Container>
            <h3>{props.title}{" "}<Badge bg={props.color} className={"bg-gradient"} style={{fontSize: "1rem"}}>{props.subTitle}</Badge></h3>
            <Container>
                <GoodsGrid goods={props.goods} col={4} space={"g-1 py-3"}/>
            </Container>
        </Container>
    );
}
