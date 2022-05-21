import {
    Button,
    Container, Modal, ModalBody, ModalFooter, ModalTitle,
    Nav,
    Navbar,
} from "react-bootstrap";
import Favicon from "./Favicon";
import {useState} from "react";
import LoginModal from "./LoginModal";
import {useSearchParams} from "react-router-dom";
import {userController} from "./http/UserController";
import ModalHeader from "react-bootstrap/ModalHeader";
import {useNavigate} from "react-router";

export default function AppBar(props) {

    const [show, setShow] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const [logOut, setLogOut] = useState(false);

    const navigate = useNavigate();

    if (searchParams.getAll("signIn")[0]==="true" && !show) setShow(true);

    const handleLogOut = () => {
        setLogOut(true);
    }

    return (
        <>
            <Container fluid style={{padding: 0}}  className={"mb-3 sticky-top"} >
                <Navbar bg={"light"} variant={"light"} style={{
                    backgroundColor: "#EEE9E9"
                }} className={"shadow"}>
                    <Navbar.Brand href={"/mall/app"}>
                        <Favicon width={40} height={40}/>
                        {" "}
                        Rainbow Mall
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className={"position-absolute end-0"}>
                        <Nav.Item>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            你好，<a onClick={userController.isLogin()?handleLogOut:handleShow} href={"#"}>{userController.isLogin()?props.user.nickname:"请登录"}</a>
                        </Nav.Item>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <LoginModal show={show} onHide={handleClose} onLogin={props.onLogin}/>
            <Modal show={logOut} onHide={props.onHide} centered={true} backdrop={"static"}>
                <ModalHeader closeButton>
                    <ModalTitle>提示</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>是否确认登出？</p>
                </ModalBody>
                <ModalFooter>
                    <Container className={"d-flex justify-between g-2"}>
                        <Button variant={"primary"} className={"w-100"} size="md" onClick={()=>{
                            setLogOut(false);
                            userController.logOut();
                            navigate("/");
                        }}>
                            确认
                        </Button>
                        <Button variant={"warning"} className={"w-100"} size="md" onClick={()=>{
                            setLogOut(false);
                        }}>
                            取消
                        </Button>
                    </Container>

                </ModalFooter>
            </Modal>
        </>
    );

    function handleShow() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);
        setSearchParams({});
    }
}
