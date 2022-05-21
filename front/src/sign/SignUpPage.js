import {Button, Col, Container, FormCheck, FormControl, FormLabel, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {userController} from '../utils/http/UserController'
import {useNavigate} from "react-router";


export default function SignUpPage(props) {

    const [photo, setPhoto] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [account, setAccount] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);

    const [send, setSend] = useState(null);

    const navigate = useNavigate();

    return (
        <form>
            <Container className={"d-grid gap-3"}>
                <Row className={"w-100 text-center"}>
                    <h2 style={{fontWeight: "bold"}}>欢迎注册Rainbow Mall账号</h2>
                    <span style={{position: "relative", left: "20rem", bottom: "2rem"}}>已有账号?<a href={"/"} className={"text-info"}>去登录</a></span>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1} className={"align-middle"} style={{lineHeight: "4rem"}}><FormLabel>头像:</FormLabel></Col>
                    <Col xs={3}><img src={"./avatar.png"} style={{width: "4rem", height: "4rem"}}
                                     className={"rounded-pill"} alt={"图片无法显示"} id={"avatarShow"}
                                     onClick={triggerSelect}/></Col>
                    <FormControl type={"file"} hidden name={"avatar"} onChange={changeAvatar} id={"avatarInput"}/>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>昵称:</FormLabel></Col>
                    <Col xs={3}>
                        <FormControl type={"text"} value={nickname} onChange={event => changeFunc(event, setNickname)}/>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>账号:</FormLabel></Col>
                    <Col xs={3}>
                        <FormControl type={"text"} value={account} onChange={event => changeFunc(event, setAccount)}/>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>密码:</FormLabel></Col>
                    <Col xs={3}>
                        <FormControl type={"password"} value={password} onChange={event => changeFunc(event, setPassword)}/>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>确认密码:</FormLabel></Col>
                    <Col xs={3}>
                        <FormControl type={"password"} value={confirmPassword} onChange={event => changeFunc(event, setConfirmPassword)}/>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>电话:</FormLabel></Col>
                    <Col xs={3}>
                        <FormControl type={"text"} value={phone} onChange={event => changeFunc(event, setPhone)}/>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>邮箱:</FormLabel></Col>
                    <Col xs={3}>
                        <InputGroup>
                            <FormControl type={"email"} value={email} onChange={event => changeFunc(event, setEmail)}/>
                            <Button variant={send?"secondary":"outline-primary"} size="sm"
                                    onClick={sendVerifyCode} disabled={!!send}>
                                {send || "获取验证码"}
                            </Button>
                        </InputGroup>

                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={1}><FormLabel>验证码:</FormLabel></Col>
                    <Col xs={3}>
                        <FormControl type={"text"} value={code} onChange={event => changeFunc(event, setCode)}/>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={4}>
                        <FormCheck className={"form-check-inline text-info"}/>{" "}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href={"#"}>《RainbowMall网站服务条款》</a>
                    </Col>
                </Row>

                <Row className={"justify-content-center"}>
                    <Col xs={2}><Button variant={"info"} onClick={signIn}>同意并注册</Button> </Col>
                </Row>

            </Container>
        </form>
    );

    function triggerSelect() {
        document.getElementById("avatarInput").click();
    }

    function changeAvatar(e) {
        document.getElementById("avatarShow").src = URL.createObjectURL(e.target.files[0]);
        setPhoto(e.target.files[0])
    }

    function changeFunc(e, callback) {
        callback(e.target.value)
    }

    function signIn() {
        if (password === confirmPassword){
            const user = {
                account,
                password,
                photo,
                nickname,
                phone,
                email,
                code
            };
            console.log(photo);
            userController.signUp(user)
                // 成功
                .then(res=>{
                    alert("注册成功");
                    setTimeout(()=>navigate("/?signIn=true",), 1000);
                })
                .catch(reason => alert("注册失败，稍后重试"));
        }
    }

    async function sendVerifyCode() {
        if (email&&account){
            await userController.sendVerifyCode(account, email);
            let start = 60;
            let timeId = setInterval(()=>{
                if (start === 0) {
                    clearInterval(timeId);
                    setSend(null);
                    return ;
                }
                setSend("重新发送("+start+"s)")
                start--;
            }, 1000);
        }
    }

}
