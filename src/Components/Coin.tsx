import { Col, Divider, Row, Typography } from 'antd'
import { CalculatorTwoTone, HeartTwoTone } from "@ant-design/icons";
import React, {FunctionComponent} from 'react'

const {Text, Title} = Typography   

//defining types

interface OwnProps{
    image: string;
    price: number;
    name: string;
    symbol: string;
    priceChange: number
    favoriteClicked: () => void;
    calculateHandler: () => void;
}

type Props = OwnProps

const Coin: FunctionComponent<Props> =({
    image,
    price,
    name,
    symbol,
    priceChange,
    favoriteClicked,
    calculateHandler,
}) =>{

    return(       
        <div className="coin-container">
        <Divider orientation="left" style={{ color: "#1890FF" }} className="border">
          {symbol.toUpperCase()}
        </Divider>
        <Row style={{display: "flex"}}>
          <Col span={4} order={1} style={{flex: "0 0 16%"}}>
            <img
              width={50}
              height={50}
              src={image} 
              alt=""            
            />
          </Col>
          <Col span={4} order={2} style={{flex: "0 0 16%"}}>
            <Title level={5}  className="txt">{name}</Title>
          </Col>
          <Col span={4} order={3} style={{flex: "0 0 16%"}}>
            <Text strong>${price}</Text>
          </Col>
          <Col span={4} order={4} style={{flex: "0 0 16%"}}>
            {priceChange < 0 ? (
              <Text type="danger" style={{color: "red"}}>{priceChange}%</Text>
            ) : (
              <Text type="success"  style={{color: "green"}}>+{priceChange}%</Text>
            )}
          </Col>
          <Col span={4} order={5} style={{flex: "0 0 16%"}}>                   
              <HeartTwoTone
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
                onClick={() => favoriteClicked()}
              />           
          </Col>
          <Col span={4} order={6}>           
              <CalculatorTwoTone
                style={{ cursor: "pointer" }}
                onClick={() => calculateHandler()}
              />
          </Col>
        </Row>
      </div>
    )
}

export default Coin