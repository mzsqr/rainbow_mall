import {useRef, useState} from "react";
import {Col, Container, Overlay, Row, Toast, ToastContainer} from "react-bootstrap";
import {getGoodsDetailLink} from "./http/GoodsController";
import {rmOrder} from "./http/OrderController";
import {Link} from "react-router-dom";


/**
 *
 * @param props
 */
const CartItem = (props) => {
    const order = props.order
    const target = useRef(null)
    const [showBig, setShowBig] = useState(false)

    return (
        <>
            <Row>
                {order.status===0?
                    <Col xs={1}>
                    <input type={"checkbox"} checked={order.checked} className={"btn-outline-primary btn"}
                           onChange={(e)=>props.onChange(e.target.checked)}/>
                </Col>:""
                }

                <Col xs={2}>
                    <img src={order.goods.example} alt={"图片无法显示"} style={{width: "100%"}} ref={target}
                         onMouseEnter={()=>setShowBig(true)}
                         onMouseLeave={()=>setShowBig(false)}
                    />

                    <Overlay target={target.current} show={showBig} placement={"right"}>
                        {({ placement, arrowProps,
                              show: _show, popper, ...props }) => (
                                      <img
                                          src={order.goods.example}
                                          alt={"图片无法显示"}
                                          {...props}
                                          style={{
                                              position: 'absolute',
                                              padding: '2px 10px',
                                              color: 'white',
                                              borderRadius: 3,
                                              width: "14rem",
                                              ...props.style,
                                          }}
                                      />

                        )}
                    </Overlay>
                </Col>

                <Col xs={3}>
                    <Link to={getGoodsDetailLink(order.goods.id)}>{order.goods.title}</Link>
                </Col>

                <Col>
                    <p >￥{order.goods.price.toFixed(2)}</p>
                </Col>

                <Col>
                    <input type={"number"}  value={order.num} style={{width: "5rem"}}
                           {...(order.status===0?{onChange: (e)=>props.onNumChange(e.target.value)}:{disabled: true})}/>
                </Col>

                <Col>
                    <p >￥{(order.goods.price*order.num).toFixed(2)}</p>
                </Col>
                <Col>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    {order.status>=6?<a onClick={order.onBack}>退款</a>:""}<br />
                    {order.status===4?<a onClick={order.onBack}>收货</a>:""}<br/>
                    {order.status===0?<a onClick={order.onDelete}>删除</a>:""}<br/>
                </Col>
        </Row>
        </>

    );
}

export default CartItem