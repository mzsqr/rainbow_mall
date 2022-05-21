import {Button, Container, FormControl, FormSelect, InputGroup} from "react-bootstrap";
import {searchGoods} from "./http/GoodsController";
import {useState} from "react";
import {useNavigate} from "react-router";
import {getQueryString} from "./utils";


export default function SearchGroup(props) {

    const [sstr, setSstr] = useState("")
    const navigate = useNavigate()

    return (
        <Container className={"rounded rounded-pill border border-1 border-info mb-5"} style={{padding: "0",width: "60%"}}>
            <InputGroup>
                <InputGroup.Text className={"bg-light rounded-end rounded-pill"}>
                    <FormSelect className={"bg-light border-0"} defaultValue={"商品"}>
                        <option value={"商品"}>商品</option>
                        <option value={"店铺"}>店铺</option>
                    </FormSelect>
                </InputGroup.Text>
                <FormControl type={"text"}
                             className={"border-end-0 border-top-0 border-bottom-0"}
                             value={sstr} onChange={e=>setSstr(e.target.value)}/>
                <Button variant={"info"}
                        className={"rounded rounded-pill bg-gradient shadow"}
                        onClick={async ()=>{
                            navigate("/search?"+getQueryString({keywords: [sstr]}), {replace: true})
                            window.location.reload()
                        }}
                        style={{fontSize:"1.2rem",
                            fontWeight:"bolder",
                            padding:"0 1.5rem",
                        margin: "0.3rem"}}>搜索</Button>
            </InputGroup>
        </Container>
    );
}
