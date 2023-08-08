import React from "react";

import SideBar from "../components/SideBar/SideBar";

const ProfilePage: React.FC = () => {
    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <SideBar />
            <div className="p-4">
                <div className="bg-teal-200">Header</div>
            </div>
        </div>
    );
};

export default ProfilePage;
