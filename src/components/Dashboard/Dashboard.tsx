import React from "react";
import StatsGrid from "../Chart/StatsGrid";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <StatsGrid
                totalDonations={21}
                totalReceives={23}
                totalUsers={72}
                totalConnections={50}
            />
        </div>
    )
};

export default Dashboard;