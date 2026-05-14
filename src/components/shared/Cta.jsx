import Link from "next/link";
import { RxInstagramLogo } from "react-icons/rx";

const Cta = () => {
    return (
        <div className="cta">
            <Link href="/" className="btn primary-btn"><RxInstagramLogo />Follow me</Link>
        </div>
    )
}

export default Cta;