import React, {FunctionComponent} from 'react'
import '../Components/Navbar/Navbar.css'
import "./ProfilePage.css"
import Header from '../Components/Header'
import { favoriteCoinsAtom } from "../State/State";
import { useAtom } from 'jotai';
import { CalcModal } from '../Components/CalcModal';
import Title from "antd/es/typography/Title";
import { Link } from 'react-router-dom';
import Coin from '../Components/Coin';


interface CryptoCoin{
    image: string;
    current_price: number;
    name: string;
    symbol: string;
    price_change_percentage_24h: number;
    id: string;
}

interface Props{
    isModalVisible: boolean;
    handleOk: () => void;
    cryptoId: string;
    openCryptoCalcModal: any;
}

const warning = () =>{
    alert("Coin removed from favorites!")
}

const ProfilePage: FunctionComponent<Props> = ({
    isModalVisible,
    handleOk,
    cryptoId,
    openCryptoCalcModal,
}) =>{
    
    const [favoriteCoin, setFavoriteCoin] = useAtom(favoriteCoinsAtom)

    const removeFavoriteCoin = (clickedCoin: CryptoCoin) =>{
        const filteredArray = favoriteCoin.filter(
            (coin) => coin.name !== clickedCoin.name
        );
        setFavoriteCoin(filteredArray)
        warning()
    }


    return (
       <div className="main-div">
          <Header />

          <section className="new-section">
            <div className="title">
                {favoriteCoin.length === 0 ?(
                    <h1>No favorite coins.</h1>
                ): (
                    <h1>Favorite coins</h1>
                )}
            </div>
            <div className="container">
                <CalcModal
                    visible={isModalVisible}
                    onOk={handleOk}
                    cryptoId={cryptoId}
                />
                <div>
                {favoriteCoin.length === 0 ? (
                    <Title level={5} className="add">
                        Start to <Link to="/">add</Link> favorite coins
                   </Title>
                ) : (
                    <div>
                        {favoriteCoin &&
                            favoriteCoin.map((coin: any) =>(
                                <div key={coin.id}>
                                    <Coin
                                         image={coin.image}
                                         name={coin.name}
                                         price={coin.current_price}
                                         symbol={coin.symbol}
                                         priceChange={coin.price_change_percentage_24h}
                                         favoriteClicked={() => removeFavoriteCoin(coin)}
                                         calculateHandler={() => console.log("Soon")}
                                    />
                                </div>
                            ))}                      
                    </div>
                )}
                </div>
            </div>
          </section>
      </div>

     
     
      
    )
}

export default ProfilePage