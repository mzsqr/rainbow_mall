declare namespace Domain {
  type User = {
    nickname?: string,
    avatar?: string,
    account?: string,
    password?: string,
    phone?: string,
    email?: string,
    regDate?: string|Date,
    role?: number
  }

  type Goods = {
    id?: string,
    title?: string,
    description?: string,
    volume?: number,
    price?: number,
    addDate?: string | Date,
    example?: string | File,
    photos?: Array,
    status?: 0|1|2,
    account?: string,
    files?: Array,
    category?: string
  }

  type Explore = {
    account?: string,
    gId?: string,
    goods?: Goods,
    user?: User
  }

  type Order = {
    id?: number,
    goods?: Goods,
    status?: 0|1|2|3|4|5|6|7,
    goodsId?: string,
    num?: number,
    orgPrice?: number,
    orderTime?: Date | string,
    account?: string,
    address?: string
  }

  type ManageRecord = {
    eAccount?: string,
    gId?: string,
    time?: string | Date,
    detail?: string,
    remark?: string,
    uId?: string
  }

  type UserLoginRecord = {
    uAccount?: string,
    time?: Date | string,
    ip?: string,
    os?: string,
    explorer?: string,
    where?: string,
    role?: string
  }
}
