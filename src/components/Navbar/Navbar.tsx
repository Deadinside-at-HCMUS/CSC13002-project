import React from 'react';
import GiveButton from './Button/GiveButton';
import ReceiveButton from './Button/ReceiveButton';
import SearchIcon from '@mui/icons-material/Search'

interface NavbarProps {
    logoUrl: string;
    name: string;
    searchPlaceholder: string;
    hotlineNumber: string;
    onSearchClick: () => void;
    onGiveClick: () => void;
    onReceiveClick: () => void;
    onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    logoUrl,
    name,
    searchPlaceholder,
    hotlineNumber,
    onSearchClick,
    onGiveClick,
    onReceiveClick,
    onLoginClick,
}) => {
    return (
        <nav className="flex flex-col w-full">
            <div className="shadow-[0px_4px_30px_0px_rgba(0,_0,_0,_0.08)] bg-white flex flex-row justify-between h-32 shrink-0 items-center pt-6 pl-16 pr-10">
                <div className="logo">
                    <img src={logoUrl} className="min-w-0 w-10" />
                    <span >{name}</span>
                </div>
                <div className="search flex items-center border-b border-blue-500 py-2">
                    <input type="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder={searchPlaceholder} />
                    <SearchIcon className="cursor-pointer" color="primary" onClick={onSearchClick} />
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
            </div>
        </nav >
    );
};

export default Navbar;
