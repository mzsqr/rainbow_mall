import ModalHeader from "react-bootstrap/ModalHeader";
import {Button, FormCheck, Modal, ModalBody, ModalFooter, ModalTitle} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useState} from "react";
import {userController} from "./http/UserController";
import {useNavigate} from "react-router";


export default function LoginModal(props) {

    const [account, setAccount] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    return (
        <Modal show={props.show} onHide={props.onHide} centered={true} backdrop={"static"}>
            <ModalHeader closeButton>
                <ModalTitle>Rainbow Mall 登录</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form noValidate={true} id={"infoForm"}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={account} onChange={e=>setAccount(e.target.value)}/>
                            <label htmlFor="floatingInput">账号</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                        <label htmlFor="floatingPassword">密码</label>
                    </div>
                    <FormCheck className={"form-check-inline mb-3"}>
                        <FormCheckInput id={"rememberInput"}/>{" "}
                        <FormCheckLabel htmlFor={"rememberInput"}>记住我</FormCheckLabel>
                    </FormCheck>
                    <br />
                    <Button variant={"primary"} className={"w-100"} onClick={signIn}>
                        点击登录
                    </Button>
                </form>
            </ModalBody>
            <ModalFooter>
                <p className={"text-end"}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    没有账号？<a href={"/mall/app/signup"}>点击注册</a>{" "}
                    | {" "}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href={"#"}>忘记密码？</a>
                </p>
            </ModalFooter>
        </Modal>
    );

    function signIn(e) {
        e.preventDefault();
        if (account && password){
            userController.signIn(account,password)
                .then(res=> {
                    props.onLogin(userController.getUserInfo());
                    navigate("/");
                    props.onHide();
                })
                .catch(err=>alert("登陆失败，稍后重试"))
        }
    }
}
