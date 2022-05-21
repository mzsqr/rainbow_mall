import {PageContainer} from "@ant-design/pro-layout";
import {Line} from "@ant-design/charts";
import {useEffect, useState} from "react";
import {fetchLoginStatData} from "@/services/RecordController";
import {fetchOrderStat} from "@/services/OrderController";
import ProCard, {StatisticCard} from "@ant-design/pro-card";
import {fetchUserStat} from "@/services/UserController";
import { Statistic } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

export default ()=>{

  const [loginData, setLoginData] = useState([]);
  const [orderData, setOrderData] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(() => {
    asyncFetchLoginData();
    asyncFetchOrderData();
    asyncFetchUserData();
  }, []);

  const asyncFetchLoginData = () => {
    fetchLoginStatData()
      .then(res => setLoginData(res))
      .catch(console.log);
  };

  const asyncFetchOrderData = () => {
    fetchOrderStat()
      .then(setOrderData)
      .catch(console.log);
  }

  const asyncFetchUserData = () => {
    fetchUserStat()
      .then(setUserData)
      .catch(console.log);
  }

  const loginDataConfig = {
    data: loginData,
    padding: 'auto',
    xField: 'date',
    yField: 'num',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  const orderDataConfig = {
    data: orderData,
    padding: 'auto',
    xField: 'date',
    yField: 'num',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  const userDataConfig = {
    data: userData,
    padding: 'auto',
    xField: 'date',
    yField: 'num',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  const lineStyle = {
    shadowOffsetY: 100,
    shadowColor: 'blue',
    shadowBlur: 20
  }

  const compare = (day: Date) => {
    day.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0,0 , 0, 0)
    return day.getTime()==today.getTime()
  }

  const getTodayValue = (data: Array<any>) => {
    const res = data.filter(value => {
      const day = new Date(value.date);
      console.log(day, new Date());
      if (compare(day)) return value.num;
    })
    if (res[0]) return res[0].num;
    return 0;
  }

  // @ts-ignore
  return(
    <PageContainer>

      <ProCard
        title={"数据概览"}
      extra={new Date().toLocaleDateString()}
      split={"horizontal"}
      headerBordered
      bordered>
        <ProCard split={"vertical"}>
          <StatisticCard title={"登录曲线图"}
                         chart={<Line {...loginDataConfig} />}/>
          <StatisticCard
            title="今日登录量"
            extra={<EllipsisOutlined />}
            statistic={{
            value: getTodayValue(loginData),
            suffix: '次'
          }}
            bordered
            footer={
              <>
                <Statistic value={loginData.reduce((prev, curr)=> {
                  return prev + curr.num
                }, 0)} title="累计登录量" layout="horizontal" />
              </>
            }
            style={{ width: 250 }}
          />
        </ProCard>

        <ProCard split={"vertical"}>
          <StatisticCard title={"订单曲线图"} chart={<Line {...orderDataConfig} />} />

          <StatisticCard
            title="今日订单量"
            extra={<EllipsisOutlined />}
            statistic={{
              value: getTodayValue(orderData),
              suffix: '单',
            }}
            bordered
            footer={
              <>
                <Statistic value={orderData.reduce((prev, curr)=> {
                  return prev + curr.num
                }, 0)} title="累计订单" layout="horizontal" />
              </>
            }
            style={{ width: 250 }}
          />
        </ProCard>

        <ProCard split={"vertical"}>
          <StatisticCard title={"用户注册曲线图"} chart={<Line {...userDataConfig} />} />

          <StatisticCard
            title="今日注册量"
            extra={<EllipsisOutlined />}
            statistic={{
              value: getTodayValue(userData),
              suffix: '个',
            }}
            bordered
            footer={
              <>
                <Statistic value={userData.reduce((prev, curr)=> {
                  return prev + curr.num
                }, 0)} title="累计注册量" layout="horizontal" />
              </>
            }
            style={{ width: 250 }}
          />
        </ProCard>

      </ProCard>

    </PageContainer>
  )
}
