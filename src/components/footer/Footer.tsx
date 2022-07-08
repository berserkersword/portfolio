import { AiFillInstagram } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import "./Footer.scss";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="wrapper">
                <div className="icons">
                    <a href="lamjarred063@gmail.com"><MdEmail /></a>
                    <a href="https://instagram.com/uchixa__itachi_"><AiFillInstagram /></a>
                    <a href="https://t.me/senior_shadow"><BsTelegram /></a>
                </div>
                <h4>
                    Created 2022 &#169;
                </h4>
            </div>
        </footer>
    )
}

export default Footer