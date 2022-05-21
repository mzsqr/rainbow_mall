DROP DATABASE if EXISTS `rainbow_mall`;

CREATE DATABASE `rainbow_mall`;

USE `rainbow_mall`;

create table cart
(
    id        int auto_increment
        primary key,
    g_id      int      null,
    account   CHAR(16) null,
    num       int      not null,
    org_price int      not null
);

create table manage_record
(
    e_account CHAR(16) not null,
    g_id      char(32) not null,
    time      datetime not null,
    detail    text     not null,
    remark    text     null,
    u_id      char     null,
    primary key (e_account, time)
);

create table ul_record
(
    u_account char(16)          not null,
    time      datetime          not null,
    IP        char(48)          null,
    os        char(64)          null,
    explorer  char(64)          null,
    `where`   char(64)          null,
    role      tinyint default 0 null,
    primary key (u_account, time)
);

create table um_record
(
    u_account char(16) not null,
    time      datetime not null,
    action    text     null,
    id        int auto_increment
        primary key,
    constraint um_record_id_uindex
        unique (id)
);

create table user
(
    account  CHAR(16)                  not null
        primary key,
    password tinyblob                  not null,
    nickname char(20)                  not null,
    phone    char(11)                  null,
    email    varchar(320)              null,
    role     tinyint default 0         not null,
    avatar   varchar(256)              not null,
    reg_date date                      not null,
    identity char(18)                  null,
    money    int     default 999999999 not null,
    constraint user_identity_uindex
        unique (identity)
);

create table goods
(
    id          char(32)          not null
        primary key,
    price       int               not null,
    volume      int               not null,
    account     CHAR(16)          null,
    title       char(128)         not null,
    description varchar(512)      null,
    add_date    date              null,
    example     varchar(256)      not null,
    status      tinyint default 0 not null,
    category    varchar(1024)     null,
    constraint goods_user_account_fk
        foreign key (account) references user (account)
);

create table explore
(
    account CHAR(16)             not null,
    g_id    char(32)             not null,
    ex_date datetime             not null,
    action  char(8) default '浏览' not null,
    constraint explore_pk
        unique (account, g_id, ex_date),
    constraint explore_goods_id_fk
        foreign key (g_id) references goods (id)
);

create table `order`
(
    id         int auto_increment
        primary key,
    status     tinyint    default 0 not null,
    goods_id   char(32)             not null,
    account    CHAR(16)             not null,
    num        int                  not null,
    org_price  int                  not null,
    checked    tinyint(1) default 1 not null,
    order_time datetime             not null,
    address    varchar(1024)        null,
    constraint order_id_uindex
        unique (id),
    constraint order_goods_id_fk
        foreign key (goods_id) references goods (id),
    constraint order_user_account_fk
        foreign key (account) references user (account)
);

create table photo
(
    id    int auto_increment
        primary key,
    g_id  char(32)     null,
    pname varchar(256) not null,
    constraint photo_goods_id_fk
        foreign key (g_id) references goods (id)
);

