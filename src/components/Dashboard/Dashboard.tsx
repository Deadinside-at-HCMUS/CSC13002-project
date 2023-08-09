import React from "react";
import StatsGrid from "../Chart/StatsGrid";
import TransactionChart from "../Chart/TransactionChart";
import UserPieChart from "../Chart/UserPieChart";
import PostTable from "../Chart/PostTable"

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <StatsGrid
                totalDonations={21}
                totalReceives={23}
                totalUsers={72}
                totalConnections={50}
            />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <UserPieChart />
            </div>
            <PostTable />
        </div>
    )
};

export default Dashboard;