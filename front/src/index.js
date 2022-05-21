import * as ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap'

ReactDOM.render(
    (
        <BrowserRouter basename={"/mall/app"}>
            <App />
        </BrowserRouter>
    ),
    document.getElementById("root")
);
