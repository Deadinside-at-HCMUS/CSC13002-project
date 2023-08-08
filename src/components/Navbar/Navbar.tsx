import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AuthContext } from "../../contexts/authContext";

interface NavbarProps {
    logoUrl: string;
    name: string;
    onAboutClick: () => void;
    onGiveClick: () => void;
    onReceiveClick: () => void;
    onLoginClick: () => void;
    onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    logoUrl,
    name,
    onAboutClick,
    onGiveClick,
    onReceiveClick,
    onLoginClick,
    onProfileClick,
}) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    // isAuthenticated ? console.log("true") : console.log("false");

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between h-32 items-center pt-6 pl-16 pr-10">
                <div className="flex gap-8">
                    <div className="logo">
                        <img src={logoUrl} className="mx-auto w-10" />
                    </div>
                    <div className="name text-[20px]">
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
                        onClick={onGiveClick}
                    >
                        Give
                    </li>
                    <li
                        className="icon hover:text-[#a5a6a6] text-[18px]"
                        onClick={onReceiveClick}
                    >
                        Receive
                    </li>
                    <div className="language text-[18px]">
                        <select>
                            <option value="vi">Vietnamese</option>
                            <option value="en">English</option>
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
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
