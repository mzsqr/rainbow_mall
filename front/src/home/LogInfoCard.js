import {Card, Container} from "react-bootstrap";
import slide from "../slide.png";
import NotifyLine from "../utils/NotifyLine";
import FuncLine from "./FuncLine";
import AvatarPlaceholder from "./AvatarPlaceholder";
import {useState} from "react";
import {
    getCartItemsNotOut,
    getCartItemsOuted,
    getOrderNum,
    getOrderNumNotOuted,
    getOrderNumOuted
} from "../utils/http/OrderController";
import {userController} from "../utils/http/UserController";
import {useNavigate} from "react-router";

const items=[
    {num: 0,name: "购物车"},
    {num: 0,name: "待收货"},
    {num: 0,name: "待发货"},
    {num: 0,name: "待付款"},
    {num: 0,name: "待评价"},
]

function StateLine(props) {
    const [cartNum, setCartNum] = useState(-1);
    const [outNum, setOutNum] = useState(-1);
    const [notOutNum, setNotOutNum] = useState(-1);
    const navigate = useNavigate();

    if (userController.isLogin()){
        getOrderNum()
            .then(setCartNum);
        getOrderNumNotOuted().then(setNotOutNum)
        getOrderNumOuted().then(setOutNum)
    }

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Container className={"d-flex justify-content-between"}>
            <a href={"/mall/app/cart"} key={99} onClick={(event)=>{
                event.preventDefault();
                if (userController.isLogin())
                    navigate("/cart");
                else navigate("/?signIn=true")
            }}>
                {cartNum===-1?0:cartNum}<br />
                {props.items[0].name}
            </a>
            <a href={"/mall/app/outed-goods"} key={99} onClick={(event)=>{
                event.preventDefault();
                if (userController.isLogin())
                    navigate("/outed-goods");
                else navigate("/?signIn=true")
            }}>
                {outNum===-1?0:outNum}<br />
                {props.items[1].name}
            </a>
            <a href={"/mall/app/not-out-goods"} key={99} onClick={(event)=>{
                event.preventDefault();
                if (userController.isLogin())
                    navigate("/not-out-goods");
                else navigate("/?signIn=true")
            }}>
                {notOutNum===-1?0:notOutNum}<br />
                {props.items[2].name}
            </a>
            <a href={"/mall/app/cart"} key={99} onClick={(event)=>{
                event.preventDefault();
                if (userController.isLogin())
                    navigate("/cart");
                else navigate("/?signIn=true")
            }}>
                {cartNum===-1?0:cartNum}<br />
                {props.items[3].name}
            </a>
            <a href={"/mall/app/cart"} key={99} onClick={(event)=>{
                event.preventDefault();
                if (userController.isLogin())
                    navigate("/cart");
                else navigate("/?signIn=true")
            }}>
                {cartNum===-1?0:cartNum}<br />
                {props.items[4].name}
            </a>

        </Container>
    );
}

export default function LogInfoCard(props) {

    let avatar = <AvatarPlaceholder width={40} height={40} />;
    if (props.avatar){
        avatar = <img src={props.avatar} height={40} width={40} alt={"图片无法显示"} className={"rounded-circle"}/>
    }

    return (
        <Card className={"bg-light border-0"}>
            <Card.Body className={"d-grid gap-3"}>
                <Container className={"text-center"}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href={"#"}>
                        {avatar}
                        <br />
                        {props.nickname?props.nickname:"昵称"}
                    </a>
                    <StateLine items={items}/>
                </Container>

                <img src={slide} style={{borderRadius: "1rem", width: "100%"}} alt={"图片无法显示"} />
                <Card.Title>公告{" "}<span style={{fontSize: "1rem"}}>新鲜事都在这</span></Card.Title>
                <Card.Body>
                    {
                        new Array(3).fill(<NotifyLine title={"某个引入注目的公告"} /> )
                    }
                </Card.Body>
            </Card.Body>
            <Card.Footer style={{padding: "1rem 0"}}>
                <FuncLine />
            </Card.Footer>
        </Card>
    );
}
