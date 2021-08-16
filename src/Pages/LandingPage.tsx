import React, {useState, useEffect, FunctionComponent} from "react";
import { useAtom } from "jotai";
import { Spin } from "antd";
import axios from "axios";
import { coinListAtom,  favoriteCoinsAtom } from "../State/State";
import "./LandingPage.css"
import Header from "../Components/Header";
import { CalcModal } from "../Components/CalcModal";
import Coin from "../Components/Coin";
import Footer from "../Components/Footer";


interface CryptoCoin{
    image: string;
    current_price: number;
    name: string;
    symbol: string;
    price_change_percentage_24h: number;
    id: string;
}

const LandingPage: FunctionComponent = () =>{
    const [coins, setCoins] = useAtom( coinListAtom)
    const [search, setSearch] = useState("")
    const [favoriteCoins, setFavoriteCoins] = useAtom(favoriteCoinsAtom);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [cryptoId, setCryptoId] = useState("")

    const openCryptoCalcModal = (id: string) => {
      setIsModalVisible(true);
      setCryptoId(id);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleChange = (event: any) =>{
        setSearch(event.target.value);  
    }

    const filteredCoin = coins.filter((coin: CryptoCoin)=>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    const gettingCoins = async () =>{
        try{
            setLoading(true)
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h"
            )
            setCoins(response.data)
            setLoading(false)
        }catch(e){
            console.warn(e)
        }
    }

    const addFavoriteCoin = (coin: CryptoCoin) => {
        if (favoriteCoins.includes(coin)) {
          const filteredArray = favoriteCoins.filter((el) => el.name !== coin.name);
          setFavoriteCoins(filteredArray);
         alert("Removed from favorites...");
        } else {
          setFavoriteCoins([...favoriteCoins, coin]);
         alert("Successfully added to favorites!");
        }
      };

      useEffect(() => {
        gettingCoins();
      }, []);

    return(
        <React.Fragment>
        <div id="page-wrapper">
          <Header />
          <section id="coin" className="main-div">
            <div className="title">
              <h3>Cryptocurency list</h3>
            </div>
            <div className="container">
              {loading ? (
                <Spin tip="Cryptocurency loading..."  style={{textAlign: "center"}}/>
              ) : (
                <div>
                  <form method="post" action="#">
                    <div className="row gtr-50">
                      <div
                        className="col-8 col-12-small"
                        style={{ margin: "0 auto" }}
                      >
                        <input
                          onChange={handleChange}
                          type="text"
                          name="name"
                          id="contact-name"
                          placeholder="Search cryptos.."
                        />
                      </div>
                    </div>
                  </form>
                  <CalcModal
                    visible={isModalVisible}
                    onOk={handleOk}
                    cryptoId={cryptoId}
                  />
                  <div className="coins">
                    {filteredCoin.map((coin) => (
                      <div key={coin.id}>
                        <Coin 
                          image={coin.image}
                          name={coin.name}
                          price={coin.current_price}
                          symbol={coin.symbol}
                          priceChange={coin.price_change_percentage_24h}
                          favoriteClicked={() => addFavoriteCoin(coin)}
                          calculateHandler={() => openCryptoCalcModal(coin.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
        <Footer/>
      </React.Fragment>
    )
}

export default LandingPage