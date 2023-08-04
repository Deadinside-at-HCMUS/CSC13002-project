import React from 'react';
import GiveButton from './Button/GiveButton';
import ReceiveButton from './Button/ReceiveButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
            <div className="shadow-[0px_4px_30px_0px_rgba(0,_0,_0,_0.08)] bg-white flex flex-row justify-between h-32 shrink-0 items-center pt-6 pl-16 pr-10">
                <div className="logo">
                    <img src={logoUrl} className="min-w-0 w-10" />
                </div>
                <div className="name">
                    <span >{name}</span>
                </div>

                <div className="info-hotline">
                    <span>Hotline: {hotlineNumber}</span>
                </div>
                <GiveButton onClick={onGiveClick} />
                <ReceiveButton onClick={onReceiveClick} />
                <button onClick={onLoginClick}>Login</button>
                <div className="language">
                    <select>
                        <option value="en">Vietnamese</option>
                        <option value="fr">English</option>
                        {/* Add more language options as needed */}
                    </select>
                </div>
                <AccountCircleOutlinedIcon className="cursor-pointer" fontSize="large" onClick={onProfileClick} />
            </div>
        </div >
    );
};

export default Navbar;
