import SortsBread from "./SortsBread";

// 需要使用网络请求获取数据
const items = [
    {
        items: [
            {link: "#",value: "女装"},
            {link: "#",value: "内衣"},
            {link: "#",value: "家居"},
        ]
    },
    {
        items: [
            {link: "#",value: "女鞋"},
            {link: "#",value: "男鞋"},
            {link: "#",value: "箱包"},
        ]
    },
    {
        items: [
            {link: "#",value: "母婴"},
            {link: "#",value: "童装"},
            {link: "#",value: "玩具"},
        ]
    },
    {
        items: [
            {link: "#",value: "男装"},
            {link: "#",value: "运动户外"},
        ]
    },
    {
        items: [
            {link: "#",value: "美妆"},
            {link: "#",value: "彩妆"},
            {link: "#",value: "个护"},
        ]
    },
    {
        items: [
            {link: "#",value: "手机"},
            {link: "#",value: "数码"},
            {link: "#",value: "企业"},
        ]
    },
    {
        items: [
            {link: "#",value: "大家电"},
            {link: "#",value: "生活电器"},
        ]
    },
    {
        items: [
            {link: "#",value: "零食"},
            {link: "#",value: "生鲜"},
            {link: "#",value: "茶酒"},
        ]
    },
    {
        items: [
            {link: "#",value: "厨具"},
            {link: "#",value: "收纳"},
            {link: "#",value: "清洁"},
        ]
    },
    {
        items: [
            {link: "#",value: "家纺"},
            {link: "#",value: "家饰"},
            {link: "#",value: "鲜花"},
        ]
    },
    {
        items: [
            {link: "#",value: "图书"},
            {link: "#",value: "音像"},
            {link: "#",value: "文具"},
        ]
    },
    {
        items: [
            {link: "#",value: "医药保健"},
            {link: "#",value: "进口"},
        ]
    },
    {
        items: [
            {link: "#",value: "汽车"},
            {link: "#",value: "二手车"},
            {link: "#",value: "用品"},
        ]
    },
    {
        items: [
            {link: "#",value: "房产"},
            {link: "#",value: "装修家居"},
            {link: "#",value: "建材"},
        ]
    },
    {
        items: [
            {link: "#",value: "手表"},
            {link: "#",value: "眼镜"},
            {link: "#",value: "珠宝饰品"},
        ]
    },

]

export default function SortsCard(props) {
    const res = items.map((v,index)=>{
        return <SortsBread items={v.items} key={index}/>
    });

    return (
        <>
            {res}
        </>
    )
}
