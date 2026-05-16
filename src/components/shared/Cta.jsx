import Link from "next/link";
import { RxInstagramLogo } from "react-icons/rx";

const Cta = () => {
    return (
        <div className="cta">
            <Link href={'https://www.instagram.com/shubhangi.derhgawen?igsh=MTB3ejdoMmpxMHMyeA%3D%3D&utm_source=qr'} target="_blank" className="btn primary-btn"><RxInstagramLogo />Follow me</Link>
        </div>
    )
}

export default Cta;