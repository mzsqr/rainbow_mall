import {Carousel} from "react-bootstrap";

export default function ImgCarousel(props) {

    const items = props.imgs.map((value, index)=>{
        return (
            <Carousel.Item key={index}>
                <a className={"d-block w-100"} href={value.link}>
                    <img src={value.img} className={"d-block w-100 rounded rounded-4"}
                         alt={value.alt} style={props.style} onClick={() => props.onClick(index)}/>
                </a>
                <Carousel.Caption>
                    <h3>{value.mainTitle}</h3>
                    <p>{value.subTitle}</p>
                </Carousel.Caption>
            </Carousel.Item>
        );
    });

    return (
        <Carousel activeIndex={props.activeIndex} controls={props.controls} indicators={props.indicators}>
            {items}
        </Carousel>
    );
}
