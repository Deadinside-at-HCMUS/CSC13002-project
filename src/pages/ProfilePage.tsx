import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header"

const ProfilePage: React.FC = () => {
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default ProfilePage;
