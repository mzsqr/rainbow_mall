import AppBar from "./utils/AppBar";
import {Container} from "react-bootstrap";
import HomePage from "./home/HomePage";
import GoodsDetail from "./goods/GoodsDetail";
import {Route} from "react-router";
import "./App.css"
import Footer from "./utils/Footer";
import CartPage from "./cart/CartPage";
import SignUpPage from "./sign/SignUpPage";
import {Routes} from "react-router-dom";
import { useState} from "react";
import {userController} from "./utils/http/UserController";
import OutedGoodsPage from "./outedGoods/OutedGoodsPage";
import NotOutedGoodsPage from "./notOutedGoods/NotOutedGoodsPage";
import SearchResult from "./searchResult/searchResult";

export default function App(props) {

    const [user, setUser] = useState(userController.getUserInfo());

    return (
        <Container fluid={true} style={{padding: 0}} className={"bg-dark"} id={"app"}>
            <AppBar onLogin={setUser} user={user}/>
            <Container className={"bg-white p-4"} fluid={"sm"} style={{borderRadius: "1.5rem",width: "70%"}} id={"app-content"}>
                <Routes>
                    <Route path={"/goods/:goods_id"} element={<GoodsDetail />}>

                    </Route>
                    <Route path={"/cart"} element={<CartPage />}>

                    </Route>
                    <Route path={"/signup"} element={<SignUpPage />}>

                    </Route>
                    <Route path={"/outed-goods"} element={<OutedGoodsPage />}>

                    </Route>
                    <Route path={"/not-out-goods"} element={<NotOutedGoodsPage />}>

                    </Route>
                    <Route path={"/search"} element={<SearchResult />}>

                    </Route>
                    <Route exact path={"/"} element={<HomePage {...user}/>}>

                    </Route>
                </Routes>
            </Container>
            <Footer />
        </Container>
    );
}
