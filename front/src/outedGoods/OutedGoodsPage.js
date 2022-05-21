import {useEffect, useState} from "react";
import {
    buyGoods,
    getCartItems,
    getCartItemsNotOut,
    getCartItemsOuted,
    rmOrder,
    updateOrder
} from "../utils/http/OrderController";
import CartItem from "../utils/CartItem";
import '../App.css'
import CSS from "bootstrap/dist/css/bootstrap.css"
import {Button, Col, Container, ListGroup, ListGroupItem, Overlay, Row, Toast, ToastContainer} from "react-bootstrap";

const OutedGoodsPage = (props) => {
    const [comms, setCommons] = useState([])
    const [selectAll, setSelectAll] = useState(comms.every(value => value.checked))
    const [show, setShow] = useState(false)

    useEffect(()=>{
        asyncGetOrder()
    }, [])

    const asyncGetOrder = () => {
        getCartItemsOuted().then(commsNew=>{
            console.log(commsNew)
            setSelectAll(commsNew.every(value => value.checked))
            setCommons(commsNew)
        }).catch(console.log)
    }

    return (
        <>
            <Container>
                <p style={{
                    fontSize: "2rem",
                    fontWeight: 1000
                }}>待发货商品（共{comms.length}件）</p>

                <div style={{borderTop: "solid 2px", width: "100%", height: "2px", marginBottom: "1rem"}} />

                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col xs={2}>
                            </Col>
                            <Col xs={3}>
                                <p>商品信息</p>
                            </Col>
                            <Col>
                                单价
                            </Col>
                            <Col>
                                个数
                            </Col>
                            <Col>
                                总计
                            </Col>
                            <Col>
                                操作
                            </Col>
                        </Row>
                    </ListGroupItem>

                    {
                        comms.map((value, index) => (
                            <ListGroupItem key={value.id}>
                                <CartItem order={value}
                                          onBack={()=>{
                                              //TODO: 退款的逻辑
                                          }}/>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>

            </Container>
            <ToastContainer position="bottom-center">
                <Toast delay={3000} autohide={true} show={show} onClose={()=>setShow(false)}>
                    <Toast.Header>
                        <stong>提示</stong>
                    </Toast.Header>
                    <Toast.Body>
                        成功删除该商品
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>

    );
}

export default OutedGoodsPage