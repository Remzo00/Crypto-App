import React,{FunctionComponent} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom'
import {Avatar} from "antd";
import { UserOutlined } from "@ant-design/icons";


const Navbar:FunctionComponent = () =>{
    return(        
             <nav className="nav">
            <ul>
                <li className="current">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <div className="icon">
                    <NavLink to="/profile">
                        <Avatar className="avatar" icon={<UserOutlined />} />
                    </NavLink>
                    </div>
                </li>
                <li className="current">
                    <NavLink to="/">About</NavLink>
                </li>
            </ul>
          </nav>
      
    )
}

export default Navbar