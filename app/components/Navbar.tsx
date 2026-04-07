import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/airbnb-desktop.png";
import MobileLogo from "../../public/airbnb-mobile.webp";
import  { UserNav } from "./UserNav";
import { SearchModalComponent } from "./SearchComponent";

export function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href="/">
                <Image 
                src={DesktopLogo}
                 alt="Desktop logo"
                  className="w-32 hidden lg:block"/>
                <Image 
                src={MobileLogo} 
                alt="Mobile logo" 
                className="w-12 lg:hidden"/>
                </Link>
                <SearchModalComponent/>
                
                <UserNav />
            </div>
        </nav>
    );
}
