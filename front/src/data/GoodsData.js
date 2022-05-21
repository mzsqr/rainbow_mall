import img from "../slide.png";

export {getRandomGoods, getGoodsById, getAllCartGoods, getNoGoods, getDecreaseGoods};


const goods = [
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
    {
        img,
        title: "这是一件商品，这是一件很好的商品，这是一件非常好的商品",
        price: 50000.00
    },
];

goods.forEach((v,index)=>{
    v.id = index;
});

const detailedGoods = goods.map((v, i)=>{
    return {
        title: v.title,
        desc_imgs: new Array(8).fill(img),
        o_price: v.price+0.1*v.price,
        n_price: v.price,
        detail_imgs: new Array(8).fill(img),
        volume: 1000
    };
});

const goodsInCart = goods.map(value => {
    return {
        ...value,
        count: Math.floor(Math.random()*5+1),
        checked: Math.floor(Math.random()*4)===0,
        expired: Math.floor(Math.random()*20)===0
    };
});

function getRandomGoods(num) {
    const tmpGoods = goods.slice();
    const res = [];
    let len = tmpGoods.length;
    for (let i = 0; i < num; i++) {
        const choose = Math.floor(Math.random()*len);
        res.push(tmpGoods[choose]);
        let tmp = tmpGoods[len - 1];
        tmpGoods[len - 1] = tmpGoods[choose];
        tmpGoods[choose] = tmp;
        len--;
    }

    return res;
}

function getRandomCartGoods(num) {
    const tmpGoods = goodsInCart.slice();
    const res = [];
    let len = tmpGoods.length;
    for (let i = 0; i < num; i++) {
        const choose = Math.floor(Math.random()*len);
        res.push(tmpGoods[choose]);
        let tmp = tmpGoods[len - 1];
        tmpGoods[len - 1] = tmpGoods[choose];
        tmpGoods[choose] = tmp;
        len--;
    }

    return res;
}

function getGoodsById(id) {
    return detailedGoods[id];
}


function getAllCartGoods() {
    return getRandomCartGoods(15);
}

function getDecreaseGoods() {
    return getRandomCartGoods(5);
}

function getNoGoods() {
    return getRandomCartGoods(2);
}
