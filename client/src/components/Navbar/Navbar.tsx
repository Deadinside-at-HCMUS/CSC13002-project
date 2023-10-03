import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AuthContext } from "../../contexts/authContext";

interface NavbarProps {
    logoUrl: string;
    name: string;
    onAboutClick: () => void;
    onDonateClick: () => void;
    onReceiveClick: () => void;
    onLoginClick: () => void;
    onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    logoUrl,
    name,
    onAboutClick,
    onDonateClick,
    onReceiveClick,
    onLoginClick,
    onProfileClick,
}) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between h-32 items-center pl-16 pr-10">
                <div className="flex gap-4 items-center">
                    <div className="logo">
                        <img src={logoUrl} className="mx-auto w-10" />
                    </div>
                    <div className="name text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                        <span>{name}</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <li
                        className="icon hover:text-[#a5a6a6] text-[18px]"
                        onClick={onAboutClick}
                    >
                        About us
                    </li>
                    <li
                        className="icon hover:text-[#a5a6a6] text-[18px]"
                        onClick={onDonateClick}
                    >
                        Donate
                    </li>
                    <li
                        className="icon hover:text-[#a5a6a6] text-[18px]"
                        onClick={onReceiveClick}
                    >
                        Receive
                    </li>
                    <div className="language text-[18px]">
                        <select>
                            <option value="en">English</option>
                            <option value="vi">Vietnamese</option>
                            {/* Add more language options as needed */}
                        </select>
                    </div>
                    {!isAuthenticated && (
                        <li
                            className="icon hover:text-[#a5a6a6] text-[18px]"
                            onClick={onLoginClick}
                        >
                            Login
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <AiOutlineUser
                                className="text-[25px] icon hover:text-[#a5a6a6]"
                                onClick={onProfileClick}
                            />
                        </li>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
