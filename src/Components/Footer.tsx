import React from "react";
import "./Footer.css"
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

const Footer: React.FC = () => {
    return(
       <section className="footer">
           <div className="about">About</div>
             <div className="container">                
                    <header>
                        <h4>TESTETSTETSTETSTETS</h4>
                        <p>
                            { new Date().getFullYear() } - zklj zklj
                            <br/>
                            <a>
                            <GithubFilled />
                            </a>
                            <a>
                            <LinkedinFilled style={{ marginLeft: 20 }} />
                            </a>
                        </p>
                    </header>
              </div>
       </section>
    )
}

export default Footer;