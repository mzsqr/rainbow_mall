import {Container} from "react-bootstrap";
import Favicon from "./Favicon";


export default function Footer(props) {

    return(
        <>
            <div className={"w-100 border border-1"} style={{
                marginTop: "5rem"
            }} />
            <div className={"w-100 border border-1 border-danger"}/>

            <Container className={"pb-3 position-relative"}>
                <Favicon height={100} width={100} style={{
                    position: "absolute",
                    bottom: "70%"
                }}/>
                <Container style={{color: "white"}}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>关于Rainbow Mall</a>

                    <div><small>©2021-现在 @lyr版权所有</small></div>

                </Container>
            </Container>
        </>

    );
}
