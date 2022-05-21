import {useEffect, useState} from "react";
import {buyGoods, getCartItems, rmOrder, updateOrder} from "../utils/http/OrderController";
import CartItem from "../utils/CartItem";
import '../App.css'
import {
    Button,
    Col,
    Container,
    FormControl,
    ListGroup,
    ListGroupItem,
    Overlay,
    Row,
    Toast,
    ToastContainer
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import location from "../data/pca.json"
import {Cascader} from "antd";
import 'antd/dist/antd.css';
import 'react-bootstrap/dist/react-bootstrap.min'

const CartPage = (props) => {
    const [comms, setCommons] = useState([])
    const [selectAll, setSelectAll] = useState(comms.every(value => value.checked))
    const [show, setShow] = useState(false)
    const [buyModal, setBuyModal] = useState(false)
    const [address, setAddress] = useState([])
    const [detail, setDetail] = useState("")

    useEffect(()=>{
        asyncGetOrder()
    }, [])

    const asyncGetOrder = () => {
        getCartItems().then(commsNew=>{
            setSelectAll(commsNew.every(value => value.checked))
            setCommons(commsNew)
        }).catch(console.log)
    }

    const generateLocationOptions = () => {
        const options = [];
        for (const locationKey in location) {
            const c1 = [];
            for (const c1Key in location[locationKey]) {
                const c2 = [];
                for (const ele of location[locationKey][c1Key]) {
                    c2.push({
                        label: ele,
                        value: ele
                    });
                }
                c1.push({
                    label: c1Key,
                    value: c1Key,
                    children: c2
                });
            }
            options.push({
                label: locationKey,
                value: locationKey,
                children: c1
            });
        }
        console.log(options)
        return options;
    }

    return (
        <>
            <Container>
                <p style={{
                    fontSize: "2rem",
                    fontWeight: 1000
                }}>购物车（共{comms.length}件）</p>

                <div style={{borderTop: "solid 2px", width: "100%", height: "2px", marginBottom: "1rem"}} />

            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col xs={1}>
                            <input type={"checkbox"} checked={selectAll} className={"btn-outline-primary btn"}
                                   onChange={(e)=>{
                                       const tmp = comms.slice(0)
                                       const changeState = tmp.some(value => !value.checked)
                                       for (let i = 0; i < tmp.length; i++) {
                                           tmp[i].checked = changeState
                                           tmp[i] = Object.assign({}, tmp[i])
                                       }
                                       setSelectAll(changeState)
                                       setCommons(tmp)
                                   }}
                            />
                        </Col>

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
                            <CartItem order={value} onChange={(state)=>{
                                const commTmp = comms.slice(0)
                                commTmp[index].checked = state
                                setCommons(commTmp)
                                setSelectAll(commTmp.every(value => value.checked))
                                updateOrder(commTmp[index])
                            }} onNumChange={(num)=> {
                                console.log(num)
                                const commTmp = comms.slice(0)
                                commTmp[index].num = num
                                setCommons(commTmp)
                                updateOrder(commTmp[index])
                            }} onDelete={()=>{
                                rmOrder(value.id).then(()=>{
                                    setShow(true)
                                    const tmp = comms.slice(0)
                                    delete tmp[tmp.findIndex(v=>v.id===value.id)]
                                    setCommons(tmp)
                                })
                            }}/>
                        </ListGroupItem>
                    ))
                }
            </ListGroup>

        </Container>
            <div style={{
            position: "sticky",
            top: 0,
            display: 'flex',
            justifyContent: 'end',
            fontSize: "1.2rem",
            alignItems: 'center',
            borderTop: 'solid grey 2px'
        }} className={"mt-2"}>
            <p style={{margin: "0 2rem"}}>已选商品 <span style={{fontSize: "1.5rem", color: "orange"}}>{comms.reduce((prev, curr)=>{
                if (curr.checked) return prev+1
                else return prev
            }, 0)}</span> 件</p>

            <p style={{margin: "0 2rem"}}>合计： <span style={{fontSize: "1.5rem", color: "orange"}}>{comms.reduce((prev, curr)=>{
                if (curr.checked)return prev+curr.goods.price*curr.num
                else return prev
            }, 0).toFixed(2)}</span>元</p>

            <Button className={"btn-warning mt-1 btn"} style={{height: "3rem", width: "6rem", borderRadius: "1.5rem"}}
            onClick={()=>{
                /*const goodsList = comms.filter(value => value.checked)
                buyGoods(goodsList).then(()=>{
                    alert("下单成功")
                }).catch(err=>{
                    console.log(err)
                    alert("下单失败，请重试")
                })*/
                setBuyModal(true)
            }}>结算</Button>
        </div>
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

            <Modal.Dialog {...(buyModal?{}: {"hidden": "true"})} onHide={()=>setBuyModal(false)} backdrop={"static"} centered>
                    <Modal.Header>
                        <Modal.Title>选择地址</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Cascader options={generateLocationOptions()} placeholder={"请选择收货地址"}
                                  value={address}
                                  onChange={(value)=>{
                                      setAddress(value)
                                  }}/>
                        <FormControl type={"text"} placeholder={"请输入详细地址"} className={"mt-2"}
                                     value={detail}
                                     onChange={e=>setDetail(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setBuyModal(false)}>取消</Button>
                        <Button variant="primary" onClick={()=>{
                            const goodsList = comms.filter(value => value.checked)
                            if (address.length<3) {
                                alert("尚未选择地址");
                                return;
                            }
                            if (detail.length === 0){
                                alert("请填写详细地址");
                                return;
                            }
                            const addr = `${address[0]} ${address[1]} ${address[2]} ${detail}`
                            goodsList.forEach(value => value.address = addr)
                            buyGoods(goodsList).then(()=>{
                                alert("下单成功")
                                asyncGetOrder()
                            }).catch(err=>{
                                console.log(err)
                                alert("下单失败，请重试")
                            });
                            setBuyModal(false)
                        }}>确认购买</Button>
                    </Modal.Footer>
            </Modal.Dialog>
        </>

    );
}

export default CartPage