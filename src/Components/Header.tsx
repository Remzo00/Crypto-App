import React,{FunctionComponent} from 'react'
import './Navbar/Navbar.css';
import Navbar from './Navbar/Navbar'


const Header: FunctionComponent = () =>{
    return(
        <section className="main-header">
            <Navbar />
            <div className="description">
            <h1>Bitchain - Buy & sell Crypto in minutes</h1>
            <p>Join the world's largest crypto exchange</p>
          </div>       
       </section>
    )
}

export default Header