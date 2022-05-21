import {Button, Col, Container, Form, FormLabel, FormText, Row, Toast, ToastContainer} from "react-bootstrap";
import {useState} from "react";
import {addToCart} from "../utils/http/OrderController";
import {userController} from "../utils/http/UserController";
import {Link} from "react-router-dom";


export default function BuyGoodsForm(props) {

    const [num, setNum] = useState(1);
    const [success, setSuccess] = useState(false);
    const [bsuccess, setBsuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [bfail, setBfail] = useState(false);

    const handleAddCart = async () => {
        try {
            await addToCart({
                num,
                account: userController.getUserInfo().account,
                goodsId: props.goods.id,
                status: 0,
                orgPrice: props.goods.price*100
            });
            setSuccess(true);
        }catch (err){
            setFail(true);
        }
    };

    const handleBuyGoods = async () => {
      try {
          if(window.confirm("确认购买？")){
              await addToCart({
                  num,
                  account: userController.getUserInfo().account,
                  goodsId: props.goods.id,
                  status: 1,
                  orgPrice: props.goods.price*100
              });
              await userController.giveMoney(props.goods.account,
                  props.goods.price*100*num, null, props.goods.id);
              setBsuccess(true);
          }
      }catch (e) {
          setBfail(true);
      }
    }

    return (
       <Form>
           <Container className={"d-grid gap-2"}>
               <Row className={"mb-4"}><h3>{props.goods.title}</h3></Row>
               <Row>
                   <Col xs={2} className={"align-middle"}><FormLabel>原价</FormLabel></Col>
                   <Col xs={10}><FormText style={{textDecoration: "line-through"}}>￥{props.goods.o_price||props.goods.price}</FormText></Col>
               </Row>
               <Row>
                   <Col xs={2} className={"d-flex align-items-center align-middle"}><FormLabel>价格</FormLabel></Col>
                   <Col xs={10}>
                       <FormText style={{fontSize: "2rem", fontWeight: "bolder", color: "orange"}}>
                       ￥{props.goods.n_price||props.goods.price}
                       </FormText>
                   </Col>
               </Row>
               <Row>
                   <Col xs={2} className={"d-flex align-items-center"}><FormLabel>运费</FormLabel></Col>
                   <Col xs={10}>
                       <FormText>
                           {(props.goods.t_price?`￥${props.goods.t_price}`:"0")}
                       </FormText>
                   </Col>
               </Row>
               <Row className={"mb-3"}>
                   <Col xs={2}>数量</Col>
                   <Col xs={10}>
                       <input type={"number"} value={num}
                              onChange={(e)=>setNum(parseInt(e.target.value))} min={1} max={props.goods.volume}/>
                   </Col>
               </Row>
               <Row className={"mb-3"}>
                   <Col xs={2}>库存</Col>
                   <Col xs={10}>
                       <FormText>
                           {props.goods.volume}
                       </FormText>
                   </Col>
               </Row>
               <Row className={"mt-5"}>
                   <Col><Button variant={"outline-danger"} onClick={handleBuyGoods}>立即购买</Button></Col>
               </Row>
               <Row>
                   <Col><Button variant={"outline-info"} onClick={handleAddCart}>加入购物车</Button></Col>
               </Row>
           </Container>
           <ToastContainer position="bottom-center">
               <Toast delay={3000} autohide onClose={()=>setSuccess(false)} show={success}>
                   <Toast.Header>
                       <strong>提示</strong>
                   </Toast.Header>
                   <Toast.Body>添加成功，
                       <Link to="/cart">点击</Link>
                       查看</Toast.Body>
               </Toast>
               <Toast delay={3000} autohide onClose={()=>setFail(false)} show={fail}>
                   <Toast.Header>
                       <strong>提示</strong>
                   </Toast.Header>
                   <Toast.Body>添加失败，请稍后重试</Toast.Body>
               </Toast>
               <Toast delay={3000} autohide onClose={()=>setBsuccess(false)} show={bsuccess}>
                   <Toast.Header>
                       <strong>提示</strong>
                   </Toast.Header>
                   <Toast.Body>购买成功</Toast.Body>
               </Toast>
               <Toast delay={3000} autohide onClose={()=>setBfail(false)} show={bfail}>
                   <Toast.Header>
                       <strong>提示</strong>
                   </Toast.Header>
                   <Toast.Body>购买失败</Toast.Body>
               </Toast>
           </ToastContainer>

       </Form>
    );

}
