import React, { useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { SIDEBAR_UPPER_LINKS, SIDEBAR_BOTTOM_LINKS } from './SidebarLinks';
import { BiLogOutCircle } from 'react-icons/bi';

interface SidebarLinkProps {
    item: {
        key: string;
        label: string;
        path: string;
        icon: React.ReactElement;
    };
}

function SidebarLink({ item }: SidebarLinkProps) {
    const location = useLocation()
    const isActive = location.pathname === item.path

    return (
        <Link
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2  ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-400 hover:no-underline hover:text-white"} active:bg-blue-40 rounded-md`}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    );
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const {
        authState: { user },
        logoutUser,
    } = useContext(AuthContext);

    const username = user ? user.username : '';

    const handleClickLogo = () => {
        navigate('/home');
    };

    const handleLogout = () => {
        logoutUser();
        console.log(username, " logout")
        navigate('/login');
    };

    return (
        <div className="w-60 p-5 flex flex-col cursor-pointer text-[#999]">
            <div className="flex gap-4 items-center" onClick={handleClickLogo}>
                <div className="logo">
                    <img
                        src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
                        className="mx-auto w-10"
                        alt="Logo"
                    />
                </div>
                <div className="name text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                    <span>ConnectMe</span>
                </div>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {SIDEBAR_UPPER_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-300">
                {SIDEBAR_BOTTOM_LINKS.map(item => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-400 hover:no-underline hover:text-white rounded-md" onClick={handleLogout}>
                <BiLogOutCircle />
                <span>Log out</span>
            </div>
        </div>
    );
};

export default Sidebar;
