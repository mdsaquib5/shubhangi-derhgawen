import Link from "next/link";
import { RxInstagramLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import Logo from "../shared/Logo";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <Logo />
                    <div className="social-media">
                        <Link href={'/'}><RxInstagramLogo /></Link>
                        <Link href={'/'}><AiOutlineYoutube /></Link>
                    </div>
                </div>
                <div className="chat" id="anim">
                    <span>L</span>
                    <span>e</span>
                    <span>t</span>
                    <span>'</span>
                    <span>s</span>
                    <span>&nbsp;</span>
                    <span>h</span>
                    <span>a</span>
                    <span>v</span>
                    <span>e</span>
                    <span>&nbsp;</span>
                    <span>a</span>
                    <span>&nbsp;</span>
                    <span>c</span>
                    <span>h</span>
                    <span>a</span>
                    <span>t</span>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © 2026 shubhangi Derhgawen. All rights reserved.</p>
                    <div className="footer-link">
                        Developed by:
                        <Link href={'https://noohark.com'} target="_blank">NoohArk.com</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;