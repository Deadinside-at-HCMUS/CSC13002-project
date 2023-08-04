import React from 'react';
import { AiOutlineUser } from "react-icons/ai";

interface NavbarProps {
    logoUrl: string;
    name: string;
    hotlineNumber: string;
    onGiveClick: () => void;
    onReceiveClick: () => void;
    onLoginClick: () => void;
    onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    logoUrl,
    name,
    hotlineNumber,
    onGiveClick,
    onReceiveClick,
    onLoginClick,
    onProfileClick,
}) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between h-32 items-center pt-6 pl-16 pr-10">
                <div className="flex gap-8">
                    <div className="logo">
                        <img src={logoUrl} className="mx-auto w-10" />
                    </div>
                    <div className="name">
                        <span >{name}</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <div className="info-hotline">
                        <span>Hotline: {hotlineNumber}</span>
                    </div>
                    <li className="icon hover:text-[#a5a6a6]" onClick={onGiveClick} >Give</li>
                    <li className="icon hover:text-[#a5a6a6]" onClick={onReceiveClick} >Recieve</li>
                    <li className="icon hover:text-[#a5a6a6]" onClick={onLoginClick}>Login</li>
                    <div className="language">
                        <select>
                            <option value="en">Vietnamese</option>
                            <option value="fr">English</option>
                            {/* Add more language options as needed */}
                        </select>
                    </div>
                    <li>
                        <AiOutlineUser className="text-[25px] icon hover:text-[#a5a6a6]" onClick={onProfileClick} />
                    </li>
                </div>

            </div>
        </div >
    );
};

export default Navbar;
