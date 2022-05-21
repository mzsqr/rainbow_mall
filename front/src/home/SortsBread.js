import {Breadcrumb} from "react-bootstrap";
import "./SortsBread.css"
import {useNavigate} from "react-router";
import qs from "qs";

export default function SortsBread(props) {
    const navigate = useNavigate()

    const items = props.items.map((item, index) => {
        return <Breadcrumb.Item href={item.link} key={item.value} className={"r-bread-link"}
                                onClick={(e) => {
                                    navigate("/search?" + qs.stringify({keywords: [item.value]}))
                                    e.preventDefault()
                                }}>
            {item.value}
        </Breadcrumb.Item>
    })

    return (
        <Breadcrumb>
            {items}
        </Breadcrumb>
    );
}
