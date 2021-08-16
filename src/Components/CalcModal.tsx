import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { InputNumber, Input, Col, Row, Spin } from "antd";
import { useEffect } from "react";


interface Props {
    visible: boolean;
    onOk: () => void;
    cryptoId: string;
  }
  export const CalcModal: React.FC<Props> = ({ visible, onOk, cryptoId }) => {
    const [coinData, setCoinData] = useState<any>();
    const [coinValue, setCoinValue] = useState<any>(0);
  
    const onChange = (value: number) => {
      setCoinValue(value);
    };
  
    const getCryptoById = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h/${cryptoId}
              `);
        setCoinData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    useEffect(() => {
      getCryptoById();
    }, [cryptoId]);
  
    let calculate = (
      coinValue * coinData?.market_data?.current_price.usd
    ).toFixed(2);

    return(
        <div>
        {coinData ? (
          <Modal
            title={coinData?.name}
            visible={visible}
            onOk={onOk}
            onCancel={onOk}
          >
            <Input.Group size="large">
              <Row gutter={8}>
                <Col span={5}>
                  <InputNumber
                    defaultValue={coinValue}
                    size="large"
                    min={0}
                    max={100}
                    step={0.1}
                    onChange={(value: any) => onChange(value)}
                  />
                </Col>
                <h2 style={{ textAlign: "center", margin: "0 auto" }}> x </h2>
                <Col span={8}>
                  <h2 style={{ textAlign: "center" }}>
                    ${coinData?.market_data?.current_price.usd}
                  </h2>
                </Col>
                <h2 style={{ textAlign: "center" }}> = </h2>
                <Col span={8}>
                  <h2 style={{ textAlign: "center" }}>${calculate}</h2>
                </Col>
              </Row>
            </Input.Group>
          </Modal>
        ) : (
          <Modal title="Loading.." visible={visible} onOk={onOk} onCancel={onOk}>
            <Spin style={{ margin: "0 auto" }} />
          </Modal>
        )}
      </div>
    );
       
}

