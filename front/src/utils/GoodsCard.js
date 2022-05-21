import {Card, CardImg} from "react-bootstrap";
import "./GoodsCard.css"
import {Link} from "react-router-dom";
import {getGoodsDetailLink} from "./http/GoodsController";
import {addAnExplore} from "./http/ExploreController";

/**
 *
 * @param props {{
 *     img: string,
 *     title: string,
 *     price: number
 * }
 * }
 * @returns {JSX.Element}
 * @constructor
 */
export default function GoodsCard(props) {

    return (
        <Link to={getGoodsDetailLink(props.id)} style={{
            color: "black",
            textDecoration: "None"
        }} onClick={()=>{
            addAnExplore(props.id);
        }}>
            <Card className={"p-2 border-0"}>
                <div className={"w-100 position-relative"} style={{height: "13rem",}}>
                    <CardImg alt={"图片无法显示"} src={props.img} className={"w-100 position-absolute"}
                    style={{
                        top: "50%",
                        transform: "translateY(-50%)",
                        // maxWidth: "100%",
                        maxHeight: "100%"
                    }}/>
                </div>

                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text className={"text-warning"}>￥{props.price}</Card.Text>
                </Card.Body>
            </Card>
        </Link>

    );
}
